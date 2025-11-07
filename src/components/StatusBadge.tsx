import type { LampStatus } from "../types";

interface StatusBadgeProps {
  status: LampStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isOn = status === "ON";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isOn
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          isOn ? "bg-green-500" : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}

