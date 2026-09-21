import { useState } from 'react'
import { sfx } from '../audio.js'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerRing from './TimerRing.jsx'
import GameOver from './GameOver.jsx'
import CardImage from './CardImage.jsx'

const LIVES = 5
const ANSWER_TIME = 20
const POINTS = 100
const LETTERS = ['A', 'B', 'C', 'D']
const FALL_LINES = [
  'Whoooosh… straight through the floor!',
  'The trapdoor opens! See you at the bottom!',
  'Oops! Mind the gap!',
  'Gravity wins again!',
  'Down, down, down… that’s gotta hurt!',
  'The floor said “nope”.',
]

function Lives({ team, index, lives, active, falling }) {
  const isA = index === 0
  return (
    <div className={`card flex flex-col items-center gap-3 border-8 p-5 transition ${isA ? 'border-teamA-glow bg-teamA-dark/40' : 'border-teamB-glow bg-teamB-dark/40'} ${active ? 'ring-8 ring-gold' : 'opacity-70'} ${falling ? 'animate-shake' : ''}`}>
      <div className={`font-display text-3xl tracking-widest md:text-4xl ${isA ? 'text-teamA-glow' : 'text-teamB-glow'}`}>{team.name}</div>
      <div className="flex gap-2 text-5xl md:text-6xl" aria-label={`${lives} lives`}>
        {Array.from({ length: LIVES }, (_, i) => (
          <span key={i} className={i < lives ? 'animate-pop' : 'opacity-25 grayscale'}>{i < lives ? '❤️' : '🕳️'}</span>
        ))}
      </div>
      <div className="text-xl font-extrabold uppercase tracking-widest text-white/60">{lives} {lives === 1 ? 'life' : 'lives'} left</div>
    </div>
  )
}

