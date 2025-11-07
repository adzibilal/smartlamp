import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Search, Eye, Filter } from "lucide-react";
import { dataService } from "../services/dataService";
import { DataTable } from "../components/DataTable";
import { StatusBadge } from "../components/StatusBadge";
import type { Lamp } from "../types";

export function PjuPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "ON" | "OFF">("all");
  const [filterArea, setFilterArea] = useState<string>("all");

  const allLamps = dataService.getLamps();
  const areas = dataService.getAreas();

  const filteredLamps = allLamps.filter((lamp) => {
    const matchSearch =
      lamp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lamp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || lamp.status === filterStatus;
    const matchArea = filterArea === "all" || lamp.areaId === filterArea;
    return matchSearch && matchStatus && matchArea;
  });

  const columns = [
    {
      key: "name",
      header: "Nama PJU",
      render: (item: Lamp) => (
        <div>
          <div className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{item.id}</div>
        </div>
      ),
    },
    {
      key: "area",
      header: "Kawasan",
      render: (item: Lamp) => {
        const area = dataService.getAreaById(item.areaId);
        return (
          <span className="text-sm text-zinc-700 dark:text-zinc-300">
            {area?.name || "Unknown"}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (item: Lamp) => <StatusBadge status={item.status} />,
    },
    {
      key: "currentA",
      header: "Arus",
      render: (item: Lamp) => (
        <span className="font-mono text-sm">{item.currentA.toFixed(2)} A</span>
      ),
    },
    {
      key: "powerW",
      header: "Daya",
      render: (item: Lamp) => (
        <span className="font-mono text-sm">{item.powerW.toFixed(1)} W</span>
      ),
    },
    {
      key: "monthlyKWh",
      header: "Konsumsi Bulanan",
      render: (item: Lamp) => (
        <span className="font-mono text-sm">
          {item.monthlyKWh.toFixed(2)} kWh
        </span>
      ),
    },
    {
      key: "location",
      header: "Koordinat",
      render: (item: Lamp) => (
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          {item.location[0].toFixed(4)}, {item.location[1].toFixed(4)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item: Lamp) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/lamps/${item.id}`)}
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

  const totalLamps = allLamps.length;
  const activeLamps = allLamps.filter((l) => l.status === "ON").length;
  const inactiveLamps = allLamps.filter((l) => l.status === "OFF").length;
  const totalKWh = allLamps.reduce((sum, l) => sum + l.monthlyKWh, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Data PJU</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Kelola data Penerangan Jalan Umum (PJU)
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg transition font-medium">
          <Plus className="w-5 h-5" />
          <span>Tambah PJU</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total PJU</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
            {totalLamps}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">PJU Aktif</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {activeLamps}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">PJU Padam</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
            {inactiveLamps}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Konsumsi</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {totalKWh.toFixed(0)} kWh
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-4 space-y-4 transition-colors">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Cari PJU berdasarkan nama atau ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Filter:</span>
          </div>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "all" | "ON" | "OFF")
            }
            className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="ON">Aktif</option>
            <option value="OFF">Padam</option>
          </select>

          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="px-3 py-1.5 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="all">Semua Kawasan</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>

          {(filterStatus !== "all" || filterArea !== "all") && (
            <button
              onClick={() => {
                setFilterStatus("all");
                setFilterArea("all");
              }}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Menampilkan {filteredLamps.length} dari {totalLamps} PJU
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredLamps}
        onRowClick={(item) => navigate(`/lamps/${item.id}`)}
      />
    </div>
  );
}

