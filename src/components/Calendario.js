import React from 'react';
import { Calendar } from 'react-native-calendars';

export default function Calendario({ onDayPress }) {
  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={{
        '2025-09-12': { selected: true, marked: true },
      }}
      theme={{
        backgroundColor: '#fff',
        calendarBackground: '#fff',
        textSectionTitleColor: '#22d156',
        selectedDayBackgroundColor: '#22d156',
        selectedDayTextColor: '#fff',
        todayTextColor: '#22d156',
        dayTextColor: '#222',
        arrowColor: '#22d156',
        monthTextColor: '#22d156',
        indicatorColor: '#22d156',
        dotColor: '#22d156',
        selectedDotColor: '#fff',
      }}
    />
  );
}