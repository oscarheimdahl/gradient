import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAppState, useDispatch } from '@/lib/context';
import { GradientType } from '@/lib/store';
export function RotationSlider() {
  const dispatch = useDispatch();
  const state = useAppState();
  const rotation = state.rotation;
  const gradientType = state.gradientType;
  const preview = state.preview;

  let opacity = 'opacity-100';
  if (gradientType === GradientType.Radial) {
    opacity = 'opacity-40';
  }
  if (preview) {
    opacity = 'opacity-0';
  }
  return (
    <div
      className={`flex flex-col w-full gap-2 sm:gap-4 transition-opacity ${opacity}`}
    >
      <div className='flex justify-between items-center'>
        <Label htmlFor='rotation-slider'>Rotation</Label>
        <span className='text-sm'>{rotation}°</span>
      </div>
      <Slider
        disabled={gradientType === GradientType.Radial || preview}
        value={[rotation]}
        onValueChange={(newRotation) => {
          dispatch({
            type: 'SET_ROTATION',
            payload: newRotation[0],
          });
        }}
        min={0}
        max={360}
        id='rotation-slider'
      ></Slider>
    </div>
  );
}
