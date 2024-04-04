import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import TodoItem from '../components/TodoItem';

interface Todo {
  id: string;
  text: string;
}

const HomeScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = { id: Date.now().toString(), text: inputValue.trim() };
    setTodos([...todos, newTodo]);
    setInputValue('');
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
