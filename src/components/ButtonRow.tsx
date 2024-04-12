import { Button } from '@/components/ui/button';
import { useAppState, useDispatch } from '@/lib/context';
import { useGradient } from '@/lib/hooks';
import { Dice5, FlipHorizontal, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

export function ButtonRow() {
  const dispatch = useDispatch();
  return (
    <div className='flex gap-4'>
      <Button
        aria-label='reverse colors'
        onClick={() => {
          dispatch({
            type: 'REVERSE_COLOR_STOPS',
          });
        }}
        variant='outline'
        className=''
      >
        <FlipHorizontal />
      </Button>
      <Button
        aria-label='randomize'
        onClick={() => dispatch({ type: 'RANDOMIZE_COLOR_STOPS' })}
        variant='outline'
        className=''
      >
        <Dice5 />
      </Button>
      <ClipboardButton />
    </div>
  );
}

function ClipboardButton() {
  const gradient = useGradient();
  const disabled = useAppState().colorStops.length === 0;

  const [showCopied, setShowCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(gradient);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }

  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      aria-label='copy to clipboard'
      variant='outline'
      className='ml-auto w-[58px]'
    >
      {showCopied ? <ClipboardCheck /> : 'CSS'}
    </Button>
  );
}
