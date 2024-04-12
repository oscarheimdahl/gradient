interface SadFaceProps {
  color: string;
}

export function SadFace({ color }: SadFaceProps) {
  return (
    <svg
      width='100'
      height='100'
      viewBox='0 0 29 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='3' cy='3' r='3' fill={color} />
      <circle cx='26' cy='3' r='3' fill={color} />
      <path
        d='M6 12C7 9 9.5 7 14.5 7C19.5 7 21.5 9 22.5 12'
        stroke={color}
        strokeWidth='3'
        strokeLinecap='round'
      />
    </svg>
  );
}
