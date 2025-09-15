import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native"; // Import StyleSheet

import store from "./Store"; 
import TasksScreen from "./TaskScreen";
import ContactStack from "./ContackStack";
import ChatApp from "./ChatApp";
import AppNavigator from "./src/AppNavigation";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Tasks") {
                iconName = "tasks";
              } else if (route.name === "Contacts") {
                iconName = focused ? "address-book" : "address-book-o";
              } else if (route.name === "ChatApp") {
                iconName = "comments";
              } else if (route.name === "Booking") {
                iconName = "hotel";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#007bff",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
          })}
        >
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Contacts" component={ContactStack} />
          <Tab.Screen name="ChatApp" component={ChatApp} />
          <Tab.Screen name="Booking" component={AppNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ed585a", // Màu nền tab bar theo yêu cầu
    borderTopWidth: 2,
    borderTopColor: "#007bff", // Viền xanh nổi bật
    height: 60, // Tăng chiều cao cho dễ bấm
    paddingBottom: 5, // Giúp icon không sát mép dưới
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default App;