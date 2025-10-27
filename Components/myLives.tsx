import { memo } from "react";

import styles from "@/styles/Home.module.css";

interface MyLivesProps {
  numLives: number;
}

const myLives = ({ numLives }: MyLivesProps) => {
  return (
    <div className={styles.Hints__LivesCon}>
      {[...Array(numLives)].map((e, index) => (
        <div
          key={index}
          className={styles.myLives}
          data-testid="liveMeter"
        ></div>
      ))}
    </div>
  );
};

export default memo(myLives);
