import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import AdminScreen from "./Screens/AdminScreen";
import UserScreen from "./Screens/UserScreen";

const Stack = createStackNavigator();

export default function Bai3Stack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
}