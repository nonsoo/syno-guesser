import { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";
import {
  Chevron,
  MonthCaption,
  MonthsDropdown,
  YearsDropdown,
  CaptionLabel,
} from "react-day-picker";

import { enCA } from "date-fns/locale";

import "react-day-picker/style.css";

import styles from "./DateSelector.module.css";

interface DateSelectorProps {
  defaultDate?: Date;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  fromDate: Date;
  toDate: Date;
  disabledRange?: { before: Date; after: Date };
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
      defaultMonth={defaultDate}
      selected={selectedDate}
      onSelect={(date) => {
        if (!date) return;
        setSelectedDate(date);
      }}
      startMonth={fromDate}
      endMonth={toDate}
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
      disabled={disabledRange}
    />
  );
};

export default DateSelector;
