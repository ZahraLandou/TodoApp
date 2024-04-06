import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; // Adjust the import paths accordingly
/* import AddTodoScreen from './AddTodoScreen';
import CalendarScreen from './CalendarScreen';
import ParametersScreen from './ParametersScreen'; */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Choose your icon pack
//import { MaterialCommunityIcons } from 'react-MaterialCommunityIcons-vector-icons';
const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
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
            } else if (route.name === 'Parameters') {
              iconName = focused ? 'cog' : 'cog-outline';
            }else{
                iconName = 'alert'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="AddTodo" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={HomeScreen} />
        <Tab.Screen name="Parameters" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainScreen;
