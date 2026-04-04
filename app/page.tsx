import { cacheLife, cacheTag } from "next/cache";

import { BookA } from "lucide-react";

import Instructions from "@/Components/Modals/Instructions/Instructions";
import styles from "@/styles/Home.module.css";
import { INSTRUCTION_MODAL_ID } from "@/utils/constants/id-constants";
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
    <div className={styles.mainContent}>
      <header className={styles.HeaderCon}>
        <h1 className={styles.HeaderTitle}>Clueless Words</h1>
        <button
          popoverTarget={INSTRUCTION_MODAL_ID}
          popoverTargetAction="toggle"
          className={styles.HeaderBtn}
        >
          <BookA size={30} className={styles.HeaderBtnIcon} />
        </button>
      </header>

      <Instructions />

      <GameProvider
        offsetDate={initialState.gameState.dayOfPlay}
        initialState={initialState}
        hasAccount={false}
      >
        <Game triggerWords={triggerWords} />
      </GameProvider>
    </div>
  );
};

export default RootPage;
