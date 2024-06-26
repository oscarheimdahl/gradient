import { useAppState } from '@/lib/context';
import { GradientType } from '@/lib/store';

export function useGradient() {
  const state = useAppState();
  const rotation = state.rotation;
  const colorStops = state.colorStops.map(
    (colorStop) => colorStop.color + hexIfNotFF(colorStop.opacity)
  );
  const type = state.gradientType;
  const colors = colorStops.join(', ');
  const linearGradient = `linear-gradient(${rotation}deg, ${colors})`;
  const radialGradient = `radial-gradient(${colors})`;
  const bgGradient =
    type === GradientType.Linear ? linearGradient : radialGradient;

  return bgGradient;
}

function hexIfNotFF(hex: string) {
  if (hex === 'FF') return '';
  return hex;
}
