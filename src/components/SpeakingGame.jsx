import { useState } from 'react'
import { sfx } from '../audio.js'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerRing from './TimerRing.jsx'
import GameOver from './GameOver.jsx'

const WIN = 100
const BOTH = 50
const TABOO_PENALTY = 50

export default function SpeakingGame({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const cards = topic.topic.speaking ?? []
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | talk | judge | done
  const [turn, setTurn] = useState(0) // team on stage
  const [tabooHits, setTabooHits] = useState([0, 0])
  const [outcome, setOutcome] = useState(null)
  const c = cards[idx]
  const other = turn === 0 ? 1 : 0

  const timer = useCountdown(() => {
    flashBanner('TIME’S UP! TEACHER, YOUR VERDICT', 'gold', 1800)
    setPhase('judge')
  })

  const start = () => {
    sfx.drumroll()
    setTimeout(() => { setPhase('talk'); timer.start(c.seconds) }, 700)
  }

  const stopEarly = () => { timer.stop(); sfx.click(); setPhase('judge') }

  const tabooHit = (team) => {
    sfx.fail()
    addPoints(team, -TABOO_PENALTY, 'TABOO!')
    flashBanner(`${teams[team].name.toUpperCase()} SAID A TABOO WORD!`, 'teamB', 1400)
    setTabooHits((h) => h.map((n, i) => (i === team ? n + 1 : n)))
  }

  const award = (kind) => {
    if (kind === 'both') {
      addPoints(0, BOTH); addPoints(1, BOTH)
      sfx.win()
      setOutcome(`Great performance! Both teams earn ${BOTH} points.`)
    } else if (kind === 'none') {
      sfx.fail()
      setOutcome('No points this round. Keep practising!')
    } else {
      addPoints(kind, WIN)
      celebrate(kind)
      setOutcome(`${teams[kind].name} wins ${WIN} points for fluency!`)
    }
  }

  const next = () => {
    sfx.click()
    if (idx + 1 >= cards.length) { setPhase('done'); return }
    setIdx(idx + 1)
    setTurn(other)
    setTabooHits([0, 0])
    setOutcome(null)
    setPhase('ready')
  }

  if (!cards.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
        <p className="font-display text-5xl text-gold">No speaking cards for this topic yet.</p>
        <button onClick={onExit} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
      </div>
    )
  }

  if (phase === 'done') return <GameOver teams={teams} onExit={onExit} title="Speaking Roleplay — Final Score" />

  const teamColor = (i) => (i === 0 ? 'bg-teamA-dark border-teamA-glow' : 'bg-teamB-dark border-teamB-glow')
  const teamText = (i) => (i === 0 ? 'text-teamA-glow' : 'text-teamB-glow')
  const hasTaboo = c.taboo.length > 0

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <header className="flex items-center justify-between">
        <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
        <div className="text-center">
          <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">🎤 SPEAKING ROLEPLAY & TABOO</div>
          <div className="text-lg text-white/60">{topic.topic.name} · Scene {idx + 1} / {cards.length} · {c.seconds}s</div>
        </div>
        <div className="w-32 md:w-44"><TimerRing seconds={timer.seconds} total={c.seconds} /></div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto">
        <div className={`card w-full max-w-6xl border-4 px-8 py-6 ${teamColor(turn)}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">ON STAGE: <span className={teamText(turn)}>{teams[turn].name}</span></div>
            <div className="text-xl text-white/60">Everyone on the team must speak at least once</div>
          </div>
          <h3 className="mt-3 font-display text-5xl tracking-wider text-white md:text-7xl">🎭 {c.title}</h3>

          <div className="mt-4 rounded-2xl bg-black/40 p-5">
            <div className="text-xl font-bold uppercase tracking-widest text-white/50">Situation</div>
            <p className="mt-1 text-3xl font-extrabold leading-tight md:text-4xl">{c.situation}</p>
          </div>

          <div className={`mt-4 grid gap-4 ${hasTaboo ? 'md:grid-cols-2' : ''}`}>
            <div className="rounded-2xl border-4 border-emerald-400/60 bg-emerald-900/30 p-5">
              <div className="text-xl font-bold uppercase tracking-widest text-emerald-300">✅ 3 Mandatory Words — use them all!</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {c.mandatory.map((w) => (
                  <span key={w} className="rounded-2xl bg-emerald-500 px-5 py-2 font-display text-4xl tracking-wide text-black md:text-5xl">{w}</span>
                ))}
              </div>
            </div>
            {hasTaboo && (
              <div className="rounded-2xl border-4 border-red-400/60 bg-red-900/30 p-5">
                <div className="text-xl font-bold uppercase tracking-widest text-red-300">🚫 Taboo — forbidden words (−{TABOO_PENALTY} each)</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {c.taboo.map((w) => (
                    <span key={w} className="rounded-2xl bg-red-600 px-5 py-2 font-display text-4xl tracking-wide text-white line-through decoration-4 md:text-5xl">{w}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {phase === 'ready' && (
          <button onClick={start} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">🎬 Action! Start {c.seconds}s</button>
        )}

        {phase === 'talk' && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {hasTaboo && (
              <button onClick={() => tabooHit(turn)} className="btn btn-lg bg-red-600 text-white hover:bg-red-500">
                🚫 Taboo word! −{TABOO_PENALTY} {tabooHits[turn] > 0 && `(×${tabooHits[turn]})`}
              </button>
            )}
            <button onClick={stopEarly} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">⏹ Finished early</button>
          </div>
        )}

        {phase === 'judge' && !outcome && (
          <div className="flex w-full max-w-6xl flex-col items-center gap-3">
            <p className="font-display text-4xl tracking-widest text-white/80 md:text-5xl">👩‍🏫 TEACHER’S VERDICT</p>
            <p className="text-2xl text-white/60">Fluency · vocabulary · all 3 mandatory words used?</p>
            <div className="grid w-full gap-4 md:grid-cols-4">
              <button onClick={() => award(0)} className="btn btn-lg bg-teamA-dark border-4 border-teamA-glow text-white hover:brightness-125">🏆 {teams[0].name} +{WIN}</button>
              <button onClick={() => award(1)} className="btn btn-lg bg-teamB-dark border-4 border-teamB-glow text-white hover:brightness-125">🏆 {teams[1].name} +{WIN}</button>
              <button onClick={() => award('both')} className="btn btn-lg bg-emerald-500 text-black hover:bg-emerald-400">🤝 Both +{BOTH}</button>
              <button onClick={() => award('none')} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">😅 No points</button>
            </div>
          </div>
        )}

        {phase === 'judge' && outcome && (
          <div className="flex flex-col items-center gap-3">
            <p className="text-center font-display text-4xl tracking-wider text-emerald-300 md:text-5xl">{outcome}</p>
            <button onClick={next} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
              {idx + 1 >= cards.length ? '🏁 Final Score' : `Next Scene ▶ (${teams[other].name} on stage)`}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