export default function TrapdoorGame({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const questions = topic.topic.steal
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | answer | result | done
  const [turn, setTurn] = useState(0)
  const [lives, setLives] = useState([LIVES, LIVES])
  const [wrongPick, setWrongPick] = useState(null)
  const [outcome, setOutcome] = useState(null)
  const [falling, setFalling] = useState(null)
  const q = questions[idx]

  const timer = useCountdown(() => {
    if (phase === 'answer') loseLife(turn, true)
  })

  function loseLife(team, byTimeout = false) {
    timer.stop()
    sfx.fall()
    setTimeout(() => sfx.fail(), 900)
    const line = FALL_LINES[(idx + team) % FALL_LINES.length]
    const remaining = lives[team] - 1
    setLives((l) => l.map((v, i) => (i === team ? remaining : v)))
    setFalling(team)
    setTimeout(() => setFalling(null), 1500)
    flashBanner(`🕳️ ${teams[team].name.toUpperCase()} FALLS THROUGH THE TRAPDOOR!`, 'red', 2000)
    setOutcome({ result: 'fall', msg: byTimeout ? `Time’s up! ${line}` : line, remaining })
    setPhase('result')
  }

  const show = () => {
    sfx.drumroll()
    setTimeout(() => { setPhase('answer'); timer.start(ANSWER_TIME) }, 1200)
  }

  const pick = (i) => {
    if (phase !== 'answer') return
    if (i === q.answer) {
      timer.stop()
      addPoints(turn, POINTS)
      celebrate(turn)
      setOutcome({ result: 'safe', msg: `Correct! ${teams[turn].name} stays on solid ground. +${POINTS}` })
      setPhase('result')
    } else {
      setWrongPick(i)
      loseLife(turn)
    }
  }

  const next = () => {
    sfx.click()
    const eliminated = lives.some((l) => l <= 0)
    if (eliminated || idx + 1 >= questions.length) { setPhase('done'); return }
    setIdx(idx + 1)
    setTurn(turn === 0 ? 1 : 0)
    setWrongPick(null)
    setOutcome(null)
    setPhase('ready')
  }

  if (phase === 'done') {
    const eliminated = lives.findIndex((l) => l <= 0)
    return (
      <GameOver
        teams={teams}
        onExit={onExit}
        title="The Trapdoor — Survivors"
        values={lives.map((l, i) => l * 100000 + teams[i].score)}
        format={(v) => `${Math.floor(v / 100000)} ❤️ · ${v % 100000} pts`}
        subtitle={eliminated >= 0 ? `${teams[eliminated].name} ran out of lives!` : 'Both teams survived — lives first, then score, decide the winner.'}
      />
    )
  }

  const teamColor = (i) => (i === 0 ? 'bg-teamA-dark border-teamA-glow' : 'bg-teamB-dark border-teamB-glow')

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <header className="flex items-center justify-between">
        <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
        <div className="text-center">
          <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">🕳️ THE TRAPDOOR</div>
          <div className="text-lg text-white/60">{topic.topic.name} · Question {idx + 1} / {questions.length}</div>
        </div>
        <div className="w-32 md:w-44"><TimerRing seconds={timer.seconds} total={ANSWER_TIME} /></div>
      </header>

      <div className="mt-2 grid w-full grid-cols-2 gap-6">
        {teams.map((t, i) => <Lives key={i} team={t} index={i} lives={lives[i]} active={turn === i && phase !== 'done'} falling={falling === i} />)}
      </div>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-auto">
        {phase === 'ready' && (
          <>
            <p className="text-center font-display text-5xl tracking-widest text-white/80 md:text-7xl">
              <span className={turn === 0 ? 'text-teamA-glow' : 'text-teamB-glow'}>{teams[turn].name}</span>, STEP ONTO THE TRAPDOOR!
            </p>
            <p className="text-2xl text-white/60">Correct answer: +{POINTS} and you stay safe. Wrong answer or time’s up: the trapdoor opens and you lose a life!</p>
            <button onClick={show} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">🥁 Show Question</button>
          </>
        )}

        {phase !== 'ready' && (
          <>
            <div className={`card w-full max-w-6xl px-8 py-6 text-center ${teamColor(turn)}`}>
              <div className="mb-2 font-display text-3xl tracking-widest text-gold md:text-4xl">ANSWERING: {teams[turn].name}</div>
              <CardImage src={q.image} />
              <p className="font-extrabold text-4xl leading-tight md:text-6xl">{q.prompt}</p>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
              {q.options.map((opt, i) => {
                const reveal = phase === 'result'
                let cls = 'bg-slate-800 border-white/20 hover:border-gold'
                if (reveal && i === q.answer) cls = 'bg-emerald-600 border-emerald-300 animate-pop'
                else if (wrongPick === i) cls = 'bg-red-700 border-red-300 animate-shake'
                else if (reveal) cls = 'bg-slate-900 border-white/10 opacity-50'
                return (
                  <button
                    key={i}
                    disabled={reveal}
                    onClick={() => pick(i)}
                    className={`btn flex items-center gap-4 rounded-3xl border-4 px-6 py-5 text-left normal-case font-sans text-3xl font-extrabold md:text-4xl ${cls} disabled:opacity-100`}
                  >
                    <span className="font-display text-4xl text-gold md:text-5xl">{LETTERS[i]}</span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>

            {phase === 'result' && (
              <div className="flex w-full max-w-6xl flex-col items-center gap-4">
                <p className={`text-center font-display text-4xl tracking-wider md:text-5xl ${outcome.result === 'safe' ? 'text-emerald-300' : 'text-red-300'}`}>
                  {outcome.result === 'fall' ? '🕳️ ' : '✅ '}{outcome.msg}
                </p>
                {outcome.result === 'fall' && (
                  <p className="text-2xl text-white/70">{outcome.remaining > 0 ? `${outcome.remaining} ${outcome.remaining === 1 ? 'life' : 'lives'} left!` : 'No lives left — eliminated!'}</p>
                )}
                {q.explanation && <p className="text-2xl text-white/70 md:text-3xl">💡 {q.explanation}</p>}
                <button onClick={next} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
                  {lives.some((l) => l <= 0) || idx + 1 >= questions.length ? '🏁 Final Result' : 'Next ▶'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
