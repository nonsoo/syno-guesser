"use client";
import { useRouter } from "next/navigation";

import { startTransition, useState } from "react";

import { format, subDays } from "date-fns";

import DateSelector from "@/Components/DateSelector/DateSelector";
import styles from "@/styles/CluelessArchive.module.css";
import { BASELINE_DATE } from "@/utils/constants/consts";
import { CLUELESS_ARCHIVE_MODAL_ID } from "@/utils/constants/id-constants";
import { getRandomDateByDay } from "@/utils/helpers/dates";

const DateForm = () => {
  const fromDate = new Date(BASELINE_DATE);
  const toDate = new Date();

  const defaultDate = subDays(toDate, 1);
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const router = useRouter();

  return (
    <form className={styles.Modal__form}>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        fromDate={fromDate}
        toDate={toDate}
        disabledRange={{ before: fromDate, after: defaultDate }}
      />
      <section className={styles.btnGroups}>
        <button
          type="button"
          className={styles.Modal__submitBtn}
          popoverTarget={CLUELESS_ARCHIVE_MODAL_ID}
          popoverTargetAction="hide"
          onClick={() =>
            startTransition(() => {
              router.push(`/archive/${formattedDate}`);
            })
          }
        >
          Play Archived Game
        </button>
        <button
          type="button"
          className={styles.Modal__submitBtn}
          popoverTarget={CLUELESS_ARCHIVE_MODAL_ID}
          popoverTargetAction="hide"
          onClick={() =>
            startTransition(() => {
              const randomDay = getRandomDateByDay(fromDate, defaultDate);
              router.push(`/archive/${randomDay}`);
            })
          }
        >
          Play Random Day
        </button>
      </section>
    </form>
  );
};

export default DateForm;
