'use client';

interface QtyStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  size?: 'sm' | 'md';
}

export default function QtyStepper({ value, onChange, min = 1, size = 'md' }: QtyStepperProps) {
  const btnClass =
    size === 'sm'
      ? 'w-9 h-9 text-[18px]'
      : 'w-12 h-[50px] text-[22px]';

  return (
    <div className="inline-flex items-center border border-line rounded-pill overflow-hidden bg-white">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btnClass} border-none bg-transparent text-olive-deep cursor-pointer font-fraunces leading-none hover:bg-canvas-alt transition-colors`}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span
        className={`font-fraunces font-semibold ${size === 'sm' ? 'text-[15px] min-w-[30px]' : 'text-lg min-w-[40px]'} text-center font-lining`}
      >
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className={`${btnClass} border-none bg-transparent text-olive-deep cursor-pointer font-fraunces leading-none hover:bg-canvas-alt transition-colors`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
