// Extra topic for Advanced 1 / Unit 10 taken from the coursebook page 10C Second conditional, would, could, and might.
// Listening / speaking cards live in listening-speaking.mjs.
const img = (name) => `/img/second-conditional/${name}.svg`

const pictureSorts = {
  type: {
    prompt: 'What kind of situation is "{word}"?',
    options: ['Impossible now', 'Unlikely future', 'Advice with "were"', 'Likely future (first conditional)'],
    explain: '"{Word}" → {value}.',
  },
  form: {
    prompt: 'Which form completes "{word}"?',
    options: ['if + simple past', 'would + base form', 'could / might + base form', 'will + base form'],
    explain: '"{Word}" → {value}.',
  },
}

const pictures = [
  ['If I ___ rich, I\'d buy a big house by the sea. (be)', img('rich'), { type: 'Impossible now', form: 'if + simple past' }],
  ['If I argued with my best friend, I ___ sad. (be)', img('argue'), { type: 'Unlikely future', form: 'would + base form' }],
  ['If I ___ Spanish, I\'d go traveling in South America. (speak)', img('spanish'), { type: 'Impossible now', form: 'could / might + base form' }],
  ['If I won the lottery, I ___ give all the money to charity. (maybe)', img('lottery'), { type: 'Unlikely future', form: 'could / might + base form' }],
  ['If I ___ you, I\'d update my résumé. (be)', img('advice'), { type: 'Advice with "were"', form: 'if + simple past' }],
  ['If it rains tomorrow, we ___ go shopping. (likely)', img('rain-first'), { type: 'Likely future (first conditional)', form: 'will + base form' }],
  ['If my new phone stopped working tomorrow, I\'d ___ it back to the store. (take)', img('phone'), { type: 'Unlikely future', form: 'would + base form' }],
  ['If Adam were here, he ___ fix your computer. (would)', img('computer'), { type: 'Advice with "were"', form: 'would + base form' }],
]

