interface RealtimeIndicatorProps {
  active: boolean;
}

export function RealtimeIndicator({ active }: RealtimeIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div
          className={`w-2 h-2 rounded-full ${
            active ? "bg-green-500" : "bg-zinc-300"
          }`}
        />
        {active && (
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
        )}
      </div>
      <span className="text-xs text-zinc-600">
        {active ? "Realtime Active" : "Offline"}
      </span>
    </div>
  );
}

