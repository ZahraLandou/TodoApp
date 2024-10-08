// CalendarScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTodos } from '../components/TodosContext';
import TodoItem from '../components/TodoItem';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Todo, Priority, RootTabParamList } from '../assets/types';
import { ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';  // Import the specific icon
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
    <ImageBackground
      source={require('../assets/backgrounds/cat_resting.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Calendar
          onDayPress={(day: DateObject) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#FDBFD3' },
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
          onPress={() => navigation.navigate('Add', { selectedDate })}
        >
          <FontAwesomeIcon icon={faPlus} size={24} color="#9462BF" />  

        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    backgroundColor: '#8ABBE6',
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',
  }
});

export default CalendarScreen;
