import { useMemo } from 'react'

const COLORS = ['#facc15', '#22d3ee', '#fb7185', '#a3e635', '#c084fc', '#fb923c', '#fff']
const rand = (seed) => { const x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x) }

// Looping CSS fireworks: several bursts, each made of radial sparks. Pure CSS, no timers.
export default function Fireworks({ bursts = 7 }) {
  const items = useMemo(() => Array.from({ length: bursts }, (_, b) => ({
    id: b,
    x: 10 + rand(b * 11 + 1) * 80,
    y: 12 + rand(b * 13 + 2) * 45,
    delay: rand(b * 17 + 3) * 2.4,
    color: COLORS[b % COLORS.length],
    sparks: Array.from({ length: 18 }, (_, i) => ({ id: i, angle: (360 / 18) * i, dist: 90 + rand(b * 100 + i) * 90 })),
  })), [bursts])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes fwSpark { 0% { transform: rotate(var(--a)) translateY(0) scale(1); opacity: 1 } 70% { opacity: 1 } 100% { transform: rotate(var(--a)) translateY(calc(var(--d) * -1)) scale(0.2); opacity: 0 } }
        @keyframes fwFlash { 0%, 100% { opacity: 0 } 10% { opacity: 1 } }
      `}</style>
      {items.map((f) => (
        <div key={f.id} className="absolute" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
          <span className="absolute -left-10 -top-10 h-20 w-20 rounded-full" style={{ background: f.color, filter: 'blur(14px)', animation: `fwFlash 2.6s ${f.delay}s ease-out infinite` }} />
          {f.sparks.map((s) => (
            <span
              key={s.id}
              className="absolute block h-3 w-3 rounded-full"
              style={{ background: f.color, boxShadow: `0 0 12px ${f.color}`, '--a': `${s.angle}deg`, '--d': `${s.dist}px`, animation: `fwSpark 2.6s ${f.delay}s ease-out infinite` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
