import { sfx } from '../audio.js'

function Select({ label, value, options, onChange }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xl font-extrabold uppercase tracking-widest text-white/60">{label}</span>
      <select
        value={value}
        onChange={(e) => { sfx.click(); onChange(e.target.value) }}
        className="rounded-2xl border-4 border-white/30 bg-slate-900 px-5 py-4 text-2xl font-extrabold text-white outline-none focus:border-gold md:text-3xl"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.name}{o.ready === false ? ' · (no content)' : ''}</option>
        ))}
      </select>
    </label>
  )
}

const MODES = [
  {
    id: 'steal',
    icon: '🦹‍♂️',
    title: 'MODE 1: POINT STEAL',
    desc: (<>Quick-fire question for the first in line. If a team misses, the other team <b className="text-gold">steals</b> the question and the points.</>),
    count: (t) => t.steal.length,
    unit: 'questions',
  },
  {
    id: 'auction',
    icon: '🔨',
    title: 'MODE 2: GRAMMAR AUCTION',
    desc: (<>Each team starts with <b className="text-gold">$1,000</b>. Bet on every sentence: is it <b className="text-green-300">correct</b> or is it a <b className="text-red-300">trap</b>?</>),
    count: (t) => t.auction.length,
    unit: 'sentences',
  },
  {
    id: 'bomb',
    icon: '💣',
    title: 'MODE 3: PRESSURE BOMB',
    desc: (<>A live clock is ticking. Answer correctly to <b className="text-gold">pass the bomb</b> to the other team — whoever is holding it when it explodes loses points!</>),
    count: (t) => t.steal.length,
    unit: 'questions',
  },
  {
    id: 'trapdoor',
    icon: '🕳️',
    title: 'MODE 4: THE TRAPDOOR',
    desc: (<>Each team starts with <b className="text-gold">5 lives</b>. A wrong answer opens the trapdoor and you lose a life. Last team standing wins!</>),
    count: (t) => t.steal.length,
    unit: 'questions',
  },
  {
    id: 'picture',
    icon: '🖼️',
    title: 'MODE 5: PICTURE QUIZ',
    desc: (<>Vocabulary with <b className="text-gold">giant pictures</b>: identify the word, pick the correct <b className="text-gold">spelling</b>, or sort it — Food vs Drink, Healthy vs Treat. Miss and the other team steals!</>),
    count: (t) => t.pictures?.length ?? 0,
    unit: 'pictures',
    vocabOnly: true,
  },
  {
    id: 'listening',
    icon: '🎧',
    title: 'MODE 6: AUDIO DETECTIVE',
    desc: (<>Listening challenge. The computer speaks with a native <b className="text-gold">US or UK voice</b> (max 3 plays): write the <b className="text-gold">dictation</b> or answer the comprehension question. Miss and the other team steals!</>),
    count: (t) => t.listening?.length ?? 0,
    unit: 'tracks',
    vocabOnly: true,
  },
  {
    id: 'speaking',
    icon: '🎤',
    title: 'MODE 7: SPEAKING ROLEPLAY & TABOO',
    desc: (<>Act out a real-life situation using <b className="text-gold">3 mandatory words</b> — and avoid the <b className="text-red-300">taboo</b> ones! 45–60 second timer; the teacher awards the points.</>),
    count: (t) => t.speaking?.length ?? 0,
    unit: 'scenes',
    vocabOnly: true,
  },
]

export default function Lobby({ curriculum, selection, onSelect, topic, onPlay, onResetScores, onRenameTeams }) {
  const level = topic.level
  const unit = topic.unit
  const t = topic.topic
  const hasSteal = t?.steal?.length > 0
  const hasAuction = t?.auction?.length > 0

  const setLevel = (id) => {
    const l = curriculum.levels.find((x) => x.id === id)
    onSelect({ level: id, unit: l.units[0].id, topic: l.units[0].topics[0].id })
  }
  const setUnit = (id) => {
    const u = level.units.find((x) => x.id === id)
    onSelect({ ...selection, unit: id, topic: u.topics[0].id })
  }

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-6 md:p-10">
      <section className="card p-6 md:p-8">
        <h2 className="mb-6 font-display text-4xl tracking-widest text-gold md:text-5xl">📚 Curriculum Selection</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Select label="Level" value={selection.level} options={curriculum.levels} onChange={setLevel} />
          <Select label="Unit" value={selection.unit} options={level.units} onChange={setUnit} />
          <Select
            label="Topic / Grammar"
            value={selection.topic}
            options={unit.topics.map((x, i) => ({ id: x.id, name: `Topic ${i + 1}: ${x.name}${x.pictures?.length ? ' 🖼️' : ''}${x.listening?.length ? ' 🎧' : ''}${x.speaking?.length ? ' 🎤' : ''}`, ready: x.steal.length > 0 || x.auction.length > 0 }))}
            onChange={(id) => onSelect({ ...selection, topic: id })}
          />
        </div>
        <p className="mt-6 text-2xl font-extrabold text-white/80 md:text-3xl">
          Selected: <span className="text-teamA-glow">{level.name}</span> → <span className="text-teamB-glow">{unit.name}</span> → <span className="text-gold">{t.name}</span>
        </p>
        {!hasSteal && !hasAuction && (
          <p className="mt-3 text-xl text-amber-300">
            This topic has no questions yet. Add them in <code className="rounded bg-black/50 px-2">scripts/content/</code> and run <code className="rounded bg-black/50 px-2">npm run curriculum</code>.
          </p>
        )}
      </section>

      <section className="grid flex-1 gap-6 md:grid-cols-2">
        {MODES.map((m) => {
          const n = m.count(t)
          return (
            <button
              key={m.id}
              disabled={n === 0}
              onClick={() => onPlay(m.id)}
              className="card group flex flex-col items-start justify-between gap-4 p-8 text-left transition hover:border-gold hover:bg-gold/10 disabled:opacity-40"
            >
              <div>
                <div className="text-6xl">{m.icon}</div>
                <h3 className="mt-3 font-display text-5xl tracking-widest text-white md:text-6xl">{m.title}</h3>
                <p className="mt-3 text-2xl text-white/70">{m.desc}</p>
              </div>
              <span className="btn btn-lg bg-gold text-black group-hover:bg-yellow-300">
                {m.vocabOnly && n === 0 ? `No ${m.unit} for this topic yet` : `Play · ${n} ${m.unit}`}
              </span>
            </button>
          )
        })}
      </section>

      <footer className="flex flex-wrap justify-center gap-4">
        <button onClick={() => { sfx.click(); onRenameTeams() }} className="btn px-6 py-3 text-2xl bg-white/10 text-white hover:bg-white/20">✏️ Change Teams</button>
        <button onClick={() => { sfx.boing(); onResetScores() }} className="btn px-6 py-3 text-2xl bg-white/10 text-white hover:bg-white/20">🔄 Reset Scoreboard</button>
      </footer>
    </div>
  )
}
