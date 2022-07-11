const useGetHint = (hintSet: Set<number>, lenLst: number): number => {
  let newHint = false;

  let randomHint: number = 0;

  while (newHint === false) {
    randomHint = Math.floor(Math.random() * lenLst);

    if (!hintSet.has(randomHint)) {
      newHint = true;
    }
  }

  console.log(hintSet);
  return randomHint;
};

export default useGetHint;
