const questions = [
  {
    question: 'I need to find the way to a shop that a friend has recommended. I would:',
    options: [
      {
        key: 'a',
        value: 'find out where the shop is in relation to somewhere I know.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'ask my friend to tell me the directions.',
        answer: 'A',
      },
      {
        key: 'c',
        value: 'write down the street directions I need to remember.',
        answer: 'R',
      },
      {
        key: 'd',
        value: 'use a map.',
        answer: 'V',
      },
    ],
  },
  {
    question: `A website has a video showing how to make a special graph or chart. There is a person speaking, some lists and words describing what to do and some diagrams. I would learn most from:`,
    options: [
      {
        key: 'a',
        value: 'seeing the diagrams.',
        answer: 'V',
      },
      {
        key: 'b',
        value: 'listening.',
        answer: 'A',
      },
      {
        key: 'c',
        value: 'reading the words.',
        answer: 'R',
      },
      {
        key: 'd',
        value: 'watching the actions.',
        answer: 'K',
      },
    ],
  },
  {
    question: `I want to find out more about a tour that I am going on. I would:`,
    options: [
      {
        key: 'a',
        value: 'look at details about the highlights and activities on the tour.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'use a map and see where the places are.',
        answer: 'V',
      },
      {
        key: 'c',
        value: 'read about the tour on the itinerary.',
        answer: 'R',
      },
      {
        key: 'd',
        value: 'talk with the person who planned the tour or others who are going on the tour.',
        answer: 'A',
      },
    ],
  },
  {
    question: `When choosing a career or area of study, these are important for me`,
    options: [
      {
        key: 'a',
        value: 'Applying my knowledge in real situations.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'Communicating with others through discussion. ',
        answer: 'A',
      },
      {
        key: 'c',
        value: 'Working with designs, maps or charts. ',
        answer: 'V',
      },
      {
        key: 'd',
        value: 'Using words well in written communications.',
        answer: 'R',
      },
    ],
  },
  {
    question: `When I am learning I:`,
    options: [
      {
        key: 'a',
        value: 'like to talk things through.',
        answer: 'A',
      },
      {
        key: 'b',
        value: 'see patterns in things',
        answer: 'V',
      },
      {
        key: 'c',
        value: 'use examples and applications. ',
        answer: 'K',
      },
      {
        key: 'd',
        value: 'read books, articles and handouts.',
        answer: 'R',
      },
    ],
  },
  {
    question: `I want to save more money and to decide between a range of options. I would:`,
    options: [
      {
        key: 'a',
        value: 'consider examples of each option using my financial information.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'read a print brochure that describes the options in detail. ',
        answer: 'R',
      },
      {
        key: 'c',
        value: 'use graphs showing different options for different time periods.',
        answer: 'V',
      },
      {
        key: 'd',
        value: 'talk with an expert about the options.',
        answer: 'A',
      },
    ],
  },
  {
    question: `I want to learn how to play a new board game or card game. I would:`,
    options: [
      {
        key: 'a',
        value: 'watch others play the game before joining in.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'listen to somebody explaining it and ask questions.',
        answer: 'A',
      },
      {
        key: 'c',
        value:
          'use the diagrams that explain the various stages, moves and strategies in the game.',
        answer: 'V',
      },
      {
        key: 'd',
        value: 'read the instructions.',
        answer: 'R',
      },
    ],
  },
  {
    question: `I have a problem with my heart. I would prefer that the doctor:`,
    options: [
      {
        key: 'a',
        value: 'gave me something to read to explain what was wrong.',
        answer: 'R',
      },
      {
        key: 'b',
        value: 'used a plastic model to show me what was wrong.',
        answer: 'K',
      },
      {
        key: 'c',
        value: 'described what was wrong.',
        answer: 'A',
      },
      {
        key: 'd',
        value: 'showed me a diagram of what was wrong.',
        answer: 'V',
      },
    ],
  },
  {
    question: `I want to learn to do something new on a computer. I would:`,
    options: [
      {
        key: 'a',
        value: 'read the written instructions that came with the program.',
        answer: 'R',
      },
      {
        key: 'b',
        value: 'talk with people who know about the program.',
        answer: 'A',
      },
      {
        key: 'c',
        value: 'start using it and learn by trial and error.',
        answer: 'K',
      },
      {
        key: 'd',
        value: 'follow the diagrams in a book.',
        answer: 'V',
      },
    ],
  },
  {
    question: `When learning from the Internet I like:`,
    options: [
      {
        key: 'a',
        value: 'videos showing how to do or make things.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'interesting design and visual features.',
        answer: 'V',
      },
      {
        key: 'c',
        value: 'interesting written descriptions, lists and explanations.',
        answer: 'R',
      },
      {
        key: 'd',
        value: 'audio channels where I can listen to podcasts or interviews.',
        answer: 'A',
      },
    ],
  },
  {
    question: `I want to learn about a new project. I would ask for:`,
    options: [
      {
        key: 'a',
        value: 'diagrams to show the project stages with charts of benefits and costs.',
        answer: 'V',
      },
      {
        key: 'b',
        value: 'a written report describing the main features of the project.',
        answer: 'R',
      },
      {
        key: 'c',
        value: 'an opportunity to discuss the project.',
        answer: 'A',
      },
      {
        key: 'd',
        value: 'examples where the project has been used successfully.',
        answer: 'K',
      },
    ],
  },
  {
    question: `I want to learn how to take better photos. I would:`,
    options: [
      {
        key: 'a',
        value: 'ask questions and talk about the camera and its features.',
        answer: 'A',
      },
      {
        key: 'b',
        value: 'use the written instructions about what to do.',
        answer: 'R',
      },
      {
        key: 'c',
        value: 'use diagrams showing the camera and what each part does.',
        answer: 'V',
      },
      {
        key: 'd',
        value: 'use examples of good and poor photos showing how to improve them.',
        answer: 'K',
      },
    ],
  },
  {
    question: `I prefer a presenter or a teacher who uses:`,
    options: [
      {
        key: 'a',
        value: 'demonstrations, models or practical sessions.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'question and answer, talk, group discussion, or guest speakers.',
        answer: 'A',
      },
      {
        key: 'c',
        value: 'handouts, books, or readings.',
        answer: 'R',
      },
      {
        key: 'd',
        value: 'diagrams, charts, maps or graphs.',
        answer: 'V',
      },
    ],
  },
  {
    question: `I have finished a competition or test and I would like some feedback. I would like to have feedback`,
    options: [
      {
        key: 'a',
        value: 'using examples from what I have done.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'using a written description of my results.',
        answer: 'R',
      },
      {
        key: 'c',
        value: 'from somebody who talks it through with me.',
        answer: 'A',
      },
      {
        key: 'd',
        value: 'using graphs showing what I achieved.',
        answer: 'V',
      },
    ],
  },
  {
    question: `I want to find out about a house or an apartment. Before visiting it I would want:`,
    options: [
      {
        key: 'a',
        value: 'to view a video of the property.',
        answer: 'K',
      },
      {
        key: 'b',
        value: 'a discussion with the owner.',
        answer: 'A',
      },
      {
        key: 'c',
        value: 'a printed description of the rooms and features.',
        answer: 'R',
      },
      {
        key: 'd',
        value: 'a plan showing the rooms and a map of the area.',
        answer: 'V',
      },
    ],
  },
  {
    question: `I want to assemble a wooden table that came in parts (kitset). I would learn best from:`,
    options: [
      {
        key: 'a',
        value: 'diagrams showing each stage of the assembly.',
        answer: 'V',
      },
      {
        key: 'b',
        value: 'advice from someone who has done it before.',
        answer: 'A',
      },
      {
        key: 'c',
        value: 'written instructions that came with the parts for the table.',
        answer: 'R',
      },
      {
        key: 'd',
        value: 'watching a video of a person assembling a similar table.',
        answer: 'K',
      },
    ],
  },
];

export default questions;
