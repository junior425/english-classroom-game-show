import { useCallback, useMemo, useState } from 'react'
import curriculum from './data/curriculum.json'
import { initAudio, sfx } from './audio.js'
import TeamSetup from './components/TeamSetup.jsx'
import Lobby from './components/Lobby.jsx'
import Scoreboard from './components/Scoreboard.jsx'
import StealGame from './components/StealGame.jsx'
import AuctionGame from './components/AuctionGame.jsx'
import BombGame from './components/BombGame.jsx'
import TrapdoorGame from './components/TrapdoorGame.jsx'
import Confetti from './components/Confetti.jsx'

const DEFAULT_TEAMS = [
  { name: 'Power Rangers', score: 0 },
  { name: 'Wonder Women', score: 0 },
]

export default function App() {
  const [screen, setScreen] = useState('setup')
  const [teams, setTeams] = useState(DEFAULT_TEAMS)
  const [selection, setSelection] = useState({ level: 'L1', unit: 'L1U1', topic: 'L1U1T1' })
  const [events, setEvents] = useState([]) // floating point animations
  const [banner, setBanner] = useState(null)
  const [confetti, setConfetti] = useState(0)

  const topic = useMemo(() => {
    const lvl = curriculum.levels.find((l) => l.id === selection.level)
    const unit = lvl?.units.find((u) => u.id === selection.unit)
    const t = unit?.topics.find((t) => t.id === selection.topic)
    return { level: lvl, unit, topic: t }
  }, [selection])

  const pushEvent = useCallback((team, delta, label) => {
    const id = Date.now() + Math.random()
    setEvents((e) => [...e, { id, team, delta, label }])
    setTimeout(() => setEvents((e) => e.filter((x) => x.id !== id)), 1300)
  }, [])

  const addPoints = useCallback((team, delta, label) => {
    setTeams((ts) => ts.map((t, i) => (i === team ? { ...t, score: t.score + delta } : t)))
    pushEvent(team, delta, label)
  }, [pushEvent])

  const flashBanner = useCallback((text, tone = 'white', ms = 1800) => {
    setBanner({ text, tone })
    setTimeout(() => setBanner(null), ms)
  }, [])

  const stealPoints = useCallback((thief, amount = 100) => {
    const victim = thief === 0 ? 1 : 0
    setTeams((ts) => ts.map((t, i) => {
      if (i === victim) return { ...t, score: t.score - amount }
      if (i === thief) return { ...t, score: t.score + amount }
      return t
    }))
    pushEvent(victim, -amount, 'STOLEN')
    pushEvent(thief, amount, 'STEAL!')
    sfx.steal()
    flashBanner(`${teams[thief].name.toUpperCase()} STEALS ${amount} POINTS!`, 'gold')
  }, [pushEvent, teams, flashBanner])

  const celebrate = useCallback((team) => {
    setConfetti((c) => c + 1)
    sfx.win()
    flashBanner(`POINT FOR ${teams[team].name.toUpperCase()}!`, team === 0 ? 'teamA' : 'teamB')
  }, [teams, flashBanner])

  const start = async (names) => {
    await initAudio()
    sfx.click()
    setTeams(names.map((name, i) => ({ name: name.trim() || DEFAULT_TEAMS[i].name, score: 0 })))
    setScreen('lobby')
  }

  const go = (s) => { initAudio(); sfx.click(); setScreen(s) }

  const resetScores = () => setTeams((ts) => ts.map((t) => ({ ...t, score: 0 })))

  const game = { teams, topic, addPoints, stealPoints, celebrate, flashBanner, onExit: () => go('lobby') }

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-slate-950 to-black">
      {screen === 'setup' && <TeamSetup defaults={teams.map((t) => t.name)} onStart={start} />}

      {screen !== 'setup' && (
        <div className="flex h-full flex-col">
          <Scoreboard teams={teams} events={events} onAdd={addPoints} onSteal={stealPoints} compact={screen !== 'lobby'} />
          <div className="relative min-h-0 flex-1">
            {screen === 'lobby' && (
              <Lobby
                curriculum={curriculum}
                selection={selection}
                onSelect={setSelection}
                topic={topic}
                onPlay={(mode) => go(mode)}
                onResetScores={resetScores}
                onRenameTeams={() => go('setup')}
              />
            )}
            {screen === 'steal' && <StealGame key={selection.topic} {...game} />}
            {screen === 'auction' && <AuctionGame key={selection.topic} {...game} />}
            {screen === 'bomb' && <BombGame key={selection.topic} {...game} />}
            {screen === 'trapdoor' && <TrapdoorGame key={selection.topic} {...game} />}
          </div>
        </div>
      )}

      {banner && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
          <div className={`animate-pop rounded-3xl border-8 px-12 py-8 text-center font-display text-6xl md:text-8xl text-stroke shadow-2xl ${
            banner.tone === 'gold' ? 'border-gold bg-yellow-500/90 text-black' :
            banner.tone === 'teamA' ? 'border-teamA-glow bg-teamA-dark/95 text-white' :
            banner.tone === 'teamB' ? 'border-teamB-glow bg-teamB-dark/95 text-white' :
            banner.tone === 'red' ? 'border-red-300 bg-red-700/95 text-white' :
            'border-white bg-slate-800/95 text-white'}`}>
            {banner.text}
          </div>
        </div>
      )}
      <Confetti trigger={confetti} />
    </div>
  )
}
