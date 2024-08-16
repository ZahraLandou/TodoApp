import React, { useRef, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Todo, Priority } from '../assets/types';

import Checkbox from '@react-native-community/checkbox'; // checkbox component 
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon set

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
};
const priorityLabel = {
  'High': 'H',
  'Medium': 'M',
  'Low': 'L',
};

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}


const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggleComplete }) => {
  // Create an animated value starting at 0
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
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
    <Animated.View style={[styles.todoItem, {opacity: fadeAnim }]}>
      <Checkbox
        value={todo.completed}
        onValueChange={(newValue) => onToggleComplete(todo.id)}
      />
      <View style={styles.todoContent}>
      <Text style={[styles.text, todo.completed && styles.completed]}>{todo.text}</Text>
      <View style={styles.metadata}>
          <Text style={styles.deadline}>{formatDate(todo.deadline)}</Text>
          <Text style={styles.priority}>{priorityLabel[todo.priority]}</Text>
        </View>
        </View>
      <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
        <Icon name="trash-o" size={24} color="#6e6e6e" />       
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bcbcf2',//#8a2be2',#cddfdf nice color
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10, // Added for visual appeal
    borderWidth: 1,
    borderColor: '#E3FBE3',
    shadowColor: '#fff', // White glow effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  todoContent: {
    flex: 1,
  },
  text: {
    fontSize: 17,
    color: '#333',
  },
  deleteButton: {
    padding: 8
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  deadline: {
    fontSize: 12,
    color: '#555',
  },
  priority: {
    fontSize: 12,
    color: '#555',
  },
  completed: {
    textDecorationLine: 'line-through',
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
