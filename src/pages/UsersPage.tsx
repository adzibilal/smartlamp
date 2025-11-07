import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { DataTable } from "../components/DataTable";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data users
  const users: User[] = [
    {
      id: "1",
      name: "Admin PJU Bandung",
      email: "admin@bandung.go.id",
      role: "Administrator",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Operator PJU",
      email: "operator@bandung.go.id",
      role: "Operator",
      status: "active",
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Teknisi Lapangan",
      email: "teknisi@bandung.go.id",
      role: "Teknisi",
      status: "active",
      createdAt: "2024-03-10",
    },
    {
      id: "4",
      name: "Supervisor",
      email: "supervisor@bandung.go.id",
      role: "Supervisor",
      status: "inactive",
      createdAt: "2024-01-05",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "name",
      header: "Nama",
      render: (item: User) => (
        <div>
          <div className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">{item.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (item: User) => (
        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {item.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: User) => (
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
            item.status === "active"
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              : "bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300"
          }`}
        >
          {item.status === "active" ? "Aktif" : "Tidak Aktif"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Tanggal Dibuat",
      render: (item: User) =>
        new Date(item.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      key: "actions",
      header: "Aksi",
      render: () => (
        <div className="flex items-center space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
            <Pencil className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Data User</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Kelola pengguna sistem monitoring PJU
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg transition font-medium">
          <Plus className="w-5 h-5" />
          <span>Tambah User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total User</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
            {users.length}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">User Aktif</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {users.filter((u) => u.status === "active").length}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Administrator</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {users.filter((u) => u.role === "Administrator").length}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Operator</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {users.filter((u) => u.role === "Operator").length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-4 transition-colors">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Cari user berdasarkan nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredUsers} />
    </div>
  );
}

