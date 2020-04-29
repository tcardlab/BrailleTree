/*
Stored data:
  • braille – glyph : binary array mapping
  • denseBraille – {groups : [base binary array, glyphs]}
  • mods - capital and num modifier
  • quotes
*/
export const braille = {
  'a': [1, 0, 0, 0, 0, 0],
  'b': [1, 1, 0, 0, 0, 0],
  'c': [1, 0, 0, 1, 0, 0],
  'd': [1, 0, 0, 1, 1, 0],
  'e': [1, 0, 0, 0, 1, 0],
  'f': [1, 1, 0, 1, 0, 0],
  'g': [1, 1, 0, 1, 1, 0],
  'h': [1, 1, 0, 0, 1, 0],
  'i': [0, 1, 0, 1, 0, 0],
  'j': [0, 1, 0, 1, 1, 0],
  'k': [1, 0, 1, 0, 0, 0],
  'l': [1, 1, 1, 0, 0, 0],
  'm': [1, 0, 1, 1, 0, 0],
  'n': [1, 0, 1, 1, 1, 0],
  'o': [1, 0, 1, 0, 1, 0],
  'p': [1, 1, 1, 1, 0, 0],
  'q': [1, 1, 1, 1, 1, 0],
  'r': [1, 1, 1, 0, 1, 0],
  's': [0, 1, 1, 1, 0, 0],
  't': [0, 1, 1, 1, 1, 0],
  'u': [1, 0, 1, 0, 0, 1],
  'v': [1, 1, 1, 0, 0, 1],
  'w': [0, 1, 0, 1, 1, 1],
  'x': [1, 0, 1, 1, 0, 1],
  'y': [1, 0, 1, 1, 1, 1],
  'z': [1, 0, 1, 0, 1, 1],
  '1': [1, 0, 0, 0, 0, 0],
  '2': [1, 1, 0, 0, 0, 0],
  '3': [1, 0, 0, 1, 0, 0],
  '4': [1, 0, 0, 1, 1, 0],
  '5': [1, 0, 0, 0, 1, 0],
  '6': [1, 1, 0, 1, 0, 0],
  '7': [1, 1, 0, 1, 1, 0],
  '8': [1, 1, 0, 0, 1, 0],
  '9': [0, 1, 0, 1, 0, 0],
  '0': [0, 1, 0, 1, 1, 0],
  ',': [0, 1, 0, 0, 0, 0],
  ';': [0, 1, 1, 0, 0, 0],
  ':': [0, 1, 0, 0, 1, 0],
  '.': [0, 1, 0, 0, 1, 1],
  '?': [0, 1, 1, 0, 0, 1],
  '!': [0, 1, 1, 0, 1, 0],
  "'": [0, 0, 1, 0, 0, 0],
  '-': [0, 0, 1, 0, 0, 1],
  ' ': [0, 0, 0, 0, 0, 0],
  '(': [0, 1, 1, 0, 1, 1],
  ')': [0, 1, 1, 0, 1, 1],
 }

export const denseBraille = {
  1:[[1, 0, 0, 0, 0, 0], ['a','k','u']],
  2:[[1, 1, 0, 0, 0, 0], ['b','l','v']],
  3:[[1, 0, 0, 1, 0, 0], ['c','m','x']],
  4:[[1, 0, 0, 1, 1, 0], ['d','n','y']],
  5:[[1, 0, 0, 0, 1, 0], ['e','o','z']],
  6:[[1, 1, 0, 1, 0, 0], ['f','p','and']],
  7:[[1, 1, 0, 1, 1, 0], ['g','q','for']],
  8:[[1, 1, 0, 0, 1, 0], ['h','r','of']],
  9:[[0, 1, 0, 1, 0, 0], ['i','s','the']],
  0:[[0, 1, 0, 1, 1, 0], ['j','t','with', 'w']],
  ' ':[[0, 0, 0, 0, 0, 0], [' ', "'",'-']],
  ',':[[0, 1, 0, 0, 0, 0], [',',';', '?']],
  ':':[[0, 1, 0, 0, 1, 0], [':','!', '(...)','.']],
}

export const mods = {
  num:[0, 0, 1, 1, 1, 1],
  cap:[0, 0, 0, 0, 0, 1],
}

