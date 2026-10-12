import { useEffect, useMemo, useRef, useState } from 'react'
import { sfx } from '../audio.js'
import { listen, recognitionSupported } from '../recognition.js'
import Fireworks from './Fireworks.jsx'
import GameOver from './GameOver.jsx'

const WIN = 100
const PARTIAL = 20
const TOTAL = 30

const WS = [
  { key: 'WHO?', q: 'Who were you with?', color: 'from-sky-500 to-blue-700', cues: ['i', 'we', 'my', 'friend', 'friends', 'family', 'mother', 'father', 'mom', 'dad', 'sister', 'brother', 'wife', 'husband', 'boyfriend', 'girlfriend', 'teacher', 'boss', 'alone', 'myself', 'with', 'people', 'classmates', 'cousin', 'parents'] },
  { key: 'WHAT?', q: 'What did you do / eat / use?', color: 'from-fuchsia-500 to-purple-700', cues: ['did', 'ate', 'had', 'made', 'played', 'went', 'bought', 'used', 'took', 'saw', 'watched', 'cooked', 'tried', 'visited', 'studied', 'worked', 'learned', 'drank', 'do', 'eat', 'play', 'buy', 'use', 'watch', 'cook', 'try', 'something'] },
  { key: 'WHERE?', q: 'Where did this happen?', color: 'from-emerald-500 to-green-700', cues: ['in', 'at', 'home', 'school', 'restaurant', 'park', 'city', 'town', 'beach', 'house', 'office', 'street', 'country', 'place', 'there', 'here', 'mall', 'store', 'kitchen', 'room', 'cali', 'bogota', 'colombia'] },
  { key: 'WHEN?', q: 'When was it?', color: 'from-amber-400 to-orange-600', cues: ['yesterday', 'last', 'ago', 'when', 'morning', 'afternoon', 'night', 'evening', 'weekend', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'summer', 'winter', 'christmas', 'birthday', 'today', 'tomorrow', 'every', 'usually', 'always', 'o\'clock', 'year', 'week', 'month', 'then'] },
  { key: 'WHY?', q: 'Why was it special? How did you feel?', color: 'from-rose-500 to-red-700', cues: ['because', 'so', 'felt', 'feel', 'happy', 'sad', 'excited', 'nervous', 'tired', 'great', 'amazing', 'special', 'favorite', 'favourite', 'love', 'loved', 'like', 'liked', 'fun', 'funny', 'delicious', 'beautiful', 'important', 'why', 'reason', 'proud', 'scared', 'angry', 'bored', 'interesting', 'best', 'worst'] },
]

const GENERIC = [
  'Tell us about a great meal you had.',
  'Tell us about a trip or a day out you remember.',
  'Tell us about something you learned recently.',
  'Tell us about the last time you helped someone.',
  'Tell us about a day when everything went wrong.',
  'Tell us about a celebration with your family or friends.',
  'Tell us about the last thing you bought.',
  'Tell us about a time you were really happy.',
]

const words = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean)
const hasCue = (text, cues) => { const w = new Set(words(text)); return cues.some((c) => w.has(c)) }

// Builds the list of conversation topics from the active curriculum topic: speaking scenes first (title +
// situation), then "Tell us about…" prompts seeded with the topic's vocabulary, then generic prompts.
function buildPrompts(t) {
  const out = (t.speaking ?? []).map((s) => ({ title: s.title, text: s.situation, words: s.mandatory ?? [] }))
  const vocab = [...new Set([...(t.pictures ?? []).map((p) => p.word), ...(t.steal ?? []).map((q) => q.options?.[q.answer])])]
    .filter((w) => w && w.split(' ').length <= 4 && !/[/?]/.test(w))
  vocab.slice(0, 10).forEach((w) => out.push({ title: t.name, text: `Tell us about a time connected with “${w}”.`, words: [w] }))
  GENERIC.forEach((g) => out.push({ title: t.name, text: g, words: [] }))
  return out
}

