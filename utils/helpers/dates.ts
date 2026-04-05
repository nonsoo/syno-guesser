import { format, differenceInCalendarDays, addDays } from "date-fns";

export const getRandomDateByDay = (start: Date, end: Date) => {
  const days = differenceInCalendarDays(end, start);
  const offset = Math.floor(Math.random() * (days + 1));

  const randomDate = addDays(start, offset);

  return format(randomDate, "yyyy-MM-dd");
};
