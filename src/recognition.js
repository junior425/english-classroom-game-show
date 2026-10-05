// Thin wrapper around the browser's Web Speech API (speech-to-text). Never throws: when the browser
// has no recognition support `start` returns null and the game falls back to teacher buttons.

const Ctor = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null

export const recognitionSupported = () => !!Ctor

// Starts a continuous session; `onText(fullTranscript)` fires on every interim/final result.
// Returns a handle with stop(); Chrome ends sessions after silence, so we auto-restart until stopped.
export function listen(onText, lang = 'en-US') {
  if (!Ctor) return null
  let active = true
  let finals = ''
  let rec = null
  const spin = () => {
    if (!active) return
    try {
      rec = new Ctor()
      rec.lang = lang
      rec.continuous = true
      rec.interimResults = true
      rec.maxAlternatives = 1
      rec.onresult = (e) => {
        let interim = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const txt = e.results[i][0].transcript
          if (e.results[i].isFinal) finals += ' ' + txt
          else interim += ' ' + txt
        }
        onText((finals + ' ' + interim).trim())
      }
      rec.onend = () => { if (active) setTimeout(spin, 150) }
      rec.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { active = false; onText(null) } }
      rec.start()
    } catch {
      active = false
    }
  }
  spin()
  return {
    stop() { active = false; try { rec?.stop() } catch { /* ignore */ } },
    reset() { finals = '' },
  }
}

const norm = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean)
const STOP = new Set(['a', 'an', 'the', 'to', 'of', 'is', 'are', 'it', 'that', 'i', 'you', 'we', 'my', 'me', 'please'])

// Fuzzy check that the spoken transcript contains the target words and most of the chunk frame.
export function matchesChunk(transcript, frame, target) {
  if (!transcript) return { ok: false, score: 0 }
  const said = new Set(norm(transcript))
  const has = (w) => said.has(w) || (w.endsWith('s') && said.has(w.slice(0, -1))) || said.has(w + 's')
  const targetWords = norm(target).filter((w) => !STOP.has(w))
  const frameWords = norm(frame.replace(/_+/g, ' ')).filter((w) => !STOP.has(w))
  const tHit = targetWords.filter(has).length
  const fHit = frameWords.filter(has).length
  const tScore = targetWords.length ? tHit / targetWords.length : 1
  const fScore = frameWords.length ? fHit / frameWords.length : 1
  const score = tScore * 0.6 + fScore * 0.4
  return { ok: tScore >= 0.99 && fScore >= 0.5, score }
}