export default function FiveWGame({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const t = topic.topic
  const prompts = useMemo(() => buildPrompts(t), [t])
  const [phase, setPhase] = useState('ready') // ready | play | play-done | done
  const [idx, setIdx] = useState(0)
  const [turn, setTurn] = useState(0)
  const [lit, setLit] = useState(0) // number of W cards switched on
  const [startAt, setStartAt] = useState(0)
  const [now, setNow] = useState(0)
  const [result, setResult] = useState(null) // 'win' | 'timeout'
  const [micOn, setMicOn] = useState(recognitionSupported())
  const [micError, setMicError] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [wins, setWins] = useState([0, 0])
  const recRef = useRef(null)
  const lastBeat = useRef(-1)
  const litRef = useRef(0)
  const seenRef = useRef(0) // transcript words already consumed by previous W cards

  const prompt = prompts[idx % prompts.length]
  const elapsed = phase === 'play' ? (now - startAt) / 1000 : 0
  const left = Math.max(0, TOTAL - elapsed)
  const pct = phase === 'play' ? (left / TOTAL) * 100 : 100
  const running = phase === 'play'

  useEffect(() => () => recRef.current?.stop(), [])

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => setNow(performance.now()), 100)
    return () => clearInterval(id)
  }, [running])

  // Metronome beat once per second, faster ticks in the last 5 s.
  useEffect(() => {
    if (!running) return
    const beat = Math.floor(elapsed)
    if (beat !== lastBeat.current && beat < TOTAL) {
      lastBeat.current = beat
      if (left <= 5) sfx.tick(true); else sfx.metro(beat % 5 === 0)
    }
  }, [elapsed, running, left])

  const startMic = () => {
    recRef.current?.stop(); recRef.current = null
    if (!micOn) return
    recRef.current = listen((text) => {
      if (text === null) { setMicError(true); setMicOn(false); return }
      setTranscript(text)
    })
  }

  const launch = (i, who) => {
    litRef.current = 0; seenRef.current = 0; lastBeat.current = -1
    setIdx(i); setTurn(who); setLit(0); setResult(null); setTranscript('')
    recRef.current?.reset()
    const n = performance.now(); setStartAt(n); setNow(n)
    setPhase('play')
  }

  const begin = () => { sfx.drumroll(); launch(0, 0); startMic() }

  const finishRound = (how) => {
    setResult(how)
    setPhase('play-done')
    if (how === 'win') {
      sfx.fanfare(); sfx.flashGood()
      addPoints(turn, WIN, 'ALL 5 W’s!')
      setWins((w) => w.map((n, i) => (i === turn ? n + 1 : n)))
    } else {
      sfx.buzzer()
      const got = litRef.current * PARTIAL
      if (got) addPoints(turn, got, `${litRef.current} W’s`)
      flashBanner(`TIME’S UP — ${litRef.current}/5 W’s`, 'red', 1400)
    }
  }

  const nextW = () => {
    if (!running) return
    const n = litRef.current + 1
    litRef.current = n
    seenRef.current = words(transcript).length
    setLit(n)
    if (n >= WS.length) finishRound('win'); else sfx.plus()
  }

  // Timer expiry.
  useEffect(() => { if (running && left <= 0) finishRound('timeout') }) // eslint-disable-line react-hooks/exhaustive-deps

  // Optional speech validation: when the new words since the last card contain a cue for the current W, light it.
  useEffect(() => {
    if (!running || !micOn || !transcript) return
    const fresh = words(transcript).slice(seenRef.current).join(' ')
    if (fresh.split(' ').filter(Boolean).length >= 3 && hasCue(fresh, WS[litRef.current].cues)) nextW()
  }) // eslint-disable-line react-hooks/exhaustive-deps

  const nextStudent = () => { sfx.click(); launch(idx + 1, turn === 0 ? 1 : 0); recRef.current?.reset() }

  // Spacebar = NEXT W.
  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== 'Space' || e.target.tagName === 'INPUT') return
      e.preventDefault()
      if (running) nextW()
      else if (phase === 'play-done') nextStudent()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }) // eslint-disable-line react-hooks/exhaustive-deps

  const finish = () => { recRef.current?.stop(); setPhase('done') }
  const toggleMic = () => {
    sfx.click()
    const on = !micOn
    setMicOn(on)
    if (!on) { recRef.current?.stop(); recRef.current = null } else if (phase !== 'ready' && phase !== 'done') {
      recRef.current = listen((text) => { if (text === null) { setMicError(true); setMicOn(false) } else setTranscript(text) })
    }
  }

  const teamText = (i) => (i === 0 ? 'text-teamA-glow' : 'text-teamB-glow')
  const teamBorder = (i) => (i === 0 ? 'border-teamA-glow' : 'border-teamB-glow')

  if (phase === 'done') {
    return <GameOver teams={teams} onExit={onExit} title={`5 W’s Fluency Builder — ${wins[0]} vs ${wins[1]} complete stories`} />
  }

  if (phase === 'ready') {
    return (
      <div className="flex h-full flex-col p-4 md:p-6">
        <header><button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button></header>
        <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <div className="text-8xl">🗣️5️⃣</div>
          <h2 className="font-display text-6xl tracking-widest text-cyan-300 md:text-8xl">THE 5 W’s</h2>
          <h3 className="font-display text-4xl tracking-widest text-gold md:text-6xl">FLUENCY BUILDER</h3>
          <p className="max-w-5xl text-2xl text-white/80 md:text-3xl">{t.name} · {prompts.length} conversation topics</p>
          <div className="flex flex-wrap justify-center gap-3">
            {WS.map((w) => <span key={w.key} className={`rounded-2xl bg-gradient-to-br ${w.color} px-5 py-2 font-display text-3xl text-white text-stroke`}>{w.key}</span>)}
          </div>
          <p className="max-w-5xl text-2xl text-white/70">
            Don’t freeze! Talk for <b className="text-gold">30 seconds</b> answering <b>WHO · WHAT · WHERE · WHEN · WHY</b>. The teacher presses
            <b className="text-emerald-300"> SPACE / NEXT W</b> as you answer each one; all five in time = <b className="text-emerald-300">fireworks +{WIN}</b>
            (otherwise +{PARTIAL} per W).
          </p>
          <div className="flex items-center gap-3 text-2xl text-white/70">
            <button onClick={toggleMic} className={`btn px-5 py-2 text-2xl ${micOn ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}>
              {micOn ? '🎙️ Mic validation ON' : '🎙️ Mic validation OFF'}
            </button>
            {!recognitionSupported() && <span className="text-amber-300">This browser has no speech recognition — use SPACE / NEXT W.</span>}
          </div>
          <button onClick={begin} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">▶ START 0:30</button>
        </main>
      </div>
    )
  }

  return (
    <div className={`relative flex h-full flex-col overflow-hidden p-3 md:p-4 transition-colors duration-300 ${result === 'win' ? 'bg-emerald-500/40' : result === 'timeout' ? 'bg-red-800/40' : ''}`}>
      {result === 'win' && <Fireworks />}
      <header className="relative z-10 flex items-center justify-between gap-3">
        <button onClick={finish} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">⏹ Finish</button>
        <div className="text-center">
          <div className="font-display text-2xl tracking-widest text-cyan-300 md:text-3xl">🗣️ THE 5 W’s FLUENCY BUILDER</div>
          <div className="text-lg text-white/60">{t.name} · Story {idx + 1} · <span className={teamText(turn)}>{teams[turn].name}</span> speaks</div>
        </div>
        <div className={`rounded-2xl border-4 bg-black/70 px-5 py-1 font-display text-5xl md:text-6xl ${left <= 5 ? 'border-red-500 text-red-400 animate-pulse' : 'border-white/30 text-white'}`}>
          0:{String(Math.ceil(left)).padStart(2, '0')}
        </div>
      </header>

      {/* Conversation topic */}
      <section className={`relative z-10 mt-3 rounded-3xl border-4 bg-black/60 px-6 py-4 text-center ${teamBorder(turn)}`}>
        <div className="text-xl font-extrabold uppercase tracking-widest text-white/50">🎭 {prompt.title}</div>
        <p className="mt-1 font-display text-4xl leading-tight tracking-wide text-gold md:text-6xl">{prompt.text}</p>
        {prompt.words.length > 0 && (
          <p className="mt-2 text-2xl text-white/70">Try to use: {prompt.words.map((w) => <span key={w} className="mx-1 rounded-xl bg-white/15 px-3 py-0.5 font-bold text-white">{w}</span>)}</p>
        )}
      </section>

      {/* Progress bar */}
      <div className="relative z-10 mt-3 h-5 overflow-hidden rounded-full bg-black/60">
        <div className={`h-full transition-[width] duration-100 ease-linear ${left <= 5 ? 'bg-red-500' : left <= 12 ? 'bg-yellow-400' : 'bg-emerald-400'}`} style={{ width: `${pct}%` }} />
      </div>

      {/* 5 W cards */}
      <main className="relative z-10 mt-3 grid min-h-0 flex-1 grid-cols-5 gap-3">
        {WS.map((w, i) => {
          const on = i < lit
          const active = running && i === lit
          return (
            <div key={w.key} className={`flex flex-col items-center justify-center rounded-3xl border-4 p-3 text-center transition-all duration-300 ${
              on ? 'border-emerald-300 bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,.8)]'
                : active ? `border-gold bg-gradient-to-br ${w.color} text-white animate-pulseGlow scale-105`
                  : 'border-white/20 bg-white/5 text-white/40'}`}>
              <div className="font-display text-5xl tracking-widest md:text-7xl">{on ? '✅' : i + 1}</div>
              <div className="font-display text-4xl tracking-widest md:text-6xl">{w.key}</div>
              <div className={`mt-2 text-xl font-bold md:text-2xl ${on ? 'text-black/80' : active ? 'text-white' : 'text-white/40'}`}>{w.q}</div>
            </div>
          )
        })}
      </main>

      {result && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="animate-pop rounded-3xl bg-black/70 px-10 py-6 text-center font-display text-7xl text-stroke md:text-9xl">
            {result === 'win' ? <span className="text-emerald-300">🎆 ALL 5 W’s! +{WIN}</span> : <span className="text-red-300">⏰ TIME’S UP · {lit}/5</span>}
          </div>
        </div>
      )}

      {/* Mic transcript */}
      <div className="relative z-10 mt-2 flex min-h-[3rem] items-center gap-3 rounded-2xl bg-black/50 px-4 py-2">
        <button onClick={toggleMic} className={`btn px-3 py-1 text-2xl ${micOn ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`} title="Toggle speech recognition">🎙️</button>
        <p className="flex-1 truncate text-2xl text-white/80">
          {micError ? <span className="text-amber-300">Microphone blocked — allow mic access or use SPACE / NEXT W.</span>
            : !micOn ? <span className="text-white/40">Mic validation off · teacher presses SPACE / NEXT W</span>
            : transcript || <span className="animate-pulse text-white/40">Listening… answer {WS[Math.min(lit, 4)].key}</span>}
        </p>
      </div>

      {/* Controls */}
      <footer className="relative z-10 mt-2 flex flex-wrap items-center justify-center gap-3">
        {running ? (
          <>
            <button onClick={nextW} className="btn btn-xl animate-pulseGlow bg-emerald-500 text-black hover:bg-emerald-400">✅ NEXT W <span className="text-xl opacity-70">(SPACE)</span></button>
            <button onClick={() => finishRound('timeout')} className="btn btn-lg bg-red-600 text-white hover:bg-red-500">❄️ Froze — stop</button>
          </>
        ) : (
          <button onClick={nextStudent} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">▶ NEXT STUDENT · {teams[turn === 0 ? 1 : 0].name} <span className="text-xl opacity-70">(SPACE)</span></button>
        )}
        <button onClick={() => celebrate(turn)} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">🎉</button>
      </footer>
    </div>
  )
}
