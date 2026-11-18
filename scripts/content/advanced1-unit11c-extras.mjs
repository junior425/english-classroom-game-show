// Extra topic for Advanced 1 / Unit 11 taken from the coursebook page 11C Third conditional.
// Listening / speaking cards live in listening-speaking.mjs.
const img = (name) => `/img/third-conditional/${name}.svg`

const pictureSorts = {
  clause: {
    prompt: 'Which part of the third conditional is "{word}"?',
    options: ['if-clause: had + past participle', 'main clause: would have + past participle', 'main clause: might / could have + past participle', 'A contraction rule'],
    explain: '"{Word}" → {value}.',
  },
  reality: {
    prompt: 'What was the real past situation in "{word}"?',
    options: ['It happened / was true', "It didn't happen / wasn't true", 'A grammar form', 'An uncertain result'],
    explain: '"{Word}" → {value}.',
  },
}

const pictures = [
  ["If Emil hadn't stayed out all night, his parents wouldn't have been so furious.", img('emil-angry'), { clause: 'main clause: would have + past participle', reality: 'It happened / was true' }],
  ["I would have come to the party if I'd known about it.", img('party'), { clause: 'main clause: would have + past participle', reality: "It didn't happen / wasn't true" }],
  ["If I'd studied more before my exam, I might have passed.", img('exam'), { clause: 'main clause: might / could have + past participle', reality: 'An uncertain result' }],
  ["If you'd called me earlier, we could have gone out for dinner.", img('dinner'), { clause: 'main clause: might / could have + past participle', reality: "It didn't happen / wasn't true" }],
  ["If I'd seen your e-mail, I would have replied to it.", img('email'), { clause: 'main clause: would have + past participle', reality: "It didn't happen / wasn't true" }],
  ["If he'd taken a cab, he wouldn't have missed his train.", img('train'), { clause: 'main clause: would have + past participle', reality: 'It happened / was true' }],
  ['If it had been sunny yesterday, we would have gone for a walk.', img('walk'), { clause: 'if-clause: had + past participle', reality: "It didn't happen / wasn't true" }],
  ["If my car hadn't broken down, I could have taken you to the airport.", img('car-broken'), { clause: 'main clause: might / could have + past participle', reality: 'It happened / was true' }],
  ['if + had + past participle', img('past-perfect'), { clause: 'if-clause: had + past participle', reality: 'A grammar form' }],
  ['would have + past participle', img('would-have'), { clause: 'main clause: would have + past participle', reality: 'A grammar form' }],
  ["'d = had (If I'd known…)", img('d-had'), { clause: 'A contraction rule', reality: 'A grammar form' }],
  ["'d = would (I'd have come…)", img('d-would'), { clause: 'A contraction rule', reality: 'A grammar form' }],
]

