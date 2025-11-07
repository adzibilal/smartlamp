import type { TimeseriesPoint } from "../types";

// Generate hourly data for today (24 hours)
export function generateHourlyData(baseValue: number, variance: number): TimeseriesPoint[] {
  const data: TimeseriesPoint[] = [];

  for (let i = 0; i < 24; i++) {
    const value = baseValue + (Math.random() - 0.5) * variance;
    data.push({
      hour: i,
      value: parseFloat(value.toFixed(2)),
      label: `${i.toString().padStart(2, "0")}:00`,
    });
  }

  return data;
}

// Generate aggregate area hourly data
export function generateAreaHourlyKWh(lampCount: number): TimeseriesPoint[] {
  // Each lamp consumes roughly 0.1 kWh per hour
  const baseKWhPerHour = lampCount * 0.1;
  return generateHourlyData(baseKWhPerHour, baseKWhPerHour * 0.2);
}

