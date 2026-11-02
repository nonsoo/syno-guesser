import { useEffect, useState } from "react";

import { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";

import "@/utils/helpers/ensure-temporal";

const convertValue = (countDown: number) => {
  const duration = TemporalPolyfill.Duration.from({
    milliseconds: Math.max(countDown, 0),
  }).round({
    largestUnit: "hours",
    smallestUnit: "seconds",
    roundingMode: "floor",
  });

  return [
    String(duration.hours).padStart(2, "0"),
    String(duration.minutes).padStart(2, "0"),
    String(duration.seconds).padStart(2, "0"),
  ];
};

const useCountdown = (targetDate: Temporal.Instant) => {
  const targetTime = targetDate.epochMilliseconds;

  const [countDown, setCountDown] = useState(
    Math.max(targetTime - Temporal.Now.instant().epochMilliseconds, 0),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountDown(
        Math.max(targetTime - Temporal.Now.instant().epochMilliseconds, 0),
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetTime]);

  return convertValue(countDown);
};

export default useCountdown;
