import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

type Rgb = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export function hexToRgb(hex: string): Rgb {
  hex = hex.replace("#", "");

  let int = parseInt(hex, 16);
  let r = (int >> 16) & 255;
  let g = (int >> 8) & 255;
  let b = int & 255;

  return {
    r,
    g,
    b,
  };
}

export function isBgColorDark(rgb: Rgb) {
  const { r, g, b } = rgb;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 128;
}
