import { DataPanel } from "./DataPanel";

const missions = [
  { name: "Orbital Cleanup Alpha", date: "2025-11-15", status: "scheduled", progress: 0 },
  { name: "Station Resupply", date: "2025-10-28", status: "in-progress", progress: 65 },
  { name: "Satellite Deployment", date: "2025-10-05", status: "completed", progress: 100 },
];

export const MissionTimeline = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "in-progress":
        return "text-warning";
      case "scheduled":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/20 text-success";
      case "in-progress":
        return "bg-warning/20 text-warning";
      case "scheduled":
        return "bg-primary/20 text-primary";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <DataPanel title="Mission Projections" glowColor="blue">
      <div className="space-y-4">
        {missions.map((mission, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium text-sm">{mission.name}</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">{mission.date}</div>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full uppercase tracking-wide ${getStatusBadge(
                  mission.status
                )}`}
              >
                {mission.status}
              </span>
            </div>
            {mission.status !== "scheduled" && (
              <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatusColor(
                    mission.status
                  )} bg-current transition-all duration-500`}
                  style={{ width: `${mission.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </DataPanel>
  );
};
