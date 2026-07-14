import type { DashboardRiskLevel } from "@/data/demoDashboard";

const badgeStyles: Record<DashboardRiskLevel, string> = {
  High: "text-rose-600 bg-rose-50",
  Medium: "text-orange-600 bg-orange-50",
  Low: "text-emerald-600 bg-emerald-50",
};

const dotStyles: Record<DashboardRiskLevel, string> = {
  High: "bg-rose-500",
  Medium: "bg-orange-500",
  Low: "bg-emerald-500",
};

const labels: Record<DashboardRiskLevel, string> = {
  High: "HIGH RISK",
  Medium: "MEDIUM RISK",
  Low: "LOW RISK",
};

interface RiskBadgeProps {
  level: DashboardRiskLevel;
  className?: string;
}

export function RiskBadge({ level, className = "" }: RiskBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap ${badgeStyles[level]} ${className}`}
    >
      {labels[level]}
    </span>
  );
}

interface RiskDotProps {
  level: DashboardRiskLevel;
  className?: string;
}

export function RiskDot({ level, className = "" }: RiskDotProps) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${dotStyles[level]} ${className}`}
    />
  );
}
