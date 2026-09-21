// Listening (MODE 6: Audio Detective) and Speaking (MODE 7: Roleplay & Taboo) cards, keyed by
// level name -> topic name. Topics without an entry simply have no cards for these two modes.
//
// listening item: [text, voice, kind, question, options, answer]
//   text     – what the browser reads aloud (Web Speech API)
//   voice    – 'en-US' | 'en-GB'
//   kind     – 'dictation' (teams write what they heard; teacher checks against the transcript)
//            | 'comprehension' (multiple choice about what was said)
//   question/options/answer – comprehension only (options: 4, answer: 0-3)
// speaking item: [title, situation, mandatoryWords[3], tabooWords[], seconds]

const dict = (text, voice = 'en-US') => [text, voice, 'dictation']
const comp = (text, voice, question, options, answer) => [text, voice, 'comprehension', question, options, answer]
const role = (title, situation, mandatory, taboo = [], seconds = 60) => [title, situation, mandatory, taboo, seconds]

export default {
  'Basic 1': {
    '3A - Vocabulary: Food & Drinks': {
      listening: [
        dict('I have eggs and bread for breakfast.'),
        dict('She drinks orange juice every morning.', 'en-GB'),
        dict('We eat pizza on Fridays.'),
        dict('My brother likes chicken and rice.', 'en-GB'),
        dict('Can I have a sandwich and a glass of water, please?'),
        dict('Ice cream and chocolate are my favorite treats.', 'en-GB'),
        comp('Waiter: Good evening! What would you like? Customer: I’d like the fish with salad, and a cup of tea, please.', 'en-GB',
          'What does the customer order to drink?', ['Coffee', 'Tea', 'Milk', 'Water'], 1),
        comp('Anna: Do you want cake or cookies? Tom: Cookies, please. I don’t like cake very much.', 'en-US',
          'What does Tom choose?', ['Cake', 'Cookies', 'Both', 'Nothing'], 1),
        comp('Mom: What do you want for lunch? Boy: Pasta, please! Mom: Okay, pasta with cheese and vegetables.', 'en-US',
          'What is the boy going to eat?', ['Pizza and salad', 'Rice and chicken', 'Pasta with cheese and vegetables', 'A sandwich'], 2),
        comp('Every morning Lucy has coffee and fruit. She never eats potato chips for breakfast.', 'en-GB',
          'What does Lucy NOT eat for breakfast?', ['Fruit', 'Coffee', 'Potato chips', 'Eggs'], 2),
        comp('Customer: How much is the ice cream? Seller: Two dollars. The French fries are three dollars.', 'en-US',
          'How much are the French fries?', ['One dollar', 'Two dollars', 'Three dollars', 'Four dollars'], 2),
        comp('Dad: We need milk, eggs and cheese from the supermarket. Don’t forget the bread!', 'en-GB',
          'Which item does Dad remind them not to forget?', ['Milk', 'Eggs', 'Cheese', 'Bread'], 3),
      ],
      speaking: [
        role('At the Restaurant', 'One of you is the waiter, the other is a hungry customer. Order a full meal with a drink and ask about the price.',
          ['chicken', 'salad', 'water'], [], 60),
        role('Breakfast Time', 'Describe your perfect breakfast to a friend who is visiting from another country.',
          ['eggs', 'bread', 'orange juice'], [], 45),
        role('Healthy or Not?', 'Convince your partner to eat something healthy instead of a treat. Your partner wants the treat!',
          ['vegetables', 'fruit', 'ice cream'], ['good', 'bad'], 60),
        role('At the Supermarket', 'You are shopping for a party. Tell the shop assistant what you need and how much.',
          ['cheese', 'cookies', 'milk'], [], 45),
        role('Picnic Plan', 'Plan a picnic with your team. Decide what food and drinks each person brings.',
          ['sandwich', 'potato chips', 'tea'], ['pizza'], 60),
        role('My Favourite Food', 'Tell the class about your favourite dish: what is in it, when you eat it and who cooks it.',
          ['rice', 'meat', 'coffee'], ['like'], 45),
      ],
    },
  },
  'Advanced 1': {
    'Perfect Aspect in Depth': {
      listening: [
        dict('By the time the auditors arrived, we had already reconciled every account.', 'en-GB'),
        dict('She will have been working here for a decade next spring.', 'en-US'),
        dict('Had they listened to the engineers, the launch wouldn’t have been delayed.', 'en-GB'),
        dict('I’ve been meaning to call you, but the week has been relentless.', 'en-US'),
        comp('Manager: Has the report been finalised? Analyst: Almost. I’d finished the figures before the data changed, so I’ve been revising it since noon.', 'en-GB',
          'Why is the analyst still working on the report?', ['She hasn’t started yet', 'The data changed after she finished the figures', 'The manager rejected it', 'She lost the file'], 1),
        comp('Interviewer: How long had you lived in Berlin before moving to Madrid? Candidate: Six years. By then I had learned German fluently, which had opened a lot of doors.', 'en-US',
          'What had the candidate achieved before moving to Madrid?', ['Learned Spanish', 'Opened a company', 'Learned German fluently', 'Moved to Berlin'], 2),
        comp('Weather update: Heavy rain will have eased by midday, but by then most of the northern roads will have flooded, so plan your journey accordingly.', 'en-GB',
          'What will have happened by midday?', ['The rain will get heavier', 'Most northern roads will have flooded', 'All roads will be open', 'The forecast will change'], 1),
        comp('Colleague A: You look exhausted. Colleague B: I’ve been preparing the bid since Monday. I hadn’t realised how much documentation they wanted.', 'en-US',
          'What has Colleague B been doing since Monday?', ['Travelling', 'Preparing a bid', 'Reading documentation for fun', 'Resting'], 1),
      ],
      speaking: [
        role('The Job Interview', 'One of you interviews the other for a senior role. Discuss past achievements and experience up to now.',
          ['had already', 'have been working', 'by the time'], ['job', 'work'], 60),
        role('Project Post-mortem', 'A project failed. Explain to your manager what had happened before things went wrong and what you have learned.',
          ['had been', 'until then', 'since'], ['problem', 'mistake'], 60),
        role('Reunion After Ten Years', 'You meet an old classmate. Catch up on everything that has happened and had happened in your lives.',
          ['have changed', 'had never', 'for years'], ['remember'], 60),
        role('Future Milestones', 'You are a CEO presenting where the company will have arrived by 2030.',
          ['will have', 'by then', 'already'], ['plan', 'goal'], 45),
      ],
    },
    'Stative vs Dynamic Verbs': {
      listening: [
        dict('I’m having second thoughts about the merger, to be honest.', 'en-GB'),
        dict('This sauce tastes odd; are you tasting it or just looking at it?', 'en-US'),
        dict('She’s being unusually diplomatic in today’s negotiation.', 'en-GB'),
        dict('We think the proposal is solid, but the board is still thinking about it.', 'en-US'),
        comp('Client: I’m seeing my lawyer tomorrow, so I see no reason to sign today. Agent: I understand, but the offer expires at midnight.', 'en-GB',
          'What does the client mean by “I’m seeing my lawyer”?', ['He can see his lawyer from here', 'He has an appointment with his lawyer', 'He understands his lawyer', 'He is looking at a photo'], 1),
        comp('Chef: Why are you tasting the soup again? Cook: It tastes too salty to me, but the customer says it tastes perfect.', 'en-US',
          'Which use of “taste” describes an action, not a state?', ['It tastes too salty', 'It tastes perfect', 'You are tasting the soup', 'None of them'], 2),
        comp('Teacher: He is being very rude today. Normally he is a polite, thoughtful student.', 'en-GB',
          'What does “he is being rude” suggest?', ['He is always rude', 'His rudeness is temporary behaviour', 'He is never rude', 'He is polite today'], 1),
        comp('I have a car, but this week I’m having trouble starting it, so I’m having it checked on Friday.', 'en-US',
          'Which phrase uses “have” as a state (possession)?', ['I have a car', 'I’m having trouble', 'I’m having it checked', 'All of them'], 0),
      ],
      speaking: [
        role('The Difficult Customer', 'A customer is being unreasonable in a hotel lobby. The receptionist stays calm and finds a solution.',
          ['I’m having', 'it seems', 'you’re being'], ['sorry', 'problem'], 60),
        role('Food Critic Visit', 'A food critic describes a dish while the chef defends it. Use verbs of the senses as both states and actions.',
          ['tastes', 'looks', 'I’m thinking'], ['good', 'delicious'], 60),
        role('Negotiation Under Pressure', 'Negotiate the price of a contract. One side is stalling; the other needs a decision today.',
          ['we consider', 'I’m considering', 'that depends'], ['money', 'price'], 60),
        role('Describing a Colleague', 'Describe a colleague’s permanent personality and their unusual behaviour this week.',
          ['is', 'is being', 'seems'], ['nice', 'weird'], 45),
      ],
    },
  },
}
