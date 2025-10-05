import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Mesh, Vector3, Color } from "three";
import { useFrame } from "@react-three/fiber";

interface DebrisParticle {
  position: Vector3;
  velocity: Vector3;
  risk: "low" | "medium" | "high";
  size: number;
}

const DebrisField = () => {
  const debrisRef = useRef<Mesh[]>([]);
  
  const debris = useMemo(() => {
    const particles: DebrisParticle[] = [];
    const particleCount = 800;
    
    for (let i = 0; i < particleCount; i++) {
      const orbitRadius = 2.3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = orbitRadius * Math.sin(phi) * Math.cos(theta);
      const y = orbitRadius * Math.sin(phi) * Math.sin(theta);
      const z = orbitRadius * Math.cos(phi);
      
      const position = new Vector3(x, y, z);
      const velocity = new Vector3(
        -y * 0.2 + (Math.random() - 0.5) * 0.1,
        x * 0.2 + (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.05
      );
      
      const distance = position.length();
      let risk: "low" | "medium" | "high" = "low";
      if (distance < 2.8) {
        risk = Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low";
      } else if (distance < 3.3) {
        risk = Math.random() > 0.8 ? "medium" : "low";
      }
      
      particles.push({
        position,
        velocity,
        risk,
        size: 0.015 + Math.random() * 0.02
      });
    }
    
    return particles;
  }, []);
  
  useFrame((state, delta) => {
    debris.forEach((particle, i) => {
      if (debrisRef.current[i]) {
        particle.position.add(particle.velocity.clone().multiplyScalar(delta));
        
        const distance = particle.position.length();
        if (distance < 2.2 || distance > 4.5) {
          particle.velocity.multiplyScalar(-1);
        }
        
        debrisRef.current[i].position.copy(particle.position);
      }
    });
  });
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "#ff006e";
      case "medium":
        return "#ffbe0b";
      case "low":
        return "#06ffa5";
      default:
        return "#00f0ff";
    }
  };
  
  return (
    <group>
      {debris.map((particle, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            if (el) debrisRef.current[i] = el;
          }}
          args={[particle.size, 8, 8]}
          position={particle.position}
        >
          <meshBasicMaterial
            color={getRiskColor(particle.risk)}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const Earth = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1e40af"
          metalness={0.8}
          roughness={0.2}
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#9d4edd" transparent opacity={0.3} />
      </mesh>
      
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#4361ee" transparent opacity={0.3} />
      </mesh>
      
      <DebrisField />
    </group>
  );
};

export const EarthScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f0ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Earth />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
