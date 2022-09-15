import { FC, memo } from "react";

import styles from "../styles/Home.module.css";

interface Props {
  numLives: number;
}

const myLives: FC<Props> = ({ numLives }) => {
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
