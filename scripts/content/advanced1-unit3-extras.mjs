// Extra topics for Advanced 1 / Unit 3 taken from the coursebook pages 3C (Relationships vocabulary)
// and 3C (Defining and non-defining relative clauses). Appended after the two base topics of the unit.
// Format: q = [prompt, options(4), answerIndex, explanation(, image)] (Point Steal, Pressure Bomb, The Trapdoor);
// s = [sentence, correct, fix, explanation] (Grammar Auction);
// pictureSorts + pictures = [word, imageUrl, { sortKey: option }] feed Picture Quiz.
// Listening / speaking cards for these topics live in listening-speaking.mjs.
const img = (name) => `/img/relationships/${name}.svg`

const pictureSorts = {
  kind: {
    prompt: '"{Word}" — family, friends & love, work / school / home, or an action?',
    options: ['Family', 'Friends & love', 'Work / school / home', 'An action or phrase'],
    explain: '"{Word}" → {value}.',
  },
  tone: {
    prompt: '"{Word}" — is it positive, negative or neutral?',
    options: ['Positive', 'Negative', 'Neutral', 'It depends'],
    explain: '"{Word}" → {value}.',
  },
}

const pictures = [
  ['best friend', img('best-friend'), { kind: 'Friends & love', tone: 'Positive' }],
  ['close friend', img('close-friend'), { kind: 'Friends & love', tone: 'Positive' }],
  ['colleague', img('colleague'), { kind: 'Work / school / home', tone: 'Neutral' }],
  ['partner', img('partner'), { kind: 'Friends & love', tone: 'Positive' }],
  ['couple', img('couple'), { kind: 'Friends & love', tone: 'Positive' }],
  ['parents', img('parents'), { kind: 'Family', tone: 'Neutral' }],
  ['relative', img('relative'), { kind: 'Family', tone: 'Neutral' }],
  ['classmate', img('classmate'), { kind: 'Work / school / home', tone: 'Neutral' }],
  ['next-door neighbor', img('next-door-neighbor'), { kind: 'Work / school / home', tone: 'Neutral' }],
  ['argue', img('argue'), { kind: 'An action or phrase', tone: 'Negative' }],
  ['fall out', img('falling-out'), { kind: 'An action or phrase', tone: 'Negative' }],
  ['make up', img('make-up'), { kind: 'An action or phrase', tone: 'Positive' }],
  ['get along well', img('get-along-well'), { kind: 'An action or phrase', tone: 'Positive' }],
  ['get to know', img('get-to-know'), { kind: 'An action or phrase', tone: 'Neutral' }],
  ['introduce', img('introduce'), { kind: 'An action or phrase', tone: 'Neutral' }],
  ['have a lot in common', img('have-in-common'), { kind: 'An action or phrase', tone: 'Positive' }],
  ['get together', img('get-together'), { kind: 'An action or phrase', tone: 'Positive' }],
]

