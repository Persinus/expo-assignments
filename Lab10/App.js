import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from './HomeStackNavigation'; // Import HomeScreen
import ProfileScreen from './Profile'; // Profile Screen
import WeatherForecastApp from './WeatherForecastApp'; // Weather App Screen
import OptionMenu from './OptionMenu'; // Option Menu

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'WeatherApp') {
              iconName = focused ? 'cloud' : 'cloud-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200EE', // Color for active tab
          tabBarInactiveTintColor: 'gray', // Color for inactive tab
          tabBarStyle: {
            backgroundColor: '#9900FF', // Background color for the bottom tab
            borderTopWidth: -2, // Removing the top border
            elevation: 5, // Adding shadow for iOS
            shadowColor: '#000', // Shadow color for Android
            shadowOffset: { width: 0, height: -11 }, // Shadow position
            shadowOpacity: 0.1, // Shadow opacity
            shadowRadius: 2, // Shadow blur radius
          },
          headerRight: () => <OptionMenu />,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="WeatherApp" component={WeatherForecastApp} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}