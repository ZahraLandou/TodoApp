/* import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  // Dummy tasks data. Ideally, this should come from your app's state or database
  const tasks = {
    '2024-04-10': [{id: 1, task: 'Meeting with team'}, {id: 2, task: 'Doctor Appointment'}],
    '2024-04-12': [{id: 3, task: 'Grocery Shopping'}],
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />
      <View style={styles.tasksContainer}>
        <Text style={styles.tasksTitle}>Tasks for {selectedDate}</Text>
        <FlatList
          data={tasks[selectedDate]}
          renderItem={({ item }) => <Text style={styles.taskItem}>{item.task}</Text>}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  tasksContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tasksTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  taskItem: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default CalendarScreen;
 */