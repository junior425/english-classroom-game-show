// Sentence frames ("chunks") for MODE 9 Neuro-Speaking, grouped by level tier. The blank is filled with
// the vocabulary of the active topic (picture words when the topic has illustrations, otherwise key words
// from its speaking / question cards). Frames are short, high-frequency blocks students should produce
// without translating.
export const FRAMES = {
  Basic: [
    'Can I have a ____, please?',
    'I like ____.',
    'I don’t like ____.',
    'Do you have a ____?',
    'Look! It’s a ____.',
    'I need a ____.',
    'Where is the ____?',
    'I want to ____.',
    'Can you ____?',
    'I ____ every day.',
    'Let’s ____!',
    'My favourite is ____.',
  ],
  Intermediate: [
    'I think ____ is really important.',
    'Have you ever ____?',
    'I’ve never ____ before.',
    'I’d rather ____ than stay at home.',
    'The best thing about ____ is the people.',
    'If I could, I would ____.',
    'In my opinion, ____ is a great idea.',
    'I used to ____ when I was a kid.',
    'I’m not sure about ____, to be honest.',
    'What I love about ____ is how simple it is.',
    'You should definitely ____.',
    'I was about to ____ when you called.',
  ],
  Advanced: [
    'It turns out that ____ matters more than we think.',
    'I’d argue that ____ is a double-edged sword.',
    'If I had to choose, I’d go with ____.',
    'What strikes me about ____ is its impact.',
    'In my experience, ____ tends to pay off.',
    'As far as ____ is concerned, I’m sceptical.',
    'Had I known about ____, I would have acted differently.',
    'There’s no denying that ____ has changed everything.',
    'I can’t help thinking that ____ is overrated.',
    'The way I see it, ____ comes down to trust.',
    'I’ve recently started to ____, and it’s been eye-opening.',
    'Ultimately, ____ is a matter of perspective.',
  ],
}

export const tierOf = (levelName = '') =>
  levelName.startsWith('Intermediate') ? 'Intermediate' : levelName.startsWith('Advanced') ? 'Advanced' : 'Basic'

const TINTS = ['from-cyan-600 to-blue-900', 'from-fuchsia-600 to-purple-900', 'from-emerald-600 to-teal-900',
  'from-amber-500 to-orange-900', 'from-rose-600 to-red-900', 'from-indigo-600 to-slate-900']

// Builds the visual deck for a topic: [{ word, image|null, tint, frame }].
export function buildChunkDeck(topic, levelName, seed = 1) {
  const frames = FRAMES[tierOf(levelName)]
  let items = (topic.pictures ?? []).map((p) => ({ word: p.word, image: p.image }))
  if (!items.length) {
    const words = new Set()
    for (const s of topic.speaking ?? []) for (const w of s.mandatory ?? []) words.add(w)
    for (const q of topic.steal ?? []) {
      const ans = q.options?.[q.answer]
      if (ans && ans.split(' ').length <= 4 && !/[/?]/.test(ans)) words.add(ans)
    }
    items = [...words].slice(0, 30).map((word) => ({ word, image: null }))
  }
  let r = seed
  const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280 }
  return items
    .map((it, i) => ({ ...it, tint: TINTS[i % TINTS.length], frame: frames[Math.floor(rnd() * frames.length)] }))
    .sort(() => rnd() - 0.5)
}

export const fill = (frame, word) => frame.replace(/_+/, word)
