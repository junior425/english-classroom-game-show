// Generates src/data/curriculum.json: 6 levels x 12 units x 2 topics (24 topics per level).
// Content lives in scripts/content/*.mjs. Each topic has `q` (multiple-choice questions used by
// Point Steal, Pressure Bomb and The Trapdoor) and `s` (sentences used by Grammar Auction).
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import basic1 from './content/basic1.mjs'
import basic2 from './content/basic2.mjs'
import intermediate1 from './content/intermediate1.mjs'
import intermediate2 from './content/intermediate2.mjs'
import advanced1 from './content/advanced1.mjs'
import advanced2 from './content/advanced2.mjs'
import basic1Unit3Extras from './content/basic1-unit3-extras.mjs'
import intermediate1Unit6Extras from './content/intermediate1-unit6-extras.mjs'
import advanced1Unit3Extras from './content/advanced1-unit3-extras.mjs'
import listeningSpeaking from './content/listening-speaking.mjs'

const here = dirname(fileURLToPath(import.meta.url))

// Extra topics appended to a unit after its two base topics: { 'Level name': { unitIndex: content } }
const EXTRAS = {
  'Basic 1': { 2: basic1Unit3Extras },
  'Intermediate 1': { 5: intermediate1Unit6Extras },
  'Advanced 1': { 2: advanced1Unit3Extras },
}

const LEVELS = [
  ['Basic 1', basic1],
  ['Basic 2', basic2],
  ['Intermediate 1', intermediate1],
  ['Intermediate 2', intermediate2],
  ['Advanced 1', advanced1],
  ['Advanced 2', advanced2],
]

const toQuestion = ([prompt, options, answer, explanation, image]) =>
  image ? { prompt, options, answer, explanation, image } : { prompt, options, answer, explanation }
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
// Picture Quiz "category" rounds are precomputed here as `sorts`, so the game component stays topic-agnostic.
// Legacy food format: [word, image, 'food'|'drink', healthy]. Generic format: [word, image, { sortKey: optionLabel }]
// resolved against the topic's `pictureSorts: { sortKey: { prompt, options(4), explain? } }` ({word}/{value} placeholders).
const toPicture = (sortDefs) => ([word, image, tagsOrCategory, healthy]) => {
  if (typeof tagsOrCategory === 'string') {
    const category = tagsOrCategory
    return {
      word, image,
      sorts: [
        { prompt: `Is ${word} food or a drink?`, options: ['Food', 'Drink', 'Both', 'Neither'], answer: category === 'food' ? 0 : 1, explanation: `${cap(word)} is a ${category}.` },
        { prompt: `Is ${word} healthy or a treat?`, options: ['Healthy', 'Treat (unhealthy)', 'Both', 'Neither'], answer: healthy ? 0 : 1, explanation: `${cap(word)} is ${healthy ? 'a healthy choice' : 'a treat — enjoy it sometimes!'}.` },
      ],
    }
  }
  const fill = (tpl, value) => tpl.replaceAll('{word}', word).replaceAll('{Word}', cap(word)).replaceAll('{value}', value)
  return {
    word, image,
    sorts: Object.entries(tagsOrCategory).map(([key, value]) => {
      const def = sortDefs[key]
      return { prompt: fill(def.prompt, value), options: def.options, answer: def.options.indexOf(value), explanation: fill(def.explain ?? '{Word}: {value}.', value) }
    }),
  }
}
const toListening = ([text, voice, kind, question, options, answer]) =>
  kind === 'comprehension' ? { text, voice, kind, question, options, answer } : { text, voice, kind }
const toSpeaking = ([title, situation, mandatory, taboo, seconds]) => ({ title, situation, mandatory, taboo, seconds })
const toSentence = ([sentence, correct, fix, explanation]) =>
  correct ? { sentence, correct, explanation } : { sentence, correct, fix, explanation }

function validateExtras(levelName, topicName, extra) {
  const errors = []
  extra.listening?.forEach((item, i) => {
    const [text, voice, kind, question, options, answer] = item
    if (typeof text !== 'string' || !['en-US', 'en-GB'].includes(voice) || !['dictation', 'comprehension'].includes(kind)) errors.push(`listening ${i + 1} malformed`)
    if (kind === 'comprehension' && (typeof question !== 'string' || !Array.isArray(options) || options.length !== 4 || !Number.isInteger(answer) || answer < 0 || answer > 3)) {
      errors.push(`listening ${i + 1} comprehension malformed`)
    }
  })
  extra.speaking?.forEach((item, i) => {
    const [title, situation, mandatory, taboo, seconds] = item
    if (typeof title !== 'string' || typeof situation !== 'string' || !Array.isArray(mandatory) || mandatory.length !== 3 || !Array.isArray(taboo) || ![45, 60].includes(seconds)) {
      errors.push(`speaking ${i + 1} malformed`)
    }
  })
  if (errors.length) throw new Error(`${levelName} / ${topicName}: ${errors.join('; ')}`)
}

