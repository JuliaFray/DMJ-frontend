import { useState, useRef, useEffect } from 'react';

import moment from 'moment/moment';

export const WEEK_DAY = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
export interface DateType {
  year: number;
  month: number;
  date: number;
  day: string;
}

export const TODAY = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  date: new Date().getDate(),
  day: new Date().getDay(),
};

export interface CalendarDateType {
  selectedDate: DateType;
  handleSelectedDate: (date: DateType) => void;
}

export const useWeekCalendar = ({ selectedDate, handleSelectedDate }: CalendarDateType) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        day: WEEK_DAY[eachDate.getDay()],
      };
    });

    return direction ? rendered : rendered.reverse();
  };

  const { year, month, date, day } = TODAY;

  const centerDate = {
    year,
    month,
    date,
    day: WEEK_DAY[day],
  };
  const dayNumber = moment(new Date()).day();

  const prevLength = dayNumber - 1;
  const nextLength = 7 - dayNumber;

  const prevDates = renderDates(year, month, date, prevLength, false);
  const nextDates = renderDates(year, month, date, nextLength, true);

  const [dateList, setDateList] = useState<DateType[]>([...prevDates, centerDate, ...nextDates]);

  const handleContainerScroll = () => {
    const target = containerRef.current;

    if (!target) return;

    if (target.scrollLeft === 0) {
      // eslint-disable-next-line no-shadow
      const { year, month, date } = dateList[0];
      const prev = renderDates(year, month - 1, date, prevLength, false);
      setDateList([...prev, ...dateList.slice(0, prevLength)]);
    }

    if (target.scrollLeft === target.scrollWidth - target.offsetWidth) {
      // eslint-disable-next-line no-shadow
      const { year, month, date } = dateList[dateList.length - 1];
      const next = renderDates(year, month - 1, date, nextLength, true);
      setDateList([...dateList.slice(dateList.length - nextLength - 1), ...next]);
    }
  };

  const handleTodayClick = () => {
    handleSelectedDate(centerDate);

    setDateList([...prevDates, centerDate, ...nextDates]);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      left: (containerRef.current.scrollWidth - containerRef.current.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, [dateList]);

  return {
    dateList,
    handleContainerScroll,
    containerRef,
    handleTodayClick,
    selectedDate,
    handleSelectedDate,
  };
};
