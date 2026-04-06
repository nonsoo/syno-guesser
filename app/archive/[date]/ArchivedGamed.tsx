import { redirect } from "next/navigation";

import { isAfter, isBefore, isValid, startOfDay, parse } from "date-fns";

import { BASELINE_DATE } from "@/utils/constants/consts";
import GameProvider from "@/utils/context/GameContext";

import Game from "../../components/Game";
import { setupGame } from "../../server-helpers/setupGame";

interface Props {
  params: Promise<{ date: string }>;
}

const ArchivedGame = async (props: Props) => {
  const { date } = await props.params;
  const archivedDate = parse(date, "yyyy-MM-dd", new Date());
  const today = startOfDay(new Date());
  const baselineDate = new Date(BASELINE_DATE);

  const isValidArchivedDate =
    isValid(archivedDate) &&
    isBefore(archivedDate, today) &&
    isAfter(archivedDate, baselineDate);

  if (!isValidArchivedDate) {
    redirect("/");
  }

  const { initialState, triggerWords } = await setupGame(archivedDate);

  const theme = "random-list";

  return (
    <GameProvider initialState={initialState} hasAccount={false} theme={theme}>
      <Game triggerWords={triggerWords} />
    </GameProvider>
  );
};

export default ArchivedGame;
