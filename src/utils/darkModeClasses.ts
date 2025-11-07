// Common dark mode class patterns for consistency

export const darkModeClasses = {
  // Page container
  pageContainer: "p-8 space-y-6",
  
  // Headers
  pageTitle: "text-3xl font-bold text-zinc-900 dark:text-white",
  pageSubtitle: "text-zinc-600 dark:text-zinc-400 mt-1",
  sectionTitle: "text-xl font-semibold text-zinc-900 dark:text-white mb-4",
  
  // Cards
  card: "bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm transition-colors",
  cardPadding: "p-6",
  
  // Stats cards
  statsCard: "bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm p-6 transition-colors",
  statsLabel: "text-sm text-zinc-600 dark:text-zinc-400",
  statsValue: "text-2xl font-bold",
  
  // Buttons
  primaryButton: "flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg transition font-medium",
  secondaryButton: "px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded-lg transition",
  
  // Inputs
  input: "w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition",
  searchInput: "w-full pl-10 pr-4 py-2 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition",
  select: "px-3 py-1.5 border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none",
  
  // Text
  text: "text-zinc-900 dark:text-zinc-100",
  textMuted: "text-zinc-600 dark:text-zinc-400",
  textLabel: "text-sm font-medium text-zinc-900 dark:text-zinc-300",
  
  // Icon containers
  iconContainer: "bg-emerald-100 dark:bg-emerald-900 p-3 rounded-lg",
  icon: "text-emerald-600 dark:text-emerald-400",
};

