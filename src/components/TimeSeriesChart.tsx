import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import type { TimeseriesPoint } from "../types";

interface TimeSeriesChartProps {
  data: TimeseriesPoint[];
  dataKey?: string;
  title?: string;
  type?: "line" | "bar";
  color?: string;
  yAxisLabel?: string;
}

export function TimeSeriesChart({
  data,
  dataKey = "value",
  title,
  type = "line",
  color = "#10b981",
  yAxisLabel,
}: TimeSeriesChartProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
      {title && (
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#71717a" }}
              stroke="#d4d4d8"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#71717a" }}
              stroke="#d4d4d8"
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12, fill: "#71717a" },
                    }
                  : undefined
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e4e4e7",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#71717a" }}
              stroke="#d4d4d8"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#71717a" }}
              stroke="#d4d4d8"
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12, fill: "#71717a" },
                    }
                  : undefined
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e4e4e7",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

