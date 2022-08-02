import { FC } from "react";
import styles from "../styles/Home.module.css";
import { synonyms } from "../utils/types/projectTypes";

interface Props {
  synos: synonyms;
}

const Synonyms: FC<Props> = ({ synos }) => {
  return (
    <section className={styles.syno}>
      {synos.map((syno, index) => (
        <p key={index} className={styles.syno__item}>
          {syno}
        </p>
      ))}
    </section>
  );
};

export default Synonyms;
