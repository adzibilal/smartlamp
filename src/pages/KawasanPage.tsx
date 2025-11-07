import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, MapPin, Eye } from "lucide-react";
import { dataService } from "../services/dataService";
import { DataTable } from "../components/DataTable";
import type { AreaStats } from "../types";

export function KawasanPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const areaStats = dataService.getAllAreaStats();

  const filteredAreas = areaStats.filter((area) =>
    area.areaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "areaName",
      header: "Nama Kawasan",
      render: (item: AreaStats) => (
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-2 rounded-lg">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.areaName}</span>
        </div>
      ),
    },
    {
      key: "totalLamps",
      header: "Total PJU",
      render: (item: AreaStats) => (
        <span className="font-medium">{item.totalLamps} unit</span>
      ),
    },
    {
      key: "activeLamps",
      header: "PJU Aktif",
      render: (item: AreaStats) => (
        <span className="text-green-600 dark:text-green-400 font-medium">{item.activeLamps}</span>
      ),
    },
    {
      key: "inactiveLamps",
      header: "PJU Padam",
      render: (item: AreaStats) => (
        <span className="text-red-600 dark:text-red-400 font-medium">{item.inactiveLamps}</span>
      ),
    },
    {
      key: "totalKWh",
      header: "Konsumsi (kWh)",
      render: (item: AreaStats) => `${item.totalKWh.toFixed(2)} kWh`,
    },
    {
      key: "avgCurrentA",
      header: "Arus Rata-rata",
      render: (item: AreaStats) => `${item.avgCurrentA.toFixed(2)} A`,
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item: AreaStats) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/areas/${item.areaId}`)}
            className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition"
            title="Lihat Detail"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
            <Pencil className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const totalPJU = areaStats.reduce((sum, area) => sum + area.totalLamps, 0);
  const totalActive = areaStats.reduce((sum, area) => sum + area.activeLamps, 0);
  const totalKWh = areaStats.reduce((sum, area) => sum + area.totalKWh, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Data Kawasan</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Kelola data kawasan PJU di Kota Bandung
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg transition font-medium">
          <Plus className="w-5 h-5" />
          <span>Tambah Kawasan</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Kawasan</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
            {areaStats.length}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total PJU</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {totalPJU}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">PJU Aktif</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {totalActive}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Konsumsi</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {totalKWh.toFixed(0)} kWh
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-4 transition-colors">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Cari kawasan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredAreas}
        onRowClick={(item) => navigate(`/areas/${item.areaId}`)}
      />
    </div>
  );
}

