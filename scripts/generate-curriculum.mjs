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

const here = dirname(fileURLToPath(import.meta.url))

const LEVELS = [
  ['Basic 1', basic1],
  ['Basic 2', basic2],
  ['Intermediate 1', intermediate1],
  ['Intermediate 2', intermediate2],
  ['Advanced 1', advanced1],
  ['Advanced 2', advanced2],
]

const toQuestion = ([prompt, options, answer, explanation]) => ({ prompt, options, answer, explanation })
const toSentence = ([sentence, correct, fix, explanation]) =>
  correct ? { sentence, correct, explanation } : { sentence, correct, fix, explanation }

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
  if (errors.length) throw new Error(`${levelName} / ${topicName}: ${errors.join('; ')}`)
}

const levels = LEVELS.map(([name, content], li) => {
  const topicNames = Object.keys(content)
  if (topicNames.length !== 24) throw new Error(`${name} has ${topicNames.length} topics, expected 24`)
  return {
    id: `L${li + 1}`,
    name,
    units: Array.from({ length: 12 }, (_, ui) => ({
      id: `L${li + 1}U${ui + 1}`,
      name: `Unit ${ui + 1}`,
      topics: [0, 1].map((ti) => {
        const topicName = topicNames[ui * 2 + ti]
        const data = content[topicName]
        validate(name, topicName, data)
        return {
          id: `L${li + 1}U${ui + 1}T${ti + 1}`,
          name: topicName,
          steal: data.q.map(toQuestion),
          auction: data.s.map(toSentence),
        }
      }),
    })),
  }
})

const out = join(here, '..', 'src', 'data', 'curriculum.json')
writeFileSync(out, JSON.stringify({ version: 2, levels }, null, 2))
const nQ = levels.flatMap((l) => l.units.flatMap((u) => u.topics.flatMap((t) => t.steal))).length
const nS = levels.flatMap((l) => l.units.flatMap((u) => u.topics.flatMap((t) => t.auction))).length
console.log(`written ${out}: ${levels.length} levels, ${levels.length * 24} topics, ${nQ} questions, ${nS} auction sentences`)
