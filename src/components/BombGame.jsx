import { useState } from 'react'
import { sfx } from '../audio.js'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerRing from './TimerRing.jsx'
import GameOver from './GameOver.jsx'

const FUSE_TIME = 30
const PASS_POINTS = 50
const PASS_PENALTY = 25
const WRONG_PENALTY = 25
const EXPLOSION_PENALTY = 100
const SURVIVOR_BONUS = 100
const LETTERS = ['A', 'B', 'C', 'D']

export default function BombGame({ teams, topic, addPoints, flashBanner, onExit }) {
  const questions = topic.topic.steal
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | live | boom | done
  const [holder, setHolder] = useState(0)
  const [round, setRound] = useState(1)
  const [wrongPicks, setWrongPicks] = useState([])
  const [boom, setBoom] = useState(null)
  const [exploded, setExploded] = useState([0, 0])
  const q = questions[idx]
  const other = holder === 0 ? 1 : 0

  const timer = useCountdown(() => {
    if (phase !== 'live') return
    sfx.explode()
    addPoints(holder, -EXPLOSION_PENALTY, 'BOOM!')
    addPoints(other, SURVIVOR_BONUS, 'SAFE')
    setExploded((e) => e.map((n, i) => (i === holder ? n + 1 : n)))
    flashBanner(`💥 BOOM! ${teams[holder].name.toUpperCase()} BLEW UP!`, 'red', 2200)
    setBoom({ team: holder })
    setPhase('boom')
  })

  const advance = () => {
    const nextIdx = idx + 1
    if (nextIdx >= questions.length) return false
    setIdx(nextIdx)
    setWrongPicks([])
    return true
  }

  const light = () => {
    sfx.drumroll()
    setTimeout(() => {
      setPhase('live')
      timer.start(FUSE_TIME)
    }, 1200)
  }

  const passBomb = (points, label) => {
    if (points) addPoints(holder, points, label)
    sfx.steal()
    flashBanner(`💣 ${teams[other].name.toUpperCase()} HAS THE BOMB!`, other === 0 ? 'teamA' : 'teamB', 1000)
    setHolder(other)
    if (!advance()) {
      timer.stop()
      setPhase('done')
    }
  }

  const pick = (i) => {
    if (phase !== 'live') return
    if (i === q.answer) {
      sfx.correct()
      passBomb(PASS_POINTS, 'PASS!')
    } else {
      sfx.fail()
      addPoints(holder, -WRONG_PENALTY)
      setWrongPicks((w) => [...w, i])
      if (!advance()) { timer.stop(); setPhase('done') }
    }
  }

  const skip = () => {
    sfx.boing()
    passBomb(-PASS_PENALTY, 'SKIP')
  }

  const nextRound = () => {
    sfx.click()
    setBoom(null)
    setRound((r) => r + 1)
    setHolder(boom.team === 0 ? 1 : 0)
    if (!advance()) { setPhase('done'); return }
    setPhase('ready')
  }

  if (phase === 'done') {
    return (
      <GameOver
        teams={teams}
        onExit={onExit}
        title="Pressure Bomb — Final Score"
        subtitle={`Explosions: ${teams[0].name} ${exploded[0]} · ${teams[1].name} ${exploded[1]}`}
      />
    )
  }

  const teamColor = (i) => (i === 0 ? 'bg-teamA-dark border-teamA-glow' : 'bg-teamB-dark border-teamB-glow')
  const urgent = timer.seconds !== null && timer.seconds <= 5

  return (
    <div className={`flex h-full flex-col p-4 md:p-6 ${phase === 'boom' ? 'animate-shake bg-red-950/60' : ''}`}>
      <header className="flex items-center justify-between">
        <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
        <div className="text-center">
          <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">💣 PRESSURE BOMB</div>
          <div className="text-lg text-white/60">{topic.topic.name} · Round {round} · Question {idx + 1} / {questions.length}</div>
        </div>
        <div className="w-32 md:w-44"><TimerRing seconds={timer.seconds} total={FUSE_TIME} /></div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6">
        {phase === 'ready' && (
          <>
            <p className="text-center font-display text-5xl tracking-widest text-white/80 md:text-7xl">THE FUSE IS {FUSE_TIME} SECONDS!</p>
            <p className="max-w-5xl text-center text-2xl text-white/60">
              <span className={holder === 0 ? 'text-teamA-glow' : 'text-teamB-glow'}>{teams[holder].name}</span> starts holding the bomb.
              Answer correctly (+{PASS_POINTS}) to pass it. Skip (−{PASS_PENALTY}) to pass it without answering. A wrong answer (−{WRONG_PENALTY}) keeps the bomb in your hands.
              If it explodes on you: −{EXPLOSION_PENALTY}, and the other team gets +{SURVIVOR_BONUS}!
            </p>
            <button onClick={light} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">🔥 Light the Fuse</button>
          </>
        )}

        {phase === 'live' && (
          <>
            <div className={`card w-full max-w-6xl border-8 px-8 py-6 text-center ${teamColor(holder)} ${urgent ? 'animate-pulse' : ''}`}>
              <div className="mb-2 font-display text-3xl tracking-widest text-gold md:text-4xl">
                💣 {teams[holder].name} HAS THE BOMB
              </div>
              <p className="font-extrabold text-4xl leading-tight md:text-6xl">{q.prompt}</p>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
              {q.options.map((opt, i) => {
                const wrong = wrongPicks.includes(i)
                return (
                  <button
                    key={i}
                    disabled={wrong}
                    onClick={() => pick(i)}
                    className={`btn flex items-center gap-4 rounded-3xl border-4 px-6 py-5 text-left normal-case font-sans text-3xl font-extrabold md:text-4xl ${wrong ? 'bg-red-700 border-red-300 animate-shake' : 'bg-slate-800 border-white/20 hover:border-gold'} disabled:opacity-100`}
                  >
                    <span className="font-display text-4xl text-gold md:text-5xl">{LETTERS[i]}</span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>

            <button onClick={skip} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">
              🙌 Pass the Bomb (−{PASS_PENALTY})
            </button>
          </>
        )}

        {phase === 'boom' && boom && (
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="animate-pop font-display text-8xl text-red-400 text-stroke md:text-[10rem]">💥 BOOM!</p>
            <p className="font-display text-5xl tracking-widest text-white md:text-6xl">
              {teams[boom.team].name} was holding the bomb!
            </p>
            <p className="text-3xl text-white/70">−{EXPLOSION_PENALTY} for {teams[boom.team].name} · +{SURVIVOR_BONUS} for {teams[boom.team === 0 ? 1 : 0].name}</p>
            {q.explanation && <p className="max-w-4xl text-2xl text-white/70 md:text-3xl">💡 Answer: <b className="text-emerald-300">{q.options[q.answer]}</b> — {q.explanation}</p>}
            <button onClick={nextRound} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
              {idx + 1 >= questions.length ? '🏁 Final Score' : 'Next Round ▶'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
