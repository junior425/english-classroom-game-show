import { useEffect, useMemo, useState } from 'react'

const COLORS = ['#facc15', '#22d3ee', '#fb7185', '#a3e635', '#c084fc', '#fff']

// pseudo-aleatorio determinista para no llamar Math.random durante el render
const rand = (seed) => { const x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x) }

export default function Confetti({ trigger }) {
  const [visibleFor, setVisibleFor] = useState(0)

  useEffect(() => {
    if (!trigger) return
    const t = setTimeout(() => setVisibleFor(trigger), 3200)
    return () => clearTimeout(t)
  }, [trigger])

  const pieces = useMemo(() => {
    if (!trigger) return []
    return Array.from({ length: 90 }, (_, i) => ({
      id: `${trigger}-${i}`,
      left: rand(trigger * 100 + i) * 100,
      delay: rand(trigger * 200 + i) * 0.4,
      duration: 1.6 + rand(trigger * 300 + i) * 1.2,
      color: COLORS[i % COLORS.length],
      size: 8 + rand(trigger * 400 + i) * 12,
      rotate: rand(trigger * 500 + i) * 360,
    }))
  }, [trigger])

  if (!pieces.length || visibleFor === trigger) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <style>{`@keyframes confettiFall { to { transform: translateY(110vh) rotate(720deg); opacity: .8 } }`}</style>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -top-6 block rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  )
}
