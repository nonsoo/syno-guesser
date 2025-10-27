import { INSTRUCTION_MODAL_ID } from "@/utils/constants/id-constants";
import styles from "../styles/Home.module.css";
import Game from "./components/Game";

import { getWordOfTheDay } from "./server-helpers/getWord";

import { BookA } from "lucide-react";
import Instructions from "@/Components/Modals/Instructions/Instructions";

const RootPage = async () => {
  const { synonyms, wordOfDay, trgWords, offsetDate } = await getWordOfTheDay();
  return (
    <div className={styles.mainContent}>
      <header className={styles.HeaderCon}>
        <h1 className={styles.HeaderTitle}>Clueless Words</h1>
        <button
          popoverTarget={INSTRUCTION_MODAL_ID}
          popoverTargetAction="toggle"
          className={styles.HeaderBtn}
        >
          <BookA size={30} />
        </button>
      </header>

      <Instructions />
      <Game
        synonyms={synonyms}
        trgWords={trgWords}
        wordOfDay={wordOfDay}
        offsetDate={offsetDate}
      />
    </div>
  );
};

export default RootPage;
