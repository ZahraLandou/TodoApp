import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { useTodos } from '../components/TodosContext'; 

import TodoItem from '../components/TodoItem';
import { Todo, Priority } from '../assets/types';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTodoScreen: React.FC = () => {
    const { addTodo } = useTodos();
 // const [text, setText] = useState('');
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
  };
/*   const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      deadline: deadline,
      priority: priority,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
    // Optionally reset deadline to current date or leave as is

  }; */

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Add new todo..."
      />
      <Button onPress={() => setShowDatePicker(true)} title="Choose Deadline" />
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
      <Text>Priority:</Text>
      <Picker
        selectedValue={priority}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setPriority(itemValue)}
      >
        <Picker.Item label="High" value={Priority.High} />
        <Picker.Item label="Medium" value={Priority.Medium} />
        <Picker.Item label="Low" value={Priority.Low} />
      </Picker>
      <Button title="Add Todo" onPress={handleAddTodo} color="#50c878" />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem todo={item} onDelete={deleteTodo} onToggleComplete={toggleComplete} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default AddTodoScreen;
