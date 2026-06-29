import Image from 'next/image';

interface PlantImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function PlantImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  sizes,
  priority,
}: PlantImageProps) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-canvas-alt ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          opacity="0.35"
        >
          <path
            d="M12 21V9M12 9C12 5 9 3 5 3c0 4 3 6 7 6Zm0 0c0-4 3-6 7-6 0 4-3 6-7 6Z"
            stroke="#84994F"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        className={`object-cover ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 400}
      sizes={sizes}
      className={`object-cover ${className}`}
      priority={priority}
    />
  );
}
