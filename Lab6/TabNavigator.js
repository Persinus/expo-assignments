import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import FavoritesScreen from './FavoritesScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

// Stack Navigator cho màn hình danh sách + chi tiết phim
const HomeStack = () => (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { height: 40 }, // Giảm chiều cao header
      headerTitleStyle: { fontSize: 18 }, // Giảm kích thước chữ tiêu đề
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Danh sách phim' }} />
    <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Chi tiết phim' }} />
  </Stack.Navigator>
);

// Tab Navigator ở trên cùng màn hình
const TabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00796B', // Màu xanh ngọc đậm khi chọn
        tabBarInactiveTintColor: '#757575', // Màu xám khi chưa chọn
        tabBarIndicatorStyle: { backgroundColor: '#00BCD4', height: 3 }, // Thanh cyan sáng
        tabBarStyle: { backgroundColor: '#FFFFFF', elevation: 4 }, // Nền trắng, có đổ bóng nhẹ
      }}
    >
      <TopTab.Screen name="Danh sách" component={HomeStack} />
      <TopTab.Screen name="Yêu thích" component={FavoritesScreen} />
    </TopTab.Navigator>
  );
};
const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: '#FFE0B2',
      height: 55, // Giảm chiều cao xuống
      paddingBottom: 5, // Điều chỉnh khoảng cách dưới
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
  });
export default TabNavigator;

  