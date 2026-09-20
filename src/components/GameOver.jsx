import { useEffect } from 'react'
import { sfx } from '../audio.js'

export default function GameOver({ teams, onExit, title }) {
  const [a, b] = teams
  const tie = a.score === b.score
  const winner = a.score > b.score ? 0 : 1

  useEffect(() => { sfx.win() }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-8 text-center">
      <h2 className="font-display text-5xl tracking-widest text-white/70 md:text-6xl">{title}</h2>
      {tie ? (
        <p className="font-display text-7xl text-gold text-stroke md:text-9xl">¡EMPATE!</p>
      ) : (
        <>
          <p className="text-3xl font-extrabold text-white/70">🏆 GANADOR 🏆</p>
          <p className={`animate-pop font-display text-8xl text-stroke md:text-[10rem] ${winner === 0 ? 'text-teamA-glow' : 'text-teamB-glow'}`}>
            {teams[winner].name}
          </p>
        </>
      )}
      <p className="text-4xl font-extrabold">
        <span className="text-teamA-glow">{a.name} {a.score}</span> <span className="text-white/40">vs</span> <span className="text-teamB-glow">{b.name} {b.score}</span>
      </p>
      <button onClick={onExit} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">Volver al menú</button>
    </div>
  )
}
