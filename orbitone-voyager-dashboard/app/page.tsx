"use client"

import { useState } from "react"
import { Rocket, Satellite, AlertTriangle, Leaf, Globe, Database, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import StarField from "@/components/star-field"
import OrbitVisualization from "@/components/orbit-visualization"
import MetricCard from "@/components/metric-card"
import DataPanel from "@/components/data-panel"
import Image from "next/image"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"sustainability" | "observation">("sustainability")

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0A192F" }}>
      {/* Animated Star Field Background */}
      <StarField />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm bg-[#0A192F]/80">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src="/orbitone-logo.png"
                    alt="OrbitOne Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">OrbitOne</h1>
                  <p className="text-sm text-[#22D3EE]">Building Business Beyond Earth</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0A192F] transition-all duration-300 bg-transparent"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Launch Mission Planner
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Title */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-bold text-white mb-2 text-balance">Explore Data Dashboard</h2>
          <p className="text-[#22D3EE] text-lg">Real-time orbital metrics and sustainability insights</p>
        </div>

        {/* Top Metric Cards */}
        <div className="container mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={<Database className="w-8 h-8" />}
              title="Total Tracked Objects"
              value="≈31,000"
              subtitle="Active satellites and debris ≥10 cm"
              color="gold"
              delay={0}
            />
            <MetricCard
              icon={<AlertTriangle className="w-8 h-8" />}
              title="Highest Risk Zone"
              value="800-1000 km"
              subtitle="Critical altitude region"
              color="red"
              delay={100}
            />
            <MetricCard
              icon={<Leaf className="w-8 h-8" />}
              title="ESA Zero Debris Goal"
              value="2030"
              subtitle="Target date for new missions"
              color="cyan"
              delay={200}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Orbit Visualization */}
            <div className="space-y-6">
              <OrbitVisualization />

              {/* Additional Stats */}
              <Card className="bg-[#1E293B]/80 backdrop-blur-sm border-white/10 p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <h3 className="text-xl font-bold text-white mb-4">LEO Debris Environment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Active Satellites</span>
                    <span className="text-[#FFD700] font-bold">≈6,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Debris Percentage</span>
                    <span className="text-[#D63030] font-bold">≈95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Objects ≥10cm</span>
                    <span className="text-[#22D3EE] font-bold">36,000+</span>
                  </div>
                </div>
                <a
                  href="https://www.nasa.gov/odpo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[#FFD700] hover:text-[#22D3EE] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Source: NASA ODPO</span>
                </a>
              </Card>
            </div>

            {/* Right Column - Data Panels */}
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex gap-4 bg-[#1E293B]/80 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                <button
                  onClick={() => setActiveTab("sustainability")}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "sustainability"
                      ? "bg-[#FFD700] text-[#0A192F] shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Globe className="w-5 h-5 inline-block mr-2" />
                  Orbital Sustainability
                </button>
                <button
                  onClick={() => setActiveTab("observation")}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "observation"
                      ? "bg-[#22D3EE] text-[#0A192F] shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Satellite className="w-5 h-5 inline-block mr-2" />
                  Earth Observation
                </button>
              </div>

              {/* Tab Content */}
              <DataPanel activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
