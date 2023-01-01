import { useEffect, useState } from "react";

const convertValue = (countDown: number) => {
  const days = String(Math.floor(countDown / (1000 * 60 * 60 * 24))).padStart(
    1,
    "0"
  );
  const hours = String(
    Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(Math.floor((countDown % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );

  return [days, hours, minutes, seconds];
};

const useCountdown = (targetDate: Date) => {
  const countDownDate = targetDate.getDate();
  const delta = countDownDate - new Date().getTime();
  const [countDown, setCountDown] = useState(delta);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    const time = convertValue(countDown);
    const stopTimer = time.every((item) => item === "0");
    if (stopTimer) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countDownDate, countDown]);

  return convertValue(countDown);
};

export default useCountdown;
