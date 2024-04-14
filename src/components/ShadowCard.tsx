import { useAppState } from '@/lib/context';
import { Card } from '@/components/ui/card';
import { ColorRow } from '@/components/ColorRow';
import { GradientBox } from '@/components/GradientBox';
import { ButtonRow } from '@/components/ButtonRow';
import { GradientTypeToggle } from '@/components/GradientTypeToggle';
import { RotationSlider } from '@/components/RotationSlider';

export function ShadowCard() {
  const colorStops = useAppState().colorStops;

  const shadowLeftColor = colorStops[0]?.color ?? '#000000';
  const shadowLeft = `${shadowLeftColor}33 -20px 5px 100px`;
  const shadowRightColor = colorStops[1]?.color ?? '#000000';
  const shadowRight = `${shadowRightColor}33 20px 5px 100px`;

  return (
    <Card
      style={{
        transition: 'box-shadow 1s',
        boxShadow: `${shadowLeft}, ${shadowRight}`,
      }}
      className={`my-auto relative transition-colors flex flex-col w-full h-fit
        gap-4 p-4 pb-4 min-w-72 max-w-96
        sm:gap-8 sm:p-8 sm:pb-12 sm:max-w-[28rem]
        `}
    >
      <ColorRow />
      <GradientBox />
      <ButtonRow />
      <GradientTypeToggle />
      <RotationSlider />
    </Card>
  );
}
