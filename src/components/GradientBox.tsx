import { useAppState, useDispatch } from '@/lib/context';
import { useGradient } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { SadFace } from './SadFace';

export function GradientBox() {
  const dispatch = useDispatch();
  const state = useAppState();
  const colorStops = state.colorStops.map((colorStop) => colorStop.color);
  const preview = state.preview;
  const bgGradient = useGradient();

  const showGradient = colorStops.length >= 2;
  const showNone = colorStops.length === 0;
  const bgSolid = colorStops[0] ?? 'transparent';

  return (
    <button
      disabled={showNone}
      aria-label='toggle preview'
      onClick={() => dispatch({ type: 'SET_PREVIEW', payload: !preview })}
    >
      <div
        className={`flex w-full ${
          showNone ? 'rounded-md ring-1 ring-zinc-800' : ''
        }`}
      >
        <motion.div
          transition={{ mass: 0.4, type: 'spring' }}
          animate={{ scale: preview ? 5 : 1 }}
          style={{
            background: showGradient ? bgGradient : bgSolid,
          }}
          className={
            'rounded-md w-full aspect-square grid place-content-center'
          }
        >
          {showNone && <SadFace color='#4c4c53' />}
        </motion.div>
      </div>
    </button>
  );
}
