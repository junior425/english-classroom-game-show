import { useState } from 'react'

const SUGGESTIONS = ['Power Rangers', 'Wonder Women', 'The Tigers', 'The Panthers', 'Dragons', 'Phoenix', 'Avengers', 'Titans', 'Grammar Ninjas', 'Word Wizards']

export default function TeamSetup({ defaults, onStart }) {
  const [names, setNames] = useState(defaults)
  const set = (i, v) => setNames((n) => n.map((x, j) => (j === i ? v : x)))
  const shuffle = (i) => set(i, SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)])

  return (
    <form
      className="flex h-full flex-col"
      onSubmit={(e) => { e.preventDefault(); onStart(names) }}
    >
      <header className="py-6 text-center">
        <h1 className="font-display text-6xl tracking-widest text-gold text-stroke md:text-8xl">ENGLISH GAME SHOW</h1>
        <p className="mt-2 text-2xl font-extrabold text-white/70 md:text-3xl">Team vs Team · Split-Screen Classroom Edition</p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className={`flex flex-col items-center justify-center gap-8 p-8 ${i === 0 ? 'bg-teamA-dark/40 border-r-4 border-white/20' : 'bg-teamB-dark/40'}`}>
            <span className={`font-display text-4xl tracking-widest md:text-5xl ${i === 0 ? 'text-teamA-glow' : 'text-teamB-glow'}`}>
              TEAM {i === 0 ? 'A' : 'B'}
            </span>
            <input
              value={names[i]}
              onChange={(e) => set(i, e.target.value)}
              maxLength={24}
              aria-label={`Team ${i === 0 ? 'A' : 'B'} name`}
              className={`w-full max-w-2xl rounded-3xl border-8 bg-black/60 px-6 py-6 text-center font-display text-5xl tracking-wider text-white outline-none md:text-7xl ${i === 0 ? 'border-teamA focus:border-teamA-glow' : 'border-teamB focus:border-teamB-glow'}`}
            />
            <button type="button" onClick={() => shuffle(i)} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">
              🎲 Random Name
            </button>
          </div>
        ))}
      </div>

      <footer className="flex items-center justify-center gap-6 py-8">
        <button type="submit" className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">
          ▶ START!
        </button>
        <span className="text-xl text-white/50">Audio (Tone.js) is enabled when you press Start</span>
        <a href="/manual-english-game-show.pdf" download target="_blank" rel="noreferrer" className="text-xl text-gold/80 underline hover:text-gold">📘 Teacher's Manual (PDF)</a>
      </footer>
    </form>
  )
}
