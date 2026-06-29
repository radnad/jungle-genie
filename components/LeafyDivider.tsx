export default function LeafyDivider() {
  return (
    <div className="flex items-center justify-center gap-[18px] py-8 px-[5vw] max-w-[1280px] mx-auto">
      <span className="flex-1 h-px bg-line" />
      <svg width="120" height="22" viewBox="0 0 120 22" fill="none" aria-hidden="true">
        <path d="M0 11H44M76 11H120" stroke="#84994F" strokeWidth="1.2" />
        <path
          d="M60 2C53 6 53 16 60 20C67 16 67 6 60 2Z"
          stroke="#84994F"
          strokeWidth="1.2"
          fill="rgba(132,153,79,.12)"
        />
        <path d="M60 5V17" stroke="#84994F" strokeWidth=".9" />
        <path d="M50 11C46 8 44 9 43 11C44 13 46 14 50 11Z" fill="#84994F" opacity=".5" />
        <path d="M70 11C74 8 76 9 77 11C76 13 74 14 70 11Z" fill="#84994F" opacity=".5" />
      </svg>
      <span className="flex-1 h-px bg-line" />
    </div>
  );
}
