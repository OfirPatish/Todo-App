import { HiFire, HiClock, HiArrowDown } from "react-icons/hi";
import { TodoPriority } from "@/types/todo";

/**
 * Shared priority configuration used throughout the app
 * Ensures consistent icons, labels, and colors
 */
export const PRIORITY_CONFIG: Record<
  TodoPriority,
  {
    label: string;
    shortLabel: string;
    color: string;
    btnColor: string;
    iconColor: string;
    getIcon: (size?: string, colorClass?: string) => React.ReactElement;
  }
> = {
  high: {
    label: "High Priority",
    shortLabel: "High",
    color: "badge-error",
    btnColor: "btn-error",
    iconColor: "text-error",
    getIcon: (size = "h-4 w-4", colorClass = "text-error") => (
      <HiFire className={`${size} ${colorClass}`} />
    ),
  },
  medium: {
    label: "Medium Priority",
    shortLabel: "Medium",
    color: "badge-warning",
    btnColor: "btn-warning",
    iconColor: "text-warning",
    getIcon: (size = "h-4 w-4", colorClass = "text-warning") => (
      <HiClock className={`${size} ${colorClass}`} />
    ),
  },
  low: {
    label: "Low Priority",
    shortLabel: "Low",
    color: "badge-info",
    btnColor: "btn-info",
    iconColor: "text-info",
    getIcon: (size = "h-4 w-4", colorClass = "text-info") => (
      <HiArrowDown className={`${size} ${colorClass}`} />
    ),
  },
};

/**
 * Get priority configuration for a given priority level
 */
export function getPriorityConfig(priority: TodoPriority) {
  return PRIORITY_CONFIG[priority];
}

/**
 * Get all priority options as an array
 */
export function getPriorityOptions() {
  return (["high", "medium", "low"] as TodoPriority[]).map((priority) => ({
    value: priority,
    ...PRIORITY_CONFIG[priority],
  }));
}
