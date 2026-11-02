import { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";
import {
  Chevron,
  MonthCaption,
  MonthsDropdown,
  YearsDropdown,
  CaptionLabel,
} from "react-day-picker";
import { enCA } from "react-day-picker/locale";
import "react-day-picker/style.css";

import "@/utils/helpers/ensure-temporal";
import { fromPickerDate, toPickerDate } from "@/utils/helpers/dates";

import styles from "./DateSelector.module.css";

interface DateSelectorProps {
  defaultDate?: Temporal.PlainDate;
  selectedDate: Temporal.PlainDate;
  setSelectedDate: Dispatch<SetStateAction<Temporal.PlainDate>>;
  fromDate: Temporal.PlainDate;
  toDate: Temporal.PlainDate;
  disabledRange?: {
    before: Temporal.PlainDate;
    after: Temporal.PlainDate;
  };
  className?: Partial<{
    dayPicker: string;
  }>;
}

const DateSelector = ({
  defaultDate,
  selectedDate,
  setSelectedDate,
  fromDate,
  toDate,
  disabledRange,
  className,
}: DateSelectorProps) => {
  return (
    <DayPicker
      className={className?.dayPicker}
      classNames={{
        chevron: styles["day-picker-chevron"],
        selected: styles["day-picker-selected"],
      }}
      mode="single"
      captionLayout="dropdown"
      navLayout="around"
      defaultMonth={defaultDate ? toPickerDate(defaultDate) : undefined}
      selected={toPickerDate(selectedDate)}
      onSelect={(date) => {
        if (!date) return;
        setSelectedDate(fromPickerDate(date));
      }}
      startMonth={toPickerDate(fromDate)}
      endMonth={toPickerDate(toDate)}
      locale={enCA}
      components={{
        MonthCaption: (props) => (
          <div>
            <MonthCaption {...props} />
          </div>
        ),
        MonthsDropdown: MonthsDropdown,
        YearsDropdown: YearsDropdown,
        Chevron: (props) => <Chevron {...props} />,
        CaptionLabel: CaptionLabel,
      }}
      animate
      disabled={
        disabledRange && {
          before: toPickerDate(disabledRange.before),
          after: toPickerDate(disabledRange.after),
        }
      }
    />
  );
};

export default DateSelector;
