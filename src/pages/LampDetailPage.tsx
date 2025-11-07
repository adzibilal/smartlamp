import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Lightbulb, Zap, Activity, Calendar } from "lucide-react";
import { dataService } from "../services/dataService";
import { realtimeService } from "../services/realtime";
import { KpiGrid } from "../components/KpiGrid";
import { StatsCard } from "../components/StatsCard";
import { TimeSeriesChart } from "../components/TimeSeriesChart";
import { StatusBadge } from "../components/StatusBadge";
import { RealtimeIndicator } from "../components/RealtimeIndicator";
import type { RealtimeUpdate } from "../types";

export function LampDetailPage() {
  const { lampId } = useParams<{ lampId: string }>();
  const navigate = useNavigate();
  const [realtimeActive, setRealtimeActive] = useState(false);
  const [lampData, setLampData] = useState(() =>
    lampId ? dataService.getLampById(lampId) : undefined
  );

  useEffect(() => {
    if (!lampId) return;

    setRealtimeActive(true);

    const handleUpdate = (update: RealtimeUpdate) => {
      setLampData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentA: update.currentA,
          powerW: update.powerW,
          status: update.status,
        };
      });
    };

    realtimeService.subscribe(lampId, handleUpdate);

    return () => {
      realtimeService.unsubscribe(lampId, handleUpdate);
      setRealtimeActive(false);
    };
  }, [lampId]);

  if (!lampId || !lampData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-zinc-600">Lampu tidak ditemukan</p>
          <Link
            to="/"
            className="text-emerald-600 hover:underline mt-2 inline-block"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const area = dataService.getAreaById(lampData.areaId);
  const hourlyData = dataService.getLampHourlyData(lampId);
  const dailyLog = dataService.getLampDailyLog(lampId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/areas/${lampData.areaId}`)}
          className="flex items-center space-x-2 text-zinc-600 hover:text-zinc-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Kembali ke {area?.name}</span>
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              {lampData.name}
            </h1>
            <p className="text-zinc-600 mt-1">
              Monitoring detail PJU di {area?.name}
            </p>
          </div>
          <RealtimeIndicator active={realtimeActive} />
        </div>
      </div>

      {/* Status and KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
          <h3 className="text-sm font-medium text-zinc-700 mb-4">
            Status Lampu
          </h3>
          <div className="flex items-center justify-between">
            <StatusBadge status={lampData.status} />
            <div className="text-right">
              <div className="text-xs text-zinc-500">Lokasi</div>
              <div className="text-sm text-zinc-900">
                {lampData.location[0].toFixed(6)}, {lampData.location[1].toFixed(6)}
              </div>
            </div>
          </div>
        </div>

        <KpiGrid>
          <StatsCard
            title="Arus"
            value={lampData.currentA.toFixed(2)}
            unit="A"
            icon={<Activity className="w-5 h-5 text-emerald-600" />}
          />
          <StatsCard
            title="Daya"
            value={lampData.powerW.toFixed(1)}
            unit="W"
            icon={<Zap className="w-5 h-5 text-emerald-600" />}
          />
        </KpiGrid>
      </div>

      <KpiGrid>
        <StatsCard
          title="Konsumsi Bulanan"
          value={lampData.monthlyKWh.toFixed(2)}
          unit="kWh"
          icon={<Lightbulb className="w-6 h-6 text-emerald-600" />}
        />
        <StatsCard
          title="Estimasi Biaya"
          value={(lampData.monthlyKWh * 1.5).toFixed(0)}
          unit="IDR (x1000)"
          icon={<Calendar className="w-6 h-6 text-emerald-600" />}
        />
      </KpiGrid>

      {/* Hourly Chart */}
      <div>
        <TimeSeriesChart
          data={hourlyData}
          title="Konsumsi Per Jam (Hari Ini)"
          type="line"
          yAxisLabel="kW"
        />
      </div>

      {/* Daily Log */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-4">
          Log Harian (7 Hari Terakhir)
        </h2>
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Konsumsi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {dailyLog.map((log, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 transition">
                    <td className="px-6 py-4 text-sm text-zinc-900">
                      {new Date(log.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                          log.status === "Normal"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-900">
                      {log.kWh.toFixed(2)} kWh
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

