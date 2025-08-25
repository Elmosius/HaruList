import { useNow, useDateFormat } from "@vueuse/core";
import type { ComputedRef } from "vue";

/**
 * Utils untuk format tanggal
 * default: "Sabtu, 23 Agustus 2025"
 */
export function useFormattedDate(
  format: string = "dddd, D MMMM YYYY",
  locale: string = "en-US",
): ComputedRef<string> {
  const now = useNow();
  return useDateFormat(now, format, { locales: locale });
}

/**
 * Utils untuk format jam
 * default: "15:34:05"
 */
export function useFormattedTime(
  format: string = "HH:mm:ss",
  locale: string = "en-US",
): ComputedRef<string> {
  const now = useNow();
  return useDateFormat(now, format, { locales: locale });
}

export function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 15) return "Good Afternoon";
  if (hour >= 15 && hour < 18) return "Good Evening";
  return "Good Night";
}

/**
 * Format time dari value input datetime/date
 * contoh: "2025-08-23T15:30" -> "15:30"
 */
export function formatTime(
  value: string | Date,
  format: string = "HH:mm",
  locale: string = "en-US",
): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  return useDateFormat(date, format, { locales: locale }).value;
}
