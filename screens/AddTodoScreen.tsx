import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, ImageBackground } from 'react-native';
import { useTodos } from '../components/TodosContext'; 
import { useNavigation } from '@react-navigation/native';
import MainScreen from './MainScreen';

import TodoItem from '../components/TodoItem';
import { Todo, Priority, RootTabParamList} from '../assets/types';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const AddTodoScreen: React.FC = () => {
    const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
    const { addTodo } = useTodos();
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Function to toggle the completed status
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    // Call addTodo from the context with current state values
    addTodo(inputValue.trim(), deadline, priority);
    setInputValue(''); // Reset the input value
    navigation.navigate('Home');
  };


  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ImageBackground 
    source={require('../assets/backgrounds/feathers.jpeg')} 
    style={styles.backgroundImage}
  >
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Write a task"
        placeholderTextColor="#cccccc"
      />
      <Button onPress={() => setShowDatePicker(true)} title="Deadline" color="#508991" />
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDeadline(selectedDate);
            }
          }}
          
        />
      )}
      <Text style={styles.label}>Priority:</Text>
      <Picker
        selectedValue={priority}
        onValueChange={(itemValue) => setPriority(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="High" value={Priority.High} />
        <Picker.Item label="Medium" value={Priority.Medium} />
        <Picker.Item label="Low" value={Priority.Low} />
      </Picker>
      <Button title="Create" onPress={handleAddTodo} color="#629EB0" />
    </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
/*     margin: 15,
    height: 40,
    borderColor: '#8470FF',
    borderWidth: 1,
    paddingLeft: 10, */
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly transparent white
    color: 'white', // Text color
    borderBottomColor: '#629EB0', // Purple line for the input bottom
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',    
  },
  picker: {
    color: 'white', // Text color inside picker
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  label: {
    color: 'white', // Labels color
    marginBottom: 10,
  }
});

export default AddTodoScreen;
