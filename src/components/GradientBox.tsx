import { useAppState, useDispatch } from '@/lib/context';
import { useGradient } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { SadFace } from './SadFace';
import { useRef } from 'react';

const REM = 16;

export function GradientBox() {
  const dispatch = useDispatch();
  const state = useAppState();
  const colorStops = state.colorStops.map((colorStop) => colorStop.color);
  const preview = state.preview;
  const bgGradient = useGradient();

  const showGradient = colorStops.length >= 2;
  const showNone = colorStops.length === 0;
  const bgSolid = colorStops[0] ?? 'transparent';

  const gradientBoxRef = useRef<HTMLDivElement>(null);

  function fullscreenScaleX() {
    if (!gradientBoxRef.current) return 1;
    const { width } = gradientBoxRef.current.getBoundingClientRect();
    const scale = (window.innerWidth - REM) / width;
    return scale;
  }

  function fullscreenScaleY() {
    if (!gradientBoxRef.current) return 1;
    const { height } = gradientBoxRef.current.getBoundingClientRect();
    const scale = (window.innerHeight - REM) / height;
    return scale;
  }

  function fullscreenOffset() {
    if (!gradientBoxRef.current) return 0;
    const { top } = gradientBoxRef.current.getBoundingClientRect();
    return -top * 2 + REM;
  }

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
          ref={gradientBoxRef}
          // transition={{
          //   type: 'spring',
          //   mass: 0.6,
          // }}
          animate={{
            scaleX: preview ? fullscreenScaleX() : 1,
            scaleY: preview ? fullscreenScaleY() : 1,
            translateY: preview ? fullscreenOffset() / 2 : 0,
            borderRadius: preview ? 0 : '0.5rem',
          }}
          style={{
            background: showGradient ? bgGradient : bgSolid,
            transformOrigin: 'top',
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
