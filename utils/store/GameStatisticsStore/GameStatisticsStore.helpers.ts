export const generateUpdatedWinStreak = (
  hasWon: boolean,
  isConsecutiveDay: boolean,
  winStreak: number,
) => {
  if (!hasWon) return 0;

  if (!isConsecutiveDay) return 1;

  return winStreak + 1;
};
