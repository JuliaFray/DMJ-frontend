import { useEffect, useMemo, useState } from 'react';

import 'dayjs/locale/ru';
import moment from 'moment/moment';

import { TODAY, WEEK_DAY } from './constants';

export interface DateType {
  year: number;
  month: number;
  date: number;
  dayName: string;
  dayNumber: number;
}

export interface CalendarDateType {
  selectedDate: DateType;
  handleSelectedDate: (date: DateType) => void;
}

export const useWeekCalendar = ({ selectedDate, handleSelectedDate }: CalendarDateType) => {
  const renderDates = (
    year: number,
    month: number,
    date: number,
    length: number,
    direction: boolean,
  ) => {
    const rendered = Array.from({ length }).map((_, idx) => {
      const delta = direction ? idx + 1 : -(idx + 1);

      const eachDate = new Date(+year, +month, +date + delta);

      return {
        year: eachDate.getFullYear(),
        month: eachDate.getMonth(),
        date: eachDate.getDate(),
        dayName: WEEK_DAY[eachDate.getDay()],
        dayNumber: eachDate.getDay(),
      };
    });

    return direction ? rendered : rendered.reverse();
  };

  const { year, month, date, dayNumber, dayName } = selectedDate || TODAY;

  const centerDate = {
    year,
    month,
    date,
    dayNumber,
    dayName,
  };

  const selectedDayNumber = selectedDate.dayNumber;

  const prevLength = selectedDayNumber ? selectedDayNumber - 1 : 6 - selectedDayNumber;
  const nextLength = selectedDayNumber ? 7 - selectedDayNumber : selectedDayNumber - 1;

  const prevDates = useMemo(
    () => renderDates(year, month, date, prevLength, false),
    [selectedDate],
  );
  const nextDates = useMemo(() => renderDates(year, month, date, nextLength, true), [selectedDate]);

  const [dateList, setDateList] = useState<DateType[]>([...prevDates, centerDate, ...nextDates]);

  useEffect(() => {
    setDateList([...prevDates, centerDate, ...nextDates]);
  }, [selectedDate]);

  const handleContainerScroll = (options: ScrollToOptions) => {
    if (options.left === -7) {
      const firstDate = dateList[0];
      const prev = renderDates(firstDate.year, firstDate.month, firstDate.date, 7, false);
      setDateList([...prev]);
    }

    if (options.left === 7) {
      const lastDate = dateList[dateList.length - 1];
      const next = renderDates(lastDate.year, lastDate.month, lastDate.date, 7, true);
      setDateList([...next]);
    }
  };

  const handleTodayClick = () => {
    handleSelectedDate(centerDate);

    setDateList([...prevDates, centerDate, ...nextDates]);
  };

  const lastDate = dateList[dateList.length - 1];
  const selectedMonth = moment(new Date(lastDate.year, lastDate.month, lastDate.date)).format(
    'MMM',
  );

  return {
    dateList,
    handleContainerScroll,
    handleTodayClick,
    selectedMoment: moment(new Date(selectedDate.year, selectedDate.month, selectedDate.date)),
    selectedMonth,
  };
};
