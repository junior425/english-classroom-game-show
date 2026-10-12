import { useEffect, useMemo, useRef, useState } from 'react'
import { sfx } from '../audio.js'
import { listen, recognitionSupported } from '../recognition.js'
import { speak } from '../speech.js'
import Fireworks from './Fireworks.jsx'
import GameOver from './GameOver.jsx'

const WIN = 100
const PARTIAL = 20

const WS = [
  { key: 'WHO?', q: 'Who were you with?', color: 'from-sky-500 to-blue-700', cues: ['i', 'we', 'my', 'friend', 'friends', 'family', 'mother', 'father', 'mom', 'dad', 'sister', 'brother', 'wife', 'husband', 'boyfriend', 'girlfriend', 'teacher', 'boss', 'alone', 'myself', 'with', 'people', 'classmates', 'cousin', 'parents'] },
  { key: 'WHAT?', q: 'What did you do / eat / use?', color: 'from-fuchsia-500 to-purple-700', cues: ['did', 'ate', 'had', 'made', 'played', 'went', 'bought', 'used', 'took', 'saw', 'watched', 'cooked', 'tried', 'visited', 'studied', 'worked', 'learned', 'drank', 'do', 'eat', 'play', 'buy', 'use', 'watch', 'cook', 'try', 'something'] },
  { key: 'WHERE?', q: 'Where did this happen?', color: 'from-emerald-500 to-green-700', cues: ['in', 'at', 'home', 'school', 'restaurant', 'park', 'city', 'town', 'beach', 'house', 'office', 'street', 'country', 'place', 'there', 'here', 'mall', 'store', 'kitchen', 'room', 'cali', 'bogota', 'colombia'] },
  { key: 'WHEN?', q: 'When was it?', color: 'from-amber-400 to-orange-600', cues: ['yesterday', 'last', 'ago', 'when', 'morning', 'afternoon', 'night', 'evening', 'weekend', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'summer', 'winter', 'christmas', 'birthday', 'today', 'tomorrow', 'every', 'usually', 'always', 'o\'clock', 'year', 'week', 'month', 'then'] },
  { key: 'WHY?', q: 'Why was it special? How did you feel?', color: 'from-rose-500 to-red-700', cues: ['because', 'so', 'felt', 'feel', 'happy', 'sad', 'excited', 'nervous', 'tired', 'great', 'amazing', 'special', 'favorite', 'favourite', 'love', 'loved', 'like', 'liked', 'fun', 'funny', 'delicious', 'beautiful', 'important', 'why', 'reason', 'proud', 'scared', 'angry', 'bored', 'interesting', 'best', 'worst'] },
]

const OREO = [
  { key: 'OPINION', q: 'In my opinion… / I think that…', color: 'from-sky-500 to-blue-700', cues: ['think', 'opinion', 'believe', 'agree', 'disagree', 'feel', 'view', 'sure', 'definitely', 'should', 'better', 'prefer'] },
  { key: 'REASON', q: 'The main reason is… / because…', color: 'from-fuchsia-500 to-purple-700', cues: ['because', 'reason', 'since', 'why', 'so', 'due', 'that\'s', 'firstly', 'first', 'important'] },
  { key: 'EXAMPLE', q: 'For example… / Last year I…', color: 'from-amber-400 to-orange-600', cues: ['example', 'instance', 'like', 'when', 'once', 'last', 'ago', 'remember', 'friend', 'my', 'imagine', 'case'] },
  { key: 'OPINION', q: 'That’s why I think… (repeat your opinion)', color: 'from-emerald-500 to-green-700', cues: ['that\'s', 'why', 'so', 'conclusion', 'conclude', 'therefore', 'think', 'believe', 'opinion', 'agree', 'definitely', 'again', 'overall'] },
]

const PPP = [
  { key: 'POINT', q: 'Give your direct answer.', color: 'from-sky-500 to-blue-700', cues: ['yes', 'no', 'i', 'my', 'it', 'well', 'actually', 'usually', 'never', 'always', 'sometimes', 'think', 'like', 'love'] },
  { key: 'PIVOT', q: 'Add a detail or a connector (and, but, because, actually…).', color: 'from-fuchsia-500 to-purple-700', cues: ['and', 'but', 'because', 'actually', 'also', 'especially', 'usually', 'although', 'so', 'however', 'for', 'example', 'when', 'since'] },
  { key: 'PASS', q: 'Ask your partner a quick question: “What about you?”', color: 'from-emerald-500 to-green-700', cues: ['you', 'what', 'about', 'how', 'do', 'did', 'are', 'have', 'would', 'and', 'your', 'think'] },
]

