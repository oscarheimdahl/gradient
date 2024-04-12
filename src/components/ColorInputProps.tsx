import { X } from 'lucide-react';

interface ColorInputProps {
  onChange: (color: string) => void;
  onDelete: () => void;
  color: string;
}

export function ColorInput({ onChange, onDelete, color }: ColorInputProps) {
  return (
    <div className='group relative grid place-content-center w-min h-min'>
      <input
        className='peer size-8 opacity-0'
        style={{ gridArea: '1 / 1' }}
        type='color'
        onChange={(e) => onChange(e.target.value)}
        value={color}
      />
      <div
        className={
          'peer-focus-visible:outline-offset-2  outline outline-2 outline-gray-200 size-8  pointer-events-none rounded-md'
        }
        style={{ gridArea: '1 / 1', backgroundColor: color }}
      ></div>
      <button
        onClick={onDelete}
        className='group-hover:scale-100 peer-focus:scale-100 focus:scale-100 transition-transform scale-0 absolute -top-2 -right-2 size-4 grid place-content-center bg-white rounded-full'
      >
        <X strokeWidth={3} size={12} color='black' />
      </button>
    </div>
  );
}
