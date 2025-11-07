import type { Area, Lamp, AreaStats, TimeseriesPoint } from "../types";
import { mockAreas } from "../mock/areas";
import { mockLamps } from "../mock/lamps";
import { generateHourlyData, generateAreaHourlyKWh } from "../mock/timeseries";

export const dataService = {
  // Get all areas
  getAreas(): Area[] {
    return mockAreas;
  },

  // Get area by ID
  getAreaById(areaId: string): Area | undefined {
    return mockAreas.find((a) => a.id === areaId);
  },

  // Get all lamps
  getLamps(): Lamp[] {
    return mockLamps;
  },

  // Get lamps by area
  getLampsByArea(areaId: string): Lamp[] {
    return mockLamps.filter((l) => l.areaId === areaId);
  },

  // Get lamp by ID
  getLampById(lampId: string): Lamp | undefined {
    return mockLamps.find((l) => l.id === lampId);
  },

  // Calculate area statistics
  getAreaStats(areaId: string): AreaStats | undefined {
    const area = this.getAreaById(areaId);
    if (!area) return undefined;

    const lamps = this.getLampsByArea(areaId);
    const activeLamps = lamps.filter((l) => l.status === "ON").length;
    const inactiveLamps = lamps.filter((l) => l.status === "OFF").length;
    const totalKWh = lamps.reduce((sum, l) => sum + l.monthlyKWh, 0);
    const avgCurrentA =
      lamps.reduce((sum, l) => sum + l.currentA, 0) / (lamps.length || 1);
    const totalPowerW = lamps.reduce((sum, l) => sum + l.powerW, 0);

    return {
      areaId: area.id,
      areaName: area.name,
      totalLamps: lamps.length,
      activeLamps,
      inactiveLamps,
      totalKWh: parseFloat(totalKWh.toFixed(2)),
      avgCurrentA: parseFloat(avgCurrentA.toFixed(2)),
      totalPowerW: parseFloat(totalPowerW.toFixed(1)),
    };
  },

  // Get all area stats
  getAllAreaStats(): AreaStats[] {
    return mockAreas.map((area) => this.getAreaStats(area.id)!).filter(Boolean);
  },

  // Get global stats (sum of all areas)
  getGlobalStats() {
    const allStats = this.getAllAreaStats();
    return {
      totalLamps: allStats.reduce((sum, s) => sum + s.totalLamps, 0),
      activeLamps: allStats.reduce((sum, s) => sum + s.activeLamps, 0),
      inactiveLamps: allStats.reduce((sum, s) => sum + s.inactiveLamps, 0),
      totalKWh: parseFloat(
        allStats.reduce((sum, s) => sum + s.totalKWh, 0).toFixed(2)
      ),
      avgCurrentA: parseFloat(
        (
          allStats.reduce((sum, s) => sum + s.avgCurrentA, 0) /
          (allStats.length || 1)
        ).toFixed(2)
      ),
      totalPowerW: parseFloat(
        allStats.reduce((sum, s) => sum + s.totalPowerW, 0).toFixed(1)
      ),
    };
  },

  // Get hourly data for a lamp
  getLampHourlyData(lampId: string): TimeseriesPoint[] {
    const lamp = this.getLampById(lampId);
    if (!lamp) return [];
    // Generate hourly power consumption
    const baseValue = lamp.powerW / 1000; // Convert W to kW
    return generateHourlyData(baseValue, baseValue * 0.3);
  },

  // Get hourly data for an area
  getAreaHourlyData(areaId: string): TimeseriesPoint[] {
    const lamps = this.getLampsByArea(areaId);
    return generateAreaHourlyKWh(lamps.length);
  },

  // Get daily log for a lamp (simplified)
  getLampDailyLog(lampId: string): Array<{ date: string; status: string; kWh: number }> {
    const lamp = this.getLampById(lampId);
    if (!lamp) return [];

    const log = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const kWh = (lamp.monthlyKWh / 30) * (0.8 + Math.random() * 0.4);
      log.push({
        date: dateStr,
        status: Math.random() > 0.05 ? "Normal" : "Gangguan",
        kWh: parseFloat(kWh.toFixed(2)),
      });
    }
    return log;
  },
};

