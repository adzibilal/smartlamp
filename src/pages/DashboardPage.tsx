import { useNavigate } from "react-router-dom";
import { Zap, Activity, Lightbulb, Power } from "lucide-react";
import { dataService } from "../services/dataService";
import { BandungStaticMap } from "../components/BandungStaticMap";
import { KpiGrid } from "../components/KpiGrid";
import { StatsCard } from "../components/StatsCard";
import { DataTable } from "../components/DataTable";
import { TimeSeriesChart } from "../components/TimeSeriesChart";
import type { AreaStats } from "../types";

export function DashboardPage() {
  const navigate = useNavigate();
  const areas = dataService.getAreas();
  const globalStats = dataService.getGlobalStats();
  const areaStats = dataService.getAllAreaStats();

  // Aggregate chart data by area
  const chartData = areaStats.map((stat) => ({
    label: stat.areaName.replace("Kawasan ", ""),
    value: stat.totalKWh,
    hour: 0,
  }));

  const columns = [
    {
      key: "areaName",
      header: "Kawasan",
      render: (item: AreaStats) => (
        <span className="font-medium">{item.areaName}</span>
      ),
    },
    {
      key: "totalLamps",
      header: "Total PJU",
      render: (item: AreaStats) => item.totalLamps,
    },
    {
      key: "activeLamps",
      header: "Aktif",
      render: (item: AreaStats) => (
        <span className="text-green-600 font-medium">{item.activeLamps}</span>
      ),
    },
    {
      key: "inactiveLamps",
      header: "Padam",
      render: (item: AreaStats) => (
        <span className="text-red-600 font-medium">{item.inactiveLamps}</span>
      ),
    },
    {
      key: "totalKWh",
      header: "Total kWh (Bulan Ini)",
      render: (item: AreaStats) => `${item.totalKWh.toFixed(2)} kWh`,
    },
    {
      key: "avgCurrentA",
      header: "Arus Rata-rata",
      render: (item: AreaStats) => `${item.avgCurrentA.toFixed(2)} A`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Overview monitoring PJU seluruh kawasan Kota Bandung
        </p>
      </div>

      {/* KPIs */}
      <KpiGrid>
        <StatsCard
          title="Total PJU"
          value={globalStats.totalLamps}
          unit="unit"
          icon={<Lightbulb className="w-6 h-6 text-emerald-600" />}
        />
        <StatsCard
          title="Total Konsumsi"
          value={globalStats.totalKWh.toFixed(2)}
          unit="kWh"
          icon={<Zap className="w-6 h-6 text-emerald-600" />}
        />
        <StatsCard
          title="Arus Rata-rata"
          value={globalStats.avgCurrentA.toFixed(2)}
          unit="A"
          icon={<Activity className="w-6 h-6 text-emerald-600" />}
        />
        <StatsCard
          title="Status"
          value={`${globalStats.activeLamps}/${globalStats.totalLamps}`}
          unit="aktif"
          icon={<Power className="w-6 h-6 text-emerald-600" />}
        />
      </KpiGrid>

      {/* Static Map */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Peta Kawasan
        </h2>
        <BandungStaticMap areas={areas} />
      </div>

      {/* Area Stats Table */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
          Statistik Per Kawasan
        </h2>
        <DataTable
          columns={columns}
          data={areaStats}
          onRowClick={(item) => navigate(`/areas/${item.areaId}`)}
        />
      </div>

      {/* Chart */}
      <div>
        <TimeSeriesChart
          data={chartData}
          title="Konsumsi Energi Per Kawasan (Bulan Ini)"
          type="bar"
          yAxisLabel="kWh"
        />
      </div>
    </div>
  );
}

