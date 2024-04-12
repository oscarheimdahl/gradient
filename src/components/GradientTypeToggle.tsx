import { useAppState, useDispatch } from '@/lib/context';
import { GradientType } from '@/lib/store';
import { Circle, RectangleHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export function GradientTypeToggle() {
  const state = useAppState();
  const gradientType = state.gradientType;
  const dispatch = useDispatch();

  function handleValueChange(value: string) {
    dispatch({
      type: 'SET_GRADIENT_TYPE',
      payload: value as GradientType,
    });
  }

  return (
    <Tabs
      value={gradientType}
      onValueChange={handleValueChange}
      defaultValue='account'
    >
      <TabsList>
        <TabsTrigger className='flex gap-1' value={GradientType.Linear}>
          Linear <RectangleHorizontal />
        </TabsTrigger>
        <TabsTrigger className='flex gap-1' value={GradientType.Radial}>
          Radial <Circle size={15} strokeWidth={3.5} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
