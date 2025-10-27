import { memo } from "react";
import styles from "@/styles/Home.module.css";
import { synonyms } from "@/utils/types/projectTypes";

interface SynonymsProps {
  synos: synonyms;
}

const Synonyms = ({ synos }: SynonymsProps) => {
  return (
    <section className={styles.syno}>
      {synos.map((syno, index) => (
        <p key={index} className={styles.syno__item} data-testid="synos">
          {syno}
        </p>
      ))}
    </section>
  );
};

export default memo(Synonyms);
