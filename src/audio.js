import * as Tone from 'tone'

let ready = false
let synth, fx, blip, bass, noise, suspenseLoop

export async function initAudio() {
  if (ready) return
  try {
    await Promise.race([Tone.start(), new Promise((r) => setTimeout(r, 1500))])
  } catch { /* audio stays off; the UI must never depend on it */ }
  if (Tone.getContext().state !== 'running') return
  synth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.4 } }).toDestination()
  fx = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.1, release: 0.2 } }).toDestination()
  fx.volume.value = -8
  blip = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'square' }, envelope: { attack: 0.005, decay: 0.08, sustain: 0, release: 0.1 } }).toDestination()
  blip.volume.value = -10
  bass = new Tone.MembraneSynth().toDestination()
  noise = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.005, decay: 0.3, sustain: 0 } }).toDestination()
  noise.volume.value = -10
  ready = true
}

const now = () => Tone.now()

function seq(inst, notes, step, dur = step) {
  const t = now()
  notes.forEach((n, i) => n && inst.triggerAttackRelease(n, dur, t + i * step))
}

const raw = {
  click() { if (ready) blip.triggerAttackRelease('C6', 0.05) },
  countdown() { if (ready) blip.triggerAttackRelease('A5', 0.1) },
  timeUp() { if (ready) seq(fx, ['A4', 'A4', 'A4', 'F4'], 0.18, 0.15) },
  correct() { if (ready) seq(synth, ['C5', 'E5', 'G5', 'C6'], 0.09, 0.25) },
  win() {
    if (!ready) return
    seq(synth, ['C5', 'E5', 'G5', 'C6', 'E6', 'G6'], 0.11, 0.35)
    setTimeout(() => synth.triggerAttackRelease(['C5', 'E5', 'G5', 'C6'], 1.2), 700)
  },
  plus() { if (ready) seq(synth, ['E5', 'G5', 'B5'], 0.07, 0.15) },
  minus() { if (ready) seq(fx, ['E4', 'C4', 'A3'], 0.12, 0.2) },
  fail() {
    if (!ready) return
    // funny "wah-wah": descending trombone
    const s = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.05, release: 0.3 } }).toDestination()
    s.volume.value = -6
    const t = now()
    s.triggerAttack('D4', t)
    s.frequency.rampTo('A3', 0.5, t + 0.05)
    s.triggerRelease(t + 0.55)
    s.triggerAttack('B3', t + 0.65)
    s.frequency.rampTo('F3', 0.7, t + 0.7)
    s.triggerRelease(t + 1.35)
    setTimeout(() => s.dispose(), 2000)
  },
  boing() {
    if (!ready) return
    const t = now()
    fx.triggerAttack('C6', t)
    fx.frequency.rampTo('C4', 0.35, t)
    fx.triggerRelease(t + 0.35)
  },
  steal() {
    if (!ready) return
    noise.triggerAttackRelease(0.3)
    const t = now()
    // "steal" siren + cash register
    fx.triggerAttack('E5', t)
    fx.frequency.rampTo('B5', 0.25, t)
    fx.frequency.rampTo('E5', 0.25, t + 0.25)
    fx.frequency.rampTo('B5', 0.25, t + 0.5)
    fx.triggerRelease(t + 0.8)
    setTimeout(() => seq(synth, ['G6', 'C7'], 0.08, 0.4), 850)
  },
  drumroll() {
    if (!ready) return
    const t = now()
    for (let i = 0; i < 16; i++) bass.triggerAttackRelease('C2', 0.05, t + i * 0.07)
    setTimeout(() => noise.triggerAttackRelease(0.5), 1150)
  },
  bet() { if (ready) seq(bass, ['C2', 'C2', 'G2'], 0.1, 0.2) },
  explode() {
    if (!ready) return
    const t = now()
    noise.triggerAttackRelease(1.2, t)
    bass.triggerAttackRelease('C0', 1.5, t)
    bass.triggerAttackRelease('C1', 0.8, t + 0.1)
    fx.triggerAttack('C5', t)
    fx.frequency.rampTo('C2', 1.0, t)
    fx.triggerRelease(t + 1.0)
  },
  fall() {
    if (!ready) return
    // trapdoor "whoosh": long descending slide + thud
    const t = now()
    fx.triggerAttack('C7', t)
    fx.frequency.rampTo('C3', 0.9, t)
    fx.triggerRelease(t + 0.9)
    bass.triggerAttackRelease('C1', 0.5, t + 0.95)
    noise.triggerAttackRelease(0.2, t + 0.95)
  },
  reveal() { if (ready) { noise.triggerAttackRelease(0.4); bass.triggerAttackRelease('C1', 0.6) } },
  suspenseStart() {
    if (!ready || suspenseLoop) return
    const s = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.02, decay: 0.15, sustain: 0, release: 0.1 } }).toDestination()
    s.volume.value = -14
    const pattern = ['E2', null, 'F2', null, 'E2', null, 'F2', 'G2']
    let i = 0
    suspenseLoop = new Tone.Loop((time) => {
      const n = pattern[i % pattern.length]
      if (n) s.triggerAttackRelease(n, 0.12, time)
      i++
    }, '8n')
    suspenseLoop.synth = s
    Tone.getTransport().bpm.value = 150
    suspenseLoop.start(0)
    Tone.getTransport().start()
  },
  suspenseStop() {
    if (!suspenseLoop) return
    suspenseLoop.stop()
    suspenseLoop.dispose()
    suspenseLoop.synth.dispose()
    suspenseLoop = null
    Tone.getTransport().stop()
  },
}

// A sound effect must never break the game: Tone scheduling errors are ignored.
export const sfx = Object.fromEntries(
  Object.entries(raw).map(([name, fn]) => [name, (...args) => { try { fn(...args) } catch { /* ignore */ } }]),
)