function validate(levelName, topicName, data) {
  const errors = []
  if (!Array.isArray(data.q) || data.q.length < 4) errors.push('needs at least 4 questions')
  if (!Array.isArray(data.s) || data.s.length < 4) errors.push('needs at least 4 auction sentences')
  data.q?.forEach((item, i) => {
    const [prompt, options, answer] = item
    if (typeof prompt !== 'string' || !Array.isArray(options) || options.length !== 4 || !Number.isInteger(answer) || answer < 0 || answer > 3) {
      errors.push(`question ${i + 1} malformed`)
    }
  })
  data.s?.forEach((item, i) => {
    const [sentence, correct, fix] = item
    if (typeof sentence !== 'string' || typeof correct !== 'boolean') errors.push(`sentence ${i + 1} malformed`)
    if (!correct && typeof fix !== 'string') errors.push(`sentence ${i + 1} is a trap but has no fix`)
  })
  Object.entries(data.pictureSorts ?? {}).forEach(([key, def]) => {
    if (typeof def.prompt !== 'string' || !/\{[wW]ord\}/.test(def.prompt) || !Array.isArray(def.options) || def.options.length !== 4) errors.push(`pictureSorts.${key} malformed`)
  })
  data.pictures?.forEach((item, i) => {
    const [word, image, tagsOrCategory, healthy] = item
    if (typeof word !== 'string' || typeof image !== 'string') errors.push(`picture ${i + 1} malformed`)
    else if (typeof tagsOrCategory === 'string') {
      if (!['food', 'drink'].includes(tagsOrCategory) || typeof healthy !== 'boolean') errors.push(`picture ${i + 1} malformed`)
    } else if (!tagsOrCategory || typeof tagsOrCategory !== 'object' || Object.keys(tagsOrCategory).length === 0) {
      errors.push(`picture ${i + 1} needs sort tags`)
    } else {
      Object.entries(tagsOrCategory).forEach(([key, value]) => {
        const def = data.pictureSorts?.[key]
        if (!def) errors.push(`picture ${i + 1}: unknown sort "${key}"`)
        else if (!def.options.includes(value)) errors.push(`picture ${i + 1}: "${value}" is not an option of sort "${key}"`)
      })
    }
  })
  if (data.pictures && data.pictures.length < 8) errors.push('needs at least 8 pictures for Picture Quiz')
  if (errors.length) throw new Error(`${levelName} / ${topicName}: ${errors.join('; ')}`)
}

for (const [lvl, topics] of Object.entries(listeningSpeaking)) {
  const content = LEVELS.find(([n]) => n === lvl)?.[1]
  if (!content) throw new Error(`listening-speaking: unknown level ${lvl}`)
  for (const t of Object.keys(topics)) {
    const known = t in content || Object.values(EXTRAS[lvl] ?? {}).some((e) => t in e)
    if (!known) throw new Error(`listening-speaking: unknown topic "${t}" in ${lvl}`)
  }
}

const levels = LEVELS.map(([name, content], li) => {
  const topicNames = Object.keys(content)
  if (topicNames.length !== 24) throw new Error(`${name} has ${topicNames.length} topics, expected 24`)
  const toTopic = (id, topicName, data) => {
    validate(name, topicName, data)
    const extra = listeningSpeaking[name]?.[topicName] ?? {}
    validateExtras(name, topicName, extra)
    return {
      id,
      name: topicName,
      steal: data.q.map(toQuestion),
      auction: data.s.map(toSentence),
      pictures: (data.pictures ?? []).map(toPicture(data.pictureSorts ?? {})),
      listening: (extra.listening ?? []).map(toListening),
      speaking: (extra.speaking ?? []).map(toSpeaking),
    }
  }
  return {
    id: `L${li + 1}`,
    name,
    units: Array.from({ length: 12 }, (_, ui) => ({
      id: `L${li + 1}U${ui + 1}`,
      name: `Unit ${ui + 1}`,
      topics: [
        ...[0, 1].map((ti) => toTopic(`L${li + 1}U${ui + 1}T${ti + 1}`, topicNames[ui * 2 + ti], content[topicNames[ui * 2 + ti]])),
        ...Object.entries(EXTRAS[name]?.[ui] ?? {}).map(([topicName, data], ei) =>
          toTopic(`L${li + 1}U${ui + 1}T${ei + 3}`, topicName, data)),
      ],
    })),
  }
})

const out = join(here, '..', 'src', 'data', 'curriculum.json')
writeFileSync(out, JSON.stringify({ version: 2, levels }, null, 2))
const nQ = levels.flatMap((l) => l.units.flatMap((u) => u.topics.flatMap((t) => t.steal))).length
const nS = levels.flatMap((l) => l.units.flatMap((u) => u.topics.flatMap((t) => t.auction))).length
const nT = levels.flatMap((l) => l.units.flatMap((u) => u.topics)).length
const nP = levels.flatMap((l) => l.units.flatMap((u) => u.topics.flatMap((t) => t.pictures))).length
const nL = levels.flatMap((l) => l.units.flatMap((u) => u.topics.flatMap((t) => t.listening))).length
const nSp = levels.flatMap((l) => l.units.flatMap((u) => u.topics.flatMap((t) => t.speaking))).length
console.log(`written ${out}: ${levels.length} levels, ${nT} topics, ${nQ} questions, ${nS} auction sentences, ${nP} pictures, ${nL} listening, ${nSp} speaking`)
