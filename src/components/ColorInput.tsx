import { X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useAppState, useDispatch } from '@/lib/context';

interface ColorInputProps {
  onChange: (color: string, opacity: string) => void;
  onDelete: () => void;
  color: string;
  opacity: string;
}

export function ColorInput({
  onChange,
  onDelete,
  color,
  opacity,
}: ColorInputProps) {
  const userHasTriedOpacity = useAppState().userHasTriedOpacity;
  const dispatch = useDispatch();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='group relative grid place-content-center w-min h-min'>
          <input
            onWheel={(e) => {
              if (!userHasTriedOpacity)
                dispatch({ type: 'SET_USER_HAS_TRIED_OPACITY' });
              const direction = e.deltaY > 0 ? -1 : 1;
              const decOpacity = hexToDec(opacity);
              const newDecOpacity = clamp(
                0,
                Math.floor(decOpacity + direction * (decOpacity < 10 ? 1 : 10)),
                255
              );
              const newHexOpacity = decToHex(newDecOpacity);
              onChange(color, newHexOpacity);
            }}
            className='peer size-8 opacity-0'
            style={{ gridArea: '1 / 1' }}
            type='color'
            onChange={(e) => onChange(e.target.value, opacity)}
            value={color}
          />
          <div
            className={`
        peer-focus-visible:outline-offset-2
        outline outline-black-500 outline-1
        dark:outline-white dark:outline-2
        rounded-md
        `}
            style={{ gridArea: '1 / 1', backgroundColor: color + opacity }}
          ></div>
          <button
            onClick={onDelete}
            className='group-hover:scale-100 peer-focus:scale-100 focus:scale-100 transition-transform scale-0 absolute -top-2 -right-2 size-4 grid place-content-center bg-zinc-950 dark:bg-white rounded-full'
          >
            <X
              strokeWidth={3}
              size={12}
              className='text-white dark:text-black'
            />
          </button>
        </div>
      </TooltipTrigger>
      {!userHasTriedOpacity && (
        <TooltipContent className='mb-2'>
          <p>Scroll for opacity</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}

function decToHex(dec: number) {
  return dec.toString(16).padStart(2, '0').toUpperCase();
}

function hexToDec(hex: string) {
  return parseInt(hex, 16);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
