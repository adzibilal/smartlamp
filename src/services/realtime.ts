import type { RealtimeListener, RealtimeUpdate, LampStatus } from "../types";
import { mockLamps } from "../mock/lamps";

class RealtimeService {
  private listeners: Map<string, RealtimeListener[]> = new Map();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private updateInterval = 3000; // 3 seconds

  start() {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.emitUpdates();
    }, this.updateInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(lampId: string, listener: RealtimeListener) {
    if (!this.listeners.has(lampId)) {
      this.listeners.set(lampId, []);
    }
    this.listeners.get(lampId)!.push(listener);

    // Start service if first subscription
    if (this.listeners.size === 1 && !this.intervalId) {
      this.start();
    }
  }

  unsubscribe(lampId: string, listener: RealtimeListener) {
    const lampListeners = this.listeners.get(lampId);
    if (lampListeners) {
      const index = lampListeners.indexOf(listener);
      if (index > -1) {
        lampListeners.splice(index, 1);
      }
      if (lampListeners.length === 0) {
        this.listeners.delete(lampId);
      }
    }

    // Stop service if no more subscriptions
    if (this.listeners.size === 0) {
      this.stop();
    }
  }

  private emitUpdates() {
    this.listeners.forEach((listeners, lampId) => {
      const lamp = mockLamps.find((l) => l.id === lampId);
      if (!lamp) return;

      // Simulate small variations in current and power
      const currentDelta = (Math.random() - 0.5) * 0.2;
      const powerDelta = (Math.random() - 0.5) * 10;

      // Occasionally toggle status (5% chance)
      let newStatus: LampStatus = lamp.status;
      if (Math.random() < 0.05) {
        newStatus = lamp.status === "ON" ? "OFF" : "ON";
        lamp.status = newStatus;
      }

      const newCurrent =
        newStatus === "ON"
          ? Math.max(0.5, Math.min(3, lamp.currentA + currentDelta))
          : 0;
      const newPower =
        newStatus === "ON"
          ? Math.max(50, Math.min(150, lamp.powerW + powerDelta))
          : 0;

      // Update lamp data
      lamp.currentA = parseFloat(newCurrent.toFixed(2));
      lamp.powerW = parseFloat(newPower.toFixed(1));

      const update: RealtimeUpdate = {
        lampId,
        ts: Date.now(),
        currentA: lamp.currentA,
        powerW: lamp.powerW,
        status: newStatus,
      };

      // Notify all listeners
      listeners.forEach((listener) => listener(update));
    });
  }
}

export const realtimeService = new RealtimeService();

