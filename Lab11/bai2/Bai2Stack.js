import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen"; // Home Screen for Bài 2
import GuessImageGame from "./GuessImage"; // Player Screen for GuessImageGame

const Stack = createStackNavigator();

export default function Bai2Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bai2Home"
        component={HomeScreen}
        options={{ title: "Bài 2: Home", headerShown: true }}
      />
       <Stack.Screen name="GuessImageGame" component={GuessImageGame}  
        options={{ headerShown: false }}
       />
    </Stack.Navigator>
  );
}