import { useEffect, useState } from 'react'
import { sfx } from '../audio.js'
import { speak, stopSpeaking, speechSupported, warmVoices } from '../speech.js'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerRing from './TimerRing.jsx'
import GameOver from './GameOver.jsx'

const MAX_PLAYS = 3
const ANSWER_TIME = 20
const POINTS = 100
const PENALTY = 50
const STEAL_POINTS = 50
const LETTERS = ['A', 'B', 'C', 'D']
const VOICE_LABEL = { 'en-US': '🇺🇸 American English', 'en-GB': '🇬🇧 British English' }

export default function ListeningGame({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const cards = topic.topic.listening ?? []
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | listen | answer | steal | result | done
  const [turn, setTurn] = useState(0)
  const [plays, setPlays] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [wrongPicks, setWrongPicks] = useState([])
  const [marks, setMarks] = useState([null, null]) // dictation: teacher verdict per team
  const [outcome, setOutcome] = useState(null)
  const c = cards[idx]
  const other = turn === 0 ? 1 : 0
  const answering = phase === 'steal' ? other : turn
  const isDictation = c?.kind === 'dictation'

  useEffect(() => { warmVoices(); return () => stopSpeaking() }, [])

  const timer = useCountdown(() => {
    if (phase === 'answer') toSteal('Time’s up!')
    else if (phase === 'steal') finish({ result: 'miss', msg: 'Time’s up! Nobody scores.' })
  })

  function finish(o) { timer.stop(); stopSpeaking(); setOutcome(o); setPhase('result') }

  function toSteal(reason) {
    timer.stop()
    sfx.fail()
    flashBanner(`${teams[other].name.toUpperCase()} CAN STEAL!`, 'gold', 1500)
    setOutcome({ reason })
    setPhase('steal')
    timer.start(ANSWER_TIME)
  }

  const play = async () => {
    if (plays >= MAX_PLAYS || speaking) return
    sfx.click()
    setPlays((p) => p + 1)
    setSpeaking(true)
    if (phase === 'ready') setPhase('listen')
    await speak(c.text, c.voice)
    setSpeaking(false)
  }

  const openAnswers = () => {
    sfx.drumroll()
    setTimeout(() => { setPhase('answer'); timer.start(ANSWER_TIME) }, 600)
  }

  const pick = (i) => {
    if (phase !== 'answer' && phase !== 'steal') return
    const team = answering
    if (i === c.answer) {
      const pts = phase === 'steal' ? STEAL_POINTS : POINTS
      addPoints(team, pts, phase === 'steal' ? 'STEAL!' : undefined)
      celebrate(team)
      finish({ result: 'correct', team, msg: `Correct! ${teams[team].name} wins ${pts} points.` })
    } else {
      setWrongPicks((w) => [...w, i])
      if (phase === 'answer') toSteal('Wrong answer!')
      else finish({ result: 'miss', msg: 'Both teams missed. No points.' })
    }
  }

  const mark = (team, ok) => {
    if (marks[team] !== null) return
    if (ok) { addPoints(team, POINTS); celebrate(team) }
    else { addPoints(team, -PENALTY); sfx.fail() }
    const next = marks.map((m, i) => (i === team ? ok : m))
    setMarks(next)
    if (next.every((m) => m !== null)) {
      const winners = teams.filter((_, i) => next[i]).map((t) => t.name)
      setOutcome({ result: winners.length ? 'correct' : 'miss', msg: winners.length ? `Great ears! ${winners.join(' & ')} wrote it correctly.` : 'Nobody got it this time.' })
    }
  }

  const next = () => {
    sfx.click()
    stopSpeaking()
    if (idx + 1 >= cards.length) { setPhase('done'); return }
    setIdx(idx + 1)
    setTurn(other)
    setPlays(0)
    setWrongPicks([])
    setMarks([null, null])
    setOutcome(null)
    setPhase('ready')
  }

  if (!cards.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
        <p className="font-display text-5xl text-gold">No listening cards for this topic yet.</p>
        <button onClick={onExit} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
      </div>
    )
  }

  if (phase === 'done') return <GameOver teams={teams} onExit={onExit} title="Audio Detective — Final Score" />

  const teamColor = (i) => (i === 0 ? 'bg-teamA-dark border-teamA-glow' : 'bg-teamB-dark border-teamB-glow')
  const teamText = (i) => (i === 0 ? 'text-teamA-glow' : 'text-teamB-glow')
  const live = phase === 'answer' || phase === 'steal'
  const playsLeft = MAX_PLAYS - plays
  const dictationDone = isDictation && marks.every((m) => m !== null)
  const showTranscript = phase === 'result' || dictationDone

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <header className="flex items-center justify-between">
        <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
        <div className="text-center">
          <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">🎧 AUDIO DETECTIVE</div>
          <div className="text-lg text-white/60">
            {topic.topic.name} · Track {idx + 1} / {cards.length} · {isDictation ? '✍️ DICTATION' : '🧠 COMPREHENSION'} · {VOICE_LABEL[c.voice]}
          </div>
        </div>
        <div className="w-32 md:w-44"><TimerRing seconds={timer.seconds} total={ANSWER_TIME} /></div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto">
        {!speechSupported() && (
          <p className="rounded-2xl bg-amber-500/20 px-6 py-3 text-xl text-amber-200">This browser has no text-to-speech. Read the transcript aloud instead.</p>
        )}

        {phase === 'ready' && (
          <p className="text-center font-display text-4xl tracking-widest text-white/80 md:text-6xl">
            {isDictation
              ? <>BOTH TEAMS: PENS READY! WRITE WHAT YOU HEAR.</>
              : <><span className={teamText(turn)}>{teams[turn].name}</span>, LISTEN CAREFULLY!</>}
          </p>
        )}

        {/* Giant audio player */}
        <div className={`card flex w-full max-w-5xl flex-col items-center gap-4 px-8 py-6 text-center ${isDictation ? 'border-gold/60' : teamColor(answering)}`}>
          {!isDictation && phase !== 'ready' && (
            <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">
              {phase === 'steal' ? `STEAL ATTEMPT: ${teams[answering].name}` : `LISTENING: ${teams[answering].name}`}
            </div>
          )}
          <div className="flex items-center gap-6">
            <button
              onClick={play}
              disabled={playsLeft === 0 || speaking || phase === 'result'}
              className={`btn flex h-40 w-40 items-center justify-center rounded-full border-8 text-7xl md:h-56 md:w-56 md:text-8xl ${speaking ? 'animate-pulse border-emerald-300 bg-emerald-600' : 'animate-pulseGlow border-gold bg-gold text-black hover:bg-yellow-300'} disabled:animate-none disabled:opacity-40`}
              aria-label="Play audio"
            >
              {speaking ? '🔊' : '▶'}
            </button>
            <div className="text-left">
              <div className="font-display text-4xl tracking-widest text-white md:text-5xl">{speaking ? 'PLAYING…' : plays === 0 ? 'PLAY AUDIO' : 'PLAY AGAIN'}</div>
              <div className="mt-2 flex gap-2">
                {Array.from({ length: MAX_PLAYS }, (_, i) => (
                  <span key={i} className={`h-5 w-12 rounded-full ${i < plays ? 'bg-white/20' : 'bg-gold'}`} />
                ))}
              </div>
              <div className="mt-1 text-xl text-white/60">{playsLeft} {playsLeft === 1 ? 'play' : 'plays'} left</div>
            </div>
          </div>

          {/* Sound-wave bars while speaking */}
          <div className="flex h-12 items-end gap-1.5">
            {Array.from({ length: 24 }, (_, i) => (
              <span
                key={i}
                className={`w-2.5 rounded-full ${speaking ? 'animate-wave bg-emerald-300' : 'bg-white/15'}`}
                style={speaking ? { animationDelay: `${i * 0.05}s` } : { height: '20%' }}
              />
            ))}
          </div>

          {showTranscript && (
            <p className="mt-2 rounded-2xl bg-black/40 px-6 py-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">“{c.text}”</p>
          )}
          {!isDictation && phase !== 'ready' && (
            <p className="font-extrabold text-3xl leading-tight md:text-5xl">{c.question}</p>
          )}
          {phase === 'steal' && outcome?.reason && (
            <p className="text-2xl text-red-300">{outcome.reason} {teams[turn].name} missed — {teams[other].name}, your turn!</p>
          )}
        </div>

        {/* Comprehension flow */}
        {!isDictation && phase === 'listen' && plays > 0 && !speaking && (
          <button onClick={openAnswers} className="btn btn-xl bg-white text-black hover:bg-gray-200">Show Answers ▶</button>
        )}
        {!isDictation && (live || phase === 'result') && (
          <div className="grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
            {c.options.map((opt, i) => {
              const reveal = phase === 'result'
              let cls = 'bg-slate-800 border-white/20 hover:border-gold'
              if (reveal && i === c.answer) cls = 'bg-emerald-600 border-emerald-300 animate-pop'
              else if (wrongPicks.includes(i)) cls = 'bg-red-700 border-red-300 animate-shake'
              else if (reveal) cls = 'bg-slate-900 border-white/10 opacity-50'
              return (
                <button
                  key={i}
                  disabled={!live || wrongPicks.includes(i)}
                  onClick={() => pick(i)}
                  className={`btn flex flex-col items-center gap-2 rounded-3xl border-4 px-4 py-5 normal-case font-sans text-2xl font-extrabold md:text-3xl ${cls} disabled:opacity-100`}
                >
                  <span className="font-display text-4xl text-gold md:text-5xl">{LETTERS[i]}</span>
                  <span className="break-words">{opt}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Dictation flow: teacher checks each team's paper */}
        {isDictation && plays > 0 && (
          <div className="grid w-full max-w-6xl grid-cols-2 gap-6">
            {teams.map((t, i) => (
              <div key={i} className={`card flex flex-col items-center gap-3 border-4 p-5 ${teamColor(i)}`}>
                <div className={`font-display text-4xl tracking-widest ${teamText(i)}`}>{t.name}</div>
                {marks[i] === null ? (
                  <div className="flex gap-3">
                    <button onClick={() => mark(i, true)} className="btn btn-lg bg-emerald-500 text-black hover:bg-emerald-400">✅ Correct +{POINTS}</button>
                    <button onClick={() => mark(i, false)} className="btn btn-lg bg-red-600 text-white hover:bg-red-500">❌ Wrong −{PENALTY}</button>
                  </div>
                ) : (
                  <div className={`font-display text-5xl ${marks[i] ? 'text-emerald-300' : 'text-red-300'}`}>{marks[i] ? '✅ CORRECT' : '❌ WRONG'}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {(phase === 'result' || dictationDone) && outcome && (
          <div className="flex w-full max-w-6xl flex-col items-center gap-3">
            <p className={`text-center font-display text-4xl tracking-wider md:text-5xl ${outcome.result === 'correct' ? 'text-emerald-300' : 'text-red-300'}`}>
              {outcome.result === 'correct' ? '✅ ' : '❌ '}{outcome.msg}
            </p>
            <button onClick={next} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
              {idx + 1 >= cards.length ? '🏁 Final Score' : 'Next Track ▶'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
