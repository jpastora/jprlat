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
        <pattern id="mono-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--dot-color)" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill="url(#mono-dots)" opacity="0.55" />
      <text
        x="188"
        y="268"
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontSize="108"
        fontWeight="700"
        fill="var(--color-carbon)"
      >
        JP
      </text>
      <text
        x="276"
        y="268"
        textAnchor="start"
        fontFamily="var(--font-mono)"
        fontSize="80"
        fontWeight="700"
        fill="#FF6B00"
      >
        &gt;
      </text>
    </svg>
  )
}
