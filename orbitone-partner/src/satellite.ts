import * as THREE from 'three';

export interface SatelliteConfig {
    orbitRadius?: number;
    orbitSpeed?: number;
    initialAngle?: number;
    inclination?: number;
    color?: number;
    orbitPlane?: 'horizontal' | 'vertical' | 'polar';
    eccentricity?: number; // 0 = circular, 0-1 = elliptical
}

export class Satellite {
    
    private readonly satellite: THREE.Group;
    private readonly orbitRadius: number;
    private orbitSpeed: number;
    private orbitAngle: number;
    private readonly earthRadius: number;
    private readonly inclination: number;
    private readonly orbitPlane: string;
    private readonly eccentricity: number;
    private orbitTrail: THREE.Line;
    private readonly trailPoints: THREE.Vector3[] = [];
    private readonly maxTrailPoints: number = 200;
    private readonly semiMajorAxis: number;
    private readonly semiMinorAxis: number;

    constructor(scene: THREE.Scene, config: SatelliteConfig = {}, earthRadius: number = 0.5) {
        this.earthRadius = earthRadius;
        this.orbitRadius = config.orbitRadius || earthRadius + 0.15;
        this.orbitSpeed = config.orbitSpeed || 0.002;
        this.orbitAngle = config.initialAngle || 0;
        this.inclination = config.inclination || 0;
        this.orbitPlane = config.orbitPlane || 'horizontal';
        this.eccentricity = config.eccentricity || 0; // 0 = circular orbit
        this.semiMajorAxis = this.orbitRadius;
        this.semiMinorAxis = this.orbitRadius * (1 - this.eccentricity);

        this.satellite = new THREE.Group();
        this._createSatellite(config.color || 0x00ff88);
        this._createOrbitTrail();
        
        scene.add(this.satellite);
        scene.add(this.orbitTrail);
    }

    private _createSatellite(color: number = 0xcccccc) {
        // Main body of satellite
        const bodyGeometry = new THREE.BoxGeometry(0.008, 0.012, 0.006);
        const bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: color,
            shininess: 100,
            emissive: color,
            emissiveIntensity: 0.2
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.name = 'satelliteBody';
        
        // Add glow effect
        const glowGeometry = new THREE.SphereGeometry(0.015, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.name = 'satelliteGlow';
        
        // Solar panels
        const panelGeometry = new THREE.BoxGeometry(0.020, 0.008, 0.001);
        const panelMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a2e,
            emissive: 0x000033,
            shininess: 50 
        });
        
        const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        leftPanel.position.set(-0.014, 0, 0);
        
        const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        rightPanel.position.set(0.014, 0, 0);

        // Antenna
        const antennaGeometry = new THREE.CylinderGeometry(0.0005, 0.0005, 0.015);
        const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
        const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna.position.set(0, 0.01, 0);

        // Add all parts to satellite group
        this.satellite.add(body);
        this.satellite.add(glow);
        this.satellite.add(leftPanel);
        this.satellite.add(rightPanel);
        this.satellite.add(antenna);

        // Position satellite in initial orbit
        this._updateOrbitPosition();
    }

    private _createOrbitTrail() {
        const points = [];
        const segments = 200;

        // Create points along the elliptical orbit
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const radius = (this.semiMajorAxis * this.semiMinorAxis) / 
                         Math.sqrt(Math.pow(this.semiMinorAxis * Math.cos(angle), 2) + 
                                 Math.pow(this.semiMajorAxis * Math.sin(angle), 2));
            
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            points.push(new THREE.Vector3(x, 0, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineDashedMaterial({
            color: 0x666666,
            dashSize: 0.05,
            gapSize: 0.05,
            transparent: true,
            opacity: 0.4,
            linewidth: 1
        });

        this.orbitTrail = new THREE.Line(geometry, material);
        this.orbitTrail.computeLineDistances();
        
        // Apply orbital plane rotation
        if (this.orbitPlane === 'vertical') {
            this.orbitTrail.rotation.z = Math.PI / 2;
        } else if (this.orbitPlane === 'polar') {
            this.orbitTrail.rotation.x = 0;
        } else {
            this.orbitTrail.rotation.x = Math.PI / 2; // Horizontal plane
        }
        
        // Apply inclination
        this.orbitTrail.rotation.y = this.inclination;
    }

    private _updateOrbitPosition() {
        // Update satellite position
        this.orbitAngle += this.orbitSpeed;
        
        let x, y, z;
        
        // Calculate position in 2D ellipse
        const angle = this.orbitAngle;
        const radius = (this.semiMajorAxis * this.semiMinorAxis) / 
                     Math.sqrt(Math.pow(this.semiMinorAxis * Math.cos(angle), 2) + 
                             Math.pow(this.semiMajorAxis * Math.sin(angle), 2));
        
        // Get base position in orbital plane
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        
        // Apply orbital plane transformation
        switch (this.orbitPlane) {
            case 'vertical':
                // Rotate around Z axis to make orbit vertical
                y = z;
                z = 0;
                break;
                
            case 'polar':
                // Already in polar coordinates, just apply inclination
                y = Math.sin(this.inclination) * z;
                z = Math.cos(this.inclination) * z;
                break;
                
            case 'horizontal':
            default:
                // Default horizontal orbit, no transformation needed
                y = 0;
                break;
        }
        
        this.satellite.position.set(x, y, z);
        
        // Make satellite face direction of travel
        this.satellite.lookAt(0, 0, 0);
    }

    private _updateOrbitTrail() {
        // Add current position to trail points
        this.trailPoints.push(this.satellite.position.clone());
        
        // Remove oldest point if we've reached max points
        if (this.trailPoints.length > this.maxTrailPoints) {
            this.trailPoints.shift();
        }
        
        // Only update geometry if we have enough points and trail exists
        if (this.trailPoints.length > 2 && this.orbitTrail) {
            // Create a new geometry with the updated points
            const geometry = new THREE.BufferGeometry().setFromPoints(this.trailPoints);
            
            // Dispose of the old geometry to prevent memory leaks
            if (this.orbitTrail.geometry) {
                this.orbitTrail.geometry.dispose();
            }
            
            // Update the trail with new geometry
            this.orbitTrail.geometry = geometry;
            
            // Update line distances for dashed material
            const material = this.orbitTrail.material as THREE.LineDashedMaterial;
            if (material.isLineDashedMaterial) {
                this.orbitTrail.computeLineDistances();
            }
        }
    }

    public animate(time: number): void {
        this._updateOrbitPosition();
        this._updateOrbitTrail();
        
        // Rotate satellite slightly for dynamic effect
        this.satellite.rotation.y += 0.01;
    }

    public getPosition(): THREE.Vector3 {
        return this.satellite.position.clone();
    }
}
