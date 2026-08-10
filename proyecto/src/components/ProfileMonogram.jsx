export default function ProfileMonogram({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 500"
      fill="none"
      role="img"
      aria-labelledby="profile-monogram-title"
    >
      <title id="profile-monogram-title">Joseph Pastora</title>
      <rect width="400" height="500" fill="var(--color-soft)" />
      <rect
        x="24"
        y="24"
        width="352"
        height="452"
        rx="8"
        stroke="var(--color-line)"
        strokeWidth="1.5"
      />
      <text
        x="200"
        y="248"
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontSize="72"
        fontWeight="700"
        fill="var(--color-carbon)"
      >
        JP
      </text>
      <text
        x="248"
        y="248"
        textAnchor="start"
        fontFamily="var(--font-mono)"
        fontSize="56"
        fontWeight="700"
        fill="#FF6B00"
      >
        &gt;
      </text>
      <path
        d="M80 360 H320 M120 390 H280"
        stroke="var(--color-tech)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  )
}
