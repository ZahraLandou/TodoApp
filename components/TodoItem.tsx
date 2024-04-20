import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Todo, Priority } from '../assets/types';

import Checkbox from '@react-native-community/checkbox'; // checkbox component 


interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggleComplete }) => {
  // Create an animated value starting at 0
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    // Start the fade-in animation when the component mounts
    Animated.timing(
      fadeAnim, // The animated value to drive
      {
        toValue: 1,
        duration: 500, // Make the animation last for 500ms
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);
  const textStyle = todo.completed
    ? { ...styles.text, ...styles.completedText }
    : styles.text;

  return (
    <Animated.View style={{ ...styles.todoItem, opacity: fadeAnim }}>
      <Checkbox
        value={todo.completed}
        onValueChange={(newValue) => onToggleComplete(todo.id)}
      />
      <Text style={textStyle}>{todo.text}</Text>
      <Text>Deadline: {todo.deadline.toDateString()}</Text>
      <Text style={styles.details}>Priority: {todo.priority}</Text>
      <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    borderRadius: 5, // Added for visual appeal
  },
  text: {
    fontSize: 20,
    fontFamily: 'The Constellation'
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5, // Added for visual appeal
  },
  deleteButtonText: {
    color: '#fff',
    fontFamily: 'antique_book_cover'
  },
  details: {
    fontSize: 14,
    color: '#666', 
    marginTop: 4, // Adds a little space above the details text
  },
  completedText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#ff0000', // Example color, adjust as needed
  },
});

export default TodoItem;
