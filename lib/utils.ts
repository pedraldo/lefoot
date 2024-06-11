import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberToPercent(number: number): string {
  const percent = +parseFloat(`${number * 100}`).toFixed(1);
  return percent + `%`;
}