export default {
  '3C - Vocabulary: Relationships': {
    pictureSorts,
    pictures,
    q: [
      // people
      ['He knows a lot of people here, but he doesn’t have many ______.', ['close friends', 'couples', 'relatives', 'neighbors'], 0, 'Knowing people ≠ having close friends.'],
      ['I went out with some of my ______ from the office after work.', ['classmates', 'colleagues', 'parents', 'partners'], 1, 'Colleagues = people you work with.'],
      ['That one-bedroom apartment would be perfect for a ______.', ['relative', 'classmate', 'couple', 'parent'], 2, 'A couple = two people in a romantic relationship.'],
      ['I have a lot of ______ who live in the U.S. — mainly cousins.', ['colleagues', 'neighbors', 'couples', 'relatives'], 3, 'Relatives = members of your extended family.'],
      ['It’s not easy these days to find a romantic ______.', ['partner', 'relative', 'colleague', 'classmate'], 0, 'A partner = the person you are in a relationship with.'],
      ['I still live with my ______. It’s just me, my mom and my dad.', ['relatives', 'parents', 'partners', 'neighbors'], 1, 'Parents = mother and father.'],
      ['The walls in my building are very thin. I can hear my ______ talking.', ['classmate', 'relative', 'next-door neighbor', 'partner'], 2, 'The next-door neighbor lives in the apartment beside yours.'],
      ['I’ve known Liz for ten years. She’s the first person I call if I’m sad — she’s my ______.', ['colleague', 'relative', 'neighbor', 'best friend'], 3, 'Your best friend is the one closest to you.'],
      ['My ______ and I have a WhatsApp group where we talk about our homework.', ['classmates', 'parents', 'partners', 'neighbors'], 0, 'Classmates study in the same class.'],
      ['Which word is the odd one out?', ['colleague', 'relative', 'classmate', 'neighbor'], 1, 'A relative is family; the others are people you meet at work, school or home.'],
      // phrases
      ['We had a ______ and haven’t spoken since.', ['make up', 'get together', 'falling out', 'common'], 2, '"Have a falling out" = stop being friends because you disagree.'],
      ['We ______ a lot because we never agree about what to watch on TV.', ['get along', 'introduce', 'make up', 'argue'], 3, 'Argue = talk to someone in an angry way because you disagree.'],
      ['I ______ with my neighbors — we’re all good friends.', ['get along well', 'fall out', 'argue', 'get to know'], 0, '"Get along (well) with" = have a good relationship with.'],
      ['It’s sometimes difficult to ______ new people, but my classmates are all really friendly.', ['make up', 'get to know', 'fall out with', 'introduce'], 1, '"Get to know" = spend time with people so you become friends.'],
      ['Do you know that girl? Could you ______ me to her?', ['get along', 'make up', 'introduce', 'argue'], 2, 'Introduce someone to someone = tell them each other’s names.'],
      ['Sam and Ben had a fight this morning. I told them to ______, and now everything’s fine!', ['fall out', 'argue', 'get together', 'make up'], 3, '"Make up" = become friends again after an argument.'],
      ['It’s hard to talk to my neighbors since we don’t ______.', ['have a lot in common', 'get together', 'introduce', 'fall out'], 0, '"Have a lot in common" = share interests, experiences and opinions.'],
      ['I ______ with my close friends at least once a week.', ['make up', 'get together', 'argue', 'fall out'], 1, '"Get together" = meet and spend time together.'],
      ['Which phrase means "stop being friends because of a disagreement"?', ['get along', 'make up', 'fall out', 'get to know'], 2, 'Fall out (with someone) → have a falling out.'],
      ['Which phrase is the OPPOSITE of "fall out"?', ['argue', 'introduce', 'get to know', 'make up'], 3, 'Fall out ↔ make up.'],
      // form
      ['Choose the correct preposition: "I get along really well ______ my partner’s parents."', ['with', 'to', 'at', 'for'], 0, 'Get along WITH someone.'],
      ['Choose the correct form: "Let me ______ you to my colleague, Dan."', ['introducing', 'introduce', 'to introduce', 'introduced'], 1, 'Let + object + base verb.'],
      ['"They’re a lovely ______." Which word takes a singular article here?', ['parents', 'relatives', 'couple', 'colleagues'], 2, '"A couple" is singular in form (two people).'],
      ['Which is correct?', ['We have lot in common.', 'We have a lot of common.', 'We have a lot common.', 'We have a lot in common.'], 3, 'Fixed phrase: have a lot in common.'],
    ],
    s: [
      ['I get along really well with my next-door neighbor.', true, null, 'Correct: get along with + person.'],
      ['We fell out over money and haven’t spoken for a year.', true, null, 'Correct: fall out (past: fell out).'],
      ['My colleagues and I get together for lunch every Friday.', true, null, 'Correct.'],
      ['She introduced me with her partner at the party.', false, 'She introduced me to her partner at the party.', 'Introduce someone TO someone.'],
      ['They argued about the film, but they made up an hour later.', true, null, 'Correct: argue about; make up.'],
      ['I don’t have much in common with my classmates.', true, null, 'Correct: have (much / a lot) in common with.'],
      ['We had a fall out last week and now we don’t talk.', false, 'We had a falling out last week and now we don’t talk.', 'The noun is "a falling out"; the verb is "fall out".'],
      ['It took me a while to get to know my new colleagues.', true, null, 'Correct: get to know + people.'],
      ['My parents are also my best friends — I tell them everything.', true, null, 'Correct.'],
      ['He gets along good with everyone in the office.', false, 'He gets along well with everyone in the office.', 'Use the adverb "well", not "good".'],
      ['That couple next door are always arguing.', true, null, 'Correct: "couple" can take a plural verb in informal English (they are two people).'],
      ['Liz is a close friend of me.', false, 'Liz is a close friend of mine.', '"A friend of mine / yours / his…" — possessive pronoun.'],
      ['I’d like to introduce you to a relative who lives in Chicago.', true, null, 'Correct.'],
      ['They make up after every argue.', false, 'They make up after every argument.', '"Argue" is a verb; the noun is "argument".'],
      ['We got together with some old classmates last weekend.', true, null, 'Correct.'],
      ['My partner and I have got a lot in common.', true, null, 'Correct.'],
      ['I fell out my best friend when we were teenagers.', false, 'I fell out with my best friend when we were teenagers.', 'Fall out WITH someone.'],
      ['The neighbors next-door are a retired couple.', false, 'The next-door neighbors are a retired couple.', '"Next-door" goes before the noun: next-door neighbors.'],
      ['We argue a lot, but we always get along in the end.', true, null, 'Correct.'],
      ['It’s hard to get to know people if you never get together with them.', true, null, 'Correct.'],
    ],
  },

  '3C - Grammar: Defining & Non-defining Relative Clauses': {
    pictureSorts,
    pictures,
    q: [
      // pronoun choice
      ['That’s the man ______ lives next door to us.', ['which', 'who', 'whose', 'where'], 1, 'Who (or that) for people.'],
      ['That’s the couple ______ house is always amazing.', ['who', 'which', 'whose', 'that'], 2, 'Whose + noun for possession.'],
      ['She’s the colleague ______ I sit next to in class.', ['whose', 'where', 'which', 'who'], 3, 'Who / that (or nothing — the pronoun is the object).'],
      ['My uncle lives in Los Angeles, ______ is a really expensive city.', ['which', 'that', 'where', 'who'], 0, 'Non-defining clause about a place/thing → which, never "that".'],
      ['That’s the café ______ I first met my partner.', ['which', 'where', 'who', 'whose'], 1, 'Where for places (= in which).'],
      ['My neighbors, ______ have five children, are really noisy.', ['that', 'whose', 'who', 'which'], 2, 'Non-defining clause about people → who (not that).'],
      // defining vs non-defining
      ['Which sentence is NON-defining?', ['The friends who I grew up with still live here.', 'The relative that gave me this lives in Cali.', 'I have a classmate whose father is famous.', 'My best friend, who lives in London, is visiting next week.'], 3, 'Non-defining = extra information between commas.'],
      ['"The students who passed the exam received a certificate." This means…', ['only the students who passed got a certificate', 'all the students passed', 'all the students got a certificate', 'nobody passed'], 0, 'Defining clause: it identifies WHICH students.'],
      ['"The students, who passed the exam, received a certificate." This means…', ['only some students passed', 'all the students passed and all received a certificate', 'nobody received a certificate', 'the exam was cancelled'], 1, 'Non-defining clause: extra information about ALL the students.'],
      ['In which sentence can the relative pronoun be omitted?', ['That’s the colleague who introduced me to Sam.', 'My partner, who is a nurse, works nights.', 'She’s the classmate who I sit next to.', 'That’s the neighbor whose dog barks all night.'], 2, 'We can omit who/that when it is the OBJECT of a defining clause.'],
      ['Which sentence is INCORRECT?', ['The partner that I work with is Brazilian.', 'The partner I work with is Brazilian.', 'The partner who I work with is Brazilian.', 'My partner, that is Brazilian, works with me.'], 3, 'Never use "that" in a non-defining clause.'],
      ['Choose the correct punctuation.', ['My parents who live in Cali are retired.', 'My parents, who live in Cali, are retired.', 'My parents, who live in Cali are retired.', 'My parents who, live in Cali, are retired.'], 1, 'Non-defining: commas before and after the clause.'],
      // combining sentences
      ['Combine: "We went to Bella Pizza. We had lunch there." →', ['We went to Bella Pizza which we had lunch.', 'We went to Bella Pizza, where we had lunch.', 'We went to Bella Pizza, that we had lunch.', 'We went to Bella Pizza whose we had lunch.'], 1, 'Non-defining clause about a place → , where …'],
      ['Combine: "Luke gave me a really interesting book yesterday. I’m reading it now." →', ['Luke gave me a book yesterday, which I’m reading now.', 'Luke gave me a book yesterday, who I’m reading now.', 'Luke gave me a book yesterday, that I’m reading now.', 'Luke gave me a book yesterday which I’m reading it now.'], 0, 'Non-defining: , which …; don’t repeat the object ("it").'],
      ['Combine: "Look at that car. My uncle wants one." →', ['Look at that car whose my uncle wants.', 'Look at that car, where my uncle wants.', 'Look at that car, which my uncle wants.', 'Look at that car who my uncle wants.'], 2, 'Non-defining clause about a thing → , which …'],
      ['Combine: "This is Mark. His brother is my best friend." →', ['This is Mark, who brother is my best friend.', 'This is Mark, which brother is my best friend.', 'This is Mark, that his brother is my best friend.', 'This is Mark, whose brother is my best friend.'], 3, 'Whose replaces "his / her / their".'],
      ['Complete: "That’s the restaurant ______ we had our first date." (two possible words)', ['where / in which', 'which / that', 'who / whose', 'when / that'], 0, '"Where" or "in which" for a place where something happens.'],
      ['Complete: "My colleague, ______ desk is next to mine, never stops talking."', ['who', 'whose', 'which', 'that'], 1, 'Possession → whose.'],
      // errors
      ['Find the mistake: "The neighbors which live next door have a lot in common with us."', ['live → lives', 'next door → next-door', 'which → who', 'have → has'], 2, 'People → who / that, not which.'],
      ['Find the mistake: "My best friend, that I’ve known for ten years, is getting married."', ['that → who', 'known → knew', 'is → are', 'no mistake'], 0, 'Non-defining clauses never take "that".'],
      ['Find the mistake: "The colleague who I introduced you to him works in HR."', ['who → which', 'introduced → introduce', 'remove "him"', 'to → for'], 2, 'The relative pronoun already stands for the object — don’t add "him".'],
      ['Find the mistake: "Sarah, whose I met at university, is my partner now."', ['whose → who', 'met → meet', 'is → was', 'no mistake'], 0, 'Whose is only for possession; here we need who (object).'],
      ['Which sentence needs NO commas?', ['My mother who is a doctor works long hours.', 'My cousin which lives in Miami is visiting.', 'Paris where I studied is beautiful.', 'The woman who lives next door is a doctor.'], 3, 'Defining clause (tells us which woman) → no commas.'],
      ['In "the couple I met at the party", the relative pronoun is…', ['who, and it must be used', 'whose, and it is omitted', 'omitted — it was the object of the clause', 'which, because couple is a thing'], 2, 'Object relative pronouns can be omitted in defining clauses.'],
    ],
    s: [
      ['That’s the man who lives next door to us.', true, null, 'Correct: who for people.'],
      ['My uncle lives in Los Angeles, that is a really expensive city.', false, 'My uncle lives in Los Angeles, which is a really expensive city.', 'Non-defining clause: use which, not that.'],
      ['She’s the classmate I get along with best.', true, null, 'Correct: the object pronoun (who/that) is omitted in a defining clause.'],
      ['That’s the couple whose house is always amazing.', true, null, 'Correct: whose + noun.'],
      ['My neighbors who have five children are really noisy.', false, 'My neighbors, who have five children, are really noisy.', 'Extra information about my (only) neighbors → non-defining, with commas.'],
      ['The restaurant where we had our first date has closed.', true, null, 'Correct: where for places.'],
      ['My best friend, which I’ve known since school, lives in Bogotá.', false, 'My best friend, who I’ve known since school, lives in Bogotá.', 'People → who, not which.'],
      ['The colleague who sits next to me is from Japan.', true, null, 'Correct defining clause.'],
      ['The book which Luke gave me it is really interesting.', false, 'The book which Luke gave me is really interesting.', 'Don’t repeat the object ("it") — "which" already refers to the book.'],
      ['Liz, whose parents are both teachers, is my closest friend.', true, null, 'Correct.'],
      ['My partner, is a nurse, works at night.', false, 'My partner, who is a nurse, works at night.', 'A non-defining clause needs a relative pronoun.'],
      ['The students who passed the exam received a certificate — the others didn’t.', true, null, 'Correct: defining clause identifies which students.'],
      ['I have a relative lives in Canada.', false, 'I have a relative who lives in Canada.', 'The subject relative pronoun cannot be omitted.'],
      ['We went to Bella Pizza, where we had lunch.', true, null, 'Correct.'],
      ['This is Mark, who brother is my best friend.', false, 'This is Mark, whose brother is my best friend.', 'Possession → whose.'],
      ['The next-door neighbor that I introduced you to is a colleague of mine.', true, null, 'Correct: that (object) in a defining clause.'],
      ['Sam, who I fell out with last year, has finally made up with me.', true, null, 'Correct: non-defining with who.'],
      ['The couple, who live next door are always arguing.', false, 'The couple, who live next door, are always arguing.', 'Non-defining clauses need a comma on BOTH sides.'],
      ['Look at that car, which my uncle wants.', true, null, 'Correct.'],
      ['The woman lives next door is a doctor.', false, 'The woman who lives next door is a doctor.', 'Subject relative pronoun (who) is required.'],
      ['Cali, where I grew up, is where most of my relatives still live.', true, null, 'Correct.'],
      ['That’s the colleague whom I told you about.', true, null, 'Correct: "whom" is the formal object form (who is also fine).'],
    ],
  },
}
