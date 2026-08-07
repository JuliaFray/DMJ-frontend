import React, { FC, useState } from 'react';

import clsx from 'clsx';
import 'dayjs/locale/ru';
import moment from 'moment/moment';

import { Container, styled } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { MONTHS, TODAY, WEEK_DAY } from './constants';
import { DateType, useWeekCalendar } from './useWeekCalendar';

moment.updateLocale('ru', {
  monthsShort: {
    format: MONTHS.split('_'),
    standalone: MONTHS.split('_'),
  },
});

interface Props {
  isFull: boolean;
  day?: DateType;
  onDayChange?: (day: DateType) => void;
}

export const WeekCalendar: FC<Props> = ({ day, onDayChange, isFull = true }) => {
  const [selectedDate, setSelectedDate] = useState<DateType>({
    year: (day || TODAY).year,
    month: (day || TODAY).month,
    date: (day || TODAY).date,
    dayName: WEEK_DAY[(day || TODAY).dayNumber],
    dayNumber: (day || TODAY).dayNumber,
  });

  const handleSelectedDate = (date: DateType) => {
    setSelectedDate(date);
    onDayChange?.(date);
  };

  const { dateList, handleContainerScroll, selectedMoment, selectedMonth } = useWeekCalendar({
    selectedDate,
    handleSelectedDate,
  });

  const CustomDateCalendar = styled('div')();

  return (
    <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
      {isFull && (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='ru'>
          <DateCalendar
            value={selectedMoment}
            onChange={(d) => {
              handleSelectedDate({
                year: d.year(),
                month: d.month(),
                date: d.date(),
                dayName: WEEK_DAY[d.day()],
                dayNumber: d.day(),
              });
            }}
          />
        </LocalizationProvider>
      )}

      {!isFull && (
        <CustomDateCalendar>
          <div className='MuiDateCalendar-root' style={{ margin: '0 auto', width: '320px' }}>
            <div className='MuiPickersCalendarHeader-root css-1aqny2q-MuiPickersCalendarHeader-root'>
              <div className='MuiPickersCalendarHeader-labelContainer css-cyfsxc-MuiPickersCalendarHeader-labelContainer'>
                <div className='MuiPickersFadeTransitionGroup-root css-31ca4x-MuiPickersFadeTransitionGroup-root'>
                  <div
                    className='MuiPickersCalendarHeader-label css-dplwbx-MuiPickersCalendarHeader-label'
                    style={{ opacity: 1 }}
                  >
                    {selectedMonth} {selectedDate.year}
                  </div>
                </div>
                {/* <button */}
                {/*   className='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall MuiPickersCalendarHeader-switchViewButton css-12mkn7b-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton' */}
                {/*   type='button' */}
                {/* > */}
                {/*   <svg */}
                {/*     className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPickersCalendarHeader-switchViewIcon css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon' */}
                {/*     focusable='false' */}
                {/*     aria-hidden='true' */}
                {/*     viewBox='0 0 24 24' */}
                {/*     data-testid='ArrowDropDownIcon' */}
                {/*   > */}
                {/*     <path d='M7 10l5 5 5-5z' /> */}
                {/*   </svg> */}
                {/*   <span className='MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root' /> */}
                {/* </button> */}
              </div>
              <div
                className='MuiPickersArrowSwitcher-root css-9reuh9-MuiPickersArrowSwitcher-root'
                style={{ opacity: 1, transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <button
                  className='MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd MuiIconButton-sizeMedium MuiPickersArrowSwitcher-button css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button'
                  type='button'
                  title='Прошлая неделя'
                  aria-label='Previous week'
                  onClick={() => {
                    handleContainerScroll({ left: -7, behavior: 'smooth' });
                  }}
                >
                  <svg
                    className='MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1vooibu-MuiSvgIcon-root'
                    focusable='false'
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    data-testid='ArrowLeftIcon'
                  >
                    <path d='M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z' />
                  </svg>
                </button>
                <div className='MuiPickersArrowSwitcher-spacer css-xb7uwb-MuiPickersArrowSwitcher-spacer' />
                <button
                  className='MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeStart MuiIconButton-sizeMedium MuiPickersArrowSwitcher-button css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button'
                  type='button'
                  title='Следующая неделя'
                  aria-label='Next week'
                  onClick={() => {
                    handleContainerScroll({ left: 7, behavior: 'smooth' });
                  }}
                >
                  <svg
                    className='MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1vooibu-MuiSvgIcon-root'
                    focusable='false'
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    data-testid='ArrowRightIcon'
                  >
                    <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
                  </svg>
                </button>
              </div>
            </div>

            <div role='row' className='MuiDayCalendar-header css-i5q14k-MuiDayCalendar-header'>
              {dateList.map((date, idx) => (
                <span
                  className='MuiTypography-root MuiTypography-caption MuiDayCalendar-weekDayLabel css-10dx2qq-MuiTypography-root-MuiDayCalendar-weekDayLabel'
                  role='columnheader'
                  aria-label={date.dayName}
                  key={idx}
                >
                  {date.dayName}
                </span>
              ))}
            </div>

            <div className='MuiDayCalendar-weekContainer css-flbe84-MuiDayCalendar-weekContainer'>
              {dateList.map((date) => (
                <button
                  className={clsx(
                    'MuiButtonBase-root MuiPickersDay-root MuiPickersDay-dayWithMargin css-1ykgnvw-MuiButtonBase-root-MuiPickersDay-root',
                    {
                      'MuiPickersDay-today css-wws9rm-MuiButtonBase-root-MuiPickersDay-root':
                        moment(new Date(date.year, date.month, date.date)).isSame(new Date(), 'D'),
                    },
                    {
                      'Mui-selected': moment(new Date(date.year, date.month, date.date)).isSame(
                        selectedMoment,
                        'D',
                      ),
                    },
                  )}
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
        </CustomDateCalendar>
      )}
    </Container>
  );
};
