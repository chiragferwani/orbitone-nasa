
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Earth } from './earth';
import { Sun } from "./sun";
import { Space } from "./space";
import { Satellite, SatelliteConfig } from "./satellite";
import './style.css';

class Engine {


    private readonly _scene: THREE.Scene;
    private readonly _camera: THREE.PerspectiveCamera;
    private readonly _renderer: THREE.WebGLRenderer;
    private _controls: OrbitControls;
    private readonly _earth: Earth;
    private readonly _sun: Sun;
    private readonly _satellites: Satellite[] = [];


    constructor() {

        this._scene = new THREE.Scene();
        this._scene.fog = new THREE.Fog( this._scene.background, 3500, 15000 );
        this._scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01, THREE.SRGBColorSpace );

        this._camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 100 );
        this._camera.position.z = 1;

        this._renderer = new THREE.WebGLRenderer( { antialias: true, } );
        this._renderer.setPixelRatio( window.devicePixelRatio );
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.xr.enabled = false;
        this._renderer.shadowMap.autoUpdate = false;

        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.05;
        this._controls.minDistance = 0.550;
        this._controls.maxDistance = 2;

        const plight = new THREE.PointLight(0xffffff, 1);
        plight.position.set(1, 1, 1);
        this._scene.add(plight);

        this._scene.add(new Space());
        this._earth = new Earth(this._scene, this._camera);
        this._createSatellites();
        // this._sun = new Sun(this._scene);

        // this._scene.position.set(0, -1, -1);

        document.body.appendChild( this._renderer.domElement );

        // Add Dashboard button
        const dashboardButton = document.createElement('a');
        dashboardButton.href = 'https://orbitonedashboard.vercel.app/';
        dashboardButton.className = 'dashboard-button';
        dashboardButton.textContent = 'Dashboard';
        dashboardButton.target = '_blank';
        document.body.appendChild(dashboardButton);

        window.addEventListener( 'resize', this._resize.bind(this) );

        this._renderer.setAnimationLoop( this._animate.bind(this) );

    }

    private _createSatellites() {
        // Low Earth Orbit (LEO) satellites - fast moving, close to Earth
        const leoSat1: SatelliteConfig = {
            orbitRadius: 0.55,
            orbitSpeed: 0.0035,
            initialAngle: 0,
            inclination: 0.2,
            color: 0x00ff88,
            orbitPlane: 'horizontal'
        };

        const leoSat2: SatelliteConfig = {
            orbitRadius: 0.58,
            orbitSpeed: 0.0032,
            initialAngle: Math.PI,
            inclination: 0.4,
            color: 0xff4444,
            orbitPlane: 'horizontal'
        };

        // Medium Earth Orbit (MEO) satellites - moderate speed and distance
        const meoSat1: SatelliteConfig = {
            orbitRadius: 0.8,
            orbitSpeed: 0.002,
            initialAngle: Math.PI / 2,
            inclination: Math.PI / 4,
            color: 0x4488ff,
            orbitPlane: 'vertical'
        };

        const meoSat2: SatelliteConfig = {
            orbitRadius: 0.85,
            orbitSpeed: 0.0018,
            initialAngle: Math.PI * 1.5,
            inclination: Math.PI / 6,
            color: 0xffaa00,
            orbitPlane: 'vertical'
        };

        // Geostationary orbit - slow moving, fixed position relative to Earth's surface
        const geoStatSat: SatelliteConfig = {
            orbitRadius: 1.2,
            orbitSpeed: 0.0005,
            initialAngle: Math.PI / 3,
            inclination: 0.1,
            color: 0xaa00ff,
            orbitPlane: 'horizontal'
        };

        // Polar orbit satellites - pass over poles
        const polarSat1: SatelliteConfig = {
            orbitRadius: 0.7,
            orbitSpeed: 0.003,
            initialAngle: 0,
            inclination: Math.PI / 2,
            color: 0x00ffff,
            orbitPlane: 'polar'
        };

        const polarSat2: SatelliteConfig = {
            orbitRadius: 0.75,
            orbitSpeed: 0.0028,
            initialAngle: Math.PI,
            inclination: Math.PI / 1.8,
            color: 0xff66ff,
            orbitPlane: 'polar'
        };

        // Highly elliptical orbit (Molniya)
        const molniyaSat: SatelliteConfig = {
            orbitRadius: 1.5,
            orbitSpeed: 0.0008,
            initialAngle: Math.PI / 4,
            inclination: Math.PI / 2.5,
            color: 0xff9900,
            orbitPlane: 'polar',
            eccentricity: 0.7  // Will be used in the Satellite class
        };

        // Create all satellites
        [
            leoSat1, leoSat2,    // LEO satellites
            meoSat1, meoSat2,    // MEO satellites
            geoStatSat,          // Geostationary
            polarSat1, polarSat2, // Polar orbits
            molniyaSat           // Molniya orbit
        ].forEach(config => {
            this._satellites.push(new Satellite(this._scene, config));
        });
    }


    private _animate( time: number ) {

        this._controls.update();

        this._earth.animate(time);
        this._satellites.forEach(satellite => satellite.animate(time));

        this._renderer.render( this._scene, this._camera );

    }


    private _resize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );

    }


}



new Engine();
