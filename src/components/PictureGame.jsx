import { useMemo, useState } from 'react'
import { sfx } from '../audio.js'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerRing from './TimerRing.jsx'
import GameOver from './GameOver.jsx'
import CardImage from './CardImage.jsx'

const ANSWER_TIME = 15
const POINTS = 100
const STEAL_POINTS = 50
const LETTERS = ['A', 'B', 'C', 'D']
const CATEGORY_LABEL = { food: 'Food', drink: 'Drink' }

// Deterministic shuffle so a topic always plays the same well-mixed deck.
function seeded(seed) {
  let s = seed >>> 0 || 1
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32 }
}
const shuffle = (arr, rnd) => {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1)

function misspell(word, rnd) {
  const letters = word.replace(/\s/g, '').split('')
  const variants = new Set()
  const tries = [
    () => { const i = 1 + Math.floor(rnd() * (letters.length - 2)); const a = letters.slice(); [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a.join('') },
    () => { const i = 1 + Math.floor(rnd() * (letters.length - 1)); const a = letters.slice(); a.splice(i, 1); return a.join('') },
    () => { const i = 1 + Math.floor(rnd() * (letters.length - 1)); const a = letters.slice(); a.splice(i, 0, a[i]); return a.join('') },
    () => { const a = letters.slice(); const i = a.findIndex((c) => 'aeiou'.includes(c) && c !== 'a'); if (i >= 0) a[i] = a[i] === 'e' ? 'i' : a[i] === 'i' ? 'e' : a[i] === 'o' ? 'u' : 'o'; return a.join('') },
  ]
  let guard = 0
  while (variants.size < 3 && guard++ < 40) {
    const v = tries[Math.floor(rnd() * tries.length)]()
    if (v && v !== letters.join('')) variants.add(v)
  }
  // keep the original spacing (e.g. "ice cream") on the correct option only; wrong ones are single words
  return [...variants]
}

function buildRounds(pictures) {
  const rnd = seeded(pictures.length * 7919 + pictures.reduce((n, p) => n + p.word.length, 0))
  const rounds = []
  const words = pictures.map((p) => p.word)
  shuffle(pictures, rnd).forEach((p, i) => {
    const kind = ['identify', 'spelling', 'category'][i % 3]
    if (kind === 'identify') {
      const wrong = shuffle(words.filter((w) => w !== p.word), rnd).slice(0, 3)
      const options = shuffle([p.word, ...wrong], rnd)
      rounds.push({ kind, image: p.image, word: p.word, prompt: 'What is this?', options, answer: options.indexOf(p.word), explanation: `It’s ${p.word}.` })
    } else if (kind === 'spelling') {
      const options = shuffle([p.word, ...misspell(p.word, rnd)], rnd)
      rounds.push({ kind, image: p.image, word: p.word, prompt: 'How do you spell it?', options, answer: options.indexOf(p.word), explanation: `${cap(p.word)}: ${p.word.replace(/\s/g, '').split('').join('-')}` })
    } else {
      const healthyQ = rnd() < 0.5
      const options = healthyQ ? ['Healthy', 'Treat (unhealthy)', 'Both', 'Neither'] : ['Food', 'Drink', 'Both', 'Neither']
      const answer = healthyQ ? (p.healthy ? 0 : 1) : (p.category === 'food' ? 0 : 1)
      rounds.push({
        kind, image: p.image, word: p.word,
        prompt: healthyQ ? `Is ${p.word} healthy or a treat?` : `Is ${p.word} food or a drink?`,
        options, answer,
        explanation: healthyQ ? `${cap(p.word)} is ${p.healthy ? 'a healthy choice' : 'a treat — enjoy it sometimes!'}.` : `${cap(p.word)} is a ${CATEGORY_LABEL[p.category].toLowerCase()}.`,
      })
    }
  })
  return rounds
}

const KIND_LABEL = { identify: '🔍 IDENTIFY', spelling: '🔤 SPELLING', category: '🗂️ CATEGORY' }

export default function PictureGame({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const rounds = useMemo(() => buildRounds(topic.topic.pictures ?? []), [topic])
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | answer | steal | result | done
  const [turn, setTurn] = useState(0)
  const [wrongPicks, setWrongPicks] = useState([])
  const [outcome, setOutcome] = useState(null)
  const r = rounds[idx]
  const other = turn === 0 ? 1 : 0
  const answering = phase === 'steal' ? other : turn

  const timer = useCountdown(() => {
    if (phase === 'answer') { sfx.timeUp(); toSteal('Time’s up!') }
    else if (phase === 'steal') { sfx.timeUp(); finish({ result: 'miss', msg: 'Time’s up! Nobody scores.' }) }
  })

  function finish(o) { timer.stop(); setOutcome(o); setPhase('result') }

  function toSteal(reason) {
    timer.stop()
    sfx.fail()
    flashBanner(`${teams[other].name.toUpperCase()} CAN STEAL!`, 'gold', 1500)
    setOutcome({ reason })
    setPhase('steal')
    timer.start(ANSWER_TIME)
  }

  const show = () => {
    sfx.drumroll()
    setTimeout(() => { setPhase('answer'); timer.start(ANSWER_TIME) }, 900)
  }

  const pick = (i) => {
    if (phase !== 'answer' && phase !== 'steal') return
    const team = answering
    if (i === r.answer) {
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

  const next = () => {
    sfx.click()
    if (idx + 1 >= rounds.length) { setPhase('done'); return }
    setIdx(idx + 1)
    setTurn(other)
    setWrongPicks([])
    setOutcome(null)
    setPhase('ready')
  }

  if (!rounds.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
        <p className="font-display text-5xl text-gold">No pictures for this topic yet.</p>
        <button onClick={onExit} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
      </div>
    )
  }

  if (phase === 'done') return <GameOver teams={teams} onExit={onExit} title="Picture Quiz — Final Score" />

  const teamColor = (i) => (i === 0 ? 'bg-teamA-dark border-teamA-glow' : 'bg-teamB-dark border-teamB-glow')
  const teamText = (i) => (i === 0 ? 'text-teamA-glow' : 'text-teamB-glow')
  const live = phase === 'answer' || phase === 'steal'

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <header className="flex items-center justify-between">
        <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
        <div className="text-center">
          <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">🖼️ PICTURE QUIZ</div>
          <div className="text-lg text-white/60">{topic.topic.name} · Card {idx + 1} / {rounds.length} · {KIND_LABEL[r.kind]}</div>
        </div>
        <div className="w-32 md:w-44"><TimerRing seconds={timer.seconds} total={ANSWER_TIME} /></div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto">
        {phase === 'ready' && (
          <>
            <p className="text-center font-display text-5xl tracking-widest text-white/80 md:text-7xl">
              <span className={teamText(turn)}>{teams[turn].name}</span>, EYES ON THE SCREEN!
            </p>
            <p className="text-2xl text-white/60">Correct: +{POINTS}. Miss it and the other team can steal for +{STEAL_POINTS}.</p>
            <button onClick={show} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">🖼️ Show Picture</button>
          </>
        )}

        {phase !== 'ready' && (
          <>
            <div className={`card w-full max-w-6xl px-8 py-5 text-center ${teamColor(answering)}`}>
              <div className="mb-2 font-display text-3xl tracking-widest text-gold md:text-4xl">
                {phase === 'steal' ? `STEAL ATTEMPT: ${teams[answering].name}` : `ANSWERING: ${teams[answering].name}`}
              </div>
              <CardImage src={r.image} alt="" size="xl" />
              <p className="font-extrabold text-4xl leading-tight md:text-6xl">{r.prompt}</p>
              {phase === 'steal' && outcome?.reason && <p className="mt-2 text-2xl text-red-300">{outcome.reason} {teams[turn].name} missed — {teams[other].name}, your turn!</p>}
            </div>

            <div className="grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
              {r.options.map((opt, i) => {
                const reveal = phase === 'result'
                let cls = 'bg-slate-800 border-white/20 hover:border-gold'
                if (reveal && i === r.answer) cls = 'bg-emerald-600 border-emerald-300 animate-pop'
                else if (wrongPicks.includes(i)) cls = 'bg-red-700 border-red-300 animate-shake'
                else if (reveal) cls = 'bg-slate-900 border-white/10 opacity-50'
                return (
                  <button
                    key={i}
                    disabled={!live || wrongPicks.includes(i)}
                    onClick={() => pick(i)}
                    className={`btn flex flex-col items-center gap-2 rounded-3xl border-4 px-4 py-5 normal-case font-sans text-3xl font-extrabold md:text-4xl ${cls} disabled:opacity-100`}
                  >
                    <span className="font-display text-4xl text-gold md:text-5xl">{LETTERS[i]}</span>
                    <span className="break-words">{opt}</span>
                  </button>
                )
              })}
            </div>

            {phase === 'result' && (
              <div className="flex w-full max-w-6xl flex-col items-center gap-3">
                <p className={`text-center font-display text-4xl tracking-wider md:text-5xl ${outcome.result === 'correct' ? 'text-emerald-300' : 'text-red-300'}`}>
                  {outcome.result === 'correct' ? '✅ ' : '❌ '}{outcome.msg}
                </p>
                <p className="text-2xl text-white/70 md:text-3xl">💡 {r.explanation}</p>
                <button onClick={next} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
                  {idx + 1 >= rounds.length ? '🏁 Final Score' : 'Next ▶'}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
