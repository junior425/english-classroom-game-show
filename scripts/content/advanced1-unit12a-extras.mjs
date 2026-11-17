// Extra topic for Advanced 1 / Unit 12 taken from the coursebook page 12A So / Neither do I.
// (12A Phrases with go and get is covered in advanced1-unit12-extras.mjs.) Listening / speaking cards live in listening-speaking.mjs.
const img = (name) => `/img/so-neither/${name}.svg`

const pictureSorts = {
  reply: {
    prompt: 'Which reply agrees with "{word}"?',
    options: ['So + auxiliary + I', 'Neither + auxiliary + I', 'Really? I do / I am…', 'Really? I don\'t / I\'m not…'],
    explain: '"{Word}" → {value}.',
  },
  aux: {
    prompt: 'Which auxiliary do we use for "{word}"?',
    options: ['am / is / are', 'do / does / did', 'can / could / would', 'have / has'],
    explain: '"{Word}" → {value}.',
  },
}

const pictures = [
  ['"I\'m tired." – agree', img('so-am-i'), { reply: 'So + auxiliary + I', aux: 'am / is / are' }],
  ['"I love playing golf." – agree', img('so-do-i'), { reply: 'So + auxiliary + I', aux: 'do / does / did' }],
  ['"I can swim very well." – agree', img('so-can-i'), { reply: 'So + auxiliary + I', aux: 'can / could / would' }],
  ['"I went to Japan last year." – agree', img('so-did-i'), { reply: 'So + auxiliary + I', aux: 'do / does / did' }],
  ['"I\'m not very good at chess." – agree', img('neither-am-i'), { reply: 'Neither + auxiliary + I', aux: 'am / is / are' }],
  ['"I don\'t like rap music." – agree', img('neither-do-i'), { reply: 'Neither + auxiliary + I', aux: 'do / does / did' }],
  ['"I couldn\'t go to class last week." – agree', img('neither-can-i'), { reply: 'Neither + auxiliary + I', aux: 'can / could / would' }],
  ['"I haven\'t done my homework." – agree', img('neither-have-i'), { reply: 'Neither + auxiliary + I', aux: 'have / has' }],
  ['"I don\'t like traveling by train." – disagree', img('really-i-do'), { reply: 'Really? I do / I am…', aux: 'do / does / did' }],
  ['"I really enjoyed that movie." – disagree', img('really-i-dont'), { reply: 'Really? I don\'t / I\'m not…', aux: 'do / does / did' }],
  ['"I\'m going on vacation next month." – disagree', img('i-am-not'), { reply: 'Really? I don\'t / I\'m not…', aux: 'am / is / are' }],
  ['"I didn\'t like the hotel." – disagree', img('i-did'), { reply: 'Really? I do / I am…', aux: 'do / does / did' }],
]

