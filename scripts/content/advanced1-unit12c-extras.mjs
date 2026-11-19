// Extra topic for Advanced 1 / Unit 12 taken from the coursebook page 12C Modals of deduction.
// (12B Air travel is covered in advanced1-unit12-extras.mjs.) Listening / speaking cards live in listening-speaking.mjs.
const img = (name) => `/img/deduction/${name}.svg`

const pictureSorts = {
  certainty: {
    prompt: 'How sure is the speaker in "{word}"?',
    options: ["Sure it's true (must)", "Sure it's not true (can't / couldn't)", 'Possible, not sure (might / may / could)', 'A rule about form'],
    explain: '"{Word}" → {value}.',
  },
  form: {
    prompt: 'Which form follows the modal in "{word}"?',
    options: ['be + noun / adjective / place', 'be + verb-ing (happening now)', 'another base verb', 'No verb – a contrast'],
    explain: '"{Word}" → {value}.',
  },
}

const pictures = [
  ["I can't hear the children. They must be in bed.", img('bed'), { certainty: "Sure it's true (must)", form: 'be + noun / adjective / place' }],
  ["I haven't seen Lukas for a few days. He might be on vacation.", img('vacation'), { certainty: 'Possible, not sure (might / may / could)', form: 'be + noun / adjective / place' }],
  ['You might not like this new café. They only serve coffee.', img('cafe'), { certainty: 'Possible, not sure (might / may / could)', form: 'another base verb' }],
  ["Sandra's not at work today. She may be sick.", img('sick'), { certainty: 'Possible, not sure (might / may / could)', form: 'be + noun / adjective / place' }],
  ["It's very noisy upstairs. They must be having a party.", img('party'), { certainty: "Sure it's true (must)", form: 'be + verb-ing (happening now)' }],
  ["It must be cold outside. Everyone's wearing gloves.", img('gloves'), { certainty: "Sure it's true (must)", form: 'be + noun / adjective / place' }],
  ["Sally can't live here. This is a house, and she lives in an apartment.", img('apartment'), { certainty: "Sure it's not true (can't / couldn't)", form: 'another base verb' }],
  ["Mark isn't answering his phone. He might be in a meeting.", img('phone'), { certainty: 'Possible, not sure (might / may / could)', form: 'be + noun / adjective / place' }],
  ["They're speaking English, so they may be British.", img('british'), { certainty: 'Possible, not sure (might / may / could)', form: 'be + noun / adjective / place' }],
  ["Tom's in the kitchen. He must be doing his homework.", img('homework'), { certainty: "Sure it's true (must)", form: 'be + verb-ing (happening now)' }],
  ["They can't be playing soccer now – it's nearly midnight!", img('midnight'), { certainty: "Sure it's not true (can't / couldn't)", form: 'be + verb-ing (happening now)' }],
  ["can't (deduction) vs mustn't (prohibition)", img('cant-vs-mustnt'), { certainty: 'A rule about form', form: 'No verb – a contrast' }],
]

