import styles from "../styles/Home.module.css";
import Game from "./components/Game";

import { getWordOfTheDay } from "./server-helpers/getWord";

import { BsBookHalf } from "react-icons/bs";

const RootPage = async () => {
  const { synonyms, wordOfDay, trgWords } = await getWordOfTheDay();
  return (
    <div className={styles.mainContent}>
      <header className={styles.HeaderCon}>
        <h1 className={styles.HeaderTitle}>Clueless Words</h1>
        <button popoverTarget="instructionModal">
          <BsBookHalf className={styles.HeaderIcon} />
        </button>
      </header>

      <Game synonyms={synonyms} trgWords={trgWords} wordOfDay={wordOfDay} />
    </div>
  );
};

export default RootPage;
