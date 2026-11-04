// Extra topic for Intermediate 1 / Unit 12 taken from the coursebook page 12C Uses of the -ing form and the infinitive.
// Listening / speaking cards live in listening-speaking.mjs.
const img = (name) => `/img/ing-infinitive/${name}.svg`

const pictureSorts = {
  form: {
    prompt: 'Which form completes "{word}"?',
    options: ['-ing form', 'to + infinitive', 'not + -ing', 'not to + infinitive'],
    explain: '"{Word}" → {value}.',
  },
  why: {
    prompt: 'Why that form in "{word}"?',
    options: ['After a preposition', 'Subject or object of the sentence', 'After an adjective', 'To express a purpose'],
    explain: '"{Word}" → {value}.',
  },
}

const pictures = [
  ['Thanks for ___ me to your wedding. (invite)', img('wedding'), { form: '-ing form', why: 'After a preposition' }],
  ["I'm interested in ___ a new laptop. (buy)", img('laptop'), { form: '-ing form', why: 'After a preposition' }],
  ['___ a bike is a great way to stay in shape. (ride)', img('bike'), { form: '-ing form', why: 'Subject or object of the sentence' }],
  ['I love ___. (dance)', img('dancing'), { form: '-ing form', why: 'Subject or object of the sentence' }],
  ["It's easy ___ to work. (forget)", img('easy'), { form: 'to + infinitive', why: 'After an adjective' }],
  ["I'm amazed ___ you here. (hear)", img('amazed'), { form: 'to + infinitive', why: 'After an adjective' }],
  ['I went shopping ___ a new pair of shoes. (buy)', img('shoes'), { form: 'to + infinitive', why: 'To express a purpose' }],
  ['We have to leave soon ___ there on time. (get)', img('clock'), { form: 'to + infinitive', why: 'To express a purpose' }],
  ["I'm bored with ___ going out. (not)", img('bored'), { form: 'not + -ing', why: 'After a preposition' }],
  ["I'm disappointed ___ this show. (not see)", img('disappointed'), { form: 'not to + infinitive', why: 'After an adjective' }],
  ['This button is for ___ up the volume. (function)', img('button'), { form: '-ing form', why: 'After a preposition' }],
  ['Press this button ___ up the volume. (purpose)', img('button-purpose'), { form: 'to + infinitive', why: 'To express a purpose' }],
]

export default {
  '12C - Grammar: Uses of the -ing Form and the Infinitive': {
    pictureSorts,
    pictures,
    q: [
      ['After a preposition we use the ___.', ['-ing form', 'infinitive', 'base form', 'past participle'], 0],
      ['After an adjective we normally use the ___.', ['infinitive (to + verb)', '-ing form', 'base form', 'past participle'], 0],
      ['To say WHY we do something (purpose), we use the ___.', ['infinitive', '-ing form', 'for + base form', 'past participle'], 0],
      ['Thanks for ___ me to your wedding.', ['inviting', 'to invite', 'invite', 'invited'], 0],
      ['I\'m bored with ___ going out.', ['not', 'don\'t', 'no', 'to not'], 0],
      ['He\'s worried about ___ his exam.', ['failing', 'to fail', 'fail', 'failed'], 0],
      ['___ in touch is so easy these days.', ['Keeping', 'To keeping', 'Keep', 'Kept'], 0],
      ['Reading is a great way ___ your English.', ['to improve', 'improving', 'improve', 'of improve'], 0],
      ['I\'m amazed ___ that they\'re going out with each other.', ['to hear', 'hearing', 'hear', 'for hearing'], 0],
      ['It\'s impossible ___ when you watch this movie.', ['not to laugh', 'not laughing', 'to not laugh', 'no laugh'], 0],
      ['I went shopping ___ a new pair of shoes.', ['to buy', 'buying', 'for buy', 'buy'], 0],
      ['She left the office ___ a friend.', ['to meet', 'meeting', 'for meet', 'meet'], 0],
      ['Which sentence describes a FUNCTION?', ['This button is for turning up the volume.', 'Press this button to turn up the volume.', 'Turning up the volume is easy.', 'I pressed the button to hear it.'], 0],
      ['Which sentence describes a PURPOSE?', ['Press this button to turn up the volume.', 'This button is for turning up the volume.', 'The button is for the volume.', 'Turning up the volume is fun.'], 0],
      ['Before ___ anything, you need to listen to me.', ['saying', 'to say', 'say', 'said'], 0],
      ['She wants a better job ___ more money.', ['to earn', 'for earning', 'earning', 'earn'], 0],
      ['He\'s afraid of ___ his folders.', ['losing', 'to lose', 'lose', 'lost'], 0],
      ['___ photos is easy with Instagram.', ['Sharing', 'To share', 'Share', 'Shared'], 0],
      ['I\'m really sorry for ___ your party.', ['missing', 'to miss', 'miss', 'missed'], 0],
      ['I\'m delighted ___ that you\'re getting married.', ['to tell you', 'telling you', 'tell you', 'for telling you'], 0],
      ['___ another language is really useful in business.', ['Speaking', 'To speaking', 'Speak', 'Spoke'], 0],
      ['He asked me ___ care of his plants.', ['to take', 'taking', 'take', 'for taking'], 0],
      ['We thought about ___ to the wedding.', ['not going', 'not to go', 'don\'t go', 'no going'], 0],
      ['Which is correct?', ['Drinking too much coffee isn\'t good for you.', 'To drinking too much coffee isn\'t good.', 'Drink too much coffee isn\'t good.', 'Drinking too much coffee aren\'t good for you.'], 0],
    ],
    s: [
      ['Thanks for inviting me to your wedding.', true],
      ['I\'m bored with not going out.', true],
      ['He\'s worried about failing his exam.', true],
      ['Keeping in touch is so easy these days.', true],
      ['Reading is a great way to improve your English.', true],
      ['I\'m disappointed not to see this show.', true],
      ['It\'s impossible not to laugh when you watch this movie.', true],
      ['I went shopping to buy a new pair of shoes.', true],
      ['This button is for turning up the volume.', true],
      ['Press this button to turn up the volume.', true],
      ['Drinking too much coffee isn\'t good for you.', true],
      ['Thanks for to invite me to your wedding.', false, 'Thanks for inviting me to your wedding.', 'Preposition + -ing.'],
      ['I\'m interested in buy a new laptop.', false, 'I\'m interested in buying a new laptop.', 'Preposition + -ing.'],
      ['Ride a bike is a great way to stay in shape.', false, 'Riding a bike is a great way to stay in shape.', 'Subject → -ing.'],
      ['It\'s easy forgetting to work.', false, 'It\'s easy to forget to work.', 'Adjective + infinitive.'],
      ['I went shopping for buy shoes.', false, 'I went shopping to buy shoes.', 'Purpose → to + verb.'],
      ['I\'m amazed hearing that they\'re going out.', false, 'I\'m amazed to hear that they\'re going out.', 'Adjective + infinitive.'],
      ['This button is for turn up the volume.', false, 'This button is for turning up the volume.', 'for + -ing (function).'],
      ['She\'s not afraid to flying.', false, 'She\'s not afraid of flying.', 'afraid of + -ing.'],
      ['He asked me taking care of his plants.', false, 'He asked me to take care of his plants.', 'ask someone to + verb.'],
      ['I\'m bored with no going out.', false, 'I\'m bored with not going out.', 'not + -ing.'],
      ['Cook with friends is a nice way to relax.', false, 'Cooking with friends is a nice way to relax.', 'Subject → -ing.'],
    ],
  },
}
