import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { bgm, sfx } from '../audio.js'
import { speak, stopSpeaking } from '../speech.js'
import CardImage from './CardImage.jsx'
import Fireworks from './Fireworks.jsx'

const TOTAL = 15 * 60
const PHASE_LEN = 5 * 60
const POINTS = 100
const PENALTY = 50
const STEAL_POINTS = 100

const PHASES = [
  { id: 'pictures', icon: '🖼️🔊', title: 'SPEED PICTURES & SOUND', time: 5, hint: 'Listen & look. First to SAY IT or SPELL IT wins!' },
  { id: 'charades', icon: '🎭', title: 'BACK-TO-SCREEN CHARADES', time: 15, hint: 'Guessers: BACK to the screen! Your row acts it out — no words!' },
  { id: 'grammar', icon: '⚡', title: 'GRAMMAR TRAP EXPRESS', time: 10, hint: 'Correct sentence or TRAP? Fix it on the fly!' },
]

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

// Every phase gets a deck built from whatever the active topic offers, so the mode works for all
// 163 topics: visual topics use pictures, grammar-only topics fall back to questions / sentences.
function buildDecks(t) {
  const rnd = seeded((t.steal?.length ?? 0) * 31 + (t.auction?.length ?? 0) * 17 + (t.name?.length ?? 0))
  const pictures = (t.pictures ?? []).map((p) => ({ kind: 'picture', image: p.image, word: p.word, say: p.word, prompt: 'SAY IT or SPELL IT!', answer: cap(p.word) }))
  const dictations = (t.listening ?? []).filter((l) => l.kind === 'dictation').map((l) => ({ kind: 'sound', say: l.text, voice: l.voice, prompt: '🔊 LISTEN — REPEAT IT or SPELL THE KEY WORD!', answer: l.text }))
  const questions = (t.steal ?? []).map((q) => ({ kind: 'question', image: q.image, say: q.prompt.replace(/_+/g, 'blank'), prompt: q.prompt, options: q.options, answer: q.options[q.answer], explanation: q.explanation }))
  const speedDeck = shuffle(pictures.length ? [...pictures, ...dictations] : [...dictations, ...questions], rnd)

  const scenes = (t.speaking ?? []).map((s) => ({ kind: 'scene', text: s.title, detail: s.situation, words: s.mandatory }))
  const actions = (t.pictures ?? []).map((p) => ({ kind: 'action', text: p.word }))
  const sentences = (t.auction ?? []).filter((a) => a.correct).map((a) => ({ kind: 'sentence', text: a.sentence }))
  const charadeDeck = shuffle(actions.length ? [...actions, ...scenes] : scenes.length ? [...scenes, ...sentences] : sentences, rnd)

  const grammarDeck = shuffle((t.auction ?? []).map((a) => ({ kind: 'trap', text: a.sentence, correct: a.correct, fix: a.fix, explanation: a.explanation })), rnd)
  return [speedDeck, charadeDeck, grammarDeck]
}

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function AudioBar({ muted, volume, onMute, onVolume }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-fuchsia-400/60 bg-black/60 px-4 py-2 shadow-[0_0_20px_rgba(217,70,239,.5)]">
      <button onClick={onMute} className="btn px-3 py-1 text-2xl bg-fuchsia-600 text-white hover:bg-fuchsia-500" title={muted ? 'Unmute music' : 'Mute music'}>
        {muted ? '🔇' : '🎵'}
      </button>
      <input
        type="range" min="0" max="100" value={Math.round(volume * 100)}
        onChange={(e) => onVolume(Number(e.target.value) / 100)}
        className="w-28 accent-fuchsia-400 md:w-40"
        aria-label="Music volume"
      />
      <span className="w-12 text-right font-display text-xl text-fuchsia-200">{muted ? 'OFF' : `${Math.round(volume * 100)}%`}</span>
    </div>
  )
}

