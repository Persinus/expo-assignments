import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'; // Danh sách phim
import TabNavigator from './TabNavigator';
 // Màn hình yêu thích
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Bài cơ bản') {
              iconName = 'book-outline'; // 📖 Bài cơ bản
            } else if (route.name === 'Bài Nâng cao') {
              iconName = 'bar-chart-outline'; // 🚀 Bài nâng cao
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1976D2', // Màu xanh dương khi chọn
          tabBarInactiveTintColor: 'gray', // Màu xám khi chưa chọn
          tabBarStyle: styles.tabBar, // Áp dụng CSS cho thanh tab
        })}
      >
        <Tab.Screen name="Bài cơ bản" component={AppNavigator} />
        <Tab.Screen name="Bài Nâng cao" component={TabNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0099FF', // Nền trắng

    height: 50, // Tăng chiều cao để dễ bấm hơn
    paddingBottom: 10, // Căn chỉnh icon
    shadowColor: '#000', // Đổ bóng nhẹ
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Bóng trên Android
  },
});

export default App;
// Đoạn mã trên sẽ tạo ra một ứng dụng React Native với thanh tab dưới cùng. Khi chọn một tab, màu của icon sẽ thay đổi. Bạn có thể thay đổi màu sắc, icon, và CSS cho thanh tab theo ý muốn.