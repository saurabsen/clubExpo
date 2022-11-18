import './calendar.css';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

const Calendar = () => {
  const [date, setDate] = useState(dayjs(new Date()));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
    </LocalizationProvider>
  );
};

export default Calendar;
