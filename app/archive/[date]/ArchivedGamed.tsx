import { redirect } from "next/navigation";

import { wordListThemes } from "@/utils/constants/word-lists";
import GameProvider from "@/utils/context/GameContext";
import { GAME_TIME_ZONE } from "@/utils/helpers/dates";

import Game from "../../components/Game";
import { setupGame } from "../../server-helpers/setupGame";

interface Props {
  params: Promise<{ date: string }>;
}

const ArchivedGame = async (props: Props) => {
  const { date } = await props.params;
  const theme = "random-list";

  let archivedDate: Temporal.PlainDate;
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new RangeError("Invalid archive date");
    }
    archivedDate = Temporal.PlainDate.from(date);
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
    redirect("/");
  }

  const isValidArchivedDate =
    Temporal.PlainDate.compare(
      archivedDate,
      Temporal.Now.plainDateISO(GAME_TIME_ZONE),
    ) < 0 &&
    Temporal.PlainDate.compare(
      archivedDate,
      wordListThemes[theme].startDate,
    ) > 0;

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
