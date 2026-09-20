import { useEffect, useRef, useState } from 'react'
import { sfx } from '../audio.js'

function useBump(value) {
  const [bump, setBump] = useState(false)
  const prev = useRef(value)
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value
      setBump(true)
      const t = setTimeout(() => setBump(false), 500)
      return () => clearTimeout(t)
    }
  }, [value])
  return bump
}

function TeamPanel({ team, index, events, onAdd, onSteal, compact }) {
  const bump = useBump(team.score)
  const isA = index === 0
  const color = isA ? 'text-teamA-glow' : 'text-teamB-glow'
  const bg = isA ? 'bg-teamA-dark/40' : 'bg-teamB-dark/40'
  const shakeOnLoss = events.some((e) => e.delta < 0)

  return (
    <div className={`relative flex flex-col items-center justify-center ${bg} ${isA ? 'border-r-4 border-white/20' : ''} ${compact ? 'py-2' : 'py-6'}`}>
      <div className={`font-display tracking-widest ${color} ${compact ? 'text-3xl md:text-5xl' : 'text-5xl md:text-7xl'} truncate max-w-full px-4`}>
        {team.name}
      </div>
      <div className={`font-display tabular-nums text-white text-stroke leading-none ${compact ? 'text-7xl md:text-8xl' : 'text-[9rem] md:text-[12rem]'} ${bump ? 'animate-pop' : ''} ${shakeOnLoss ? 'animate-shake' : ''}`}>
        {team.score}
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button onClick={() => { sfx.plus(); onAdd(index, 100) }} className={`btn ${compact ? 'px-5 py-2 text-2xl' : 'btn-lg'} bg-emerald-500 text-black hover:bg-emerald-400`}>+100</button>
        <button onClick={() => { sfx.minus(); onAdd(index, -50) }} className={`btn ${compact ? 'px-5 py-2 text-2xl' : 'btn-lg'} bg-red-500 text-white hover:bg-red-400`}>−50</button>
        <button onClick={() => onSteal(index)} className={`btn ${compact ? 'px-5 py-2 text-2xl' : 'btn-lg'} bg-gold text-black hover:bg-yellow-300`}>🦹 Robar</button>
      </div>

      {events.map((e) => (
        <div
          key={e.id}
          className={`pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 animate-floatUp font-display text-7xl text-stroke ${e.delta > 0 ? 'text-emerald-300' : 'text-red-400'}`}
        >
          {e.delta > 0 ? '+' : ''}{e.delta}{e.label ? ` ${e.label}` : ''}
        </div>
      ))}
    </div>
  )
}

export default function Scoreboard({ teams, events, onAdd, onSteal, compact }) {
  return (
    <div className="grid grid-cols-2 border-b-4 border-white/20">
      {teams.map((t, i) => (
        <TeamPanel key={i} team={t} index={i} events={events.filter((e) => e.team === i)} onAdd={onAdd} onSteal={onSteal} compact={compact} />
      ))}
    </div>
  )
}
