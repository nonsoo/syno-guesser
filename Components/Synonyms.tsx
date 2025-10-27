import type { Synonyms } from "@/utils/types/projectTypes";

import { memo } from "react";

import styles from "@/styles/Home.module.css";

interface SynonymsProps {
  synos: Synonyms;
}

const SynonymsComp = ({ synos }: SynonymsProps) => {
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

export default memo(SynonymsComp);
