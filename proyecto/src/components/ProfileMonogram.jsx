export default function ProfileMonogram({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 500"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-labelledby="profile-monogram-title"
    >
      <title id="profile-monogram-title">Joseph Pastora</title>
      <rect width="400" height="500" fill="var(--color-soft)" />
      <defs>
        <pattern id="mono-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--dot-color)" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill="url(#mono-dots)" opacity="0.65" />
      <path
        d="M48 120 H352 M48 380 H352"
        stroke="var(--color-line)"
        strokeWidth="1"
        opacity="0.35"
      />
      <path
        d="M120 200 L280 200 L320 160"
        stroke="#FF6B00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="320" cy="160" r="4" fill="#FF6B00" opacity="0.8" />
      <text
        x="188"
        y="262"
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontSize="96"
        fontWeight="700"
        fill="var(--color-carbon)"
      >
        JP
      </text>
      <text
        x="268"
        y="262"
        textAnchor="start"
        fontFamily="var(--font-mono)"
        fontSize="72"
        fontWeight="700"
        fill="#FF6B00"
      >
        &gt;
      </text>
    </svg>
  )
}
