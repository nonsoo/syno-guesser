import { useMemo } from "react";

import { startOfTomorrow } from "date-fns";

import styles from "@/styles/wingame.module.css";
import useCountdown from "@/utils/hooks/useCountdown";

const Countdown = () => {
  const tomorrow = useMemo(() => startOfTomorrow().toUTCString(), []);
  const [hours, minutes, seconds] = useCountdown(tomorrow);

  return (
    <p className={styles.countDown}>
      New clueless in {`${hours}:${minutes}:${seconds}`}
    </p>
  );
};

export default Countdown;
