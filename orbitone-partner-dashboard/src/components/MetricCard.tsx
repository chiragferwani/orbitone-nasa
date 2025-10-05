interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  status?: "success" | "warning" | "danger";
}

export const MetricCard = ({ label, value, unit, trend, status }: MetricCardProps) => {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${status ? statusColors[status] : "text-foreground"}`}>
          {value}
        </span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        {trend && (
          <span className={`text-lg ${status ? statusColors[status] : "text-muted-foreground"}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
    </div>
  );
};
