import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function randomColor() {
  const colors = [
    '#E11D48',
    '#DB2777',
    '#9333EA',
    '#7C3AED',
    '#4F46E5',
    '#2563EB',
    '#0891B2',
    '#059669',
    '#16A34A',
    '#D97706',
    '#EA580C',
    '#DC2626',
    '#2D3B80',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

export function newRandomColorStop() {
  return { color: randomColor(), id: crypto.randomUUID() };
}
