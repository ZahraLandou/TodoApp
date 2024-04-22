import React from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import TodoItem from '../components/TodoItem';
import { useTodos } from '../components/TodosContext'; 

const HomeScreen: React.FC = () => {
  const { todos, deleteTodo, toggleComplete } = useTodos();
  return (
    <ImageBackground 
    source={require('../assets/backgrounds/leaves.jpeg')} 
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
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        width: 'auto'
        //backgroundColor: '#f0f0f0', // Light grey background
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
