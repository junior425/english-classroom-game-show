// Extra topic for Advanced 1 / Unit 4 taken from the coursebook page 4A (Quantifiers):
// a little / a few, a lot of / lots of, any / no / none, too much / too many / enough.
// Listening / speaking cards for this topic live in listening-speaking.mjs.
export default {
  '4A - Grammar: Quantifiers': {
    q: [
      // small quantities
      ['Can I have ______ sugar in my coffee, please?', ['a few', 'a little', 'many', 'few'], 1, '"A little" + uncountable noun (sugar).'],
      ['I only have ______ close friends, but they’re very loyal.', ['a few', 'a little', 'much', 'any'], 0, '"A few" + plural countable noun (friends).'],
      ['There isn’t ______ milk left. Can you get some more?', ['many', 'a few', 'much', 'no'], 2, '"Not much" + uncountable in negatives.'],
      ['She doesn’t have ______ friends on Facebook.', ['much', 'a little', 'no', 'many'], 3, '"Not many" + plural countable in negatives.'],
      ['We also use "(very) little" and "(very) few" to mean…', ['not much / not many', 'a lot', 'enough', 'none'], 0, '"Little / few" without "a" = not much / not many (negative idea).'],
      ['Choose the negative idea: "She has ______ friends in New York — she’s lonely."', ['a few', 'very few', 'a lot of', 'lots of'], 1, '"Very few" = almost none.'],
      // large quantities
      ['I have ______ friends in the U.S.', ['much', 'a little', 'lots of', 'too much'], 2, '"A lot of / lots of" in affirmative sentences with countable or uncountable nouns.'],
      ['She reads ______ books — about one a week.', ['much', 'a little', 'any', 'a lot of'], 3, '"A lot of" + plural countable.'],
      ['Do you have ______ homework tonight? — Yes, loads!', ['a lot of', 'many', 'few', 'little'], 0, 'Questions about quantity: "a lot of" (or "much") + uncountable.'],
      ['Which quantifier does NOT fit? "We had ______ fun at the party."', ['a lot of', 'lots of', 'many', 'so much'], 2, '"Many" is only for countable nouns; "fun" is uncountable.'],
      ['Which sentence is the most natural in informal English?', ['I have a lot of relatives in Miami.', 'I have much relatives in Miami.', 'I have many of relatives in Miami.', 'I have little relatives in Miami.'], 0, '"A lot of" is the most common in affirmative sentences.'],
      // zero quantity
      ['I don’t have ______ money. = I have ______ money.', ['some / no', 'any / no', 'no / any', 'any / any'], 1, '"Not … any" = "no" + noun.'],
      ['There are ______ tickets left. = There aren’t ______ tickets left.', ['any / no', 'none / any', 'no / any', 'no / no'], 2, '"No tickets" = "not any tickets".'],
      ['How many students got 100% on the exam? — ______.', ['No', 'Any', 'Nothing', 'None'], 3, 'Short answer without a noun → "None".'],
      ['Which sentence is INCORRECT?', ['I have no time today.', 'I don’t have any time today.', 'I don’t have no time today.', 'I have none.'], 2, 'Double negative — use "don’t have any" or "have no".'],
      // too much / too many / enough
      ['You’ve put too ______ sugar in my coffee!', ['much', 'many', 'lot', 'few'], 0, '"Too much" + uncountable = more than is necessary.'],
      ['There are too ______ people in this room. It’s crowded!', ['much', 'many', 'lots', 'enough'], 1, '"Too many" + plural countable.'],
      ['We use "enough" to mean…', ['less than is necessary', 'more than is necessary', 'the right amount or number', 'nothing at all'], 2, '"Enough" = as much or as many as is necessary.'],
      ['I don’t have ______ money for a vacation this year.', ['too much', 'too many', 'a few', 'enough'], 3, '"Not enough" = less than is necessary.'],
      ['There aren’t ______ chairs for everyone — we need two more.', ['enough', 'too many', 'too much', 'a lot'], 0, '"Not enough" + plural countable.'],
      ['Which quantifier means "more than is necessary" for a countable noun?', ['too much', 'too many', 'enough', 'a lot of'], 1, '"Too many" for countable; "too much" for uncountable.'],
      ['Choose the correct sentence.', ['This box isn’t enough big.', 'This box isn’t big enough.', 'This box is too much big.', 'This box is big too much.'], 1, '"Enough" goes after adjectives (big enough) but before nouns (enough money).'],
      // mixed
      ['Complete: "There are ______ people here that I can’t find my friends."', ['so much', 'too much', 'so many', 'a little'], 2, '"So many" + plural countable.'],
      ['Complete the dialogue: "How much time do we have?" — "______. The show starts in two minutes!"', ['A lot of', 'Lots of', 'Very little', 'Enough'], 2, '"Very little" = almost no time.'],
    ],
    s: [
      ['Can I have a little milk in my tea, please?', true, null, 'Correct: a little + uncountable.'],
      ['I have a few relatives who live in Canada.', true, null, 'Correct: a few + plural countable.'],
      ['There isn’t many time — hurry up!', false, 'There isn’t much time — hurry up!', '"Time" is uncountable → much.'],
      ['We don’t have much friends in this city yet.', false, 'We don’t have many friends in this city yet.', '"Friends" is countable → many.'],
      ['She has lots of colleagues, but very few close friends.', true, null, 'Correct.'],
      ['I have a lot of homework to do tonight.', true, null, 'Correct: a lot of + uncountable.'],
      ['He has too much problems at work.', false, 'He has too many problems at work.', '"Problems" is countable → too many.'],
      ['There are too many sugar in this cake.', false, 'There is too much sugar in this cake.', '"Sugar" is uncountable → too much.'],
      ['I don’t have no money left.', false, 'I don’t have any money left. / I have no money left.', 'Double negative: use "not … any" or "no".'],
      ['There are no tickets left for tonight’s show.', true, null, 'Correct: no + noun.'],
      ['How many students passed? — None.', true, null, 'Correct: "none" stands alone without a noun.'],
      ['How many people came? — No.', false, 'How many people came? — None.', 'Without a noun, use "none".'],
      ['We don’t have money enough for a vacation this year.', false, 'We don’t have enough money for a vacation this year.', '"Enough" goes BEFORE a noun.'],
      ['This coffee isn’t hot enough.', true, null, 'Correct: enough goes AFTER an adjective.'],
      ['There aren’t enough chairs for all the guests.', true, null, 'Correct.'],
      ['I have a little friends in London, so I rarely visit.', false, 'I have few friends in London, so I rarely visit.', '"A little" is for uncountable nouns; "friends" needs "(a) few".'],
      ['He drinks too much coffee — about eight cups a day.', true, null, 'Correct.'],
      ['I know a lot of people, but I don’t have many close friends.', true, null, 'Correct.'],
      ['Is there any milk in the fridge? — No, there’s none.', true, null, 'Correct.'],
      ['There was so much people at the concert that we couldn’t move.', false, 'There were so many people at the concert that we couldn’t move.', '"People" is plural countable → so many.'],
      ['She has very little time for hobbies these days.', true, null, 'Correct: very little = not much.'],
      ['We had lot of fun at the reunion.', false, 'We had a lot of fun at the reunion.', 'The phrase is "a lot of" or "lots of".'],
    ],
  },
}
