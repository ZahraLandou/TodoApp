//MainScreen.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; 
 import AddTodoScreen from './AddTodoScreen';
 import { TodosContext } from '../components/TodosContext'; 
 import { Todo, Priority,RootTabParamList } from '../assets/types';

/*import ParametersScreen from './ParametersScreen'; */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import DummyScreen from './DummyScreen';
import CalendarScreen from './CalendarScreen';
import StatisticsScreen from './StatisticsScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

function MainScreen() {


  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string, deadline: Date, priority: Priority) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      deadline,
      priority,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

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
  return (
    <TodosContext.Provider value={{ todos, addTodo, deleteTodo, toggleComplete }}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName:string;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'AddTodo') {
              iconName = focused ? 'plus-circle' : 'plus-circle-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Statistics') {
              iconName = focused ? 'chart-bar' : 'chart-bar';
            }else{
                iconName = 'alert'
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AddTodo" component={AddTodoScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Statistics" component={StatisticsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </TodosContext.Provider>

  );
}

export default MainScreen;
