import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatsCard({ title, value, unit, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-zinc-900 dark:text-white">{value}</p>
            {unit && (
              <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">{unit}</span>
            )}
          </div>
          {trend && (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{trend.label}</p>
          )}
        </div>
        {icon && (
          <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg">{icon}</div>
        )}
      </div>
    </div>
  );
}

