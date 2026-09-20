import { useState } from 'react'
import { sfx } from '../audio.js'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerRing from './TimerRing.jsx'
import GameOver from './GameOver.jsx'

const QUESTION_TIME = 20
const STEAL_TIME = 10
const POINTS = 100
const STEAL_BONUS = 50
const LETTERS = ['A', 'B', 'C', 'D']

export default function StealGame({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const questions = topic.topic.steal
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | buzz | answer | steal | result | done
  const [answering, setAnswering] = useState(null) // índice del equipo que responde
  const [failed, setFailed] = useState(null) // equipo que falló primero
  const [wrongPicks, setWrongPicks] = useState([])
  const [outcome, setOutcome] = useState(null)
  const q = questions[idx]

  const timer = useCountdown(() => {
    if (phase === 'buzz') finish('timeout', 'Nadie respondió a tiempo')
    else if (phase === 'answer' || phase === 'steal') onWrong(answering, true)
  })

  const total = phase === 'steal' ? STEAL_TIME : QUESTION_TIME

  const show = () => {
    sfx.drumroll()
    setTimeout(() => { setPhase('buzz'); timer.start(QUESTION_TIME) }, 1200)
  }

  const buzz = (team) => {
    sfx.click()
    setAnswering(team)
    setPhase('answer')
    timer.stop()
    timer.start(QUESTION_TIME)
  }

  function finish(result, msg) {
    timer.stop()
    setOutcome({ result, msg })
    setPhase('result')
  }

  function onWrong(team, byTimeout = false) {
    timer.stop()
    sfx.fail()
    if (phase === 'answer') {
      const other = team === 0 ? 1 : 0
      setFailed(team)
      setAnswering(other)
      flashBanner(`¡${teams[other].name} PUEDE ROBAR!`, 'gold', 1500)
      setTimeout(() => { setPhase('steal'); timer.start(STEAL_TIME) }, 300)
    } else {
      finish('none', byTimeout ? 'Se acabó el tiempo. Nadie gana puntos.' : 'Ambos equipos fallaron. Nadie gana puntos.')
    }
  }

  const pick = (i) => {
    if (phase !== 'answer' && phase !== 'steal') return
    if (i === q.answer) {
      timer.stop()
      if (phase === 'steal') {
        addPoints(answering, POINTS + STEAL_BONUS, '¡ROBO!')
        addPoints(failed, -STEAL_BONUS)
        sfx.steal()
        flashBanner(`¡${teams[answering].name} ROBA ${POINTS + STEAL_BONUS} PUNTOS!`, 'gold')
      } else {
        addPoints(answering, POINTS)
        celebrate(answering)
      }
      setOutcome({ result: 'win', msg: `¡Correcto! ${teams[answering].name} gana ${phase === 'steal' ? POINTS + STEAL_BONUS : POINTS} puntos.` })
      setPhase('result')
    } else {
      setWrongPicks((w) => [...w, i])
      onWrong(answering)
    }
  }

  const next = () => {
    sfx.click()
    if (idx + 1 >= questions.length) { setPhase('done'); return }
    setIdx(idx + 1)
    setPhase('ready')
    setAnswering(null); setFailed(null); setOutcome(null); setWrongPicks([])
  }

  if (phase === 'done') return <GameOver teams={teams} onExit={onExit} title="Fin del Robo de Puntos" />

  const teamColor = (i) => (i === 0 ? 'bg-teamA-dark border-teamA-glow' : 'bg-teamB-dark border-teamB-glow')

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <header className="flex items-center justify-between">
        <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Menú</button>
        <div className="text-center">
          <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">🦹 ROBO DE PUNTOS</div>
          <div className="text-lg text-white/60">{topic.topic.name} · Pregunta {idx + 1} / {questions.length}</div>
        </div>
        <div className="w-32 md:w-44"><TimerRing seconds={timer.seconds} total={total} /></div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6">
        {phase === 'ready' && (
          <>
            <p className="text-center font-display text-5xl tracking-widest text-white/80 md:text-7xl">¡PRIMEROS DE LA FILA AL FRENTE!</p>
            <p className="text-2xl text-white/60">Responde bien: +{POINTS}. Si fallas, el rival puede robar +{POINTS + STEAL_BONUS} (y tú pierdes {STEAL_BONUS}).</p>
            <button onClick={show} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">🥁 Mostrar pregunta</button>
          </>
        )}

        {phase !== 'ready' && (
          <>
            <div className={`card w-full max-w-6xl px-8 py-6 text-center ${answering !== null ? teamColor(answering) : ''}`}>
              {answering !== null && phase !== 'result' && (
                <div className="mb-2 font-display text-3xl tracking-widest text-gold md:text-4xl">
                  {phase === 'steal' ? '🦹 INTENTO DE ROBO: ' : 'RESPONDE: '}{teams[answering].name}
                </div>
              )}
              <p className="font-extrabold text-4xl leading-tight md:text-6xl">{q.prompt}</p>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
              {q.options.map((opt, i) => {
                const isAnswer = i === q.answer
                const reveal = phase === 'result'
                let cls = 'bg-slate-800 border-white/20 hover:border-gold'
                if (reveal && isAnswer) cls = 'bg-emerald-600 border-emerald-300 animate-pop'
                else if (wrongPicks.includes(i)) cls = 'bg-red-700 border-red-300 animate-shake'
                else if (reveal) cls = 'bg-slate-900 border-white/10 opacity-50'
                return (
                  <button
                    key={i}
                    disabled={phase === 'buzz' || reveal}
                    onClick={() => pick(i)}
                    className={`btn flex items-center gap-4 rounded-3xl border-4 px-6 py-5 text-left normal-case font-sans text-3xl font-extrabold md:text-4xl ${cls} disabled:opacity-100`}
                  >
                    <span className="font-display text-4xl text-gold md:text-5xl">{LETTERS[i]}</span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>

            {phase === 'buzz' && (
              <div className="grid w-full max-w-6xl grid-cols-2 gap-6">
                {teams.map((t, i) => (
                  <button key={i} onClick={() => buzz(i)} className={`btn btn-xl border-8 text-white ${teamColor(i)} hover:brightness-125`}>
                    🔔 {t.name}
                  </button>
                ))}
              </div>
            )}

            {phase === 'result' && (
              <div className="flex w-full max-w-6xl flex-col items-center gap-4">
                <p className={`text-center font-display text-4xl tracking-wider md:text-5xl ${outcome.result === 'win' ? 'text-emerald-300' : 'text-red-300'}`}>{outcome.msg}</p>
                {q.explanation && <p className="text-2xl text-white/70 md:text-3xl">💡 {q.explanation}</p>}
                <button onClick={next} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
                  {idx + 1 >= questions.length ? '🏁 Ver resultado' : 'Siguiente ▶'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
