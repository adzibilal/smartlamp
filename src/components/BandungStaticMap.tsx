import { Link } from "react-router-dom";
import type { Area } from "../types";

interface BandungStaticMapProps {
  areas: Area[];
}

export function BandungStaticMap({ areas }: BandungStaticMapProps) {
  // For prototype, we'll use a placeholder and overlay area badges
  return (
    <div className="relative bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden transition-colors">
      {/* Static map placeholder - in production this would be an actual map image */}
      <div className="relative h-[500px] bg-gradient-to-br from-emerald-100 via-zinc-100 to-blue-100 dark:from-emerald-900 dark:via-zinc-800 dark:to-blue-900">
        {/* Decorative map-like elements */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300">Kota Bandung</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Peta Sebaran Kawasan PJU
            </p>
          </div>
        </div>

        {/* Area badges positioned around the map */}
        {areas.map((area, idx) => {
          // Simple positioning logic for prototype
          const positions = [
            { top: "20%", left: "25%" },
            { top: "35%", left: "15%" },
            { top: "50%", left: "10%" },
            { top: "65%", left: "30%" },
            { top: "45%", left: "70%" },
          ];
          const pos = positions[idx % positions.length];

          return (
            <Link
              key={area.id}
              to={`/areas/${area.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: pos.top, left: pos.left }}
            >
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg border-2 border-emerald-500 dark:border-emerald-400 px-4 py-2 hover:shadow-xl hover:scale-105 transition">
                <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {area.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {area.lampIds.length} PJU
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

