import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility functions for navigation system
 */

/**
 * Validates if the path is a valid screen path.
 * Ensures the path starts with '/' and doesn't contain malicious characters.
 */
export const isValidScreenPath = (path: unknown): path is string => {
  if (typeof path !== "string") return false;
  if (!path.startsWith("/")) return false;

  // Check for characters that are definitely illegal in standard paths
  // Using string search instead of regex to avoid IDE/Linter parsing issues
  const illegalCharacters = ["<", ">", ":", '"', "\\", "|"];
  for (const char of illegalCharacters) {
    if (path.includes(char)) {
      console.warn("[ResponsiveNavigation] Invalid character detected:", char);
      return false;
    }
  }

  // Check for control characters (0-31 and 127)
  for (let i = 0; i < path.length; i++) {
    const code = path.charCodeAt(i);
    if (code < 32 || code === 127) {
      console.warn(
        "[ResponsiveNavigation] Control character detected at index:",
        i,
      );
      return false;
    }
  }

  if (path.length > 2000) {
    console.warn("[ResponsiveNavigation] Path too long:", path.length);
    return false;
  }

  if (path.includes("..")) {
    console.warn(
      "[ResponsiveNavigation] Path traversal attempt detected (..):",
      path,
    );
    return false;
  }

  return true;
};

/**
 * Encodes a path safely for use as a search parameter.
 */
export const createScreenSearchParam = (path: string): string => {
  if (!isValidScreenPath(path)) {
    console.warn(
      "[ResponsiveNavigation] Attempted to encode invalid path:",
      path,
    );
    return encodeURIComponent("/");
  }

  try {
    return path;
  } catch (error) {
    console.error("[ResponsiveNavigation] Path processing error:", error);
    return "/";
  }
};

/**
 * Parses and validates a path from a search parameter.
 */
export const parseScreenSearchParam = (searchParam: string | null): string => {
  if (!searchParam) return "/";

  try {
    const decoded = decodeURIComponent(searchParam);
    return isValidScreenPath(decoded) ? decoded : "/";
  } catch (error) {
    console.error("[ResponsiveNavigation] Decoding error:", error);
    return "/";
  }
};
/**
 * Formats a number to Indonesian Rupiah currency format.
 */
export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
