"use client"

import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface MetricCardProps {
  icon: ReactNode
  title: string
  value: string
  subtitle: string
  color: "gold" | "red" | "cyan"
  delay: number
}

export default function MetricCard({ icon, title, value, subtitle, color, delay }: MetricCardProps) {
  const colorClasses = {
    gold: "from-[#FFD700]/20 to-[#FFD700]/5 border-[#FFD700]/30 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]",
    red: "from-[#D63030]/20 to-[#D63030]/5 border-[#D63030]/30 hover:shadow-[0_0_30px_rgba(214,48,48,0.4)]",
    cyan: "from-[#22D3EE]/20 to-[#22D3EE]/5 border-[#22D3EE]/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
  }

  const iconColorClasses = {
    gold: "text-[#FFD700]",
    red: "text-[#D63030]",
    cyan: "text-[#22D3EE]",
  }

  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm p-6 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={`${iconColorClasses[color]} opacity-80`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-gray-300 text-sm font-medium mb-1">{title}</h3>
          <p className="text-white text-3xl font-bold mb-1">{value}</p>
          <p className="text-gray-400 text-xs">{subtitle}</p>
        </div>
      </div>
    </Card>
  )
}