export default {
  '11C - Grammar: Third Conditional (would / might / could have)': {
    pictureSorts,
    pictures,
    q: [
      ['We use the third conditional to talk about ___ situations.', ['hypothetical (unreal) past', 'real present', 'likely future', 'general truths'], 0],
      ['The if-clause of the third conditional uses ___.', ['the past perfect', 'the simple past', 'the present perfect', 'would have'], 0],
      ['The main clause of the third conditional uses ___.', ['would have + past participle', 'would + base form', 'will have + past participle', 'had + past participle'], 0],
      ["If Emil ___ out all night, his parents wouldn't have been so furious.", ["hadn't stayed", "didn't stay", "wouldn't stay", "hasn't stayed"], 0],
      ["I ___ to the party if I'd known about it.", ['would have come', 'would come', 'had come', 'will have come'], 0],
      ["If I'd studied more before my exam, I ___.", ['might have passed', 'might pass', 'had passed', 'would pass'], 0],
      ["If you'd called me earlier, we ___ out for dinner.", ['could have gone', 'could go', 'had gone', 'can have gone'], 0],
      ["\"If I'd seen your e-mail, I would have replied to it.\" means: ___", ["I didn't see the e-mail.", 'I saw the e-mail.', 'I replied to it.', "I'll reply tomorrow."], 0],
      ["\"If he'd taken a cab, he wouldn't have missed his train.\" means: ___", ['He missed his train.', 'He took a cab.', "He didn't miss his train.", 'He is taking a cab.'], 0],
      ['If you ___ with us, you would have had a great time.', ['had come', 'came', 'would come', 'have come'], 0],
      ["If the bus hadn't been late, we ___ at the theater before the movie started.", ['would have arrived', 'would arrive', 'had arrived', 'arrived'], 0],
      ['The if-clause can come ___ of the sentence.', ['at the beginning or at the end', 'only at the beginning', 'only at the end', 'only in the middle'], 0],
      ['If it had been sunny yesterday, we would have gone for a walk. = ___', ["We would have gone for a walk if it had been sunny yesterday.", "We went for a walk because it was sunny.", "If it is sunny, we will go for a walk.", "We would go for a walk if it were sunny."], 0],
      ["We use might or may instead of would when the consequences ___.", ["weren't certain", 'were certain', 'were impossible', 'were in the present'], 0],
      ["If I hadn't arrived late to the interview, I ___ the job.", ['might have gotten', 'might get', 'had gotten', 'would get'], 0],
      ["If they'd stayed longer at the beach, we ___ them.", ['may have seen', 'may see', 'had seen', 'would see'], 0],
      ['We use could instead of would to talk about hypothetical ___.', ['possibilities', 'certainties', 'obligations', 'habits'], 0],
      ["If my car hadn't broken down, I ___ you to the airport yesterday.", ['could have taken', 'could take', 'had taken', 'can take'], 0],
      ["If they'd told us about the problem, we ___ them.", ['could have helped', 'could help', 'had helped', 'can have helped'], 0],
      ["In \"If I'd known you were in the hospital…\", 'd = ___", ['had', 'would', 'did', 'should'], 0],
      ["In \"…I'd have come to visit you\", 'd = ___", ['would', 'had', 'did', 'could'], 0],
      ["Which is wrong?", ["If I would have known, I'd have come.", "If I had known, I'd have come.", "If I'd known, I would have come.", "I'd have come if I'd known."], 0],
      ["If Emil hadn't stayed out all night = ___", ['Emil stayed out all night.', "Emil didn't stay out.", 'Emil stays out every night.', 'Emil will stay out.'], 0],
      ["If I'd studied more, I might have passed. = ___", ["I didn't study much and I didn't pass.", 'I studied a lot and I passed.', "I'll study more next time.", 'I passed easily.'], 0],
    ],
    s: [
      ["If Emil hadn't stayed out all night, his parents wouldn't have been so furious.", true],
      ["I would have come to the party if I'd known about it.", true],
      ["If I'd studied more before my exam, I might have passed.", true],
      ["If you'd called me earlier, we could have gone out for dinner.", true],
      ["If I'd seen your e-mail, I would have replied to it.", true],
      ["If he'd taken a cab, he wouldn't have missed his train.", true],
      ['If you had come with us, you would have had a great time.', true],
      ['We would have gone for a walk if it had been sunny yesterday.', true],
      ["If I hadn't arrived late to the interview, I might have gotten the job.", true],
      ["If they'd told us about the problem, we could have helped them.", true],
      ["If I'd known you were in the hospital, I'd have come to visit you.", true],
      ["If I would have known, I'd have come.", false, "If I had known, I'd have come.", "Don't use would in the if-clause."],
      ["If I'd seen your e-mail, I would reply to it.", false, "If I'd seen your e-mail, I would have replied to it.", 'would have + past participle.'],
      ["If he took a cab, he wouldn't have missed his train.", false, "If he'd taken a cab, he wouldn't have missed his train.", 'Past perfect in the if-clause.'],
      ["If you'd called me earlier, we could gone out for dinner.", false, "…we could have gone out for dinner.", 'could HAVE gone.'],
      ["If it had been sunny, we would have went for a walk.", false, "…we would have gone for a walk.", 'Past participle: gone.'],
      ["If the bus hadn't been late, we had arrived before the movie.", false, "…we would have arrived before the movie.", 'Main clause: would have.'],
      ["If I'd studied more, I might pass.", false, "If I'd studied more, I might have passed.", 'might HAVE passed.'],
      ["If Emil didn't stay out, his parents wouldn't have been furious.", false, "If Emil hadn't stayed out…", 'had + past participle.'],
      ["If my car hadn't broken down, I could take you to the airport yesterday.", false, "…I could have taken you to the airport yesterday.", 'could HAVE taken.'],
      ["I'd have come to the party if I would have known.", false, "…if I'd known.", "'d = had in the if-clause."],
      ["If they stayed longer, we may have seen them.", false, "If they'd stayed longer, we may have seen them.", 'Past perfect in the if-clause.'],
    ],
  },
}
