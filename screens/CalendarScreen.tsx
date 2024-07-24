// CalendarScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTodos } from '../components/TodosContext';
import TodoItem from '../components/TodoItem';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Todo, Priority, RootTabParamList } from '../assets/types';

// Define the type for the date object used in onDayPress
type DateObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

const CalendarScreen: React.FC = () => {
  const { todos, deleteTodo, toggleComplete } = useTodos();
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  // Filter todos by the selected date
  const todosForSelectedDate = todos.filter(todo =>
    todo.deadline.toISOString().split('T')[0] === selectedDate
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: DateObject) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      <FlatList
        data={todosForSelectedDate}
        renderItem={({ item }) => (
          <TodoItem todo={item} onDelete={deleteTodo} onToggleComplete={toggleComplete} />
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTodo', { selectedDate })}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'purple',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default CalendarScreen;
