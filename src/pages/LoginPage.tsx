import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { Lightbulb } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      navigate("/", { replace: true });
    } else {
      setError("Email atau password salah");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-xl">
              <Lightbulb className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-white mb-2">
            Smartlamp PJU Monitoring
          </h1>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8">Kota Bandung</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="admin@bandung.go.id"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
              Demo credentials:<br />
              admin@bandung.go.id / admin123
            </p>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}

