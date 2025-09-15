// stacks/Bai1Stack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PlayerScreen from './PlayerScreen';

const Stack = createStackNavigator();

export default function Bai1Stack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}  />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
}