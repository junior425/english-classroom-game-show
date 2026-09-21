// Thin wrapper around the browser's Web Speech API (text-to-speech). Never throws: if the
// browser has no speech support the promise resolves immediately and the UI keeps working.

export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice(lang) {
  const voices = window.speechSynthesis.getVoices()
  const exact = voices.filter((v) => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase())
  const preferred = exact.find((v) => /google|natural|premium|enhanced/i.test(v.name)) ?? exact[0]
  return preferred ?? voices.find((v) => v.lang.toLowerCase().startsWith('en')) ?? null
}

export function stopSpeaking() {
  if (speechSupported()) window.speechSynthesis.cancel()
}

export function speak(text, lang = 'en-US', rate = 0.92) {
  if (!speechSupported()) return Promise.resolve(false)
  return new Promise((resolve) => {
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = lang
      u.rate = rate
      const voice = pickVoice(lang)
      if (voice) u.voice = voice
      u.onend = () => resolve(true)
      u.onerror = () => resolve(false)
      // Some engines never fire onend; never leave the play button stuck.
      setTimeout(() => resolve(false), 4000 + text.length * 120)
      window.speechSynthesis.speak(u)
    } catch {
      resolve(false)
    }
  })
}

// Voices load asynchronously in some browsers; warm the list up once on first user gesture.
export function warmVoices() {
  if (!speechSupported()) return
  const load = () => window.speechSynthesis.getVoices()
  load()
  window.speechSynthesis.addEventListener?.('voiceschanged', load, { once: true })
}
