import { Button } from '@/components/ui/button';
import { useAppState, useDispatch } from '@/lib/context';
import { newRandomColorStop } from '@/lib/utils';
import { Reorder } from 'framer-motion';
import { Plus, Moon, Sun } from 'lucide-react';
import { ColorInput } from './ColorInputProps';
import { useState } from 'react';

export function ColorRow() {
  const state = useAppState();
  const colorStops = state.colorStops;
  const dispatch = useDispatch();

  const canAdd = colorStops.length <= 5;

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  return (
    <Reorder.Group
      className='flex items-center gap-2 sm:gap-3 pl-[0.125rem]'
      axis='x'
      values={colorStops}
      onReorder={(colorStops) =>
        dispatch({ type: 'SET_COLOR_STOPS', payload: colorStops })
      }
    >
      {colorStops.map((colorStop) => (
        <Reorder.Item key={colorStop.id} value={colorStop}>
          <ColorInput
            color={colorStop.color}
            onDelete={() =>
              dispatch({
                type: 'DELETE_COLOR_STOP',
                payload: colorStop.id,
              })
            }
            onChange={(newColor) =>
              dispatch({
                type: 'UPDATE_COLOR_STOP',
                payload: {
                  id: colorStop.id,
                  color: newColor,
                },
              })
            }
          />
        </Reorder.Item>
      ))}
      {canAdd && (
        <Button
          onClick={() =>
            dispatch({
              type: 'ADD_COLOR_STOP',
              payload: newRandomColorStop(),
            })
          }
          className={`${
            canAdd ? '' : 'opacity-0'
          } size-8 p-0 shrink-0  transition-opacity dark:bg-zinc-950`}
          variant={'ghost'}
        >
          <Plus />
        </Button>
      )}
      <Button
        onClick={() => {
          document.documentElement.classList.remove('dark', 'light');
          document.documentElement.classList.add(darkMode ? 'light' : 'dark');
          setDarkMode(!darkMode);
        }}
        variant={'ghost'}
        className='ml-auto size-8 p-1'
      >
        <Sun
          className={`${
            darkMode ? 'opacity-0' : ''
          } transition-opacity absolute`}
        />
        <Moon
          className={`${
            darkMode ? '' : 'opacity-0'
          } transition-opacity absolute`}
        />
      </Button>
    </Reorder.Group>
  );
}
