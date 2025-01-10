import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAvatar = (name: string) => {
  const names = name.split(" ");
  const firstInitial = names[0]?.substring(0, 1).toUpperCase();
  const secondInitial = names[1]?.substring(0, 1).toUpperCase() || "";
  return firstInitial + secondInitial;
};


