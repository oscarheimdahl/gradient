import { Button } from '@/components/ui/button';
import { useAppState, useDispatch } from '@/lib/context';
import { newRandomColorStop } from '@/lib/utils';
import { Reorder } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ColorInput } from './ColorInputProps';

export function ColorRow() {
  const state = useAppState();
  const colorStops = state.colorStops;
  const dispatch = useDispatch();

  const canAdd = colorStops.length <= 6;

  return (
    <Reorder.Group
      className='flex gap-3 pl-[0.125rem]'
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
          } size-8 p-0 shrink-0 bg-zinc-950 transition-opacity`}
          variant={'ghost'}
        >
          <Plus />
        </Button>
      )}
    </Reorder.Group>
  );
}
