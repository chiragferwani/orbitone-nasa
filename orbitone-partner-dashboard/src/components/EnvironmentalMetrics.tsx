import { DataPanel } from "./DataPanel";

const metrics = [
  { label: "Orbital Sustainability Index", value: 7.8, max: 10, color: "success" },
  { label: "Space Traffic Density", value: 6.2, max: 10, color: "warning" },
  { label: "Cleanup Efficiency", value: 8.5, max: 10, color: "success" },
  { label: "New Launch Impact", value: 4.1, max: 10, color: "success" },
];

export const EnvironmentalMetrics = () => {
  const getColorClass = (color: string) => {
    switch (color) {
      case "success":
        return "bg-success";
      case "warning":
        return "bg-warning";
      case "danger":
        return "bg-destructive";
      default:
        return "bg-primary";
    }
  };

  return (
    <DataPanel title="Environmental Impact" glowColor="purple">
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/80">{metric.label}</span>
              <span className="text-sm font-mono font-bold">
                {metric.value}/{metric.max}
              </span>
            </div>
            <div className="relative h-2 bg-muted/20 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${getColorClass(
                  metric.color
                )} transition-all duration-500 rounded-full`}
                style={{ width: `${(metric.value / metric.max) * 100}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </DataPanel>
  );
};
