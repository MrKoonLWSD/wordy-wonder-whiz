
// Common 5-letter words
export const WORDS = [
  "APPLE", "BEACH", "CLIMB", "DANCE", "EAGLE", "FLAME", "GRAPE", "HOUSE",
  "IMAGE", "JUICE", "KNIFE", "LIGHT", "MUSIC", "NOBLE", "OCEAN", "PIANO",
  "QUEEN", "RIVER", "SNAKE", "TABLE", "URBAN", "VOICE", "WATER", "YOUTH"
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

export const isValidWord = (word: string) => {
  return WORDS.includes(word.toUpperCase());
};
