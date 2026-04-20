import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -----------------------------
   SAFE NUMBER FORMATTERS
----------------------------- */

export const formatDuration = (min?: number) => {
  if (typeof min !== "number" || isNaN(min)) return "0m";

  const h = Math.floor(min / 60);
  const m = min % 60;

  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

/* -----------------------------
   SAFE DATE PARSER (CORE FIX)
----------------------------- */

export const parseSafeDate = (value: any): Date | null => {
  if (!value) return null;

  // Mongo extended format
  if (typeof value === "object" && value.$date) {
    value = value.$date;
  }

  // numeric string timestamp → convert
  if (typeof value === "string" && /^\d+$/.test(value)) {
    value = Number(value);
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) return null;

  return date;
};

/* -----------------------------
   FORMAT SHOW TIME
----------------------------- */

export const formatShowTime = (value: any) => {
  const date = parseSafeDate(value);

  if (!date) return "Invalid date";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* -----------------------------
   FORMAT MOVIE RELEASE DATE
----------------------------- */

export const formatReleaseDate = (value: any) => {
  const date = parseSafeDate(value);

  if (!date) return "No date";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* -----------------------------
   DATE VALIDATION
----------------------------- */

export const isValidDate = (d: any): d is Date => {
  return d instanceof Date && !isNaN(d.getTime());
};