export default function ArcadeGame({ teams, topic, addPoints, stealPoints, flashBanner, onExit }) {
  const decks = useMemo(() => buildDecks(topic.topic), [topic])
  const [started, setStarted] = useState(false)
  const [remaining, setRemaining] = useState(TOTAL)
  const [cardStart, setCardStart] = useState(0)
  const [idx, setIdx] = useState([0, 0, 0])
  const [revealedKey, setRevealedKey] = useState(null)
  const [pair, setPair] = useState(1)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [flash, setFlash] = useState(null)
  const spokenFor = useRef(null)

  const phaseIdx = Math.min(2, Math.floor((TOTAL - remaining) / PHASE_LEN))
  const phase = PHASES[phaseIdx]
  const deck = decks[phaseIdx]
  const card = deck.length ? deck[idx[phaseIdx] % deck.length] : null
  const done = remaining <= 0
  const cardKey = `${phaseIdx}-${idx[phaseIdx]}`
  const revealed = revealedKey === cardKey
  const setRevealed = (v) => setRevealedKey(v ? cardKey : null)
  const elapsed = TOTAL - remaining
  const cardLeft = revealed ? null : Math.max(0, phase.time - (elapsed - Math.max(cardStart, phaseIdx * PHASE_LEN)))

  // Global 15:00 clock.
  useEffect(() => {
    if (!started || done) return
    const iv = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000)
    return () => clearInterval(iv)
  }, [started, done])

  // Accelerated tick in the last 5 seconds of each card (the clock itself is derived from the global timer).
  useEffect(() => {
    if (!started || done || cardLeft === null || cardLeft > 5) return
    if (cardLeft === 0) { sfx.timeUp(); return }
    sfx.tick(cardLeft <= 2)
    if (cardLeft <= 2) { const t = setTimeout(() => sfx.tick(true), 500); return () => clearTimeout(t) }
  }, [started, done, cardLeft, cardKey])

  // Phase 1 auto-plays the native pronunciation of each card.
  useEffect(() => {
    if (!started || done || !card || phaseIdx !== 0 || spokenFor.current === cardKey) return
    spokenFor.current = cardKey
    speak(card.say, card.voice ?? 'en-US')
  }, [started, done, card, phaseIdx, cardKey])

  // Phase change banner.
  const prevPhase = useRef(0)
  useEffect(() => {
    if (!started || done || prevPhase.current === phaseIdx) return
    prevPhase.current = phaseIdx
    sfx.reveal()
    flashBanner(`PHASE ${phaseIdx + 1}: ${PHASES[phaseIdx].title}`, 'gold', 2500)
  }, [phaseIdx, started, done, flashBanner])

  // 0:00 → lock screen, fanfare, fireworks.
  useEffect(() => {
    if (!done) return
    bgm.stop()
    stopSpeaking()
    sfx.fanfare()
  }, [done])

  useEffect(() => () => { bgm.stop(); stopSpeaking() }, [])

  const toggleMute = () => { const m = !muted; setMuted(m); bgm.setMuted(m); sfx.click() }
  const changeVolume = (v) => { setVolume(v); bgm.setVolume(v) }

  const start = () => {
    sfx.drumroll()
    bgm.setVolume(volume)
    bgm.setMuted(muted)
    bgm.start()
    setCardStart(0)
    setStarted(true)
  }

  const next = useCallback(() => {
    setIdx((arr) => arr.map((n, i) => (i === phaseIdx ? n + 1 : n)))
    setRevealedKey(null)
    setCardStart(elapsed)
    setPair((p) => p + 1)
  }, [phaseIdx, elapsed])

  const pulse = (tone) => { setFlash(tone); setTimeout(() => setFlash(null), 450) }

  const correct = (team) => {
    sfx.bell()
    addPoints(team, POINTS)
    pulse(team === 0 ? 'A' : 'B')
    flashBanner(`+${POINTS} ${teams[team].name.toUpperCase()}!`, team === 0 ? 'teamA' : 'teamB', 900)
    if (phaseIdx === 2 && !revealed) setRevealed(true)
    else next()
  }
  const wrong = (team) => {
    sfx.buzzer()
    addPoints(team, -PENALTY)
    pulse('red')
  }
  const steal = (team) => { stealPoints(team, STEAL_POINTS); pulse(team === 0 ? 'A' : 'B') }
  const replay = () => { if (card) speak(card.say, card.voice ?? 'en-US') }

  const [a, b] = teams.map((t) => t.score)
  const winner = a === b ? null : a > b ? 0 : 1
  const neon = 'drop-shadow-[0_0_18px_rgba(34,211,238,.9)]'
  const urgent = cardLeft !== null && cardLeft <= 5

  if (!started) {
    return (
      <div className="relative flex h-full flex-col items-center justify-center gap-6 overflow-auto bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(34,211,238,.25),transparent_60%)] p-8 text-center">
        <button onClick={onExit} className="btn absolute left-4 top-4 px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
        <div className="absolute right-4 top-4"><AudioBar muted={muted} volume={volume} onMute={toggleMute} onVolume={changeVolume} /></div>
        <h2 className={`font-display text-6xl tracking-widest text-cyan-300 md:text-8xl ${neon}`}>🕹️ 15-MINUTE ARCADE SPEED</h2>
        <p className="text-2xl text-white/70 md:text-3xl">{topic.level.name} → {topic.unit.name} → <span className="text-gold">{topic.topic.name}</span></p>
        <div className="grid w-full max-w-6xl gap-4 md:grid-cols-3">
          {PHASES.map((p, i) => (
            <div key={p.id} className="card border-fuchsia-400/50 p-5 text-left shadow-[0_0_30px_rgba(217,70,239,.35)]">
              <div className="font-display text-2xl text-fuchsia-300">PHASE {i + 1} · {fmt(TOTAL - i * PHASE_LEN)} → {fmt(TOTAL - (i + 1) * PHASE_LEN)}</div>
              <div className="mt-1 font-display text-4xl tracking-wider text-white">{p.icon} {p.title}</div>
              <p className="mt-2 text-xl text-white/70">{p.hint}</p>
              <p className="mt-2 text-lg text-cyan-300">{p.time} s per card · {decks[i].length} cards</p>
            </div>
          ))}
        </div>
        <p className="text-2xl text-white/60">Two rows: <span className="text-teamA-glow">{teams[0].name}</span> vs <span className="text-teamB-glow">{teams[1].name}</span>. The first pair steps up; CORRECT = +{POINTS}, INCORRECT = −{PENALTY}, STEAL = {STEAL_POINTS}.</p>
        <button onClick={start} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">▶ START 15:00</button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="relative flex h-full flex-col items-center justify-center gap-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,.2),rgba(0,0,0,.9))] p-8 text-center">
        <Fireworks />
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="font-display text-7xl tracking-widest text-red-400 text-stroke md:text-9xl">0:00 — TIME’S UP!</div>
          <h2 className={`font-display text-5xl tracking-widest text-cyan-300 md:text-6xl ${neon}`}>🕹️ ARCADE SPEED — FINAL</h2>
          {winner === null ? (
            <p className="font-display text-8xl text-gold text-stroke md:text-[9rem]">IT’S A TIE!</p>
          ) : (
            <>
              <p className="text-3xl font-extrabold text-white/80">🏆 WINNER 🏆</p>
              <p className={`animate-pop font-display text-8xl text-stroke md:text-[10rem] ${winner === 0 ? 'text-teamA-glow' : 'text-teamB-glow'}`}>{teams[winner].name}</p>
            </>
          )}
          <p className="text-4xl font-extrabold"><span className="text-teamA-glow">{teams[0].name} {a}</span> <span className="text-white/40">vs</span> <span className="text-teamB-glow">{teams[1].name} {b}</span></p>
          <button onClick={() => { sfx.click(); onExit() }} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">Main Menu</button>
        </div>
      </div>
    )
  }

  const flashCls = flash === 'A' ? 'ring-8 ring-teamA-glow' : flash === 'B' ? 'ring-8 ring-teamB-glow' : flash === 'red' ? 'ring-8 ring-red-500 animate-shake' : ''

  return (
    <div className={`flex h-full flex-col gap-3 bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(34,211,238,.18),transparent_55%)] p-3 transition md:p-5 ${flashCls}`}>
      <header className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-3">
          <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
          <AudioBar muted={muted} volume={volume} onMute={toggleMute} onVolume={changeVolume} />
        </div>
        <div className={`text-center font-display tabular-nums leading-none text-stroke ${remaining <= 60 ? 'animate-pulse text-red-400' : 'text-cyan-300'} text-7xl md:text-[7rem] ${neon}`}>
          {fmt(remaining)}
        </div>
        <div className="text-right">
          <div className="font-display text-2xl tracking-widest text-fuchsia-300 md:text-3xl">PHASE {phaseIdx + 1} / 3</div>
          <div className="font-display text-3xl tracking-wider text-white md:text-4xl">{phase.icon} {phase.title}</div>
          <div className="text-lg text-white/60">Pair #{pair} · {topic.topic.name}</div>
        </div>
      </header>

      <div className="flex gap-1">
        {PHASES.map((p, i) => (
          <div key={p.id} className={`h-3 flex-1 rounded-full ${i < phaseIdx ? 'bg-fuchsia-500' : i === phaseIdx ? 'bg-cyan-400 animate-pulse' : 'bg-white/15'}`} />
        ))}
      </div>

      <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto">
        <div className={`absolute right-2 top-2 flex h-24 w-24 items-center justify-center rounded-full border-4 font-display text-5xl md:h-32 md:w-32 md:text-7xl ${urgent ? 'animate-pulse border-red-400 text-red-400 shadow-[0_0_40px_rgba(248,113,113,.8)]' : 'border-gold text-gold'}`}>
          {cardLeft ?? '⏸'}
        </div>

        {!card && (
          <p className="font-display text-5xl text-gold">No {phase.title.toLowerCase()} cards for this topic — press NEXT PAIR to keep the clock running.</p>
        )}

        {card && phaseIdx === 0 && (
          <div className="card w-full max-w-6xl border-cyan-400/60 px-8 py-5 text-center shadow-[0_0_40px_rgba(34,211,238,.35)]">
            <p className="mb-2 font-display text-3xl tracking-widest text-cyan-300 md:text-4xl">{card.prompt}</p>
            {card.image && <CardImage src={card.image} alt="" size="xl" />}
            {card.kind === 'sound' && <div className="my-6 text-9xl">🔊</div>}
            {card.kind === 'question' && (
              <>
                <p className="font-extrabold text-4xl leading-tight md:text-6xl">{card.prompt}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {card.options.map((o) => <div key={o} className="rounded-2xl border-2 border-white/20 bg-black/40 px-3 py-2 text-2xl font-extrabold md:text-3xl">{o}</div>)}
                </div>
              </>
            )}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              <button onClick={replay} className="btn px-6 py-3 text-2xl bg-cyan-500 text-black hover:bg-cyan-400">🔊 Play Again</button>
              <button onClick={() => setRevealed(true)} className="btn px-6 py-3 text-2xl bg-white/10 text-white hover:bg-white/20">👁 Reveal</button>
              {revealed && <span className="animate-pop font-display text-4xl text-emerald-300 md:text-6xl">{card.answer}</span>}
            </div>
          </div>
        )}

        {card && phaseIdx === 1 && (
          <div className="card w-full max-w-7xl border-fuchsia-400/60 px-8 py-8 text-center shadow-[0_0_40px_rgba(217,70,239,.35)]">
            <p className="font-display text-3xl tracking-widest text-fuchsia-300 md:text-5xl">🎭 ACT THIS OUT — GUESSERS, DON’T LOOK!</p>
            <p className="my-6 font-display text-7xl uppercase leading-none tracking-wider text-white text-stroke md:text-[8rem]">{card.text}</p>
            {card.detail && <p className="text-2xl text-white/70 md:text-3xl">{card.detail}</p>}
            {card.words && <p className="mt-3 text-2xl text-gold">Key words: {card.words.join(' · ')}</p>}
          </div>
        )}

        {card && phaseIdx === 2 && (
          <div className="card w-full max-w-7xl border-yellow-400/60 px-8 py-8 text-center shadow-[0_0_40px_rgba(250,204,21,.3)]">
            <p className="font-display text-3xl tracking-widest text-yellow-300 md:text-5xl">⚡ CORRECT or TRAP? FIX IT!</p>
            <p className="my-6 font-extrabold text-5xl leading-tight md:text-7xl">“{card.text}”</p>
            {!revealed ? (
              <button onClick={() => { sfx.reveal(); setRevealed(true) }} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">👁 Reveal</button>
            ) : (
              <div className="animate-pop">
                <p className={`font-display text-5xl md:text-6xl ${card.correct ? 'text-emerald-300' : 'text-red-300'}`}>{card.correct ? '✅ CORRECT SENTENCE' : '❌ TRAP!'}</p>
                {card.fix && <p className="mt-2 text-4xl font-extrabold text-emerald-300 md:text-5xl">✔ {card.fix}</p>}
                <p className="mt-2 text-2xl text-white/70 md:text-3xl">💡 {card.explanation}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
        {[0, 1].map((team) => (
          <div key={team} className={`flex flex-wrap items-center justify-center gap-2 rounded-3xl border-4 p-3 ${team === 0 ? 'border-teamA-glow bg-teamA-dark/40' : 'border-teamB-glow bg-teamB-dark/40'}`}>
            <span className={`w-full text-center font-display text-3xl tracking-wider ${team === 0 ? 'text-teamA-glow' : 'text-teamB-glow'}`}>{teams[team].name}</span>
            <button onClick={() => correct(team)} className="btn px-5 py-3 text-2xl bg-emerald-500 text-black hover:bg-emerald-400 md:text-3xl">✅ CORRECT +{POINTS}</button>
            <button onClick={() => wrong(team)} className="btn px-5 py-3 text-2xl bg-red-500 text-white hover:bg-red-400 md:text-3xl">❌ INCORRECT −{PENALTY}</button>
            <button onClick={() => steal(team)} className="btn px-5 py-3 text-2xl bg-gold text-black hover:bg-yellow-300 md:text-3xl">🦹 STEAL</button>
          </div>
        ))}
        <button onClick={() => { sfx.click(); next() }} className="btn col-start-2 row-start-1 self-center px-8 py-6 text-3xl animate-pulseGlow bg-fuchsia-500 text-white hover:bg-fuchsia-400 md:text-4xl">
          NEXT PAIR ▶
        </button>
      </footer>
    </div>
  )
}
