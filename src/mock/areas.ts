import type { Area } from "../types";

// Bandung city coordinates: approximately -6.9175, 107.6191
// Creating 5 kawasan (areas) around Bandung
export const mockAreas: Area[] = [
  {
    id: "area-1",
    name: "Kawasan Dago",
    centroid: [-6.8700, 107.6150],
    lampIds: [], // Will be populated by lamps
  },
  {
    id: "area-2",
    name: "Kawasan Cihampelas",
    centroid: [-6.8950, 107.6050],
    lampIds: [],
  },
  {
    id: "area-3",
    name: "Kawasan Pasteur",
    centroid: [-6.8980, 107.5850],
    lampIds: [],
  },
  {
    id: "area-4",
    name: "Kawasan Buah Batu",
    centroid: [-6.9450, 107.6350],
    lampIds: [],
  },
  {
    id: "area-5",
    name: "Kawasan Cicaheum",
    centroid: [-6.9150, 107.6450],
    lampIds: [],
  },
];

