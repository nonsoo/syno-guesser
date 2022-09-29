const useGetHint = (hintSet: Set<number>, lenLst: number) => {
  let newHint = false;

  let randomHint: number = 0;
  let counter: number = 0;

  if (hintSet.size === lenLst) return;

  while (newHint === false || counter > lenLst) {
    counter++;
    randomHint = Math.floor(Math.random() * lenLst);

    if (!hintSet.has(randomHint)) {
      newHint = true;
    }
  }

  return randomHint;
};

export default useGetHint;
