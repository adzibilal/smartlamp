import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 p-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6 transition-transform group-hover:rotate-12" />
      ) : (
        <Sun className="w-6 h-6 transition-transform group-hover:rotate-12" />
      )}
    </button>
  );
}

