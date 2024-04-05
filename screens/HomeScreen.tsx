import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text} from 'react-native';
import TodoItem from '../components/TodoItem';
import { Todo, Priority } from '../assets/types';
import { Picker } from '@react-native-picker/picker';

const HomeScreen: React.FC = () => {
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      deadline: deadline,
      priority: priority,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
    setDeadline(''); // Reset deadline
  };

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
      <TextInput
        style={styles.input}
        onChangeText={setDeadline}
        value={deadline}
        placeholder="Deadline (YYYY-MM-DD)"
      />
            <Text>Priority:</Text>
      <Picker
        selectedValue={priority}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue) => setPriority(itemValue)}
      >
        <Picker.Item label="High" value={Priority.High} />
        <Picker.Item label="Medium" value={Priority.Medium} />
        <Picker.Item label="Low" value={Priority.Low} />
      </Picker>
      <Button title="Add Todo" onPress={addTodo} color="#50c878" />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem todo={item} onDelete={deleteTodo} />
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

export default HomeScreen;