const TIME = [
  { key: 'PAST', q: 'In the past… (used to / was / did)', color: 'from-amber-400 to-orange-600', cues: ['past', 'used', 'was', 'were', 'did', 'had', 'went', 'ago', 'before', 'when', 'last', 'yesterday', 'child', 'kid', 'young', 'then'] },
  { key: 'PRESENT', q: 'Right now… (am / is / usually / these days)', color: 'from-emerald-500 to-green-700', cues: ['now', 'right', 'today', 'currently', 'these', 'days', 'am', 'is', 'are', 'usually', 'every', 'nowadays', 'still', 'present', 'have'] },
  { key: 'FUTURE', q: 'In the future… (will / going to / hope to)', color: 'from-sky-500 to-blue-700', cues: ['future', 'will', 'going', 'gonna', 'hope', 'plan', 'want', 'next', 'tomorrow', 'someday', 'soon', 'might', 'maybe', 'later', 'when'] },
]

// Each framework: steps, screen layout and the kind of conversation prompt it needs.
const FRAMEWORKS = [
  { id: 'fivew', icon: '5️⃣', name: 'THE 5 W’s BUILDER', short: '5 W’s', steps: WS, layout: 'row', seconds: 30, tagline: 'Expand a short answer into a 5-sentence story', generic: [
    'Tell us about a great meal you had.', 'Tell us about a trip or a day out you remember.', 'Tell us about something you learned recently.',
    'Tell us about the last time you helped someone.', 'Tell us about a day when everything went wrong.', 'Tell us about a celebration with your family or friends.',
    'Tell us about the last thing you bought.', 'Tell us about a time you were really happy.'],
    seeded: (w) => `Tell us about a time connected with “${w}”.` },
  { id: 'oreo', icon: '🍪', name: 'THE O.R.E.O. DEBATE', short: 'O.R.E.O.', steps: OREO, layout: 'column', seconds: 45, tagline: 'Opinion · Reason · Example · Opinion — structured arguments', generic: [
    'Is it better to live in a big city or a small town?', 'Should students use their phones in class?', 'Is online shopping better than going to a store?',
    'Is it more important to earn a lot of money or to enjoy your job?', 'Should everyone learn to cook?', 'Is social media good or bad for friendships?',
    'Would you rather travel alone or with friends?', 'Is it better to rent or to buy a home?'],
    seeded: (w) => `Is “${w}” important in your life? Give your opinion.` },
  { id: 'ppp', icon: '🏓', name: 'P.P.P. CONVERSATION', short: 'P.P.P.', steps: PPP, layout: 'row', seconds: 30, tagline: 'Point · Pivot · Pass — fast pair interaction', generic: [
    'Do you like cooking?', 'What did you do last weekend?', 'Are you a morning person?', 'Have you ever traveled abroad?',
    'What’s your favorite way to relax?', 'Do you prefer coffee or tea?', 'How do you usually get to work or school?', 'What are you going to do tonight?'],
    seeded: (w) => `Quick question: what do you think about “${w}”?` },
  { id: 'time', icon: '⏳', name: 'TIME TRAVEL', short: 'Time Travel', steps: TIME, layout: 'columns', seconds: 45, tagline: 'Past · Present · Future in one answer', generic: [
    'Talk about your free time: past, present and future.', 'Talk about the food you eat.', 'Talk about your English.',
    'Talk about where you live.', 'Talk about technology in your life.', 'Talk about your work or studies.',
    'Talk about your best friend.', 'Talk about traveling.'],
    seeded: (w) => `Talk about “${w}” in the past, right now and in the future.` },
]

const words = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean)
const hasCue = (text, cues) => { const w = new Set(words(text)); return cues.some((c) => w.has(c)) }

// Conversation prompts for the active curriculum topic: speaking scenes first (title + situation), then the
// framework's own prompts seeded with the topic's vocabulary, then the framework's generic prompts.
function buildPrompts(t, fw) {
  const out = (t.speaking ?? []).map((s) => ({ title: s.title, text: s.situation, words: s.mandatory ?? [] }))
  const vocab = [...new Set((t.pictures ?? []).map((p) => p.word))].filter((w) => w && w.split(' ').length <= 4 && !/[/?]/.test(w))
  vocab.slice(0, 8).forEach((w) => out.push({ title: t.name, text: fw.seeded(w), words: [w] }))
  fw.generic.forEach((g) => out.push({ title: t.name, text: g, words: [] }))
  return out
}

