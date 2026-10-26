// Extra topic for Intermediate 1 / Unit 11 taken from the coursebook page 11C Articles.
// Listening / speaking cards live in listening-speaking.mjs.
const img = (name) => `/img/articles/${name}.svg`

const pictureSorts = {
  article: {
    prompt: 'Which article do we use with "{word}"?',
    options: ['a / an', 'the', 'no article', 'a or the depending on context'],
    explain: '"{Word}" → {value}.',
  },
  why: {
    prompt: 'Why that article for "{word}"?',
    options: ['First mention / one of many', 'Only one or already mentioned', 'General, name, or home/work/school', 'Meal, day or month'],
    explain: '"{Word}" → {value}.',
  },
}

const pictures = [
  ['I have ___ dog. (first time)', img('dog-first'), { article: 'a / an', why: 'First mention / one of many' }],
  ['___ dog is much bigger than the cat.', img('dog-the'), { article: 'the', why: 'Only one or already mentioned' }],
  ['___ sun is setting.', img('sun'), { article: 'the', why: 'Only one or already mentioned' }],
  ['She plays ___ guitar.', img('piano'), { article: 'the', why: 'Only one or already mentioned' }],
  ["I'm not going to ___ work today.", img('home'), { article: 'no article', why: 'General, name, or home/work/school' }],
  ['My cousin lives in ___ Venezuela.', img('country'), { article: 'no article', why: 'General, name, or home/work/school' }],
  ['___ dogs are my favorite animals.', img('plural-general'), { article: 'no article', why: 'General, name, or home/work/school' }],
  ["I'm having ___ lunch with Jack on ___ Tuesday.", img('meals-days'), { article: 'no article', why: 'Meal, day or month' }],
  ["He's ___ fastest runner in the world.", img('superlative'), { article: 'the', why: 'Only one or already mentioned' }],
  ["My sister's ___ engineer.", img('a-an'), { article: 'a / an', why: 'First mention / one of many' }],
  ['I see him once ___ week.', img('a-an'), { article: 'a / an', why: 'First mention / one of many' }],
  ['I live in ___ U.S.', img('the'), { article: 'the', why: 'Only one or already mentioned' }],
]

