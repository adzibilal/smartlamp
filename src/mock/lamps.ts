import type { Lamp, LampStatus } from "../types";
import { mockAreas } from "./areas";

// Generate random lamps for each area
function generateLampsForArea(
  areaId: string,
  areaName: string,
  centroid: [number, number],
  count: number
): Lamp[] {
  const lamps: Lamp[] = [];
  const [baseLat, baseLng] = centroid;

  for (let i = 0; i < count; i++) {
    // Spread lamps around the centroid (±0.01 degrees ~ 1km)
    const lat = baseLat + (Math.random() - 0.5) * 0.02;
    const lng = baseLng + (Math.random() - 0.5) * 0.02;

    const status: LampStatus = Math.random() > 0.1 ? "ON" : "OFF";
    const currentA = status === "ON" ? 0.5 + Math.random() * 2.5 : 0; // 0.5-3A when ON
    const powerW = status === "ON" ? 50 + Math.random() * 100 : 0; // 50-150W when ON
    const monthlyKWh = 20 + Math.random() * 40; // 20-60 kWh per month

    lamps.push({
      id: `lamp-${areaId}-${i + 1}`,
      areaId,
      name: `PJU ${areaName} ${i + 1}`,
      location: [lat, lng],
      status,
      currentA: parseFloat(currentA.toFixed(2)),
      powerW: parseFloat(powerW.toFixed(1)),
      monthlyKWh: parseFloat(monthlyKWh.toFixed(2)),
    });
  }

  return lamps;
}

// Generate lamps for all areas
const allLamps: Lamp[] = [];
const lampCounts = [25, 30, 20, 35, 28]; // Different counts per area

mockAreas.forEach((area, index) => {
  const lamps = generateLampsForArea(
    area.id,
    area.name.replace("Kawasan ", ""),
    area.centroid,
    lampCounts[index]
  );
  allLamps.push(...lamps);
  area.lampIds = lamps.map((l) => l.id);
});

export const mockLamps = allLamps;

