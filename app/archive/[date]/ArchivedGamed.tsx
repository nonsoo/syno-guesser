import { redirect } from "next/navigation";

import { isAfter, isBefore, isValid } from "date-fns";

import { BASELINE_DATE } from "@/utils/constants/consts";
import GameProvider from "@/utils/context/GameContext";

import Game from "../../components/Game";
import { setupGame } from "../../server-helpers/setupGame";

interface Props {
  params: Promise<{ date: string }>;
}

const ArchivedGame = async (props: Props) => {
  const { date } = await props.params;
  const archivedDate = new Date(date);
  const today = new Date();
  const baselineDate = new Date(BASELINE_DATE);

  const isValidArchivedDate =
    isValid(archivedDate) &&
    isBefore(archivedDate, today) &&
    isAfter(archivedDate, baselineDate);

  if (!isValidArchivedDate) {
    redirect("/");
  }

  const { initialState, triggerWords } = await setupGame(archivedDate);

  return (
    <GameProvider
      offsetDate={initialState.gameState.dayOfPlay}
      initialState={initialState}
      hasAccount={false}
    >
      <Game
        triggerWords={triggerWords}
        archivedGame={initialState.archivedGame}
      />
    </GameProvider>
  );
};

export default ArchivedGame;
