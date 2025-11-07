import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Lightbulb, Zap, Activity, Calendar } from "lucide-react";
import { dataService } from "../services/dataService";
import { realtimeService } from "../services/realtime";
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
          <p className="text-zinc-600 dark:text-zinc-400">Lampu tidak ditemukan</p>
          <Link
            to="/"
            className="text-emerald-600 dark:text-emerald-400 hover:underline mt-2 inline-block"
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
          className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Kembali ke {area?.name}</span>
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {lampData.name}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              Monitoring detail PJU di {area?.name}
            </p>
          </div>
          <RealtimeIndicator active={realtimeActive} />
        </div>
      </div>

      {/* Status and KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Card - Full width on mobile, 1 column on desktop */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">
            Status Lampu
          </h3>
          <div className="space-y-4">
            <StatusBadge status={lampData.status} />
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Lokasi</div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100 font-mono">
                {lampData.location[0].toFixed(6)}, {lampData.location[1].toFixed(6)}
              </div>
            </div>
          </div>
        </div>

        {/* Arus Card */}
        <StatsCard
          title="Arus"
          value={lampData.currentA.toFixed(2)}
          unit="A"
          icon={<Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />

        {/* Daya Card */}
        <StatsCard
          title="Daya"
          value={lampData.powerW.toFixed(1)}
          unit="W"
          icon={<Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Konsumsi Bulanan"
          value={lampData.monthlyKWh.toFixed(2)}
          unit="kWh"
          icon={<Lightbulb className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />
        <StatsCard
          title="Estimasi Biaya"
          value={(lampData.monthlyKWh * 1.5).toFixed(0)}
          unit="IDR (x1000)"
          icon={<Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />
      </div>

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
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Log Harian (7 Hari Terakhir)
        </h2>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Konsumsi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {dailyLog.map((log, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-700 transition">
                    <td className="px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100">
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
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-900 dark:text-zinc-100">
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

