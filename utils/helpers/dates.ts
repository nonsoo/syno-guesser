export const GAME_TIME_ZONE = "America/New_York";

export const getNextGameDayStart = (
  now: Temporal.ZonedDateTime = Temporal.Now.zonedDateTimeISO(GAME_TIME_ZONE),
): Temporal.Instant =>
  now.add({ days: 1 }).startOfDay().toInstant();

export const getRandomDateByDay = (
  start: Temporal.PlainDate,
  end: Temporal.PlainDate,
) => {
  const days = start.until(end, { largestUnit: "days" }).days;
  const offset = Math.floor(Math.random() * (days + 1));

  return start.add({ days: offset }).toString();
};

export const toPickerDate = (date: Temporal.PlainDate): Date =>
  new Date(date.year, date.month - 1, date.day, 12);

export const fromPickerDate = (date: Date): Temporal.PlainDate =>
  Temporal.PlainDate.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
