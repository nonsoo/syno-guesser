const useGetHint = (hintSet: Set<number>, lenLst: number): number => {
  let newHint = false;

  //   let randomHint: number | undefined;
  let randomHint: number = 0;

  while (newHint === false) {
    randomHint = Math.floor(Math.random() * lenLst);

    if (!hintSet.has(randomHint)) {
      hintSet.add(randomHint);
      newHint = true;
    }
  }
  return randomHint;
};

export default useGetHint;
