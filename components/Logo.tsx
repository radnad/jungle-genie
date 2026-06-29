export default function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 4C12 12 12 20 20 36C28 20 28 12 20 4Z"
        stroke="#84994F"
        strokeWidth="1.8"
        fill="rgba(252,181,59,.16)"
      />
      <path d="M20 10V32" stroke="#84994F" strokeWidth="1.2" />
    </svg>
  );
}
