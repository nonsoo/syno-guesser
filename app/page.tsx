import { cacheLife, cacheTag } from "next/cache";

import GameProvider from "@/utils/context/GameContext";
import { GAME_TIME_ZONE } from "@/utils/helpers/dates";

import Game from "./components/Game";
import { setupGame } from "./server-helpers/setupGame";

const RootPage = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("word-of-the-day");

  const today = Temporal.Now.plainDateISO(GAME_TIME_ZONE);

  const { initialState, triggerWords } = await setupGame(today);

  const theme = "random-list";

  return (
    <GameProvider initialState={initialState} hasAccount={false} theme={theme}>
      <Game triggerWords={triggerWords} />
    </GameProvider>
  );
};

export default RootPage;
