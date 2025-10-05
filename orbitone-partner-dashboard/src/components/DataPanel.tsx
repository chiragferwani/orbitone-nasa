import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "blue";
}

export const DataPanel = ({ title, children, className, glowColor = "cyan" }: DataPanelProps) => {
  const glowClasses = {
    cyan: "shadow-[0_0_20px_rgba(0,240,255,0.3)] border-neon-cyan/30",
    purple: "shadow-[0_0_20px_rgba(157,74,237,0.3)] border-neon-purple/30",
    blue: "shadow-[0_0_20px_rgba(67,97,238,0.3)] border-neon-blue/30",
  };

  return (
    <div
      className={cn(
        "glass-panel rounded-xl p-4 animate-fade-in",
        glowClasses[glowColor],
        className
      )}
    >
      <h3 className="text-sm font-semibold mb-3 neon-text uppercase tracking-wider">
        {title}
      </h3>
      <div className="text-foreground/90">{children}</div>
    </div>
  );
};
