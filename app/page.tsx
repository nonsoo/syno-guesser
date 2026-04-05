import { cacheLife, cacheTag } from "next/cache";

import GameProvider from "@/utils/context/GameContext";

import Game from "./components/Game";
import { setupGame } from "./server-helpers/setupGame";

const RootPage = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("word-of-the-day");

  const today = new Date();

  const { initialState, triggerWords } = await setupGame(today);

  return (
    <GameProvider
      offsetDate={initialState.gameState.dayOfPlay}
      initialState={initialState}
      hasAccount={false}
    >
      <Game triggerWords={triggerWords} />
    </GameProvider>
  );
};

export default RootPage;