export default {
  "12C - Grammar: Modals of Deduction (must / might / may / could / can't)": {
    pictureSorts,
    pictures,
    q: [
      ["We use modals of deduction to talk about something when we ___.", ["don't know if it's definitely true", 'know it is true', 'want to give an order', 'talk about the future'], 0],
      ['We use must + base form when we think that something ___.', ['is true', 'is not true', 'is possible', 'is prohibited'], 0],
      ["We use can't or couldn't + base form when we are sure that something ___.", ["isn't true", 'is true', 'is possible', 'is necessary'], 0],
      ['We use might / may / could + base form when we think something is ___.', ["possible, but we're not sure", 'certainly true', 'certainly not true', 'prohibited'], 0],
      ["I can't hear the children. They ___ be in bed.", ['must', "can't", 'might not', "mustn't"], 0],
      ["I haven't seen Lukas for a few days. He ___ be on vacation.", ['might', 'must', "can't", "mustn't"], 0],
      ['You ___ like this new café. They only serve coffee, not tea.', ['might not', "can't", 'must', "mustn't"], 0],
      ["It's very noisy in the apartment upstairs. They ___ a party.", ['must be having', 'must have', "can't be having", 'might not have'], 0],
      ["It must be cold outside. Everyone's wearing gloves. = ___", ["I'm sure it's cold outside.", "It's possible it's cold.", "I'm sure it isn't cold.", 'It is prohibited to go outside.'], 0],
      ["Sally can't live here. This is a house, and she lives in an apartment. = ___", ["I'm sure Sally doesn't live here.", "It's possible Sally lives here.", "I'm sure Sally lives here.", 'Sally is not allowed to live here.'], 0],
      ["Mark isn't answering his phone. He ___ be in a meeting.", ['might', 'must', "can't", "mustn't"], 0],
      ["John didn't sleep at all last night. He ___ be really tired today.", ['must', "can't", 'might not', 'may not'], 0],
      ["Where's Lidia? She ___ be at work because her office is closed today.", ["can't", 'must', 'might', 'may'], 0],
      ["Let's try that store over there. It ___ be cheaper, but I'm not sure.", ['might', 'must', "can't", "couldn't"], 0],
      ["We ___ be at the right address. There's no restaurant here.", ["can't", 'must', 'might', 'may'], 0],
      ["Is Vicki's husband from Australia? – I think he ___ be, but I've never asked him.", ['might', 'must', "can't", "mustn't"], 0],
      ['I never see Max studying, so he ___ be a very good student.', ["can't", 'must', 'might', 'may'], 0],
      ['Look, Brian ___ be home – the lights are on in his apartment.', ['must', "can't", 'might not', "mustn't"], 0],
      ["This ___ be the museum Lucy was talking about. I'm absolutely sure.", ['must', 'might', 'could', "can't"], 0],
      ["That movie won three Oscars, so it ___ be good.", ['must', "can't", 'might not', "mustn't"], 0],
      ['The people on the street have opened their umbrellas so it ___ be raining.', ['must', "can't", "mustn't", 'might not'], 0],
      ["Luke's not here. It's possible that he's sick. = Luke ___ be sick.", ['might', 'must', "can't", "mustn't"], 0],
      ["Look! To say what we think is NOT true, we use ___, not mustn't.", ["can't", "shouldn't", "don't have to", 'may not'], 0],
      ["Tom's in the kitchen. He ___ his homework in his bedroom.", ["can't be doing", 'must be doing', 'might be doing', "mustn't do"], 0],
    ],
    s: [
      ["I can't hear the children. They must be in bed.", true],
      ["I haven't seen Lukas for a few days. He might be on vacation.", true],
      ["Sandra's not at work today. She may be sick.", true],
      ["It's very noisy upstairs. They must be having a party.", true],
      ["Sally can't live here. This is a house, and she lives in an apartment.", true],
      ["Mark isn't answering his phone. He might be in a meeting.", true],
      ["They're speaking English, so they may be British.", true],
      ["I don't know where he is. He could be at a friend's house.", true],
      ["They can't be playing soccer now – it's nearly midnight!", true],
      ['She might be talking to David on the phone. He left a message for her this morning.', true],
      ["We can't be at the right address. There's no restaurant here.", true],
      ["Where's Lidia? She mustn't be at work because her office is closed.", false, "She can't be at work…", "Deduction: can't, not mustn't."],
      ["John didn't sleep last night. He can't be really tired today.", false, 'He must be really tired today.', 'Logical → must.'],
      ['I never see Max studying, so he must be a very good student.', false, "…so he can't be a very good student.", "Not true → can't."],
      ["Look, Brian might be home – the lights are on. I'm sure.", false, 'Brian must be home…', 'Sure → must.'],
      ["Let's try that store. It must be cheaper, but I'm not sure.", false, 'It might be cheaper…', 'Not sure → might.'],
      ['They must to be having a party.', false, 'They must be having a party.', 'Modal + base form, no to.'],
      ['He might is on vacation.', false, 'He might be on vacation.', 'might + be.'],
      ['That movie won three Oscars, so it might not be good.', false, '…so it must be good.', 'Strong evidence → must.'],
      ["Tom's in the kitchen. He must be doing his homework in his bedroom.", false, "He can't be doing his homework in his bedroom.", 'Contradiction → can\'t.'],
      ['It musts be raining.', false, 'It must be raining.', 'Modals have no -s.'],
      ["She can't to be sick.", false, "She can't be sick.", 'No to after modals.'],
    ],
  },
}
