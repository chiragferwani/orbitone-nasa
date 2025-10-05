import { DataPanel } from "./DataPanel";

export const DebrisMetrics = () => {
  return (
    <DataPanel title="Debris Analytics" glowColor="purple">
      <div className="space-y-4">
        {/* Collision Probability */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/80">Collision Probability</span>
            <span className="text-xs font-mono text-success">LOW</span>
          </div>
          <div className="text-2xl font-bold text-primary">0.0031%</div>
          <div className="text-xs text-muted-foreground">Next 24h orbital window</div>
        </div>

        {/* Safe Orbit Projection */}
        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="text-sm text-foreground/80 mb-3">Safe Orbit Corridors</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-success/10 border border-success/30">
              <span className="text-xs font-medium">Corridor A-1</span>
              <span className="text-xs font-mono text-success">Clear</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-success/10 border border-success/30">
              <span className="text-xs font-medium">Corridor B-2</span>
              <span className="text-xs font-mono text-success">Clear</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-warning/10 border border-warning/30">
              <span className="text-xs font-medium">Corridor C-3</span>
              <span className="text-xs font-mono text-warning">Monitor</span>
            </div>
          </div>
        </div>

        {/* Debris Tracking Stats */}
        <div className="mt-4 pt-4 border-t border-primary/20">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted-foreground">Tracked Debris</div>
              <div className="text-lg font-bold text-primary mt-1">9,234</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">High Risk</div>
              <div className="text-lg font-bold text-destructive mt-1">127</div>
            </div>
          </div>
        </div>
      </div>
    </DataPanel>
  );
};
