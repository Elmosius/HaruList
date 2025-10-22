import { useNow, useDateFormat } from "@vueuse/core";
import type { ComputedRef } from "vue";

/**
 * Utils untuk format tanggal
 * default: "Sabtu, 23 Agustus 2025"
 */
export function useFormattedDateNow(
  format: string = "dddd, D MMMM YYYY",
  locale: string = "en-US",
): ComputedRef<string> {
  const now = useNow();
  return useDateFormat(now, format, { locales: locale });
}

export function useFormattedMonthNow(
  format: string = "M",
  locale: string = "en-US",
): ComputedRef<string> {
  const now = useNow();
  return useDateFormat(now, format, { locales: locale });
}

export function useFormattedYearNow(
  format: string = "YYYY",
  locale: string = "en-US",
): ComputedRef<string> {
  const now = useNow();
  return useDateFormat(now, format, { locales: locale });
}

export function formatDate(
  x: Date | string,
  format: string = "dddd, D MMMM YYYY",
  locale: string = "en-US",
): ComputedRef<string> {
  return useDateFormat(x, format, { locales: locale });
}

export function formatDate2(
  x: Date | string,
  format: string = "D/MM/YY, HH:mm",
  locale: string = "en-US",
): ComputedRef<string> {
  return useDateFormat(x, format, { locales: locale });
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

function toDate(v?: string | Date | null): Date | null {
  if (!v) return null;
  return v instanceof Date ? v : new Date(v);
}

export function isNowInRange(
  start?: string | Date | null,
  end?: string | Date | null,
  date?: string | Date | null,
  now: Date = new Date(),
): boolean {
  const s = toDate(start);
  const e = toDate(end);
  const x = toDate(date);
  if (!s || !e) return false;

  if (x) return x.getDate() >= s.getDate() && x.getDate() <= e.getDate();

  return s.getTime() <= now.getTime() && now.getTime() <= e.getTime();
}
