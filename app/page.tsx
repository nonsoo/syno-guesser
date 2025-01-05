import styles from "../styles/Home.module.css";

import { getWordOfTheDay } from "./server-helpers/getWord";

import { BsBookHalf } from "react-icons/bs";

const RootPage = async () => {
  const { synonyms, wordOfDay, trgWords } = await getWordOfTheDay();
  return (
    <div className={styles.mainContent}>
      <header className={styles.HeaderCon}>
        <h1 className={styles.HeaderTitle}>Clueless Words</h1>
        <BsBookHalf className={styles.HeaderIcon} />
      </header>
      <main className={styles.GuesserCon}></main>
    </div>
  );
};

export default RootPage;
