export type LampStatus = "ON" | "OFF";

export interface Area {
  id: string;
  name: string;
  centroid: [number, number]; // [lat, lng]
  lampIds: string[];
}

export interface Lamp {
  id: string;
  areaId: string;
  name: string;
  location: [number, number]; // [lat, lng]
  status: LampStatus;
  currentA: number;
  powerW: number;
  monthlyKWh: number;
}

export interface Reading {
  lampId: string;
  ts: number;
  currentA: number;
  powerW: number;
  kWhIncrement: number;
}

export interface TimeseriesPoint {
  hour: number;
  value: number;
  label: string;
}

export interface AreaStats {
  areaId: string;
  areaName: string;
  totalLamps: number;
  activeLamps: number;
  inactiveLamps: number;
  totalKWh: number;
  avgCurrentA: number;
  totalPowerW: number;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface AuthState {
  email: string;
  token: string;
  exp: number;
}

export interface RealtimeUpdate {
  lampId: string;
  ts: number;
  currentA: number;
  powerW: number;
  status: LampStatus;
}

export type RealtimeListener = (update: RealtimeUpdate) => void;

