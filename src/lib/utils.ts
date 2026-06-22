import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function downloadResume() {
  // Placeholder — replace with actual resume URL
  window.open("/resume.pdf", "_blank");
}
