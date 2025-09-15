import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MusicProvider } from "./Context/MusicContext";
import Bai1Stack from "./Bai1Stack";
import Bai2Stack from "./bai2/Bai2Stack"; // Import Bai2Stack
import bai3stack from "./bai3/Bai3Stack"; // Import Bai3Stack
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MusicProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Bài 1") iconName = "library-music";
              if (route.name === "Bài 2") iconName = "image-search";
              if (route.name === "Bài 3") iconName = "admin-panel-settings";
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#3399FF",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#3399FF",
              height: 70,
              paddingBottom: 10,
              paddingTop: 5,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              position: "absolute",
              shadowColor: "#3399FF",
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 10,
            },
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: "600",
            },
          })}
        >
          <Tab.Screen name="Bài 1" component={Bai1Stack} />
          <Tab.Screen
            name="Bài 2"
            component={Bai2Stack} // Use Bai2Stack here
            options={{
              headerShown: true, // Enable header for stack screens
            }}
          />
          <Tab.Screen name="Bài 3" component={bai3stack} />
        </Tab.Navigator>
      </NavigationContainer>
    </MusicProvider>
  );
}
