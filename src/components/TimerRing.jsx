export default function TimerRing({ seconds, total }) {
  if (seconds === null) return null
  const pct = Math.max(0, seconds / total)
  const urgent = seconds <= 5
  return (
    <div className={`relative flex h-32 w-32 items-center justify-center md:h-44 md:w-44 ${urgent ? 'animate-pulse' : ''}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="10" />
        <circle
          cx="50" cy="50" r="44" fill="none"
          stroke={urgent ? '#f87171' : '#facc15'} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${pct * 276.5} 276.5`}
          style={{ transition: 'stroke-dasharray 1s linear' }}
        />
      </svg>
      <span className={`font-display text-6xl md:text-8xl ${urgent ? 'text-red-400' : 'text-gold'}`}>{seconds}</span>
    </div>
  )
}
