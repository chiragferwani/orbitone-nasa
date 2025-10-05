import { EarthScene } from "@/components/EarthScene";
import { SatelliteTracker } from "@/components/SatelliteTracker";
import { DebrisHeatmap } from "@/components/DebrisHeatmap";
import { DebrisMetrics } from "@/components/DebrisMetrics";
import { MissionTimeline } from "@/components/MissionTimeline";
import { RiskIndicators } from "@/components/RiskIndicators";
import { EnvironmentalMetrics } from "@/components/EnvironmentalMetrics";

const Index = () => {
  return (
    <div className="min-h-screen bg-background grid-bg overflow-hidden">
      {/* Header */}
      <header className="border-b border-primary/20 backdrop-blur-sm bg-background/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold neon-text">ORBITAL COMMAND</h1>
              <p className="text-xs text-muted-foreground mt-1">Space Operations Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">System Status</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium text-success">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Left Column - Data Panels */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto hide-scrollbar">
            <SatelliteTracker />
            <DebrisHeatmap />
            <MissionTimeline />
          </div>

          {/* Center Column - 3D Earth Visualization */}
          <div className="lg:col-span-1 relative">
            <div className="glass-panel rounded-xl h-full overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.3)] border border-primary/30">
              <EarthScene />
            </div>
            <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-lg p-3 border border-primary/20">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-muted-foreground">Active Orbits</div>
                  <div className="text-lg font-bold text-primary mt-1">3,847</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Monitored Objects</div>
                  <div className="text-lg font-bold text-secondary mt-1">12,081</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Coverage</div>
                  <div className="text-lg font-bold text-success mt-1">98.7%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Metrics & Environmental */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto hide-scrollbar">
            <DebrisMetrics />
            <RiskIndicators />
            <EnvironmentalMetrics />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
