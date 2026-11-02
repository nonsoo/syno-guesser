import { afterEach, describe, expect, it, vi } from "vitest";

import "@/utils/helpers/ensure-temporal";
import {
  fromPickerDate,
  getNextGameDayStart,
  getRandomDateByDay,
  toPickerDate,
} from "@/utils/helpers/dates";
import { getOffsetDay } from "@/utils/helpers/newDay";

describe("date helpers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calculates offsets by calendar day", () => {
    expect(
      getOffsetDay(
        Temporal.PlainDate.from("2022-07-19"),
        Temporal.PlainDate.from("2022-07-20"),
      ),
    ).toBe(1);
  });

  it("returns an inclusive random date within the given range", () => {
    const start = Temporal.PlainDate.from("2024-02-28");
    const end = Temporal.PlainDate.from("2024-03-01");

    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(getRandomDateByDay(start, end)).toBe("2024-02-28");

    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(getRandomDateByDay(start, end)).toBe("2024-03-01");
  });

  it.each([
    ["spring forward", "2024-03-10T00:00-05:00[America/New_York]", 23],
    ["fall back", "2024-11-03T00:00-04:00[America/New_York]", 25],
  ])("counts down to the next New York game day across %s", (_, now, hours) => {
    const currentDayStart = Temporal.ZonedDateTime.from(now);
    const nextDayStart = getNextGameDayStart(currentDayStart);

    expect(nextDayStart.epochMilliseconds - currentDayStart.epochMilliseconds)
      .toBe(hours * 60 * 60 * 1000);
  });

  it.each(["2024-03-10", "2024-11-03"])(
    "preserves picker dates around daylight saving transitions (%s)",
    (date) => {
      const plainDate = Temporal.PlainDate.from(date);

      expect(fromPickerDate(toPickerDate(plainDate)).toString()).toBe(date);
    },
  );
});
