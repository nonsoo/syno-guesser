import { useMemo } from "react";
import { startOfTomorrow } from "date-fns";
import useCountdown from "@/utils/hooks/useCountdown";

import styles from "@/styles/wingame.module.css";

const Countdown = () => {
  const tomorrow = useMemo(() => startOfTomorrow().toUTCString(), []);
  const [, hours, minutes, seconds] = useCountdown(tomorrow);

  return (
    <p className={styles.countDown}>
      New clueless in {`${hours}:${minutes}:${seconds}`}
    </p>
  );
};

export default Countdown;
