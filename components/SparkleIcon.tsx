export default function SparkleIcon({
  size = 13,
  color = '#E09A24',
  className = 'animate-sparkle',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z"
        fill={color}
      />
    </svg>
  );
}
