"use client"

import { Card } from "@/components/ui/card"
import { ExternalLink, Leaf, Globe2, Satellite, TrendingUp } from "lucide-react"

interface DataPanelProps {
  activeTab: "sustainability" | "observation"
}

export default function DataPanel({ activeTab }: DataPanelProps) {
  if (activeTab === "sustainability") {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="bg-[#1E293B]/80 backdrop-blur-sm border-white/10 p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-6 h-6 text-[#FFD700]" />
            <h3 className="text-xl font-bold text-white">Sustainability & Compliance</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0A192F]/50 rounded-lg p-4 border border-[#FFD700]/20">
              <h4 className="text-[#FFD700] font-semibold mb-2">25-Year Post-Mission Disposal Rule</h4>
              <p className="text-gray-300 text-sm mb-3">
                Key UN/NASA regulation requiring satellites to deorbit within 25 years after mission completion
              </p>
              <a
                href="https://www.nasa.gov/npr-8715-6b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#22D3EE] hover:text-[#FFD700] transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                NASA NPR 8715.6B: Limiting Orbital Debris
              </a>
            </div>

            <div className="bg-[#0A192F]/50 rounded-lg p-4 border border-[#22D3EE]/20">
              <h4 className="text-[#22D3EE] font-semibold mb-2">ESA Zero Debris Goal</h4>
              <p className="text-gray-300 text-sm mb-3">
                Target date of 2030 for new missions to achieve zero debris generation
              </p>
              <a
                href="https://www.esa.int/space-debris-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#22D3EE] hover:text-[#FFD700] transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                ESA: New Space Debris Mitigation Policy
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-lg p-4 border border-[#FFD700]/20">
                <TrendingUp className="w-5 h-5 text-[#FFD700] mb-2" />
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-gray-400 text-xs">Non-functional debris</p>
              </div>
              <div className="bg-gradient-to-br from-[#22D3EE]/10 to-transparent rounded-lg p-4 border border-[#22D3EE]/20">
                <Satellite className="w-5 h-5 text-[#22D3EE] mb-2" />
                <p className="text-2xl font-bold text-white">6,500+</p>
                <p className="text-gray-400 text-xs">Active satellites</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-[#1E293B]/80 backdrop-blur-sm border-white/10 p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <div className="flex items-center gap-3 mb-4">
          <Globe2 className="w-6 h-6 text-[#22D3EE]" />
          <h3 className="text-xl font-bold text-white">Earth Observation Data</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-[#0A192F]/50 rounded-lg p-4 border border-[#22D3EE]/20">
            <h4 className="text-[#22D3EE] font-semibold mb-2">Near-Real-Time Earth Observation</h4>
            <p className="text-gray-300 text-sm mb-3">
              <strong>Latency:</strong> Data is often available 3 hours after acquisition
            </p>
            <p className="text-gray-300 text-sm mb-3">
              NASA Worldview provides near-real-time satellite imagery for monitoring Earth's systems
            </p>
            <a
              href="https://worldview.earthdata.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#22D3EE] hover:text-[#FFD700] transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              NASA Worldview GIBS API
            </a>
          </div>

          <div className="bg-[#0A192F]/50 rounded-lg p-4 border border-[#FFD700]/20">
            <h4 className="text-[#FFD700] font-semibold mb-2">High-Resolution Imagery</h4>
            <p className="text-gray-300 text-sm mb-3">
              <strong>Resolution:</strong> Sentinel-2 imagery has a resolution of up to 10 meters
            </p>
            <p className="text-gray-300 text-sm mb-3">
              ESA Copernicus provides high-resolution Earth observation data for environmental monitoring
            </p>
            <a
              href="https://dataspace.copernicus.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#22D3EE] hover:text-[#FFD700] transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Copernicus Data Space Ecosystem
            </a>
          </div>

          <div className="bg-[#0A192F]/50 rounded-lg p-4 border border-[#D63030]/20">
            <h4 className="text-[#D63030] font-semibold mb-2">Long-Term Earth Monitoring</h4>
            <p className="text-gray-300 text-sm mb-3">
              <strong>Archive Depth:</strong> Landsat archive covers over 50 years of Earth history
            </p>
            <p className="text-gray-300 text-sm mb-3">
              USGS EarthExplorer provides access to decades of satellite imagery for climate research
            </p>
            <a
              href="https://earthexplorer.usgs.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#22D3EE] hover:text-[#FFD700] transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              USGS: Landsat Archive & Historical Analysis
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}
