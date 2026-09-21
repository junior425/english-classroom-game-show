# English Classroom Game Show

Competitive English-learning web portal for giant classroom screens (split-screen, Team vs Team).
Dark mode, high contrast, giant fonts and Tone.js sound effects. The whole UI and all content are in
English for total classroom immersion.

Live: https://english-classroom-game-show.vercel.app

## Game modes

- **Mode 1 – Point Steal:** quick-fire question for the first in line. The teacher taps the team that
  buzzes first; if they miss, the other team can steal (+150) and the team that missed loses 50.
- **Mode 2 – Grammar Auction:** each team starts with **$1,000**. A sentence is shown; each team bets
  and decides whether it is correct or a trap. Right call = win the bet, wrong call = lose it. The richest
  team at the end earns +300 on the scoreboard.
- **Mode 3 – Pressure Bomb:** a 30-second fuse is lit. The team holding the bomb answers to pass it
  (+50) or skips (−25). A wrong answer (−25) keeps the bomb. Whoever holds it when it explodes loses 100
  and the other team gains 100.
- **Mode 4 – The Trapdoor:** each team starts with **5 lives** and teams take turns. A correct answer is
  +100; a wrong answer (or time-out) opens the trapdoor and costs a life. Game ends when a team runs out of
  lives or the questions end.
- **Mode 5 – Picture Quiz** (topics with `pictures`): giant illustration; identify the word, choose the
  correct spelling or categorise it (Food vs Drink, Land vs Water, …; category rounds come from each topic's `pictureSorts`). +100, steal for +50.
- **Mode 6 – Audio Detective** (topics with `listening`): the browser's Web Speech API reads a sentence or
  mini-dialogue with a native en-US / en-GB voice (max 3 plays). Dictation tracks: both teams write, the
  teacher marks each team (+100 / −50). Comprehension tracks: multiple choice, +100, steal for +50.
- **Mode 7 – Speaking Roleplay & Taboo** (topics with `speaking`): a situation card with 3 mandatory words,
  optional taboo words (−50 per slip) and a 45–60 s timer. The teacher awards +100 to the winner, +50 to
  both, or nothing.

Listening and speaking cards live in `scripts/content/listening-speaking.mjs`, keyed by level and topic
name; currently Basic 1 "3A - Vocabulary: Food & Drinks" and Advanced 1 Unit 1 have cards.

The giant scoreboard is always visible with `+100`, `−50` and `Steal` buttons.

## Curriculum (`src/data/curriculum.json`)

`Level (Basic 1 … Advanced 2) → Unit (1–12) → Topic (2 per unit = 24 per level, 144 total)`.

Every topic is fully populated with multiple-choice questions (used by Point Steal, Pressure Bomb and
The Trapdoor) and correct/trap sentences (used by Grammar Auction), covering grammar, conversation,
business vocabulary and real-life situations.

Content lives in `scripts/content/<level>.mjs`:

```js
export default {
  'Topic name': {
    q: [['Prompt', ['A', 'B', 'C', 'D'], 0 /* answer index */, 'Explanation']],
    s: [['Sentence', false /* correct? */, 'Fixed sentence', 'Explanation']],
  },
}
```

After editing content run `npm run curriculum` to regenerate the JSON (the generator validates shape and
counts).

## Development

Requires Node 22.

```bash
npm install
npm run dev         # http://localhost:5173
npm run curriculum  # regenerate src/data/curriculum.json
npm run lint
npm run build
```

## Deployment

Static Vite project. `vercel.json` includes the SPA rewrite. Pushing to `main` redeploys on Vercel.
