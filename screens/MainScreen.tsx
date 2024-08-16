//MainScreen.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import AddTodoScreen from './AddTodoScreen';
import { TodosContext } from '../components/TodosContext';
import { Todo, Priority, RootTabParamList } from '../assets/types';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faPlusCircle, faCalendar, faChartBar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
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
              let icon;

              if (route.name === 'Home') {
                icon = faHome;
              } else if (route.name === 'Add') {
                icon = faPlusCircle;
              } else if (route.name === 'Calendar') {
                icon = faCalendar;
              } else if (route.name === 'Statistics') {
                icon = faChartBar;
              } else {
                icon = faQuestionCircle;  // Fallback icon in case the route name doesn't match
              }
              return <FontAwesomeIcon icon={icon} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Add" component={AddTodoScreen} options={{ title: 'New Task' }} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Statistics" component={StatisticsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TodosContext.Provider>

  );
}

export default MainScreen;
