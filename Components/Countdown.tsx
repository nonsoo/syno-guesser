import styles from "@/styles/wingame.module.css";
import { getNextGameDayStart } from "@/utils/helpers/dates";
import useCountdown from "@/utils/hooks/useCountdown";

const Countdown = () => {
  const [hours, minutes, seconds] = useCountdown(getNextGameDayStart());

  return (
    <p className={styles.countDown}>
      New clueless in {`${hours}:${minutes}:${seconds}`}
    </p>
  );
};

export default Countdown;
