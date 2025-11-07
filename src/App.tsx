import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { RequireAuth } from "./auth/RequireAuth";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AreaDetailPage } from "./pages/AreaDetailPage";
import { LampDetailPage } from "./pages/LampDetailPage";
import { UsersPage } from "./pages/UsersPage";
import { KawasanPage } from "./pages/KawasanPage";
import { PjuPage } from "./pages/PjuPage";
import { SettingsPage } from "./pages/SettingsPage";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";

function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/kawasan" element={<KawasanPage />} />
          <Route path="/pju" element={<PjuPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/areas/:areaId" element={<AreaDetailPage />} />
          <Route path="/lamps/:lampId" element={<LampDetailPage />} />
        </Routes>
      </main>
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/*" element={<AppLayout />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
