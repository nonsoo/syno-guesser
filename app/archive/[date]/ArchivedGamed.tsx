import { redirect } from "next/navigation";

import { tz } from "@date-fns/tz";
import { isAfter, isBefore, isValid, startOfDay, parse } from "date-fns";

import { wordListThemes } from "@/utils/constants/word-lists";
import GameProvider from "@/utils/context/GameContext";

import Game from "../../components/Game";
import { setupGame } from "../../server-helpers/setupGame";

interface Props {
  params: Promise<{ date: string }>;
}

const ArchivedGame = async (props: Props) => {
  const { date } = await props.params;
  const theme = "random-list";

  const archivedDate = parse(date, "yyyy-MM-dd", new Date(), {
    in: tz("America/Toronto"),
  });
  const today = startOfDay(new Date());

  const isValidArchivedDate =
    isValid(archivedDate) &&
    isBefore(archivedDate, today) &&
    isAfter(archivedDate, wordListThemes[theme].startDate);

  if (!isValidArchivedDate) {
    redirect("/");
  }

  const { initialState, triggerWords } = await setupGame(archivedDate);

  return (
    <GameProvider initialState={initialState} hasAccount={false} theme={theme}>
      <Game triggerWords={triggerWords} />
    </GameProvider>
  );
};

export default ArchivedGame;
