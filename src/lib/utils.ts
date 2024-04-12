import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function randomColor() {
  // html class includes dark
  const dark = document.documentElement.classList.contains('dark');

  // tailwind default colors 600
  const colorsDark = [
    '#dc2626',
    '#ea580c',
    '#d97706',
    '#ca8a04',
    '#65a30d',
    '#16a34a',
    '#059669',
    '#0d9488',
    '#0891b2',
    '#0284c7',
    '#2563eb',
    '#4f46e5',
    '#7c3aed',
    '#9333ea',
    '#c026d3',
    '#db2777',
    '#e11d48',
  ];

  // tailwind default colors 400
  const colorsLight = [
    '#f87171',
    '#fb923c',
    '#fbbf24',
    '#facc15',
    '#a3e635',
    '#4ade80',
    '#34d399',
    '#2dd4bf',
    '#22d3ee',
    '#38bdf8',
    '#60a5fa',
    '#818cf8',
    '#a78bfa',
    '#c084fc',
    '#e879f9',
    '#f472b6',
    '#fb7185',
  ];

  let colors = colorsLight;
  if (dark) colors = colorsDark;
  return colors[Math.floor(Math.random() * colors.length)];
}

export function newRandomColorStop() {
  return { color: randomColor(), id: crypto.randomUUID() };
}
