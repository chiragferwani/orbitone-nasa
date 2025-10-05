import { DataPanel } from "./DataPanel";
import { MetricCard } from "./MetricCard";

export const RiskIndicators = () => {
  return (
    <DataPanel title="Sustainability & Risk Metrics" glowColor="cyan">
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Overall Risk Score"
          value={42}
          unit="/100"
          status="success"
          trend="down"
        />
        <MetricCard
          label="Collision Probability"
          value={0.003}
          unit="%"
          status="success"
          trend="stable"
        />
        <MetricCard
          label="Active Satellites"
          value={2847}
          status="success"
          trend="up"
        />
        <MetricCard
          label="Debris Objects"
          value={9234}
          status="warning"
          trend="up"
        />
      </div>
    </DataPanel>
  );
};
