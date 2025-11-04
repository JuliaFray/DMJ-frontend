import React, { useState } from 'react';

import clsx from 'clsx';
import moment from 'moment/moment';

import { Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateType, TODAY, useWeekCalendar, WEEK_DAY } from 'shared/ui/calendar/useWeek';

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<DateType>({
    year: TODAY.year,
    month: TODAY.month,
    date: TODAY.date,
    day: WEEK_DAY[TODAY.day],
  });

  const handleSelectedDate = (date: DateType) => {
    setSelectedDate(date);
  };

  const { dateList, handleContainerScroll, containerRef } = useWeekCalendar({
    selectedDate,
    handleSelectedDate,
  });

  // filled = Mui-selected
  // today = MuiPickersDay-today

  return (
    <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar views={['month', 'day']} />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div ref={containerRef} onScroll={handleContainerScroll}>
          <div role='row' className='MuiDayCalendar-header'>
            {dateList.map((date) => (
              <span
                className='MuiTypography-root MuiTypography-caption MuiDayCalendar-weekDayLabel'
                role='columnheader'
                aria-label={date.day}
              >
                {date.day}
              </span>
            ))}
          </div>

          <div role='rowgroup' className='MuiDateCalendar-root '>
            <div role='row' className='MuiDayCalendar-weekContainer'>
              {dateList.map((date) => (
                <button
                  className='MuiButtonBase-root MuiPickersDay-root MuiPickersDay-dayWithMargin'
                  type='button'
                  role='gridcell'
                  onClick={() => handleSelectedDate(date)}
                  key={`${date.year}.${date.month}.${date.date}`}
                >
                  <span>{date.date}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4>
            {moment(new Date(selectedDate.year, selectedDate.month, selectedDate.date)).format(
              'MMM',
            )}
            {selectedDate.year}
          </h4>
        </div>
      </LocalizationProvider>
    </Container>
  );
};
