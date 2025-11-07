import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, Zap, Activity, Power } from "lucide-react";
import { dataService } from "../services/dataService";
import { KpiGrid } from "../components/KpiGrid";
import { StatsCard } from "../components/StatsCard";
import { MapView } from "../components/MapView";
import { DataTable } from "../components/DataTable";
import { TimeSeriesChart } from "../components/TimeSeriesChart";
import { StatusBadge } from "../components/StatusBadge";
import type { Lamp } from "../types";

export function AreaDetailPage() {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();

  if (!areaId) {
    return <div>Area not found</div>;
  }

  const area = dataService.getAreaById(areaId);
  const areaStats = dataService.getAreaStats(areaId);
  const lamps = dataService.getLampsByArea(areaId);
  const hourlyData = dataService.getAreaHourlyData(areaId);

  if (!area || !areaStats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-zinc-600 dark:text-zinc-400">Kawasan tidak ditemukan</p>
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

  const columns = [
    {
      key: "name",
      header: "Nama PJU",
      render: (item: Lamp) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Lamp) => <StatusBadge status={item.status} />,
    },
    {
      key: "currentA",
      header: "Arus",
      render: (item: Lamp) => `${item.currentA.toFixed(2)} A`,
    },
    {
      key: "powerW",
      header: "Daya",
      render: (item: Lamp) => `${item.powerW.toFixed(1)} W`,
    },
    {
      key: "monthlyKWh",
      header: "Konsumsi Bulanan",
      render: (item: Lamp) => `${item.monthlyKWh.toFixed(2)} kWh`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-4 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Kembali ke Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{area.name}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Detail monitoring PJU di {area.name}
        </p>
      </div>

      {/* KPIs */}
      <KpiGrid>
        <StatsCard
          title="Jumlah Lampu"
          value={areaStats.totalLamps}
          unit="unit"
          icon={<Lightbulb className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />
        <StatsCard
          title="Total Daya"
          value={areaStats.totalKWh.toFixed(2)}
          unit="kWh"
          icon={<Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />
        <StatsCard
          title="Arus Rata-rata"
          value={areaStats.avgCurrentA.toFixed(2)}
          unit="A"
          icon={<Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />
        <StatsCard
          title="Status"
          value={`${areaStats.activeLamps}/${areaStats.totalLamps}`}
          unit="aktif"
          icon={<Power className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
        />
      </KpiGrid>

      {/* Map */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Peta Lokasi PJU
        </h2>
        <MapView
          lamps={lamps}
          renderPopup={(lamp) => (
            <div className="space-y-2 p-2">
              <div className="text-sm font-medium">{lamp.name}</div>
              <StatusBadge status={lamp.status} />
              <div className="text-xs text-zinc-600">
                {lamp.currentA.toFixed(2)} A • {lamp.powerW.toFixed(1)} W •{" "}
                {lamp.monthlyKWh.toFixed(1)} kWh
              </div>
              <Link
                to={`/lamps/${lamp.id}`}
                className="inline-flex items-center text-emerald-600 hover:underline text-xs font-medium"
              >
                Lihat Detail →
              </Link>
            </div>
          )}
        />
      </div>

      {/* Lamp Table */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Data Lampu PJU
        </h2>
        <DataTable
          columns={columns}
          data={lamps}
          onRowClick={(lamp) => navigate(`/lamps/${lamp.id}`)}
        />
      </div>

      {/* Chart */}
      <div>
        <TimeSeriesChart
          data={hourlyData}
          title="Konsumsi Energi Per Jam (Hari Ini)"
          type="line"
          yAxisLabel="kWh"
        />
      </div>
    </div>
  );
}

