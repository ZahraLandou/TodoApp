import React from 'react';
import { View, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import TodoItem from '../components/TodoItem';
import { useTodos } from '../components/TodosContext';
import { useNavigation } from '@react-navigation/native';
import { Todo, Priority, RootTabParamList } from '../assets/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';  // Import the specific icon

const HomeScreen: React.FC = () => {
  const { todos, deleteTodo, toggleComplete } = useTodos();
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  const handleAddTodo = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    navigation.navigate('Add', { selectedDate: currentDate });
  };

  return (
    <ImageBackground
      source={require('../assets/backgrounds/cat_busy.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <TodoItem todo={item} onDelete={deleteTodo} onToggleComplete={toggleComplete} />
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddTodo}
        >
          <FontAwesomeIcon icon={faPlus} size={24} color="#9462BF" />  
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#FDEEF1',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    flex: 1,
    width: 'auto'
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark grey text color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
});


export default HomeScreen;
