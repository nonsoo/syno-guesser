import { Suspense } from "react";

import { BookA } from "lucide-react";

import Instructions from "@/Components/Modals/Instructions/Instructions";
import styles from "@/styles/Home.module.css";
import { INSTRUCTION_MODAL_ID } from "@/utils/constants/id-constants";
import GameProvider from "@/utils/context/GameContext";

import Game from "./components/Game";
import { setupGame } from "./server-helpers/setupGame";

const RootPage = async () => {
  const { initialState, triggerWords } = await setupGame();

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
      <Suspense>
        <GameProvider
          offsetDate={initialState.gameState.dayOfPlay}
          initialState={initialState}
        >
          <Game triggerWords={triggerWords} />
        </GameProvider>
      </Suspense>
    </div>
  );
};

export default RootPage;
