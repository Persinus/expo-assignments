import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AnalogClock from 'react-native-clock-analog';
import Icon from 'react-native-vector-icons/Ionicons';
// Real-time Clock Component
const nowDate = () => {
  const d = new Date();
  let second = d.getSeconds();
  let minute = d.getMinutes();
  let hour = d.getHours();
  return { second, minute, hour };
};

const App = () => {
  const [state, setState] = useState({
    second: second,
    minute: minute,
    hour: hour,
  });

  // Cập nhật giờ mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      const { second, minute, hour } = nowDate();
      setState({ second, minute, hour });
    }, 1000);

    // Dọn dẹp bộ hẹn giờ khi component unmount
    return () => clearInterval(timer);
  }, []);

  const { second, minute, hour } = state;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/474x/8c/56/c4/8c56c483afc07fbbc8d1c937c53c26b1.jpg',
        }}
        style={styles.imageBackground}>
        {/* Đồng hồ analog */}
        <AnalogClock
          colorClock="#2196F3"
          colorNumber="#000000"
          colorCenter="#00BCD4"
          colorHour="#FF8F00"
          colorMinutes="#FFC400"
          hour={hour}
          minutes={minute}
          seconds={second}
          showSeconds
          size={200}  // Kích thước đồng hồ
        />
        {/* Hiển thị thời gian số dưới đồng hồ */}
        <Text style={styles.timeText}>
        {`${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`}

        </Text>
      </ImageBackground>
    </View>
  );
};

// Alarm Component
const AlarmScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [alarms, setAlarms] = useState([]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const alarmTime = new Date(date);
    setAlarms([...alarms, { 
      id: Date.now().toString(), 
      time: alarmTime.toLocaleTimeString(), 
      timestamp: alarmTime.getTime(), 
      enabled: true 
    }]);
    hideDatePicker();
  };

  const deleteAlarm = (id) => setAlarms(alarms.filter(alarm => alarm.id !== id));

  const toggleAlarm = (id) => {
    setAlarms(alarms.map(alarm => alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm));
  };

  const calculateRemainingTime = (timestamp) => {
    const now = Date.now();
    const difference = timestamp - now;
    if (difference <= 0) return "Đã qua thời gian";
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    return `${hours} giờ ${minutes} phút còn lại`;
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn Giờ Báo Thức" onPress={showDatePicker} color="#007BFF" />
      <DateTimePickerModal 
        isVisible={isDatePickerVisible} 
        mode="time" 
        onConfirm={handleConfirm} 
        onCancel={hideDatePicker} 
      />
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <View>
              <Text style={styles.alarmText}>{item.time}</Text>
              <Text style={styles.remainingTime}>{calculateRemainingTime(item.timestamp)}</Text>
            </View>
            <View style={styles.actionGroup}>
              <TouchableOpacity onPress={() => toggleAlarm(item.id)}>
                <Text style={[styles.toggleButton, { backgroundColor: item.enabled ? '#4CAF50' : '#FF4D4D' }]}> 
                  {item.enabled ? 'Tắt' : 'Bật'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAlarm(item.id)}>
                <Text style={styles.deleteButton}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Stopwatch Component
const StopwatchScreen = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <View style={styles.container}>
      <Text style={styles.clock}>{time} giây</Text>
      <View style={styles.container}>
  <View style={styles.buttonWrapper}>
  <Button title={running ? "Dừng" : "Bắt đầu"} onPress={() => setRunning(!running)} />
  
  </View>
  <View style={styles.buttonWrapper}>
    <Button
      title="Đặt lại"
      onPress={() => {
        setTime(0);
        setRunning(false);
      }}
      color="#FF5733" // Màu nền nút
    />
  </View>
</View>
    </View>
  );
};

// Countdown Timer Component
const CountdownTimerScreen = () => {
  const [inputTime, setInputTime] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && running) {
      setRunning(false);
    }
    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const startCountdown = () => {
    const time = parseInt(inputTime);
    if (!isNaN(time) && time > 0) {
      setTimeLeft(time);
      setRunning(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập thời gian (giây)"
        keyboardType="numeric"
        value={inputTime}
        onChangeText={setInputTime}
      />
      <Button title="Bắt đầu" onPress={startCountdown} />
      <Text style={styles.clock}>{timeLeft} giây</Text>
    </View>
  );
};

// Tab Navigator Setup
const Tab = createBottomTabNavigator();

export default function Clock() {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#282c34', // Background color
            borderTopWidth: 0, // Remove top border
            height: 60, // Height of the navigation bar
          },
          tabBarLabelStyle: {
            fontSize: 14, // Font size
            fontWeight: '600', // Font weight
            color: '#ffffff', // Font color
          },
          tabBarActiveTintColor: '#FF8C00', // Active tab color
          tabBarInactiveTintColor: '#B0B0B0', // Inactive tab color
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Đồng hồ') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Báo thức') {
              iconName = focused ? 'alarm' : 'alarm-outline';
            } else if (route.name === 'Bấm giờ') {
              iconName = focused ? 'stopwatch' : 'stopwatch-outline';
            } else if (route.name === 'Đếm ngược') {
              iconName = focused ? 'timer' : 'timer-outline';
            }
  
            return <Icon name={iconName} size={size || 24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Đồng hồ" component={App} />
        <Tab.Screen name="Báo thức" component={AlarmScreen} />
        <Tab.Screen name="Bấm giờ" component={StopwatchScreen} />
        <Tab.Screen name="Đếm ngược" component={CountdownTimerScreen} />
      </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  /* 🌟 STYLE CHUNG */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818', // Nền xám đậm, sang trọng
    padding: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFA500', // Màu cam nổi bật
    marginBottom: 20,
   
  },
  
  /* 🕰️ ĐỒNG HỒ CHÍNH */
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  timeText: {
    marginTop: 20, // Khoảng cách giữa đồng hồ và thời gian số
    fontSize: 24, // Kích thước chữ
    color: '#FFF', // Màu chữ trắng
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa chữ
  },
  /* 🔔 BÁO THỨC */
  alarmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#2A2A2A', // Màu nền trung tính
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
  alarmText: {
    fontSize: 22,
    fontWeight: 'bold',
    
    color: '#FFD700', // Màu vàng sáng,

  },
  deleteButton: {
    fontSize: 20,
    color: '#FF4D4D',
    marginLeft: 20,
  },
  toggleButton: {
    backgroundColor: '#4CAF50', // Màu xanh lá cho trạng thái "Bắt đầu"
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  /* ⏱️ BẤM GIỜ */
  clock: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00FF99', // Màu xanh neon
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    

  },
 
  buttonWrapper: {
    marginVertical: 10, // Khoảng cách giữa các nút
    borderRadius: 8, // Bo góc (nếu cần hiệu ứng góc mềm hơn)
    overflow: 'hidden', // Đảm bảo bo góc hiển thị
  },
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  /* ⏳ ĐẾM NGƯỢC */
  input: {
    height: 55,
    borderColor: '#FFA500',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 18,
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  /* 🎛️ NÚT CHUYỂN TAB */
  tabButton: {
    backgroundColor: '#333333', // Màu xám tối, không bị chói mắt
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#FFA500', // Màu cam để đồng bộ với tiêu đề
    fontSize: 20,
    fontWeight: 'bold',
  },
   button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: 150,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});



