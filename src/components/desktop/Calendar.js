import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="calendar p-4 d-flex justify-content-center rounded bg-light border">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="text-center border-0 bg-transparent w-100"
        tileClassName={({ date, view }) => view === 'month' && isWeekend(date) ? 'font-weight-bold' : ''}
      />
    </div>
  );
};

export default MyCalendar;
