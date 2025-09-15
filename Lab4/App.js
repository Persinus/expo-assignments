import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import StyleSheetSpinner from './StyleSheetSpinner';
import StatusBarRefresh from './StatusBarRefresh';
import LoginScreen from './LoginScreen';
import ReservationApp from './ReservationApp';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Bài 1':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'Bài 2':
                iconName = focused ? 'refresh' : 'refresh-outline';
                break;
              case 'Bài 3':
                iconName = focused ? 'log-in' : 'log-in-outline';
                break;
              case 'Bài 4':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              default:
                iconName = 'help-circle-outline';
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={focused ? styles.iconFocused : styles.iconDefault}
              />
            );
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b0bec5',
          tabBarStyle: [styles.tabBarStyle, focusedTabBarStyle(route.name)],
          tabBarLabelStyle: styles.tabBarLabelStyle,
          headerStyle: styles.headerStyle,
          headerTintColor: '#ffffff',
          headerTitleStyle: styles.headerTitleStyle,
        })}
      >
        <Tab.Screen name="Bài 1" component={StyleSheetSpinner} options={{ title: 'Bài 1:Lọc Quả' }} />
        <Tab.Screen name="Bài 2" component={StatusBarRefresh} options={{ title: 'Bài 2: Làm Mới' }} />
        <Tab.Screen name="Bài 3" component={LoginScreen} options={{ title: 'Bài 3: Đăng Nhập' }} />
        <Tab.Screen name="Bài 4" component={ReservationApp} options={{ title: 'Bài 4: Đặt Lịch' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Tùy chỉnh thêm phong cách động cho từng tab
const focusedTabBarStyle = (routeName) => {
  switch (routeName) {
    case 'Bài 1':
      return { backgroundColor: '#4caf50' };
    case 'Bài 2':
      return { backgroundColor: '#2196f3' };
    case 'Bài 3':
      return { backgroundColor: '#ff5722' };
    case 'Bài 4':
      return { backgroundColor: '#673ab7' };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  // Phong cách chung cho tab bar
  tabBarStyle: {
    borderTopWidth: 2,
    height: 60,
    backgroundColor: '#263238',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  iconDefault: {
    transform: [{ scale: 0.9 }],
    transition: 'transform 0.3s ease',
  },
  iconFocused: {
    transform: [{ scale: 1.2 }],
  },
  // Header style
  headerStyle: {
    backgroundColor: '#455a64',
    height: 60,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 1.5,
    color: '#ffffff',
    textAlign: 'center',
  },
});
