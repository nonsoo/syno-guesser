"use client";

import "@/utils/helpers/ensure-temporal";

import { useRouter } from "next/navigation";

import { startTransition, useState } from "react";

import DateSelector from "@/Components/DateSelector/DateSelector";
import styles from "@/styles/CluelessArchive.module.css";
import { CLUELESS_ARCHIVE_MODAL_ID } from "@/utils/constants/id-constants";
import { wordListThemes } from "@/utils/constants/word-lists";
import { GAME_TIME_ZONE, getRandomDateByDay } from "@/utils/helpers/dates";

const DateForm = () => {
  const fromDate = wordListThemes["random-list"].startDate;
  const today = Temporal.Now.plainDateISO(GAME_TIME_ZONE);

  const toDate = today.subtract({ days: 1 });
  const [selectedDate, setSelectedDate] = useState(toDate);

  const formattedDate = selectedDate.toString();

  const router = useRouter();

  return (
    <form className={styles.Modal__form}>
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        fromDate={fromDate}
        toDate={toDate}
        disabledRange={{ before: fromDate, after: toDate }}
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
              const randomDay = getRandomDateByDay(fromDate, toDate);
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