export const quotes = [
  {
    'quote': "Believe in the me that believes in you.",
    'person': "Kamina Jiha"
  },
  {
    'quote': "Life is like a pencil that will surely run out, but will leave the beautiful writing of life.",
    'person': "Nami"
  },
  {
    'quote': 'There are some things you learn best in calm, and some in storm.',
    'person': 'Willa Cather'
  },
  {
    'quote': 'I have the simplest tastes. I am always satisfied with the best.',
    'person': 'Oscar Wilde'
  },
  {
    'quote': "I'm selfish, impatient, and a little insecure. I make mistakes, I'm out of control, and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    'person': 'Marilyn Monroe'
  },
  {
    'quote': 'In any moment of decision, the best thing you can do is the right thing, the next best thing is the wrong thing, and the worst thing you can do is nothing.',
    'person': 'Theodore Roosevelt'
  },
  {
    'quote': 'The best way to find yourself is to lose yourself in the service of others.',
    'person': 'Mahatma Gandhi'
  },
  /* {
    'quote': 'Of course I read Braille, yes.',
    'person': 'Stevie Wonder'
  }, */
  {
    'quote': 'Learning to read music in Braille and play by ear helped me develop a damn good memory.',
    'person': 'Ray Charles'
  },
  {
    'quote': "Like I've always said, love wouldn't be blind if the braille weren't so damned much fun.",
    'person': 'Armistead Maupin'
  },
  {
    'quote': 'There is a wonder in reading Braille that the sighted will never know: to touch words and have them touch you back.',
    'person': 'Jim Fiebig'
  },
  {
    'quote': 'Age does not diminish the extreme disappointment of having a scoop of ice cream fall from the cone.',
    'person': 'Jim Fiebig'
  },
  {
    'quote': 'All thoughts, secret or spoken, belong in a coffee table book written in Braille, so you can really feel the emotions',
    'person': 'Jarod Kintz'
  },
  {
    'quote': "His hands are on my back, in my hair, on my hips. His fingers move like I'm Braille, like he's trying to read me just by touching me.",
    'person': 'Lara Zielin'
  },
  {
    'quote': "I want you to be happy. I want you to laugh a lot. I don't know what exactly I'll be able to do for you, but I'll always be by your side.",
    'person': 'Kagome (Inuyasha)'
  },
  {
    'quote': 'Braille is knowledge, and knowledge is power.',
    'person': 'Louis Braille'
  },
  {
    'quote': 'All men burn with foolish jealousy, but women are fools to take delight in it. This world is full of fools no matter where you look.',
    'person': 'Isuna Hasekura'
  },
  {
    'quote': 'After a time, her smile faded, then finally reappeared as she sighed. The pleasure of nostalgia is never without its companion, loneliness.',
    'person': 'Isuna Hasekura'
  },
  {
    'quote': 'A strong person is not one without weakness. It is one who can prevail over that weakness.',
    'person': 'Isuna Hasekura'
  },
  {
    'quote': "We humans can indeed lose again something we've lost already.",
    'person': 'Kraft Lawrence'
  },
  {
    'quote': "A lie that can't be disproven is no different from the truth.",
    'person': 'Kraft Lawrence'
  },
  {
    'quote': 'Remember the lesson, not the disappointment.',
    'person': 'Holo'
  },
  {
    'quote': 'When a person lies, what is important is not the lie itself. No, it is their reason. Their why.',
    'person': 'Holo'
  },
  {
    'quote': 'There were two kinds of strength. One was the strength that came with having something to protect. The other was the strength of having nothing to lose.',
    'person': 'Holo'
  },
  {
    'quote': 'Things were as they were. What he had to figure out was not how to change his circumstances, but how to conduct himself within them.',
    'person': 'Isuna Hasekura'
  },
  {
    'quote': 'To earn the high regard of an elder, the key was to listen closely to everything he or she said.',
    'person': 'Isuna Hasekura'
  },
  {
    'quote': 'Regret could mean struggling to turn back time, or it could mean swearing to not let the same thing happen again.',
    'person': 'Isuna Hasekura'
  },
  {
    'quote': "We weep for the blood of a bird, but not for the blood of a fish. Blessed are those with a voice.",
    'person': 'Motoko Kusanagi'
  },
  {
    'quote': "You're gonna carry that weight.",
    'person': 'Cowboy Bebop'
  },
]

/*
{
  'quote': '',
  'person': ''
},
*/