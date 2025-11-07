import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Lightbulb, 
  Settings, 
  LogOut,
  Lamp
} from "lucide-react";

export function Sidebar() {
  const { logout, auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      section: "Menu Utama",
      items: [
        { path: "/", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/users", icon: Users, label: "Data User" },
        { path: "/kawasan", icon: MapPin, label: "Data Kawasan" },
        { path: "/pju", icon: Lamp, label: "Data PJU" },
      ],
    },
    {
      section: "Lainnya",
      items: [
        { path: "/settings", icon: Settings, label: "Pengaturan" },
      ],
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 flex flex-col transition-colors">
      {/* Logo/Header */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-2.5 rounded-xl">
            <Lightbulb className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="font-bold text-zinc-900 dark:text-white text-lg">Smartlamp PJU</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Kota Bandung</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3 px-3">
              {section.section}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                      active
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
        <div className="bg-zinc-50 dark:bg-zinc-700 rounded-lg p-3 mb-2">
          <div className="text-sm font-medium text-zinc-900 dark:text-white truncate">
            {auth?.email}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Administrator</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

