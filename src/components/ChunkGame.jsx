import { useEffect, useMemo, useRef, useState } from 'react'
import { bgm, sfx } from '../audio.js'
import { speak, stopSpeaking, warmVoices } from '../speech.js'
import { listen, matchesChunk, recognitionSupported } from '../recognition.js'
import { buildChunkDeck, fill, tierOf } from '../data/chunks.js'
import GameOver from './GameOver.jsx'

const WIN = 100
const STEAL = 50
const TIMES = [6, 7, 8]
const SHADOW_GAP = 3000

function AudioBar({ muted, volume, onMute, onVolume }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border-2 border-cyan-400/50 bg-black/60 px-3 py-1">
      <button onClick={onMute} className="btn px-3 py-1 text-2xl bg-cyan-600 text-white hover:bg-cyan-500" title={muted ? 'Unmute' : 'Mute'}>
        {muted ? '🔇' : '🔊'}
      </button>
      <input type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={(e) => onVolume(Number(e.target.value) / 100)}
        className="w-28 accent-cyan-400" aria-label="Volume" />
      <span className="w-12 text-right font-display text-xl text-cyan-200">{muted ? 'OFF' : `${Math.round(volume * 100)}%`}</span>
    </div>
  )
}

export default function ChunkGame({ teams, topic, addPoints, stealPoints, celebrate, flashBanner, onExit }) {
  const t = topic.topic
  const tier = tierOf(topic.level?.name)
  const deck = useMemo(() => buildChunkDeck(t, topic.level?.name, t.id.length * 7 + 3), [t, topic.level])
  const [phase, setPhase] = useState('ready') // ready | play | done
  const [idx, setIdx] = useState(0)
  const [turn, setTurn] = useState(0)
  const [cardTime, setCardTime] = useState(7)
  const [cardStart, setCardStart] = useState(0)
  const [pausedAt, setPausedAt] = useState(null)
  const [now, setNow] = useState(0)
  const [flash, setFlash] = useState(null) // 'good' | 'bad'
  const [transcript, setTranscript] = useState('')
  const [micOn, setMicOn] = useState(recognitionSupported())
  const [micError, setMicError] = useState(false)
  const [shadowing, setShadowing] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [results, setResults] = useState([0, 0])
  const recRef = useRef(null)
  const lockRef = useRef(false)
  const lastBeat = useRef(-1)

  const card = deck[idx]
  const sentence = card ? fill(card.frame, card.word) : ''
  const elapsed = phase === 'play' ? ((pausedAt ?? now) - cardStart) / 1000 : 0
  const left = Math.max(0, cardTime - elapsed)
  const pct = phase === 'play' ? (left / cardTime) * 100 : 100

  useEffect(() => { warmVoices() }, [])
  useEffect(() => () => { bgm.stop(); stopSpeaking(); recRef.current?.stop() }, [])

  // Global clock (100 ms) drives the progress bar and the metronome beat.
  useEffect(() => {
    if (phase !== 'play') return undefined
    const id = setInterval(() => setNow(performance.now()), 100)
    return () => clearInterval(id)
  }, [phase])

  // Metronome: one beat per second while the card is live, accented on the first beat.
  useEffect(() => {
    if (phase !== 'play' || pausedAt !== null) return
    const beat = Math.floor(elapsed)
    if (beat !== lastBeat.current && beat < cardTime) {
      lastBeat.current = beat
      sfx.metro(beat === 0)
    }
  }, [elapsed, phase, pausedAt, cardTime])

  const startRecognition = () => {
    recRef.current?.stop()
    recRef.current = null
    if (!micOn) return
    recRef.current = listen((text) => {
      if (text === null) { setMicError(true); setMicOn(false); return }
      setTranscript(text)
    })
  }

  const launchCard = (i, who) => {
    lockRef.current = false
    lastBeat.current = -1
    setIdx(i)
    setTurn(who)
    setTranscript('')
    recRef.current?.reset()
    const n = performance.now()
    setCardStart(n)
    setNow(n)
    setPausedAt(null)
    setFlash(null)
  }

  const begin = () => {
    sfx.drumroll()
    bgm.setVolume(volume); bgm.setMuted(muted); bgm.start()
    setPhase('play')
    launchCard(0, 0)
    startRecognition()
  }

  const finish = () => {
    bgm.stop(); stopSpeaking(); recRef.current?.stop()
    setPhase('done')
  }

  const advance = (who) => {
    const next = idx + 1
    if (next >= deck.length) { finish(); return }
    launchCard(next, who)
    recRef.current?.reset()
  }

  const success = (who = turn) => {
    if (lockRef.current) return
    lockRef.current = true
    setPausedAt(performance.now())
    sfx.flashGood()
    setFlash('good')
    addPoints(who, WIN, 'FLUENT!')
    setResults((r) => r.map((n, i) => (i === who ? n + 1 : n)))
    setTimeout(() => advance(turn === 0 ? 1 : 0), 900)
  }

  const miss = (why = 'TIME’S UP') => {
    if (lockRef.current) return
    lockRef.current = true
    setPausedAt(performance.now())
    sfx.buzzer()
    setFlash('bad')
    flashBanner(`${why} — ${teams[turn === 0 ? 1 : 0].name.toUpperCase()}, YOUR TURN!`, 'red', 1200)
    setTimeout(() => advance(turn === 0 ? 1 : 0), 1200)
  }

  // Timer expiry.
  useEffect(() => {
    if (phase === 'play' && pausedAt === null && left <= 0 && !lockRef.current) miss()
  })

  // Speech-to-text validation.
  useEffect(() => {
    if (phase !== 'play' || !card || lockRef.current || pausedAt !== null) return
    if (matchesChunk(transcript, card.frame, card.word).ok) success()
  }) // eslint-disable-line react-hooks/exhaustive-deps

  const shadow = async () => {
    if (shadowing || !card) return
    setShadowing(true)
    const wasPaused = pausedAt !== null
    const p = performance.now()
    if (!wasPaused) setPausedAt(p)
    recRef.current?.stop(); recRef.current = null
    await speak(sentence, tier === 'Advanced' ? 'en-GB' : 'en-US', 0.9)
    await new Promise((r) => setTimeout(r, SHADOW_GAP))
    await speak(sentence, tier === 'Advanced' ? 'en-GB' : 'en-US', 0.9)
    setShadowing(false)
    if (phase === 'play' && !wasPaused && !lockRef.current) {
      const resumeAt = performance.now()
      setCardStart((s) => s + (resumeAt - p))
      setNow(resumeAt)
      setPausedAt(null)
      startRecognition()
    }
  }

  const togglePause = () => {
    sfx.click()
    if (pausedAt !== null) {
      const n = performance.now()
      setCardStart((s) => s + (n - pausedAt))
      setNow(n)
      setPausedAt(null)
    } else setPausedAt(performance.now())
  }

  const toggleMic = () => {
    sfx.click()
    const on = !micOn
    setMicOn(on)
    if (!on) { recRef.current?.stop(); recRef.current = null } else if (phase === 'play') {
      recRef.current = listen((text) => { if (text === null) { setMicError(true); setMicOn(false) } else setTranscript(text) })
    }
  }

  const toggleMute = () => { const m = !muted; setMuted(m); bgm.setMuted(m); sfx.click() }
  const changeVolume = (v) => { setVolume(v); bgm.setVolume(v) }

  if (!deck.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 p-10 text-center">
        <p className="font-display text-5xl text-gold">No vocabulary for this topic yet.</p>
        <button onClick={onExit} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
      </div>
    )
  }

  if (phase === 'done') {
    return <GameOver teams={teams} onExit={onExit} title={`Chunk Express — ${results[0] + results[1]} fluent chunks!`} />
  }

  const teamText = (i) => (i === 0 ? 'text-teamA-glow' : 'text-teamB-glow')
  const teamBorder = (i) => (i === 0 ? 'border-teamA-glow' : 'border-teamB-glow')
  const other = turn === 0 ? 1 : 0
  const [before, after] = card.frame.split(/_+/)

  if (phase === 'ready') {
    return (
      <div className="flex h-full flex-col p-4 md:p-6">
        <header className="flex items-center justify-between">
          <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Main Menu</button>
          <AudioBar muted={muted} volume={volume} onMute={toggleMute} onVolume={changeVolume} />
        </header>
        <main className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <div className="text-8xl">🧠🚂</div>
          <h2 className="font-display text-6xl tracking-widest text-cyan-300 md:text-8xl">NEURO-SPEAKING</h2>
          <h3 className="font-display text-4xl tracking-widest text-gold md:text-6xl">THE CHUNK EXPRESS</h3>
          <p className="max-w-5xl text-2xl text-white/80 md:text-3xl">
            {t.name} · <span className="text-cyan-300">{tier} chunks</span> · {deck.length} pictures
          </p>
          <p className="max-w-5xl text-2xl text-white/70">
            A giant <b className="text-gold">chunk frame</b> stays on top. Pictures change every {cardTime} s. Say the <b>complete sentence</b> out loud —
            no pauses, no translating! The mic hears you: a fluent sentence = <b className="text-emerald-300">green flash +{WIN}</b> and the next picture.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold uppercase tracking-widest text-white/60">Seconds per picture</span>
            {TIMES.map((n) => (
              <button key={n} onClick={() => { sfx.click(); setCardTime(n) }}
                className={`btn px-5 py-2 text-3xl ${cardTime === n ? 'bg-gold text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>{n}s</button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-2xl text-white/70">
            <button onClick={toggleMic} className={`btn px-5 py-2 text-2xl ${micOn ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}>
              {micOn ? '🎙️ Speech recognition ON' : '🎙️ Speech recognition OFF'}
            </button>
            {!recognitionSupported() && <span className="text-amber-300">This browser has no speech recognition — use the teacher buttons.</span>}
          </div>
          <button onClick={begin} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">🚂 ALL ABOARD! START</button>
        </main>
      </div>
    )
  }

  return (
    <div className={`relative flex h-full flex-col p-3 md:p-4 transition-colors duration-200 ${
      flash === 'good' ? 'bg-emerald-500/60' : flash === 'bad' ? 'bg-red-700/50' : ''}`}>
      <header className="flex items-center justify-between gap-3">
        <button onClick={finish} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">⏹ Finish</button>
        <div className="text-center">
          <div className="font-display text-2xl tracking-widest text-cyan-300 md:text-3xl">🧠🚂 THE CHUNK EXPRESS · {tier.toUpperCase()}</div>
          <div className="text-lg text-white/60">{t.name} · Picture {idx + 1} / {deck.length}</div>
        </div>
        <AudioBar muted={muted} volume={volume} onMute={toggleMute} onVolume={changeVolume} />
      </header>

      {/* Chunk frame */}
      <section className={`mt-3 rounded-3xl border-4 bg-black/60 px-6 py-4 text-center ${teamBorder(turn)}`}>
        <div className="text-xl font-extrabold uppercase tracking-widest text-white/50">
          Chunk frame · <span className={teamText(turn)}>{teams[turn].name}</span> speaks
        </div>
        <p className="mt-1 font-display text-5xl leading-tight tracking-wide text-white md:text-7xl">
          {before}<span className={`mx-2 inline-block min-w-[6ch] rounded-2xl border-b-8 border-dashed px-3 ${flash === 'good' ? 'border-emerald-300 text-emerald-200' : 'border-gold text-gold'}`}>
            {flash === 'good' ? card.word : '______'}
          </span>{after}
        </p>
      </section>

      {/* Visual */}
      <main className="relative mt-3 min-h-0 flex-1">
        <div className={`flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-4 border-white/20 bg-gradient-to-br ${card.tint}`}>
          {card.image ? (
            <img key={card.image} src={card.image} alt="" className="h-full w-full animate-pop object-contain p-6 drop-shadow-2xl" />
          ) : (
            <div key={card.word} className="animate-pop px-8 text-center font-display text-7xl leading-none tracking-wide text-white text-stroke md:text-9xl">
              {card.word}
            </div>
          )}
          {flash === 'good' && (
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-400/70">
              <div className="animate-pop font-display text-8xl text-black text-stroke md:text-[10rem]">✅ +{WIN}</div>
            </div>
          )}
          {flash === 'bad' && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-700/60">
              <div className="animate-pop font-display text-8xl text-white text-stroke md:text-[10rem]">⏰ NEXT!</div>
            </div>
          )}
          {pausedAt !== null && !flash && (
            <div className="absolute left-4 top-4 rounded-2xl bg-black/70 px-4 py-2 font-display text-3xl text-gold">{shadowing ? '🔁 SHADOWING…' : '⏸ PAUSED'}</div>
          )}
        </div>
        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-5 overflow-hidden rounded-b-3xl bg-black/60">
          <div className={`h-full transition-[width] duration-100 ease-linear ${left <= 2 ? 'bg-red-500' : left <= 4 ? 'bg-yellow-400' : 'bg-emerald-400'}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="absolute bottom-7 right-4 rounded-2xl bg-black/70 px-4 py-1 font-display text-5xl text-white">{Math.ceil(left)}</div>
      </main>

      {/* Mic transcript */}
      <div className="mt-2 flex min-h-[3rem] items-center gap-3 rounded-2xl bg-black/50 px-4 py-2">
        <button onClick={toggleMic} className={`btn px-3 py-1 text-2xl ${micOn ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`} title="Toggle speech recognition">🎙️</button>
        <p className="flex-1 truncate text-2xl text-white/80">
          {micError ? <span className="text-amber-300">Microphone blocked — allow mic access or use the buttons.</span>
            : !micOn ? <span className="text-white/40">Speech recognition off · teacher judges</span>
            : transcript || <span className="animate-pulse text-white/40">Listening… say: “{sentence}”</span>}
        </p>
      </div>

      {/* Controls */}
      <footer className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button onClick={shadow} disabled={shadowing} className="btn btn-lg bg-cyan-500 text-black hover:bg-cyan-400">🔁 Listen & Repeat</button>
        <button onClick={() => success()} className="btn btn-lg bg-emerald-500 text-black hover:bg-emerald-400">✅ Fluent +{WIN}</button>
        <button onClick={() => miss('MISSED')} className="btn btn-lg bg-red-600 text-white hover:bg-red-500">❌ Missed</button>
        <button onClick={() => { if (lockRef.current) return; lockRef.current = true; setPausedAt(performance.now()); stealPoints(other, STEAL); setTimeout(() => advance(other), 900) }}
          className="btn btn-lg bg-gold text-black hover:bg-yellow-300">⚡ {teams[other].name} steals +{STEAL}</button>
        <button onClick={togglePause} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">{pausedAt !== null ? '▶ Resume' : '⏸ Pause'}</button>
        <button onClick={() => celebrate(turn)} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">🎉</button>
      </footer>
    </div>
  )
}
