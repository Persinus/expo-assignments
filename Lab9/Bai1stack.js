import React from 'react'; // Nhập React
import { createStackNavigator } from '@react-navigation/stack'; // Nhập Stack Navigator
import HomeScreen from './Animation'; // Import HomeScreen từ file logic.js
import { View, Text, StyleSheet } from 'react-native'; // Nhập các thành phần từ React Native
import { Provider as PaperProvider } from 'react-native-paper'; // Nhập provider cho react-native-paper

// Tạo stack navigator
const Stack = createStackNavigator();

// Định nghĩa component cho màn hình Screen2
const Screen2 = ({ route }) => {
  const { param1, param2 } = route.params; // Lấy tham số từ route

  return (
    <View style={styles.container2}>
      <Text style={styles.header}>Thông Tin Tham Số</Text>
      <Text style={styles.text}>Parameter 1: {param1}</Text>
      <Text style={styles.text}>Parameter 2: {param2}</Text>
    </View>
  );
};

// Định nghĩa component chính của ứng dụng
export default function Bai1Stack() {
  return (
    <PaperProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Animation Demo' }} />
        <Stack.Screen name="Screen2" component={Screen2} options={{ title: 'Route Parameters' }} />
      </Stack.Navigator>
    </PaperProvider>
  );
}

// Định nghĩa các style cho Screen 2
const styles = StyleSheet.create({
  container2: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
    backgroundColor: '#E6F7E6', // Màu nền nhẹ nhàng
    padding: 20, // Thêm khoảng cách bên trong
  },
  header: {
    fontSize: 24, // Kích thước chữ tiêu đề lớn hơn
    fontWeight: 'bold', // Đậm chữ
    color: '#2C3E50', // Màu chữ tối
    marginBottom: 20, // Khoảng cách giữa tiêu đề và nội dung
  },
  text: {
    fontSize: 20, // Kích thước chữ
    fontWeight: 'bold', // Đậm chữ
    color: '#424242', // Màu chữ
    marginVertical: 10, // Khoảng cách giữa các chữ
    textAlign: 'center', // Căn giữa chữ
    padding: 10, // Thêm khoảng cách bên trong
    borderWidth: 1, // Viền cho mỗi tham số
    borderColor: '#3498DB', // Màu viền
    borderRadius: 10, // Bo tròn viền
    backgroundColor: '#FFF3E0', // Màu nền cho thanh thông tin
  },
});