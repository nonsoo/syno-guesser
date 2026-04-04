import { useEffect, useMemo, useState } from "react";

import { intervalToDuration } from "date-fns";

const convertValue = (countDown: number) => {
  const duration = intervalToDuration({
    start: 0,
    end: Math.max(countDown, 0),
  });

  return [
    String(duration.hours ?? 0).padStart(2, "0"),
    String(duration.minutes ?? 0).padStart(2, "0"),
    String(duration.seconds ?? 0).padStart(2, "0"),
  ];
};

const useCountdown = (targetDate: string) => {
  const targetTime = useMemo(
    () => new Date(targetDate).getTime(),
    [targetDate],
  );

  const [countDown, setCountDown] = useState(
    Math.max(targetTime - Date.now(), 0),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountDown(Math.max(targetTime - Date.now(), 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetTime]);

  return convertValue(countDown);
};

export default useCountdown;
