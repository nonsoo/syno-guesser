import { FC, useMemo } from "react";
import { endOfToday } from "date-fns";
import useCountdown from "../utils/hooks/useCountdown";

import styles from "../styles/wingame.module.css";

const Countdown: FC = () => {
  const tomorrow = useMemo(() => endOfToday(), []);
  console.log(tomorrow);
  const [, hours, minutes, seconds] = useCountdown(tomorrow);

  return <p className={styles.countDown}>{`${hours} ${minutes} ${seconds}`}</p>;
};

export default Countdown;