export default {
  '10C - Grammar: Second Conditional (would / could / might)': {
    pictureSorts,
    pictures,
    q: [
      ['The second conditional talks about situations that are ___.', ['impossible or very unlikely', 'certain', 'in the past', 'happening now'], 0],
      ['Form: If + ___ , would + base form.', ['simple past', 'simple present', 'present perfect', 'will'], 0],
      ['If I ___ rich, I\'d buy a big house by the sea.', ['were', 'am', 'will be', 'would be'], 0],
      ['If I argued with my best friend, I\'d ___ sad.', ['be', 'am', 'was', 'being'], 0],
      ['If I could speak Spanish, I\'d ___ traveling in South America.', ['go', 'went', 'going', 'will go'], 0],
      ['If I won the lottery, I ___ give all the money to charity.', ['might', 'will', 'am going to', 'had'], 0],
      ['If I ___ you, I\'d update my résumé.', ['were', 'was being', 'am', 'will be'], 0],
      ['If my new phone stopped working tomorrow, I\'d ___ it back to the store.', ['take', 'took', 'taken', 'taking'], 0],
      ['We often use ___ instead of "was" with I, he, she and it in the if-clause.', ['were', 'be', 'been', 'is'], 0],
      ['"If I were you, I\'d take a cab to the airport." This is ___.', ['advice', 'a prediction', 'a past event', 'a promise'], 0],
      ['Which is correct?', ['If I had more time, I\'d learn the saxophone.', 'If I would have more time, I\'d learn the saxophone.', 'If I have more time, I would learned.', 'If I had more time, I will learn.'], 0],
      ['Which sentence uses "could" in the main clause?', ['If we lived by the sea, we could go swimming every day.', 'If we could live by the sea, we go swimming.', 'If we live by the sea, we can swim.', 'We could lived by the sea.'], 0],
      ['"If you asked John more politely, he ___ help you."', ['might', 'will', 'does', 'is going to'], 0],
      ['Which sentence is the FIRST conditional?', ['If it rains tomorrow, we\'ll go shopping.', 'If it rained tomorrow, we\'d go shopping.', 'If it rained, we would shop.', 'If it were raining, we might shop.'], 0],
      ['"If it rained tomorrow, we\'d go shopping." The speaker thinks rain is ___.', ['unlikely', 'certain', 'already happening', 'impossible in general'], 0],
      ['If I ___ downtown, I ___ to work.', ['lived / would walk', 'live / would walk', 'lived / will walk', 'would live / walked'], 0],
      ['This city ___ much nicer if there ___ less traffic.', ['would be / were', 'will be / is', 'is / were', 'would be / will be'], 0],
      ['If you ___ up a bit earlier, you ___ late for work so often.', ['got / wouldn\'t be', 'get / won\'t be', 'got / won\'t be', 'would get / weren\'t'], 0],
      ['If we ___ a bigger car, we ___ more things on vacation.', ['had / could take', 'have / can take', 'had / can take', 'would have / took'], 0],
      ['What ___ if someone ___ your car?', ['would you do / stole', 'will you do / stole', 'would you do / steals', 'do you do / stole'], 0],
      ['If I ___ basketball, I\'d ___ a bit taller.', ['played / be', 'play / be', 'played / am', 'would play / be'], 0],
      ['"I\'m lazy. I always get bad grades." → If I ___ lazy, I ___ get bad grades.', ['weren\'t / wouldn\'t', 'am not / won\'t', 'wasn\'t / don\'t', 'weren\'t / won\'t'], 0],
      ['"It\'s so hot. I can\'t concentrate." → If it ___ so hot, I ___ concentrate.', ['weren\'t / could', 'isn\'t / can', 'weren\'t / can', 'wasn\'t / will'], 0],
      ['"I don\'t get any exercise. I\'m out of shape." → If I ___ exercise, I ___ so out of shape.', ['got some / wouldn\'t be', 'get / won\'t be', 'got / am not', 'would get / weren\'t'], 0],
    ],
    s: [
      ['If I were rich, I\'d buy a big house by the sea.', true],
      ['If I argued with my best friend, I\'d be sad.', true],
      ['If I could speak Spanish, I\'d go traveling in South America.', true],
      ['If I won the lottery, I might give all the money to charity.', true],
      ['If I were you, I\'d update my résumé.', true],
      ['If we lived by the sea, we could go swimming every day.', true],
      ['If Adam were here, he would fix your computer.', true],
      ['If I had more time, I\'d learn the saxophone.', true],
      ['If it rains tomorrow, we\'ll go shopping. (likely)', true],
      ['If it rained tomorrow, we\'d go shopping. (unlikely)', true],
      ['If you went to bed earlier, you wouldn\'t feel so tired.', true],
      ['If I would have more time, I\'d learn the saxophone.', false, 'If I had more time, I\'d learn the saxophone.', 'No "would" in the if-clause.'],
      ['If I am rich, I\'d buy a big house.', false, 'If I were rich, I\'d buy a big house.', 'if + simple past.'],
      ['If I were you, I will update my résumé.', false, 'If I were you, I\'d update my résumé.', 'would, not will.'],
      ['If you went to bed earlier, you won\'t feel so tired.', false, 'If you went to bed earlier, you wouldn\'t feel so tired.', 'would + base form.'],
      ['If we lived by the sea, we could went swimming.', false, 'If we lived by the sea, we could go swimming.', 'could + base form.'],
      ['If I won the lottery, I might gave the money away.', false, 'If I won the lottery, I might give the money away.', 'might + base form.'],
      ['If my phone stopped working, I\'d taken it back.', false, 'If my phone stopped working, I\'d take it back.', '\'d = would + base.'],
      ['If I would be you, I\'d take a cab.', false, 'If I were you, I\'d take a cab.', 'If I were you.'],
      ['The second conditional is for very likely future events.', false, 'The second conditional is for unlikely or impossible situations.', 'Unlikely / impossible.'],
      ['If I was lived downtown, I would walk to work.', false, 'If I lived downtown, I would walk to work.', 'Simple past only.'],
      ['If it rained tomorrow, we will go shopping.', false, 'If it rained tomorrow, we\'d go shopping.', 'rained → would.'],
    ],
  },
}