export default {
  '11C - Grammar: Articles (a / an, the, no article)': {
    pictureSorts,
    pictures,
    q: [
      ['We usually go to ______ movies once or twice ______ month.', ['the / a', 'a / the', '— / a', 'the / the'], 0, 'The movies (fixed), once a month (frequency).'],
      ['I bought ______ new car yesterday, but this morning ______ engine won’t start.', ['a / the', 'the / a', 'a / an', '— / the'], 0, 'First mention → a; then we know which engine → the.'],
      ['He’s one of five brothers. ______ youngest brother is ______ doctor.', ['The / a', 'A / the', 'The / —', '— / a'], 0, 'Superlative → the; profession → a.'],
      ['She flew from ______ Venezuela to ______ U.S.', ['— / the', 'the / the', 'the / —', 'a / the'], 0, 'No article with most countries; the U.S.'],
      ['Are you really scared of ______ spiders?', ['—', 'the', 'a', 'an'], 0, 'General plural → no article.'],
      ['How long have you played ______ piano?', ['the', 'a', '—', 'an'], 0, 'Instruments → the.'],
      ['Neil Armstrong was ______ first man on ______ moon.', ['the / the', 'a / the', 'the / a', '— / the'], 0, 'First (ordinal) → the; only one moon → the.'],
      ['I hope you both find ______ happiness together.', ['—', 'the', 'a', 'an'], 0, 'Uncountable, general → no article.'],
      ['What did you have for ______ breakfast this morning?', ['—', 'the', 'a', 'an'], 0, 'Meals → no article.'],
      ['We have ______ dinner together three times ______ year.', ['— / a', 'the / a', 'a / the', '— / the'], 0, 'Meal → no; frequency → a.'],
      ['She got ______ home from ______ work and went straight to ______ bed.', ['— / — / —', 'the / the / the', '— / the / —', 'a / — / the'], 0, 'Home, work, bed → no article.'],
      ['______ Friday is ______ busiest day of ______ week for us.', ['— / the / the', 'The / the / a', '— / a / the', 'The / — / the'], 0, 'Days → no; superlative → the; the week.'],
      ['Is she student?', ['Is she a student? ✗', 'Correct ✓', 'Is she the student? ✗', 'Is she an student? ✗'], 0, 'Profession/role → a.'],
      ['I’m staying in bed this morning.', ['Correct ✓', 'I’m staying in the bed. ✗', 'I’m staying in a bed. ✗', 'I’m staying in an bed. ✗'], 0, 'In bed → no article.'],
      ['Why don’t you ask her out for lunch?', ['Correct ✓', '…for the lunch ✗', '…for a lunch ✗', '…for an lunch ✗'], 0, 'Meals → no article.'],
      ['Excuse me, where’s museum?', ['…where’s the museum? ✗', 'Correct ✓', '…where’s a museum? is the only option ✗', '…where’s museum, the? ✗'], 0, 'We both know which museum → the.'],
      ['It’s beautiful day today.', ['It’s a beautiful day today. ✗', 'Correct ✓', 'It’s the beautiful day today. ✗', 'It’s an beautiful day today. ✗'], 0, 'Singular countable → a.'],
      ['The life is hard sometimes.', ['Life is hard sometimes. ✗', 'Correct ✓', 'A life is hard sometimes. ✗', 'The lives are hard. ✗'], 0, 'General abstract noun → no article.'],
      ['Our taxi driver was from Mexico.', ['Correct ✓', '…from the Mexico ✗', '…from a Mexico ✗', 'A our taxi driver ✗'], 0, 'Countries → no article.'],
      ['I went to the bank this morning.', ['Correct ✓', 'I went to bank ✗', 'I went to a bank is the only option ✗', 'I went to an bank ✗'], 0, 'The bank we know → the.'],
      ['My wife has never liked the tomatoes.', ['My wife has never liked tomatoes. ✗', 'Correct ✓', '…liked a tomatoes ✗', '…liked an tomatoes ✗'], 0, 'General plural → no article.'],
      ['Isn’t it best present I’ve ever received?', ['Isn’t it the best present…? ✗', 'Correct ✓', 'Isn’t it a best present…? ✗', 'Isn’t it an best present…? ✗'], 0, 'Superlative → the.'],
      ['Hexoskin is ______ Canadian company founded in 2006. It wanted to create ______ clothes that could record ______ information about our bodies.', ['a / — / —', 'the / the / the', 'a / the / a', '— / — / the'], 0, 'A company; general plural and uncountable → no article.'],
      ['They developed ______ smart shirt that contains ______ sensors.', ['a / —', 'the / the', 'a / the', '— / a'], 0, 'First mention → a; general plural → no article.'],
    ],
    s: [
      ['I have a pet dog and a pet cat.', true, 'Correct.'],
      ['The dog is much bigger than the cat.', true, 'Correct.'],
      ['I love animals, especially dogs and cats.', true, 'Correct.'],
      ['I have two children: a boy and a girl.', true, 'Correct.'],
      ['My sister’s engineer.', false, 'My sister’s an engineer.', 'Profession → a/an.'],
      ['I see him once a week.', true, 'Correct.'],
      ['The fish costs $10 the kilo.', false, 'The fish costs $10 a kilo.', 'Measurement → a.'],
      ['The boy is named Alex, and the girl is named Lucy.', true, 'Correct.'],
      ['The sun is setting.', true, 'Correct.'],
      ['I’ll check on Internet.', false, 'I’ll check on the Internet.', 'The Internet.'],
      ['I live in the U.S., but my brother lives in the Philippines.', true, 'Correct.'],
      ['I went to the bank and the grocery store.', true, 'Correct.'],
      ['She plays guitar very well.', false, 'She plays the guitar very well.', 'Instruments → the (in this coursebook).'],
      ['He’s the fastest runner in the world.', true, 'Correct.'],
      ['The dogs are my favorite animals.', false, 'Dogs are my favorite animals.', 'General plural → no article.'],
      ['Pollution is a big problem today.', true, 'Correct.'],
      ['I’m not going to the work today.', false, 'I’m not going to work today.', 'Work → no article.'],
      ['She had to go to college.', true, 'Correct.'],
      ['On Tuesday, I’m having lunch with Jack.', true, 'Correct.'],
      ['August is my favorite month.', true, 'Correct.'],
      ['Neil Armstrong was the first man on the moon.', true, 'Correct.'],
      ['Are you scared of the spiders?', false, 'Are you scared of spiders?', 'General plural → no article.'],
    ],
  },
}
