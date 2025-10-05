import { DataPanel } from "./DataPanel";

const debrisZones = [
  { zone: "LEO Zone A", density: 85, risk: "high" },
  { zone: "LEO Zone B", density: 62, risk: "medium" },
  { zone: "MEO Zone", density: 28, risk: "low" },
  { zone: "GEO Zone", density: 15, risk: "low" },
];

export const DebrisHeatmap = () => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-destructive";
      case "medium":
        return "bg-warning";
      case "low":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  const getBarWidth = (density: number) => `${density}%`;

  return (
    <DataPanel title="Orbital Debris Density" glowColor="purple">
      <div className="space-y-4">
        {debrisZones.map((zone) => (
          <div key={zone.zone} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground/80">{zone.zone}</span>
              <span className="text-xs text-muted-foreground font-mono">{zone.density}%</span>
            </div>
            <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
              <div
                className={`h-full ${getRiskColor(zone.risk)} transition-all duration-500 rounded-full`}
                style={{ width: getBarWidth(zone.density) }}
              />
            </div>
          </div>
        ))}
      </div>
    </DataPanel>
  );
};
