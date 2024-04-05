import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Todo, Priority } from '../assets/types';



interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
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

  return (
    <Animated.View style={{ ...styles.todoItem, opacity: fadeAnim }}>
      <Text style={styles.text}>{todo.text}</Text>
      <Text style={styles.details}>Deadline: {todo.deadline}</Text>
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
    fontSize: 16,
    fontFamily: 'antique_book_cover'
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
    color: '#666', // Example style, adjust as needed
    marginTop: 4, // Adds a little space above the details text
  },
});

export default TodoItem;
