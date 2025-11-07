import type { ReactNode } from "react";

interface KpiGridProps {
  children: ReactNode;
}

export function KpiGrid({ children }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {children}
    </div>
  );
}

