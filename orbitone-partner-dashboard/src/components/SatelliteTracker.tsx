import { DataPanel } from "./DataPanel";

const satellites = [
  { id: "SAT-001", name: "Aurora Station", orbit: "LEO", altitude: "420 km", status: "active" },
  { id: "SAT-002", name: "Orion Observer", orbit: "MEO", altitude: "2,000 km", status: "active" },
  { id: "SAT-003", name: "Neptune Relay", orbit: "GEO", altitude: "35,786 km", status: "standby" },
  { id: "SAT-004", name: "Artemis Array", orbit: "LEO", altitude: "550 km", status: "active" },
];

export const SatelliteTracker = () => {
  return (
    <DataPanel title="Real-Time Satellite Positions" glowColor="cyan">
      <div className="space-y-3">
        {satellites.map((sat) => (
          <div
            key={sat.id}
            className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-primary/10 hover:border-primary/30 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    sat.status === "active" ? "bg-success" : "bg-warning"
                  }`}
                />
                <span className="font-medium text-sm">{sat.name}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{sat.id}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-primary">{sat.orbit}</div>
              <div className="text-xs text-muted-foreground">{sat.altitude}</div>
            </div>
          </div>
        ))}
      </div>
    </DataPanel>
  );
};
