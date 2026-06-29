import Image from 'next/image';

// The Jungle Genie logo lives at public/logo.png. To change the logo, just
// replace that file (keep it roughly square for the best fit).
export default function BrandLogo({
  height = 42,
  className = '',
}: {
  height?: number;
  className?: string;
}) {
  // logo.png is 560 x 552 (aspect ratio ~1.014)
  const width = Math.round(height * 1.014);
  return (
    <Image
      src="/logo.png"
      alt="Jungle Genie logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
