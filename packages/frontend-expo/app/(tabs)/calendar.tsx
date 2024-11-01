import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

LocaleConfig.locales.fr = {
  monthNames: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: 'rgba(107,173,232,0.75)',
        dark: 'rgba(107,173,232,0.75)',
      }}
      headerImage={
        <Ionicons
          style={styles.calendarIcon}
          name="calendar-outline"
          size={210}
          color={'white'}
        />
      }
    >
      <Calendar
        onDayPress={(day: any) => {
          setSelectedDate(day.dateString); // 날짜 선택 시 상태 업데이트
          console.log(day);
        }}
        headerStyle={{ gap: 16 }}
        markingType={'period'}
        markedDates={{
          '2024-10-09': {
            textColor: 'white',
            startingDay: true,
            color: '#85AA85',
          },
          '2024-10-10': {
            textColor: 'white',
            color: '#85AA85',
          },
          '2024-10-11': {
            textColor: 'white',
            color: '#85AA85',
            endingDay: true,
          },
          '2024-10-15': {
            textColor: 'white',
            startingDay: true,
            color: '#C0C6C8',
          },
          '2024-10-16': {
            textColor: 'white',
            color: '#C0C6C8',
            endingDay: true,
          },
          '2024-10-17': {
            textColor: 'white',
            startingDay: true,
            color: '#789DBC',
          },
          '2024-10-18': {
            textColor: 'white',
            color: '#789DBC',
            endingDay: true,
          },
          '2024-10-21': {
            startingDay: true,
            color: '#AF5F67',
            textColor: 'white',
          },
          '2024-10-22': {
            endingDay: true,
            color: '#AF5F67',
            textColor: 'white',
          },
          '2024-10-24': {
            textColor: 'white',
            startingDay: true,
            color: '#C1C076',
            endingDay: true,
          },
          '2024-11-05': {
            textColor: 'white',
            startingDay: true,
            color: '#789DBC',
          },
          '2024-11-06': {
            textColor: 'white',
            color: '#789DBC',
          },
          '2024-11-07': {
            textColor: 'white',
            color: '#789DBC',
          },
          '2024-11-08': {
            textColor: 'white',
            color: '#789DBC',
            endingDay: true,
          },
          '2024-11-09': {
            textColor: 'white',
            startingDay: true,
            color: '#85AA85',
          },
          '2024-11-10': {
            textColor: 'white',
            color: '#85AA85',
          },
          '2024-11-11': {
            textColor: 'white',
            color: '#85AA85',
            endingDay: true,
          },
          '2024-11-12': {
            textColor: 'white',
            startingDay: true,
            color: '#C1C076',
            endingDay: true,
          },
          '2024-11-13': {
            textColor: 'white',
            startingDay: true,
            color: '#AF5F67',
            endingDay: true,
          },
          '2024-11-14': {
            textColor: 'white',
            startingDay: true,
            color: '#C1C076',
            endingDay: true,
          },
          '2024-11-15': {
            textColor: 'white',
            startingDay: true,
            color: '#C0C6C8',
          },
          '2024-11-16': {
            textColor: 'white',
            color: '#C0C6C8',
            endingDay: true,
          },
          '2024-11-17': {
            textColor: 'white',
            startingDay: true,
            color: '#789DBC',
          },
          '2024-11-18': {
            textColor: 'white',
            color: '#789DBC',
            endingDay: true,
          },
          '2024-11-20': {
            startingDay: true,
            color: '#AF5F67',
            textColor: 'white',
          },
          '2024-11-21': {
            color: '#AF5F67',
            textColor: 'white',
          },
          '2024-11-22': {
            endingDay: true,
            color: '#AF5F67',
            textColor: 'white',
          },
          '2024-11-24': {
            textColor: 'white',
            startingDay: true,
            color: '#C1C076',
            endingDay: true,
          },
        }}
        theme={{
          todayTextColor: '#609ccf',
          arrowColor: '#609ccf',
          monthTextColor: '#333',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  calendarIcon: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
