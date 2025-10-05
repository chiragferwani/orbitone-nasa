"use client"

import { Card } from "@/components/ui/card"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, useTexture } from "@react-three/drei"
import { Suspense } from "react"

function Earth() {
  const texture = useTexture("/placeholder.jpg")

  return (
    <group>
      {/* Earth sphere with texture */}
      <Sphere args={[2, 64, 64]} rotation={[0, 0, 0.1]}>
        <meshStandardMaterial map={texture} />
      </Sphere>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.4} />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[Math.PI / 2, Math.PI / 6, 0]}>
        <torusGeometry args={[2.8, 0.018, 16, 100]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.35} />
      </mesh>

      {/* Debris particles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2
        const radius = 3 + Math.random() * 0.5
        const height = (Math.random() - 0.5) * 0.3
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={Math.random() > 0.5 ? "#FF6B6B" : "#FFD700"} />
          </mesh>
        )
      })}
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#1E293B" wireframe />
    </mesh>
  )
}

export default function OrbitVisualization() {
  return (
    <Card className="bg-[#1E293B]/80 backdrop-blur-sm border-white/10 p-6 hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] group">
      <h3 className="text-xl font-bold text-white mb-4">3D Globe Visualization</h3>
      <div className="relative rounded-lg overflow-hidden aspect-video bg-[#0A192F] border border-white/20">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="cursor-grab active:cursor-grabbing">
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#22D3EE" />

          <Suspense fallback={<LoadingFallback />}>
            <Earth />
          </Suspense>

          {/* OrbitControls for mouse interaction */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={6}
            maxDistance={12}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      <p className="text-gray-400 text-sm mt-4">
        Interactive visualization showing satellite orbits and debris distribution around Earth
      </p>
    </Card>
  )
}