export default function FluencyCompass({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const t = topic.topic
  const [fwId, setFwId] = useState('fivew')
  const fw = FRAMEWORKS.find((f) => f.id === fwId)
  const STEPS = fw.steps
  const [TOTAL, setTotal] = useState(fw.seconds)
  const prompts = useMemo(() => buildPrompts(t, fw), [t, fw])
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
  }, [elapsed, running, left, TOTAL])

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
  const pickFramework = (id) => {
    sfx.click(); setFwId(id); setTotal(FRAMEWORKS.find((f) => f.id === id).seconds)
    if (phase !== 'ready') { recRef.current?.stop(); recRef.current = null; setPhase('ready'); setResult(null) }
  }
  const sayPrompt = () => { sfx.click(); speak(prompt.text, 'en-US') }

  const selector = (small) => (
    <div className="flex flex-wrap justify-center gap-2">
      {FRAMEWORKS.map((f) => (
        <button key={f.id} onClick={() => pickFramework(f.id)} className={`btn ${small ? 'px-3 py-1 text-lg' : 'px-5 py-2 text-2xl'} ${f.id === fwId ? 'bg-gold text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
          {f.icon} {f.short}
        </button>
      ))}
    </div>
  )

  const finishRound = (how) => {
    setResult(how)
    setPhase('play-done')
    if (how === 'win') {
      sfx.fanfare(); sfx.flashGood()
      addPoints(turn, WIN, `${fw.short} COMPLETE!`)
      setWins((w) => w.map((n, i) => (i === turn ? n + 1 : n)))
    } else {
      sfx.buzzer()
      const got = litRef.current * PARTIAL
      if (got) addPoints(turn, got, `${litRef.current} steps`)
      flashBanner(`TIME’S UP — ${litRef.current}/${STEPS.length} steps`, 'red', 1400)
    }
  }

  const nextW = () => {
    if (!running) return
    const n = litRef.current + 1
    litRef.current = n
    seenRef.current = words(transcript).length
    setLit(n)
    if (n >= STEPS.length) finishRound('win'); else sfx.plus()
  }

  // Timer expiry.
  useEffect(() => { if (running && left <= 0) finishRound('timeout') }) // eslint-disable-line react-hooks/exhaustive-deps

  // Optional speech validation: when the new words since the last card contain a cue for the current W, light it.
  useEffect(() => {
    if (!running || !micOn || !transcript) return
    const fresh = words(transcript).slice(seenRef.current).join(' ')
    if (fresh.split(' ').filter(Boolean).length >= 3 && hasCue(fresh, STEPS[litRef.current].cues)) nextW()
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
    return <GameOver teams={teams} onExit={onExit} title={`Fluency Compass — ${wins[0]} vs ${wins[1]} complete answers`} />
  }

  if (phase === 'ready') {
    return (
      <div className="flex h-full flex-col p-4 md:p-6">
        <header className="flex items-center justify-between gap-3">
          <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
          {selector(false)}
          <div className="flex items-center gap-2 text-xl text-white/70">⏱️
            {[30, 45].map((n) => <button key={n} onClick={() => { sfx.click(); setTotal(n) }} className={`btn px-3 py-1 text-xl ${TOTAL === n ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white'}`}>{n} s</button>)}
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
          <div className="text-7xl">🧭{fw.icon}</div>
          <h2 className="font-display text-5xl tracking-widest text-cyan-300 md:text-7xl">THE FLUENCY COMPASS</h2>
          <h3 className="font-display text-4xl tracking-widest text-gold md:text-6xl">{fw.name}</h3>
          <p className="max-w-5xl text-2xl text-white/80 md:text-3xl">{fw.tagline} · {t.name} · {prompts.length} prompts</p>
          <div className="flex flex-wrap justify-center gap-3">
            {STEPS.map((w, i) => <span key={i} className={`rounded-2xl bg-gradient-to-br ${w.color} px-5 py-2 font-display text-3xl text-white text-stroke`}>{w.key}</span>)}
          </div>
          <p className="max-w-5xl text-2xl text-white/70">
            Don’t freeze! Talk for <b className="text-gold">{TOTAL} seconds</b> following the {STEPS.length} steps. The teacher presses
            <b className="text-emerald-300"> SPACE / NEXT STEP</b> as you complete each one; all {STEPS.length} in time = <b className="text-emerald-300">fireworks +{WIN}</b>
            (otherwise +{PARTIAL} per step).
          </p>
          <div className="flex items-center gap-3 text-2xl text-white/70">
            <button onClick={toggleMic} className={`btn px-5 py-2 text-2xl ${micOn ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}>
              {micOn ? '🎙️ Mic validation ON' : '🎙️ Mic validation OFF'}
            </button>
            {!recognitionSupported() && <span className="text-amber-300">This browser has no speech recognition — use SPACE / NEXT STEP.</span>}
          </div>
          <button onClick={begin} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">▶ START 0:{TOTAL}</button>
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
          <div className="font-display text-2xl tracking-widest text-cyan-300 md:text-3xl">🧭 FLUENCY COMPASS · {fw.name}</div>
          <div className="text-lg text-white/60">{t.name} · Prompt {idx + 1} · <span className={teamText(turn)}>{teams[turn].name}</span> speaks</div>
          <div className="mt-1">{selector(true)}</div>
        </div>
        <div className={`rounded-2xl border-4 bg-black/70 px-5 py-1 font-display text-5xl md:text-6xl ${left <= 5 ? 'border-red-500 text-red-400 animate-pulse' : 'border-white/30 text-white'}`}>
          0:{String(Math.ceil(left)).padStart(2, '0')}
        </div>
      </header>

      {/* Conversation topic */}
      <section className={`relative z-10 mt-3 rounded-3xl border-4 bg-black/60 px-6 py-4 text-center ${teamBorder(turn)}`}>
        <div className="text-xl font-extrabold uppercase tracking-widest text-white/50">🎭 {prompt.title}</div>
        <p className="mt-1 font-display text-4xl leading-tight tracking-wide text-gold md:text-6xl">{prompt.text} <button onClick={sayPrompt} className="btn ml-2 px-3 py-1 align-middle text-2xl bg-white/10 text-white hover:bg-white/20" title="Read aloud">🔊</button></p>
        {prompt.words.length > 0 && (
          <p className="mt-2 text-2xl text-white/70">Try to use: {prompt.words.map((w) => <span key={w} className="mx-1 rounded-xl bg-white/15 px-3 py-0.5 font-bold text-white">{w}</span>)}</p>
        )}
      </section>

      {/* Progress bar */}
      <div className="relative z-10 mt-3 h-5 overflow-hidden rounded-full bg-black/60">
        <div className={`h-full transition-[width] duration-100 ease-linear ${left <= 5 ? 'bg-red-500' : left <= 12 ? 'bg-yellow-400' : 'bg-emerald-400'}`} style={{ width: `${pct}%` }} />
      </div>

      {/* Framework steps */}
      <main className={`relative z-10 mt-3 grid min-h-0 flex-1 gap-3 ${
        fw.layout === 'column' ? 'grid-cols-1 grid-rows-4' : fw.layout === 'columns' ? 'grid-cols-3' : STEPS.length === 5 ? 'grid-cols-5' : 'grid-cols-3'}`}>
        {STEPS.map((w, i) => {
          const on = i < lit
          const active = running && i === lit
          const column = fw.layout === 'column'
          return (
            <div key={i} className={`flex ${column ? 'flex-row items-center gap-6 px-6' : 'flex-col items-center justify-center p-3 text-center'} rounded-3xl border-4 transition-all duration-300 ${
              on ? 'border-emerald-300 bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,.8)]'
                : active ? `border-gold bg-gradient-to-br ${w.color} text-white animate-pulseGlow ${column ? 'scale-[1.02]' : 'scale-105'}`
                  : 'border-white/20 bg-white/5 text-white/40'}`}>
              <div className={`font-display tracking-widest ${column ? 'text-5xl md:text-6xl' : 'text-5xl md:text-7xl'}`}>{on ? '✅' : i + 1}</div>
              <div className={`font-display tracking-widest ${column ? 'text-4xl md:text-5xl min-w-[30%]' : 'text-4xl md:text-6xl'}`}>{w.key}</div>
              <div className={`${column ? 'text-2xl md:text-3xl' : 'mt-2 text-xl md:text-2xl'} font-bold ${on ? 'text-black/80' : active ? 'text-white' : 'text-white/40'}`}>{w.q}</div>
            </div>
          )
        })}
      </main>

      {result && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="animate-pop rounded-3xl bg-black/70 px-10 py-6 text-center font-display text-7xl text-stroke md:text-9xl">
            {result === 'win' ? <span className="text-emerald-300">🎆 {fw.short} COMPLETE! +{WIN}</span> : <span className="text-red-300">⏰ TIME’S UP · {lit}/{STEPS.length}</span>}
          </div>
        </div>
      )}

      {/* Mic transcript */}
      <div className="relative z-10 mt-2 flex min-h-[3rem] items-center gap-3 rounded-2xl bg-black/50 px-4 py-2">
        <button onClick={toggleMic} className={`btn px-3 py-1 text-2xl ${micOn ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`} title="Toggle speech recognition">🎙️</button>
        <p className="flex-1 truncate text-2xl text-white/80">
          {micError ? <span className="text-amber-300">Microphone blocked — allow mic access or use SPACE / NEXT STEP.</span>
            : !micOn ? <span className="text-white/40">Mic validation off · teacher presses SPACE / NEXT STEP</span>
            : transcript || <span className="animate-pulse text-white/40">Listening… answer {STEPS[Math.min(lit, STEPS.length - 1)].key}</span>}
        </p>
      </div>

      {/* Controls */}
      <footer className="relative z-10 mt-2 flex flex-wrap items-center justify-center gap-3">
        {running ? (
          <>
            <button onClick={nextW} className="btn btn-xl animate-pulseGlow bg-emerald-500 text-black hover:bg-emerald-400">✅ NEXT STEP <span className="text-xl opacity-70">(SPACE)</span></button>
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
