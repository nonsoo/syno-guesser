import { Suspense } from "react";

import { BookA } from "lucide-react";

import Instructions from "@/Components/Modals/Instructions/Instructions";
import styles from "@/styles/Home.module.css";
import { INSTRUCTION_MODAL_ID } from "@/utils/constants/id-constants";

import Game from "./components/Game";
import { getWordOfTheDay } from "./server-helpers/getWord";
import { createGameStore } from "@/utils/store/GameStore/gameStore";
import { createGameStatisticsStore } from "@/utils/store/GameStatisticsStore/GameStatisticsStore";

const RootPage = async () => {
  const { synonyms, wordOfDay, trgWords, offsetDate } = await getWordOfTheDay();

  const gameStore = createGameStore({
    synonyms,
    wordOfDay,
    trgWords,
    offsetDate,
  });
  const gameStatisticsStore = createGameStatisticsStore(false, offsetDate);
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
        <Game
          gameStore={gameStore}
          gameStatisticsStore={gameStatisticsStore}
          triggerWords={trgWords}
        />
      </Suspense>
    </div>
  );
};

export default RootPage;
