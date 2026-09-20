// Genera src/data/curriculum.json: 6 niveles x 12 unidades x 2 temas (24 temas/nivel).
// Solo Básico 1 / Unidad 1 / Tema 1 trae contenido precargado; el resto queda como esqueleto editable.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))

const TOPICS = {
  'Básico 1': [
    'First Conditional & Business/Daily Life', 'Present Simple: Routines at Work', 'Present Continuous: What Are You Doing Now?', 'Articles: A / An / The',
    'There is / There are', 'Countable & Uncountable Nouns', 'Past Simple: Regular Verbs', 'Past Simple: Irregular Verbs',
    'Prepositions of Time (in / on / at)', 'Prepositions of Place', 'Adverbs of Frequency', 'Question Words (Wh- Questions)',
    'Can / Can’t for Ability', 'Imperatives & Instructions', 'Possessives (my / your / ’s)', 'Object Pronouns',
    'Like / Love / Hate + -ing', 'Comparatives', 'Superlatives', 'Going to for Plans',
    'Present Simple vs Continuous', 'Would like to / Want to', 'Some / Any / Much / Many', 'Review: Small Talk & Emails',
  ],
  'Básico 2': [
    'Past Continuous', 'Past Simple vs Past Continuous', 'Will for Predictions', 'Will vs Going to',
    'Present Perfect: Experiences', 'Present Perfect with Ever / Never', 'Have to / Must / Should', 'Second Conditional',
    'Zero Conditional', 'Too / Enough', 'Used to', 'Phrasal Verbs I',
    'Relative Clauses (who / which / that)', 'Passive Voice: Present', 'Passive Voice: Past', 'Reported Speech: Statements',
    'Quantifiers: A few / A little', 'Gerunds & Infinitives I', 'Adjectives -ed / -ing', 'So / Such',
    'Indefinite Pronouns', 'Be able to / Manage to', 'Question Tags', 'Review: Meetings & Requests',
  ],
  'Intermedio 1': [
    'Present Perfect vs Past Simple', 'Present Perfect Continuous', 'For / Since / Ago', 'Past Perfect',
    'Narrative Tenses', 'Third Conditional', 'Mixed Conditionals', 'Wish / If only',
    'Modals of Deduction (must / might / can’t)', 'Modals in the Past', 'Reported Speech: Questions', 'Reported Speech: Commands',
    'Passive Voice: All Tenses', 'Causative: Have / Get Something Done', 'Gerunds & Infinitives II', 'Verb Patterns',
    'Defining vs Non-defining Relative Clauses', 'Phrasal Verbs II', 'Linking Words: Contrast', 'Linking Words: Cause & Result',
    'Articles: Advanced Uses', 'Future Continuous', 'Future Perfect', 'Review: Negotiation Language',
  ],
  'Intermedio 2': [
    'Inversion for Emphasis', 'Cleft Sentences', 'Participle Clauses', 'Ellipsis & Substitution',
    'Advanced Passives', 'Reporting Verbs', 'Unreal Past (It’s time / Would rather)', 'Conditionals with Unless / Provided',
    'Modals: Obligation & Permission', 'Speculating about the Past', 'Adjective Order', 'Compound Adjectives',
    'Collocations: Business', 'Collocations: Daily Life', 'Dependent Prepositions', 'Phrasal Verbs III',
    'Discourse Markers', 'Hedging Language', 'Idioms: Work', 'Idioms: Money',
    'Emphatic Structures (do / does / did)', 'Nominalisation', 'Comparatives: Advanced', 'Review: Presentations',
  ],
  'Avanzado 1': [
    'Subjunctive & Formal Structures', 'Advanced Inversion', 'Fronting', 'Conditionals: Formal Variants',
    'Future in the Past', 'Perfect Infinitives', 'Advanced Reported Speech', 'Passive with Reporting Verbs',
    'Modal Perfects', 'Advanced Linking Devices', 'Register: Formal vs Informal', 'Euphemism & Understatement',
    'Idiomatic Phrasal Verbs', 'Metaphor in Business English', 'Collocations: Academic', 'Word Formation: Prefixes',
    'Word Formation: Suffixes', 'Tricky Prepositions', 'Determiners: Advanced', 'Adverbials of Attitude',
    'Concession Structures', 'Conditional Idioms', 'Relative Clauses: Advanced', 'Review: Diplomacy at Work',
  ],
  'Avanzado 2': [
    'Stylistic Inversion', 'Persuasive Grammar', 'Rhetorical Devices', 'Cohesion in Writing',
    'Complex Noun Phrases', 'Advanced Ellipsis', 'Reduced Clauses', 'Advanced Emphasis',
    'Irony & Sarcasm Markers', 'Register Shifting', 'Advanced Collocation Chains', 'Binomials & Trinomials',
    'Proverbs & Sayings', 'Idioms: Advanced Business', 'Idioms: Advanced Daily Life', 'False Friends (ES/EN)',
    'Common Native Errors', 'Phonology in Grammar', 'Punctuation & Meaning', 'Legal & Contract Language',
    'Financial English', 'Tech & Startup English', 'Cross-cultural Pragmatics', 'Final Review: Masterclass',
  ],
}

