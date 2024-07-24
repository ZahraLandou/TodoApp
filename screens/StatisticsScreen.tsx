// StatisticsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTodos } from '../components/TodosContext';

const StatisticsScreen: React.FC = () => {
  const { todos } = useTodos();

  // Calculate statistics
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = todos.filter(todo => todo.priority === 'High').length;
  const mediumPriorityTasks = todos.filter(todo => todo.priority === 'Medium').length;
  const lowPriorityTasks = todos.filter(todo => todo.priority === 'Low').length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Statistics</Text>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Total Tasks:</Text>
        <Text style={styles.statValue}>{totalTasks}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Completed Tasks:</Text>
        <Text style={styles.statValue}>{completedTasks}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Pending Tasks:</Text>
        <Text style={styles.statValue}>{pendingTasks}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>High Priority Tasks:</Text>
        <Text style={styles.statValue}>{highPriorityTasks}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Medium Priority Tasks:</Text>
        <Text style={styles.statValue}>{mediumPriorityTasks}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Low Priority Tasks:</Text>
        <Text style={styles.statValue}>{lowPriorityTasks}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statLabel: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StatisticsScreen;
