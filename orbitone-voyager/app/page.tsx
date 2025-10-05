"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Rocket, Sparkles, Globe, BarChart3, Map, Award, Info, Satellite } from "lucide-react"

type Scene = "landing" | "transition" | "mission-planner"

interface MissionResults {
  sustainabilityScore: number
  riskAssessment: string
  complianceStatus: string
  funFact: string
}

export default function OrbitOnePage() {
  const [scene, setScene] = useState<Scene>("landing")
  const [orbit, setOrbit] = useState("408")
  const [duration, setDuration] = useState("7")
  const [disposal, setDisposal] = useState("planned")
  const [results, setResults] = useState<MissionResults | null>(null)
  const [isLaunching, setIsLaunching] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
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

  const handleLaunch = () => {
    setIsLaunching(true)
    setTimeout(() => {
      setScene("transition")
      setTimeout(() => {
        setScene("mission-planner")
        setIsLaunching(false)
      }, 2000)
    }, 3000)
  }

  const handleSimulate = () => {
    setIsSimulating(true)
    setSimulationProgress(0)
    setResults(null)

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Calculate results after 2.5 seconds
    setTimeout(() => {
      const orbitNum = Number.parseInt(orbit)
      const sustainabilityScore =
        disposal === "planned" ? 85 + Math.floor(Math.random() * 14) : 40 + Math.floor(Math.random() * 20)

      const funFacts: Record<string, string> = {
        "408": "At 408 km, you're in the same orbit as the International Space Station!",
        "600": "At 600 km, satellites can observe Earth's weather patterns with incredible detail.",
        "850": "At 850 km, you're in the heart of the polar orbit zone used for Earth observation.",
        "1200": "At 1200 km, satellites experience less atmospheric drag and can operate for decades.",
      }

      setResults({
        sustainabilityScore,
        riskAssessment: sustainabilityScore > 70 ? "Low Risk" : sustainabilityScore > 50 ? "Medium Risk" : "High Risk",
        complianceStatus: disposal === "planned" ? "Compliant" : "Non-Compliant",
        funFact: funFacts[orbit] || "Space is amazing!",
      })

      setIsSimulating(false)
      clearInterval(progressInterval)
    }, 2500)
  }

  const handleReset = () => {
    setScene("landing")
    setOrbit("408")
    setDuration("7")
    setDisposal("planned")
    setResults(null)
    setIsLaunching(false)
    setIsSimulating(false)
    setSimulationProgress(0)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A192F]">
      {/* Star field canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Landing Scene */}
      {scene === "landing" && (
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
          <div
            className={`text-center transition-all duration-1000 ${isLaunching ? "translate-y-[-200px] opacity-0" : "translate-y-0 opacity-100"}`}
          >
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Rocket className="h-32 w-32 text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]" />
                <div className="absolute inset-0 animate-ping">
                  <Rocket className="h-32 w-32 text-[#FFD700] opacity-20" />
                </div>
              </div>
            </div>

            <h1 className="mb-4 text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] md:text-8xl">
              OrbitOne
            </h1>
            <p className="mb-12 text-2xl text-[#00C2FF] drop-shadow-[0_0_15px_rgba(0,194,255,0.5)] md:text-3xl">
              Building Business Beyond Earth
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={handleLaunch}
                disabled={isLaunching}
                className="group relative overflow-hidden bg-[#FFD700] px-8 py-6 text-lg font-semibold text-[#0A192F] transition-all hover:bg-[#FFD700]/90 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]"
              >
                <Rocket className="mr-2 inline-block h-5 w-5" />
                Launch Mission Planner
              </Button>

              <Link href="https://orbitonecustdashboard.vercel.app" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-[#00C2FF] bg-transparent px-8 py-6 text-lg font-semibold text-[#00C2FF] transition-all hover:bg-[#00C2FF]/10 hover:shadow-[0_0_20px_rgba(0,194,255,0.4)]"
                >
                  <BarChart3 className="mr-2 inline-block h-5 w-5" />
                  Explore Data Dashboard
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                variant="ghost"
                className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_15px_rgba(0,194,255,0.3)]"
              >
                <Map className="mr-2 h-4 w-4" />
                Space Debris Map
              </Button>
              <Button
                variant="ghost"
                className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_15px_rgba(0,194,255,0.3)]"
              >
                <Award className="mr-2 h-4 w-4" />
                Sustainability Hub
              </Button>
              <Link href="/about">
                <Button
                  variant="ghost"
                  className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_15px_rgba(0,194,255,0.3)]"
                >
                  <Info className="mr-2 h-4 w-4" />
                  About OrbitOne
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_15px_rgba(0,194,255,0.3)]"
              >
                <Satellite className="mr-2 h-4 w-4" />
                Virtual Space Tourism
              </Button>
            </div>
          </div>

          {isLaunching && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-[launch_3s_ease-in-out]">
                <Rocket className="h-48 w-48 text-[#FFD700] drop-shadow-[0_0_50px_rgba(255,215,0,0.8)]" />
                <div
                  className="mt-4 h-32 w-2 bg-gradient-to-b from-[#FFD700] to-transparent opacity-80 blur-sm"
                  style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transition Scene */}
      {scene === "transition" && (
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Globe className="mx-auto h-32 w-32 animate-spin text-[#00C2FF] drop-shadow-[0_0_40px_rgba(0,194,255,0.8)]" />
            <p className="mt-8 text-2xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Entering Orbit...</p>
          </div>
        </div>
      )}

      {/* Mission Planner Scene */}
      {scene === "mission-planner" && (
        <div className="relative z-10 min-h-screen">
          {/* Spline 3D Background */}
          <div className="fixed inset-0 z-0">
            <iframe
              src="https://my.spline.design/fbb436a35a3e4c639d5c7cd8fe92ce11/"
              className="h-full w-full"
              title="3D Earth Background"
            />
          </div>

          {/* Navigation */}
          <nav className="relative z-20 flex items-center justify-between p-6">
            <button onClick={handleReset} className="flex items-center gap-2 transition-all hover:opacity-80">
              <Rocket className="h-8 w-8 text-[#FFD700]" />
              <span className="text-2xl font-bold text-white">OrbitOne</span>
            </button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_10px_rgba(0,194,255,0.3)]"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_10px_rgba(0,194,255,0.3)]"
              >
                <Map className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_10px_rgba(0,194,255,0.3)]"
              >
                <Award className="h-4 w-4" />
              </Button>
              <Link href="/about">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 transition-all hover:text-[#00C2FF] hover:shadow-[0_0_10px_rgba(0,194,255,0.3)]"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </nav>

          {/* Main Content */}
          <div className="relative z-20 flex min-h-[calc(100vh-88px)] items-center justify-center gap-8 p-6">
            <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
              {/* Left Panel - Mission Setup */}
              <Card className="animate-fade-in border-[#00C2FF]/20 bg-[#0A192F]/80 p-8 shadow-[0_0_30px_rgba(0,194,255,0.2)] backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-[#FFD700]" />
                  <h2 className="text-2xl font-bold text-white">Virtual Tour Planner</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="orbit" className="text-white/90">
                      Destination Orbit
                    </Label>
                    <Select value={orbit} onValueChange={setOrbit}>
                      <SelectTrigger id="orbit" className="mt-2 border-[#00C2FF]/30 bg-[#0A192F]/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-[#00C2FF]/30 bg-[#0A192F] text-white">
                        <SelectItem value="408">408 km (ISS Orbit)</SelectItem>
                        <SelectItem value="600">600 km (Weather Satellites)</SelectItem>
                        <SelectItem value="850">850 km (Polar Orbit)</SelectItem>
                        <SelectItem value="1200">1200 km (Extended Operations)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration" className="text-white/90">
                      Trip Duration (days)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mt-2 border-[#00C2FF]/30 bg-[#0A192F]/50 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white/90">End-of-Life Plan</Label>
                    <RadioGroup value={disposal} onValueChange={setDisposal} className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="planned" id="planned" className="border-[#00C2FF]" />
                        <Label htmlFor="planned" className="cursor-pointer text-white/80">
                          Planned De-orbit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" className="border-[#00C2FF]" />
                        <Label htmlFor="none" className="cursor-pointer text-white/80">
                          No Disposal Plan
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    onClick={handleSimulate}
                    disabled={isSimulating}
                    className="w-full bg-[#FFD700] py-6 text-lg font-semibold text-[#0A192F] transition-all hover:bg-[#FFD700]/90 hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] disabled:opacity-50"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    {isSimulating ? "Simulating..." : "Simulate Mission"}
                  </Button>
                </div>
              </Card>

              {/* Right Panel - Simulation or Results */}
              {isSimulating && (
                <Card className="animate-fade-in border-[#FFD700]/20 bg-[#0A192F]/80 p-8 shadow-[0_0_30px_rgba(255,215,0,0.2)] backdrop-blur-xl">
                  <div className="flex h-full flex-col items-center justify-center space-y-8">
                    <div className="relative">
                      <Rocket className="h-24 w-24 animate-bounce text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]" />
                      <div className="absolute inset-0 animate-ping">
                        <Rocket className="h-24 w-24 text-[#FFD700] opacity-20" />
                      </div>
                    </div>

                    <div className="w-full space-y-4">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white">Running Simulation</h3>
                        <p className="mt-2 text-white/60">Calculating mission parameters...</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-white/60">
                          <span>Progress</span>
                          <span>{simulationProgress}%</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FFD700] via-[#00C2FF] to-[#FFD700] transition-all duration-300"
                            style={{ width: `${simulationProgress}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <div className="flex items-center gap-3 text-white/80">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-[#00C2FF]" />
                          <span className="text-sm">Analyzing orbital parameters...</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <div
                            className="h-2 w-2 animate-pulse rounded-full bg-[#00C2FF]"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span className="text-sm">Calculating sustainability metrics...</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <div
                            className="h-2 w-2 animate-pulse rounded-full bg-[#00C2FF]"
                            style={{ animationDelay: "0.4s" }}
                          />
                          <span className="text-sm">Assessing compliance status...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {results && !isSimulating && (
                <Card className="animate-fade-in border-[#FFD700]/20 bg-[#0A192F]/80 p-8 shadow-[0_0_30px_rgba(255,215,0,0.2)] backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-[#00C2FF]" />
                    <h2 className="text-2xl font-bold text-white">Mission Analytics</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="cursor-pointer rounded-lg border border-[#00C2FF]/20 bg-[#0A192F]/50 p-4 transition-all duration-300 hover:scale-105 hover:border-[#00C2FF]/40 hover:shadow-[0_0_20px_rgba(0,194,255,0.4)]">
                      <div className="mb-2 text-sm text-white/60">Sustainability Score</div>
                      <div className="flex items-end gap-2">
                        <div className="text-4xl font-bold text-[#FFD700]">{results.sustainabilityScore}</div>
                        <div className="mb-1 text-white/60">/100</div>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FFD700] to-[#00C2FF] transition-all duration-1000"
                          style={{ width: `${results.sustainabilityScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="cursor-pointer rounded-lg border border-[#00C2FF]/20 bg-[#0A192F]/50 p-4 transition-all duration-300 hover:scale-105 hover:border-[#00C2FF]/40 hover:shadow-[0_0_20px_rgba(0,194,255,0.4)]">
                      <div className="mb-2 text-sm text-white/60">Risk Assessment</div>
                      <div className="text-2xl font-semibold text-white">{results.riskAssessment}</div>
                    </div>

                    <div className="cursor-pointer rounded-lg border border-[#00C2FF]/20 bg-[#0A192F]/50 p-4 transition-all duration-300 hover:scale-105 hover:border-[#00C2FF]/40 hover:shadow-[0_0_20px_rgba(0,194,255,0.4)]">
                      <div className="mb-2 text-sm text-white/60">Compliance Status</div>
                      <div
                        className={`text-2xl font-semibold ${results.complianceStatus === "Compliant" ? "text-[#00C2FF]" : "text-red-400"}`}
                      >
                        {results.complianceStatus}
                      </div>
                    </div>

                    <div className="cursor-pointer rounded-lg border border-[#FFD700]/20 bg-[#FFD700]/5 p-4 transition-all duration-300 hover:scale-105 hover:border-[#FFD700]/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                      <div className="mb-2 flex items-center gap-2 text-sm text-[#FFD700]">
                        <Sparkles className="h-4 w-4" />
                        Fun Fact
                      </div>
                      <div className="text-white/90">{results.funFact}</div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes launch {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
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