const SAMPLE_STEAL = [
  { prompt: 'If it ___ tomorrow, we will cancel the meeting.', options: ['rains', 'will rain', 'rained', 'raining'], answer: 0, explanation: 'First conditional: if + present simple, will + verb.' },
  { prompt: 'If the client signs today, we ___ the project on Monday.', options: ['start', 'will start', 'started', 'would start'], answer: 1, explanation: 'Result clause uses will + base verb.' },
  { prompt: 'Complete: "If I ___ time, I will call you after work."', options: ['will have', 'have', 'had', 'having'], answer: 1, explanation: 'Never use will in the if-clause.' },
  { prompt: 'If you don’t hurry, you ___ the bus.', options: ['miss', 'will miss', 'missed', 'are missing'], answer: 1, explanation: 'Negative condition, future result.' },
  { prompt: 'Which sentence is correct?', options: ['If she will study, she will pass.', 'If she studies, she will pass.', 'If she studied, she will pass.', 'If she study, she will pass.'], answer: 1, explanation: 'Third person -s in present simple; no will in if-clause.' },
  { prompt: 'If the price ___ too high, customers won’t buy it.', options: ['is', 'will be', 'be', 'were'], answer: 0, explanation: 'if + present simple.' },
  { prompt: 'We ___ a bonus if we reach the sales target.', options: ['get', 'will get', 'got', 'would get'], answer: 1, explanation: 'Result clause: will + verb.' },
  { prompt: 'Unless you ___ the report, the boss will be angry.', options: ['finish', 'will finish', 'don’t finish', 'finished'], answer: 0, explanation: 'Unless = if not; use present simple affirmative.' },
  { prompt: 'If I see Tom at lunch, I ___ him about the invoice.', options: ['tell', 'will tell', 'told', 'am telling'], answer: 1, explanation: 'Future result with will.' },
  { prompt: 'What ___ you do if the Wi-Fi stops working during the call?', options: ['do', 'will', 'did', 'would'], answer: 1, explanation: 'Question form: What will you do...?' },
  { prompt: 'If my alarm doesn’t ring, I ___ late for work.', options: ['am', 'will be', 'was', 'be'], answer: 1, explanation: 'Daily life first conditional.' },
  { prompt: 'She will send the contract as soon as she ___ approval.', options: ['gets', 'will get', 'got', 'getting'], answer: 0, explanation: 'Time clauses (as soon as) follow the same rule: present simple.' },
]

const SAMPLE_AUCTION = [
  { sentence: 'If we will finish early, we will go for coffee.', correct: false, fix: 'If we finish early, we will go for coffee.', explanation: 'No "will" in the if-clause.' },
  { sentence: 'If the manager agrees, we will launch the product in May.', correct: true, explanation: 'Perfect first conditional.' },
  { sentence: 'You will get a discount if you pays before Friday.', correct: false, fix: 'You will get a discount if you pay before Friday.', explanation: '"You" takes the base form: pay.' },
  { sentence: 'If it is sunny this weekend, we will have a barbecue.', correct: true, explanation: 'Correct form and word order.' },
  { sentence: 'If I will be late, I will text you.', correct: false, fix: 'If I am late, I will text you.', explanation: 'Present simple in the if-clause.' },
  { sentence: 'She won’t come to the party if she has to work.', correct: true, explanation: 'Negative result clause, correct.' },
  { sentence: 'If the team don’t meets the deadline, we will lose the client.', correct: false, fix: 'If the team doesn’t meet the deadline, we will lose the client.', explanation: 'Auxiliary + base verb: doesn’t meet.' },
  { sentence: 'Unless sales improve, the company will close the store.', correct: true, explanation: 'Unless + present simple is correct.' },
  { sentence: 'If you need help with the presentation, I help you.', correct: false, fix: 'If you need help with the presentation, I will help you.', explanation: 'Result clause needs will.' },
  { sentence: 'When the CEO arrives, we will start the meeting.', correct: true, explanation: 'Time clause with present simple + will.' },
  { sentence: 'If he will not call, I will send an email.', correct: false, fix: 'If he doesn’t call, I will send an email.', explanation: 'Negative if-clause: doesn’t + verb.' },
  { sentence: 'I will be very happy if I get the job.', correct: true, explanation: 'Result clause first, if-clause second: still correct.' },
]

const levels = Object.entries(TOPICS).map(([name, topics], li) => ({
  id: `L${li + 1}`,
  name,
  units: Array.from({ length: 12 }, (_, ui) => ({
    id: `L${li + 1}U${ui + 1}`,
    name: `Unidad ${ui + 1}`,
    topics: [0, 1].map((ti) => {
      const idx = ui * 2 + ti
      const preloaded = li === 0 && ui === 0 && ti === 0
      return {
        id: `L${li + 1}U${ui + 1}T${ti + 1}`,
        name: topics[idx],
        steal: preloaded ? SAMPLE_STEAL : [],
        auction: preloaded ? SAMPLE_AUCTION : [],
      }
    }),
  })),
}))

const out = join(here, '..', 'src', 'data', 'curriculum.json')
writeFileSync(out, JSON.stringify({ version: 1, levels }, null, 2))
console.log('written', out)
