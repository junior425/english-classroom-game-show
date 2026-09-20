import { useState } from 'react'
import { sfx } from '../audio.js'
import { useCountdown } from '../hooks/useCountdown.js'
import TimerRing from './TimerRing.jsx'
import GameOver from './GameOver.jsx'

const BET_TIME = 30
const BETS = [50, 100, 200, 300]

function BetPanel({ team, index, bet, onChange, locked }) {
  const isA = index === 0
  const allIn = Math.max(team.score, 50)
  return (
    <div className={`card flex flex-col gap-4 p-5 ${isA ? 'border-teamA-glow bg-teamA-dark/40' : 'border-teamB-glow bg-teamB-dark/40'} ${locked ? 'opacity-90' : ''}`}>
      <div className={`font-display text-3xl tracking-widest md:text-4xl ${isA ? 'text-teamA-glow' : 'text-teamB-glow'}`}>{team.name}</div>

      <div>
        <div className="mb-2 text-lg font-extrabold uppercase text-white/60">💰 Apuesta</div>
        <div className="flex flex-wrap gap-2">
          {[...BETS, allIn].map((v, i) => (
            <button
              key={i}
              disabled={locked}
              onClick={() => { sfx.bet(); onChange({ ...bet, amount: v }) }}
              className={`btn px-4 py-2 text-2xl md:text-3xl ${bet.amount === v ? 'bg-gold text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {i === BETS.length ? `TODO (${v})` : v}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-lg font-extrabold uppercase text-white/60">🤔 Veredicto</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            disabled={locked}
            onClick={() => { sfx.click(); onChange({ ...bet, verdict: true }) }}
            className={`btn px-4 py-3 text-2xl md:text-3xl ${bet.verdict === true ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >✅ Correcta</button>
          <button
            disabled={locked}
            onClick={() => { sfx.click(); onChange({ ...bet, verdict: false }) }}
            className={`btn px-4 py-3 text-2xl md:text-3xl ${bet.verdict === false ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >🪤 Trampa</button>
        </div>
      </div>
    </div>
  )
}

const emptyBet = { amount: 100, verdict: null }

export default function AuctionGame({ teams, topic, addPoints, celebrate, flashBanner, onExit }) {
  const items = topic.topic.auction
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | bet | reveal | done
  const [bets, setBets] = useState([emptyBet, emptyBet])
  const [results, setResults] = useState(null)
  const item = items[idx]

  const timer = useCountdown(() => {
    if (phase === 'bet') flashBanner('⏰ ¡SE ACABÓ EL TIEMPO! Apuestas cerradas', 'red')
  })

  const show = () => {
    sfx.drumroll()
    setTimeout(() => { setPhase('bet'); timer.start(BET_TIME) }, 1200)
  }

  const canReveal = bets.every((b) => b.verdict !== null)

  const reveal = () => {
    timer.stop()
    sfx.drumroll()
    setTimeout(() => {
      sfx.reveal()
      const res = bets.map((b, i) => {
        const ok = b.verdict === item.correct
        addPoints(i, ok ? b.amount : -b.amount, ok ? 'GANA' : 'PIERDE')
        return ok
      })
      setResults(res)
      setPhase('reveal')
      const winners = res.map((ok, i) => (ok ? i : null)).filter((x) => x !== null)
      if (winners.length === 1) celebrate(winners[0])
      else if (winners.length === 2) { sfx.win(); flashBanner('¡AMBOS EQUIPOS ACIERTAN!', 'gold') }
      else { sfx.fail(); flashBanner('¡NADIE ACIERTA! 😂', 'red') }
    }, 1300)
  }

  const next = () => {
    sfx.click()
    if (idx + 1 >= items.length) { setPhase('done'); return }
    setIdx(idx + 1)
    setPhase('ready')
    setBets([emptyBet, emptyBet])
    setResults(null)
  }

  if (phase === 'done') return <GameOver teams={teams} onExit={onExit} title="Fin de la Subasta Gramatical" />

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <header className="flex items-center justify-between">
        <button onClick={onExit} className="btn px-4 py-2 text-xl bg-white/10 text-white hover:bg-white/20">← Menú</button>
        <div className="text-center">
          <div className="font-display text-3xl tracking-widest text-gold md:text-4xl">🔨 LA SUBASTA GRAMATICAL</div>
          <div className="text-lg text-white/60">{topic.topic.name} · Frase {idx + 1} / {items.length}</div>
        </div>
        <div className="w-32 md:w-44"><TimerRing seconds={timer.seconds} total={BET_TIME} /></div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-auto">
        {phase === 'ready' && (
          <>
            <p className="text-center font-display text-5xl tracking-widest text-white/80 md:text-7xl">¿CORRECTA O TRAMPA?</p>
            <p className="max-w-4xl text-center text-2xl text-white/60">Cada equipo apuesta sus puntos. Si acierta el veredicto, gana la apuesta; si falla, la pierde.</p>
            <button onClick={show} className="btn btn-xl animate-pulseGlow bg-gold text-black hover:bg-yellow-300">🥁 Mostrar frase</button>
          </>
        )}

        {phase !== 'ready' && (
          <>
            <div className={`card w-full max-w-6xl px-8 py-6 text-center ${phase === 'reveal' ? (item.correct ? 'border-emerald-300 bg-emerald-900/50' : 'border-red-300 bg-red-900/50') : ''}`}>
              <p className="font-extrabold text-4xl leading-tight md:text-6xl">“{item.sentence}”</p>
              {phase === 'reveal' && (
                <div className="mt-4 animate-pop">
                  <p className={`font-display text-5xl tracking-widest md:text-6xl ${item.correct ? 'text-emerald-300' : 'text-red-300'}`}>
                    {item.correct ? '✅ ¡CORRECTA!' : '🪤 ¡TRAMPA!'}
                  </p>
                  {item.fix && <p className="mt-2 text-3xl text-emerald-200">✔ {item.fix}</p>}
                  {item.explanation && <p className="mt-2 text-2xl text-white/70">💡 {item.explanation}</p>}
                </div>
              )}
            </div>

            <div className="grid w-full max-w-6xl grid-cols-2 gap-6">
              {teams.map((t, i) => (
                <div key={i} className="relative">
                  <BetPanel team={t} index={i} bet={bets[i]} locked={phase === 'reveal'} onChange={(b) => setBets((bs) => bs.map((x, j) => (j === i ? b : x)))} />
                  {results && (
                    <div className={`absolute -top-4 right-4 animate-pop rounded-2xl border-4 px-4 py-1 font-display text-4xl text-stroke ${results[i] ? 'border-emerald-200 bg-emerald-600' : 'border-red-200 bg-red-600'}`}>
                      {results[i] ? `+${bets[i].amount}` : `−${bets[i].amount}`}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {phase === 'bet' && (
              <button disabled={!canReveal} onClick={reveal} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
                🔨 ¡Vendido! Revelar
              </button>
            )}
            {phase === 'reveal' && (
              <button onClick={next} className="btn btn-xl bg-gold text-black hover:bg-yellow-300">
                {idx + 1 >= items.length ? '🏁 Ver resultado' : 'Siguiente ▶'}
              </button>
            )}
          </>
        )}
      </main>
    </div>
  )
}
