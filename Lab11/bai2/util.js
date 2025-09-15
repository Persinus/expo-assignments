export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getRandomLetters = (answer) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const answerLetters = answer.toUpperCase().split('');
  let result = [...answerLetters];
  while (result.length < 9) {
    const rand = letters[Math.floor(Math.random() * letters.length)];
    if (!result.includes(rand)) result.push(rand);
  }
  return result;
};