export default {
  '12A - Grammar: So / Neither do I (agreeing & disagreeing)': {
    pictureSorts,
    pictures,
    q: [
      ['To agree with an affirmative statement we use ___ + auxiliary + I.', ['So', 'Neither', 'Really', 'Too'], 0],
      ['To agree with a negative statement we use ___ + auxiliary + I.', ['Neither', 'So', 'Really', 'Also'], 0],
      ['"I\'m at the airport." – "___"', ['So am I.', 'So do I.', 'Neither am I.', 'So I am.'], 0],
      ['"I can speak Spanish." – "___"', ['So can I.', 'So do I.', 'Neither can I.', 'So I can.'], 0],
      ['"I\'ve never been abroad." – "___"', ['Neither have I.', 'So have I.', 'Neither do I.', 'Neither am I.'], 0],
      ['"I won\'t be late." – "___"', ['Neither will I.', 'So will I.', 'Neither do I.', 'So won\'t I.'], 0],
      ['"I love playing golf." – "___"', ['So do I.', 'So am I.', 'So I do.', 'Neither do I.'], 0],
      ['"I\'d love to visit New Zealand one day." – "___"', ['So would I.', 'So do I.', 'So am I.', 'So I would.'], 0],
      ['"I\'m not very good at chess." – "___"', ['Neither am I.', 'Neither do I.', 'So am I.', 'Neither I am.'], 0],
      ['"I couldn\'t do my homework." – "___"', ['Neither could I.', 'So could I.', 'Neither can I.', 'Neither did I.'], 0],
      ['"I\'m going on vacation next month." – "___"', ['I\'m not.', 'I don\'t.', 'Neither am I.', 'I do.'], 0],
      ['Neither do I = ___', ['I don\'t like it either.', 'I like it too.', 'I don\'t know.', 'Neither of us.'], 0],
      ['"I don\'t like traveling by train." – (disagree) "___"', ['Really? I do.', 'Neither do I.', 'So do I.', 'Really? I don\'t.'], 0],
      ['"I\'ve never tried mint ice cream." – (disagree) "___"', ['Really? I have. It\'s delicious!', 'Neither have I.', 'Really? I do.', 'So have I.'], 0],
      ['"I really enjoyed that movie." – (disagree) "___"', ['I didn\'t.', 'I don\'t.', 'Neither did I.', 'So did I.'], 0],
      ['"I love going running after work." – (disagree) "___"', ['I don\'t. I hate running.', 'I\'m not.', 'Neither do I.', 'So do I.'], 0],
      ['"I didn\'t enjoy that movie." – (disagree) "___"', ['Really? I did.', 'Really? I do.', 'Neither did I.', 'So did I.'], 0],
      ['"I can\'t help Leo with his homework." – (disagree) "___"', ['I can. Don\'t worry.', 'Neither can I.', 'I do.', 'So can I.'], 0],
      ['"I love sightseeing." – "___ do I. It\'s better than lying on the beach."', ['So', 'Neither', 'Really', 'Also'], 0],
      ['"I\'ve never been to Japan." – "Neither ___ I. But I\'d like to go one day."', ['have', 'do', 'am', 'did'], 0],
      ['"I can\'t swim very well." – "Oh, I ___. I\'m a very good swimmer."', ['can', 'do', 'am', 'have'], 0],
      ['"I\'m staying at home tonight." – "Really? I ___. I\'m going out."', ['\'m not', 'don\'t', 'didn\'t', 'can\'t'], 0],
      ['"I didn\'t like that movie." – "___ did I. I thought it was really boring."', ['Neither', 'So', 'Really', 'Either'], 0],
      ['"I\'d like to watch that new reality show." – "So ___ I. I think it\'s really funny."', ['would', 'do', 'am', 'did'], 0],
    ],
    s: [
      ['"I love playing golf." – "So do I."', true],
      ['"I\'d love to visit New Zealand." – "So would I."', true],
      ['"I\'m not very good at chess." – "Neither am I."', true],
      ['"I couldn\'t go to class last week." – "Neither could I."', true],
      ['"I haven\'t done my homework." – "Really? I have."', true],
      ['"I\'m going on vacation next month." – "I\'m not."', true],
      ['"I\'ve never been abroad." – "Neither have I."', true],
      ['"I won\'t be late." – "Neither will I."', true],
      ['"I don\'t like traveling by train." – "Really? I do."', true],
      ['"I really enjoyed that movie." – "I didn\'t."', true],
      ['"I can\'t help Leo with his homework." – "I can. Don\'t worry."', true],
      ['"I love playing golf." – "So am I."', false, '"So do I."', 'love → do.'],
      ['"I\'m at the airport." – "So do I."', false, '"So am I."', 'am → am.'],
      ['"I don\'t like rap music." – "So do I."', false, '"Neither do I."', 'Negative → neither.'],
      ['"I\'ve never been abroad." – "Neither did I."', false, '"Neither have I."', 'have → have.'],
      ['"I can speak Spanish." – "So I can."', false, '"So can I."', 'So + auxiliary + I.'],
      ['"I won\'t be late." – "Neither won\'t I."', false, '"Neither will I."', 'Neither + positive auxiliary.'],
      ['"I\'m not good at chess." – "Neither do I."', false, '"Neither am I."', 'am → am.'],
      ['"I didn\'t like the hotel." – "Neither do I."', false, '"Neither did I."', 'Past → did.'],
      ['"I really enjoyed that movie." – (disagree) "Neither did I."', false, '"I didn\'t."', 'Disagree → I didn\'t.'],
      ['"I\'d like to watch that show." – "So do I."', false, '"So would I."', '\'d = would.'],
      ['"I\'m staying at home tonight." – (disagree) "I don\'t."', false, '"I\'m not."', 'am → \'m not.'],
    ],
  },
}
