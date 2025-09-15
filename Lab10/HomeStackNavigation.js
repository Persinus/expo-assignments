// HomeStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={HomeScreen} options={{ title: "Lịch tháng 4" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Chi tiết ngày" }} />
    </Stack.Navigator>
  );
}
