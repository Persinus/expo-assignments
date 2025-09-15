import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import TodoScreen from './TodoScreen';
import useAppointmentLogic from './AppointmentLogic';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailSrceen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Clock from './Clock';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Lesson3Stack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Trang Chủ" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
);

const AlarmStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Báo Thức" component={Clock} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppointmentScreen = () => {
  const {
    appointments,
    date,
    isDatePickerVisible,
    handleConfirm,
    showDatePicker,
    appointmentText,
    setAppointmentText,
    editAppointment,
    deleteAppointment,
    setIsDatePickerVisible,
  } = useAppointmentLogic();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch Hẹn</Text>
      <TextInput
        style={styles.input}
        value={appointmentText}
        onChangeText={setAppointmentText}
        placeholder="Nhập nội dung lịch hẹn"
      />
      <Button title="Chọn Ngày/ Giờ" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setIsDatePickerVisible(false)}
      />
      <Text style={styles.dateText}>Ngày/ Giờ đã chọn: {date.toLocaleString()}</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Animated.View style={[styles.appointmentItem, { opacity: fadeAnim }]}> 
            <Text>{item.date.toLocaleString()} - {item.text}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Sửa" onPress={() => editAppointment(item)} />
              <Button title="Xóa" onPress={() => deleteAppointment(item.id)} />
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconStyle = focused ? styles.iconFocused : styles.iconDefault;

            switch (route.name) {
              case 'Todo':
                iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
                break;
              case 'Lịch Hẹn':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Ứng dụng Activity và Intent':
                iconName = focused ? 'log-in' : 'log-in-outline';
                break;
              case 'Bài Tập Nâng CaoCao':
                iconName = focused ? 'alarm' : 'alarm-outline';
                break;
              default:
                iconName = 'help-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} style={iconStyle} />;
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b0bec5',
          tabBarStyle: [
            styles.tabBarStyle,
            {
              backgroundColor: getTabBarBackgroundColor(route.name), // Tùy chỉnh màu nền
              borderTopColor: getTabBarBorderColor(route.name), // Tùy chỉnh viền
            },
          ],
          tabBarLabelStyle: styles.tabBarLabelStyle,
        })}
      >
        <Tab.Screen name="Todo" component={TodoScreen} options={{ title: 'Todo List' }} />
        <Tab.Screen name="Lịch Hẹn" component={AppointmentScreen} options={{ title: 'Lịch Hẹn' }} />
        <Tab.Screen name="Ứng dụng Activity và Intent" component={Lesson3Stack} options={{ title: 'Ứng dụng Activity và Intent' }} />
        <Tab.Screen name="Báo Thức" component={AlarmStack} options={{ title: 'Báo Thức' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Hàm để lấy màu nền tabBar dựa trên tên tab
function getTabBarBackgroundColor(tabName) {
  switch (tabName) {
    case 'Todo':
      return '#37474f'; // Màu xám đậm
    case 'Lịch Hẹn':
      return '#3e2723'; // Màu nâu đậm
    case 'Ứng dụng Activity và Intent':
      return '#004d40'; // Màu xanh lá cây đậm
    case 'Báo Thức':
      return '#1a237e'; // Màu xanh dương đậm
    default:
      return '#263238'; // Màu xám mặc định
  }
}

// Hàm để lấy màu viền tabBar dựa trên tên tab
function getTabBarBorderColor(tabName) {
  switch (tabName) {
    case 'Todo':
      return '#ffab00'; // Màu vàng
    case 'Lịch Hẹn':
      return '#d50000'; // Màu đỏ
    case 'Ứng dụng Activity và Intent':
      return '#00c853'; // Màu xanh lá
    case 'Báo Thức':
      return '#2962ff'; // Màu xanh biển
    default:
      return '#607d8b'; // Màu xám
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Nền tối
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: '#1E1E1E',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#81C784',
    textAlign: 'center',
    marginVertical: 15,
  },
  appointmentItem: {
    backgroundColor: '#2E2E2E',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Căn giữa các nút
    alignItems: 'center',
    gap: 100, // Khoảng cách giữa các nút (React Native 0.71+)
    marginTop: 15,
    padding: 10,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tabBarStyle: {
    backgroundColor: '#1F1F1F', // Màu nền tối hơn cho TabBar
    borderTopWidth: 0, // Xóa viền trên
    height: 60, // Tăng chiều cao TabBar
    paddingBottom: 8,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
  },
  iconFocused: {
    color: '#4CAF50',
  },
  iconDefault: {
    color: '#B0BEC5',
  },
});
