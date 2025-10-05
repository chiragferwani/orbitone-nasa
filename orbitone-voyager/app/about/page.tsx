"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Rocket, Target, Eye, Heart, Users, Building2, ArrowLeft, Sparkles } from "lucide-react"

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Star field animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; size: number; speed: number }[] = []
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.fillStyle = "rgba(10, 25, 47, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A192F]">
      {/* Star field canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2 transition-all hover:opacity-80">
          <Rocket className="h-8 w-8 text-[#FFD700]" />
          <span className="text-2xl font-bold text-white">OrbitOne</span>
        </Link>
        <Link href="/">
          <Button
            variant="ghost"
            className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_10px_rgba(0,194,255,0.3)]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-12">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Hero Section */}
          <div className="animate-fade-in text-center">
            <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] md:text-7xl">
              About OrbitOne
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#00C2FF] drop-shadow-[0_0_15px_rgba(0,194,255,0.5)] md:text-2xl">
              Bridging the future of business and exploration — helping companies build responsibly in orbit while
              inspiring people to explore space sustainably.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="animate-fade-in cursor-pointer border-[#FFD700]/20 bg-[#0A192F]/80 p-8 shadow-[0_0_30px_rgba(255,215,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)]">
              <div className="mb-4 flex items-center gap-3">
                <Eye className="h-8 w-8 text-[#FFD700]" />
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-lg leading-relaxed text-white/80">
                Building Business Beyond Earth. We envision a future where space operations are safe, sustainable, and
                accessible to all — from enterprises launching satellites to individuals experiencing the wonder of
                orbit.
              </p>
            </Card>

            <Card className="animate-fade-in cursor-pointer border-[#00C2FF]/20 bg-[#0A192F]/80 p-8 shadow-[0_0_30px_rgba(0,194,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)]">
              <div className="mb-4 flex items-center gap-3">
                <Target className="h-8 w-8 text-[#00C2FF]" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed text-white/80">
                To build a smart digital platform that helps businesses plan safe and sustainable missions in space,
                while enabling people to experience space virtually and learn how to explore it responsibly using real
                NASA and USGS data.
              </p>
            </Card>
          </div>

          {/* What We Do */}
          <Card className="animate-fade-in cursor-pointer border-[#00C2FF]/20 bg-[#0A192F]/80 p-8 shadow-[0_0_30px_rgba(0,194,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#00C2FF]/30 hover:shadow-[0_0_40px_rgba(0,194,255,0.3)]">
            <h2 className="mb-6 text-center text-3xl font-bold text-white">What We Do</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="cursor-pointer rounded-lg border border-[#FFD700]/20 bg-[#FFD700]/5 p-6 transition-all duration-300 hover:scale-105 hover:border-[#FFD700]/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <div className="mb-3 flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-[#FFD700]" />
                  <h3 className="text-xl font-semibold text-[#FFD700]">For Businesses (B2B)</h3>
                </div>
                <p className="leading-relaxed text-white/80">
                  We help space companies, research organizations, and satellite operators plan safe and sustainable
                  missions in Low Earth Orbit. Our platform provides real-time debris visualization, sustainability
                  scoring, and compliance assessment to ensure responsible space operations.
                </p>
              </div>

              <div className="cursor-pointer rounded-lg border border-[#00C2FF]/20 bg-[#00C2FF]/5 p-6 transition-all duration-300 hover:scale-105 hover:border-[#00C2FF]/40 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)]">
                <div className="mb-3 flex items-center gap-3">
                  <Users className="h-6 w-6 text-[#00C2FF]" />
                  <h3 className="text-xl font-semibold text-[#00C2FF]">For Everyone (B2C)</h3>
                </div>
                <p className="leading-relaxed text-white/80">
                  We bring space exploration to everyone through virtual space tourism experiences. Explore orbit in 3D,
                  plan virtual missions, and learn about sustainable space practices. Experience the wonder of space
                  from anywhere on Earth.
                </p>
              </div>
            </div>
          </Card>

          {/* Core Values */}
          <div>
            <h2 className="mb-8 text-center text-3xl font-bold text-white">Our Core Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="animate-fade-in cursor-pointer border-[#00C2FF]/20 bg-[#0A192F]/80 p-6 text-center shadow-[0_0_20px_rgba(0,194,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)]">
                <Heart className="mx-auto mb-3 h-10 w-10 text-[#FFD700]" />
                <h3 className="mb-2 text-xl font-semibold text-white">Sustainability</h3>
                <p className="text-sm text-white/70">
                  Promoting eco-friendly space activities and responsible orbital operations
                </p>
              </Card>

              <Card className="animate-fade-in cursor-pointer border-[#00C2FF]/20 bg-[#0A192F]/80 p-6 text-center shadow-[0_0_20px_rgba(0,194,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)]">
                <Sparkles className="mx-auto mb-3 h-10 w-10 text-[#00C2FF]" />
                <h3 className="mb-2 text-xl font-semibold text-white">Innovation</h3>
                <p className="text-sm text-white/70">
                  Leveraging cutting-edge technology and real NASA data for space solutions
                </p>
              </Card>

              <Card className="animate-fade-in cursor-pointer border-[#00C2FF]/20 bg-[#0A192F]/80 p-6 text-center shadow-[0_0_20px_rgba(0,194,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)]">
                <Users className="mx-auto mb-3 h-10 w-10 text-[#FFD700]" />
                <h3 className="mb-2 text-xl font-semibold text-white">Accessibility</h3>
                <p className="text-sm text-white/70">Making space exploration and education available to everyone</p>
              </Card>

              <Card className="animate-fade-in cursor-pointer border-[#00C2FF]/20 bg-[#0A192F]/80 p-6 text-center shadow-[0_0_20px_rgba(0,194,255,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,194,255,0.3)]">
                <Target className="mx-auto mb-3 h-10 w-10 text-[#00C2FF]" />
                <h3 className="mb-2 text-xl font-semibold text-white">Education</h3>
                <p className="text-sm text-white/70">
                  Raising awareness about space debris and responsible space practices
                </p>
              </Card>
            </div>
          </div>

          {/* The Challenge */}
          <Card className="animate-fade-in cursor-pointer border-[#FFD700]/20 bg-[#0A192F]/80 p-8 shadow-[0_0_30px_rgba(255,215,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#FFD700]/30 hover:shadow-[0_0_40px_rgba(255,215,0,0.3)]">
            <h2 className="mb-4 text-3xl font-bold text-white">The Challenge We're Solving</h2>
            <p className="mb-4 text-lg leading-relaxed text-white/80">
              Space is becoming the next frontier for business — companies are launching satellites, building space
              stations, and even planning tourism. But Low Earth Orbit (LEO) is getting crowded with space debris from
              broken satellite parts, and operations need to be safe, sustainable, and responsible.
            </p>
            <p className="text-lg leading-relaxed text-white/80">
              OrbitOne addresses this challenge by providing real-time data visualization, sustainability metrics, and
              virtual experiences that promote responsible space operations for both businesses and individuals.
            </p>
          </Card>

          {/* CTA */}
          <div className="animate-fade-in text-center">
            <Link href="/">
              <Button className="bg-[#FFD700] px-8 py-6 text-lg font-semibold text-[#0A192F] transition-all hover:bg-[#FFD700]/90 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]">
                <Rocket className="mr-2 h-5 w-5" />
                Start Your Mission
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
