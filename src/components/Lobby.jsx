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
          <option key={o.id} value={o.id}>{o.name}{o.ready === false ? ' · (sin contenido)' : ''}</option>
        ))}
      </select>
    </label>
  )
}

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
        <h2 className="mb-6 font-display text-4xl tracking-widest text-gold md:text-5xl">📚 Estructura curricular</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Select label="Nivel" value={selection.level} options={curriculum.levels} onChange={setLevel} />
          <Select label="Unidad" value={selection.unit} options={level.units} onChange={setUnit} />
          <Select
            label="Tema / Gramática"
            value={selection.topic}
            options={unit.topics.map((x, i) => ({ id: x.id, name: `Tema ${i + 1}: ${x.name}`, ready: x.steal.length > 0 || x.auction.length > 0 }))}
            onChange={(id) => onSelect({ ...selection, topic: id })}
          />
        </div>
        <p className="mt-6 text-2xl font-extrabold text-white/80 md:text-3xl">
          Seleccionado: <span className="text-teamA-glow">{level.name}</span> → <span className="text-teamB-glow">{unit.name}</span> → <span className="text-gold">{t.name}</span>
        </p>
        {!hasSteal && !hasAuction && (
          <p className="mt-3 text-xl text-amber-300">
            Este tema aún no tiene preguntas cargadas. Agrégalas en <code className="rounded bg-black/50 px-2">src/data/curriculum.json</code>.
            El módulo de prueba es Básico 1 / Unidad 1 / Tema 1.
          </p>
        )}
      </section>

      <section className="grid flex-1 gap-6 md:grid-cols-2">
        <button
          disabled={!hasSteal}
          onClick={() => onPlay('steal')}
          className="card group flex flex-col items-start justify-between gap-4 p-8 text-left transition hover:border-gold hover:bg-gold/10 disabled:opacity-40"
        >
          <div>
            <div className="text-6xl">🦹‍♂️</div>
            <h3 className="mt-3 font-display text-5xl tracking-widest text-white md:text-6xl">MODO 1: ROBO DE PUNTOS</h3>
            <p className="mt-3 text-2xl text-white/70">
              Pregunta rápida para los primeros de la fila. Si un equipo falla, el otro <b className="text-gold">roba</b> la pregunta y los puntos.
            </p>
          </div>
          <span className="btn btn-lg bg-gold text-black group-hover:bg-yellow-300">Jugar · {t.steal.length} preguntas</span>
        </button>

        <button
          disabled={!hasAuction}
          onClick={() => onPlay('auction')}
          className="card group flex flex-col items-start justify-between gap-4 p-8 text-left transition hover:border-gold hover:bg-gold/10 disabled:opacity-40"
        >
          <div>
            <div className="text-6xl">🔨</div>
            <h3 className="mt-3 font-display text-5xl tracking-widest text-white md:text-6xl">MODO 2: LA SUBASTA GRAMATICAL</h3>
            <p className="mt-3 text-2xl text-white/70">
              Frases en pantalla. Los equipos <b className="text-gold">apuestan sus puntos</b>: ¿es correcta o tiene trampa?
            </p>
          </div>
          <span className="btn btn-lg bg-gold text-black group-hover:bg-yellow-300">Jugar · {t.auction.length} frases</span>
        </button>
      </section>

      <footer className="flex flex-wrap justify-center gap-4">
        <button onClick={() => { sfx.click(); onRenameTeams() }} className="btn px-6 py-3 text-2xl bg-white/10 text-white hover:bg-white/20">✏️ Cambiar equipos</button>
        <button onClick={() => { sfx.boing(); onResetScores() }} className="btn px-6 py-3 text-2xl bg-white/10 text-white hover:bg-white/20">🔄 Reiniciar marcador</button>
      </footer>
    </div>
  )
}
