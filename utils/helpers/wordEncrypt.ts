export const encoder = (word: string, key: number): string => {
  let newWord: string = "";

  for (let i = 0; i < word.length; i++) {
    newWord = newWord + String.fromCharCode(word.charCodeAt(i) + key);
  }

  return newWord;
};

export const decoder = (word: string, key: number): string => {
  let newWord: string = "";

  for (let i = 0; i < word.length; i++) {
    newWord = newWord + String.fromCharCode(word.charCodeAt(i) - key);
  }

  return newWord;
};

export const wordKey: number = 4;
