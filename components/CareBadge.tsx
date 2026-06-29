interface CareBadgeProps {
  light: string;
  water: string;
  petSafe: boolean;
  size: string;
}

function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="#E09A24" strokeWidth="1.6" />
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"
        stroke="#E09A24"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3C12 3 5 11 5 15a7 7 0 0014 0c0-4-7-12-7-12Z"
        stroke="#84994F"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ safe }: { safe: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 11c0-3 2-5 4-5 1 0 2 .6 3 2 1-1.4 2-2 3-2 2 0 4 2 4 5 0 4-7 9-7 9s-7-5-7-9Z"
        stroke="#B45253"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill={safe ? '#B45253' : 'none'}
      />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21V8M12 8c0-3-2-5-5-5M12 8c0-2 1.5-4 4-4"
        stroke="#84994F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="8" y="18" width="8" height="3" rx="1" stroke="#84994F" strokeWidth="1.6" />
    </svg>
  );
}

export default function CareBadge({ light, water, petSafe, size }: CareBadgeProps) {
  const badges = [
    { icon: <SunIcon />, label: 'Light', value: light },
    { icon: <WaterIcon />, label: 'Water', value: water },
    { icon: <HeartIcon safe={petSafe} />, label: 'Pets', value: petSafe ? 'Pet-safe' : 'Keep out of reach' },
    { icon: <SizeIcon />, label: 'Size', value: size },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {badges.map(b => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-1.5 bg-white border border-line rounded-md px-4 py-3 min-w-[90px]"
        >
          {b.icon}
          <span className="text-xs text-muted">{b.label}</span>
          <span className="text-[13px] font-semibold text-center leading-tight">{b.value}</span>
        </div>
      ))}
    </div>
  );
}
