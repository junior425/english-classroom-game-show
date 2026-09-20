import { useEffect } from 'react'
import { sfx } from '../audio.js'

// `values` lets a mode compare something other than the scoreboard (bankroll, lives…).
// `format` renders each team's value in the summary line.
export default function GameOver({ teams, onExit, title, values, format = (v) => v, subtitle }) {
  const vals = values ?? teams.map((t) => t.score)
  const [a, b] = vals
  const tie = a === b
  const winner = a > b ? 0 : 1

  useEffect(() => { sfx.win() }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-8 text-center">
      <h2 className="font-display text-5xl tracking-widest text-white/70 md:text-6xl">{title}</h2>
      {tie ? (
        <p className="font-display text-7xl text-gold text-stroke md:text-9xl">IT’S A TIE!</p>
      ) : (
        <>
          <p className="text-3xl font-extrabold text-white/70">🏆 WINNER 🏆</p>
          <p className={`animate-pop font-display text-8xl text-stroke md:text-[10rem] ${winner === 0 ? 'text-teamA-glow' : 'text-teamB-glow'}`}>
            {teams[winner].name}
          </p>
        </>
      )}
      <p className="text-4xl font-extrabold">
        <span className="text-teamA-glow">{teams[0].name} {format(a)}</span> <span className="text-white/40">vs</span> <span className="text-teamB-glow">{teams[1].name} {format(b)}</span>
      </p>
      {subtitle && <p className="text-2xl text-white/60">{subtitle}</p>}
      <button onClick={onExit} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">Main Menu</button>
    </div>
  )
}
