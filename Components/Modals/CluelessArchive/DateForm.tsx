"use client";
import { useRouter } from "next/navigation";

import { startTransition, useState } from "react";

import { subDays } from "date-fns";

import DateSelector from "@/Components/DateSelector/DateSelector";
import styles from "@/styles/CluelessArchive.module.css";
import { BASELINE_DATE } from "@/utils/constants/consts";
import { CLUELESS_ARCHIVE_MODAL_ID } from "@/utils/constants/id-constants";

const DateForm = () => {
  const fromDate = new Date(BASELINE_DATE);
  const toDate = new Date();

  const defaultDate = subDays(toDate, 1);
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

  const formattedDate = selectedDate.toISOString().split("T")[0];

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
    </form>
  );
};

export default DateForm;
