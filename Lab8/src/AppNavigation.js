import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";
import RoomDetailScreen from "./RoomDetailScreen";
import HomeScreen from "./HomeScreen"
import PaymentScreen from "./Payment";
const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
     <Stack.Screen name="Register" component={RegisterScreen} />
   
     
    <Stack.Screen name="Login" component={LoginScreen} />
   
    <Stack.Screen name="Home" component={HomeScreen} options={false} />
    <Stack.Screen name="RoomDetail" component={RoomDetailScreen}  />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
