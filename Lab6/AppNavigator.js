import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodList from './FoodList';

const Drawer = createDrawerNavigator();

// Màn hình đăng nhập
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
  
    setTimeout(async () => {
      if (email === 'user@example.com' && password === 'password') {
        // Tạo token giả lập ngẫu nhiên
        const token = `jwt_${Math.random().toString(36).substring(2)}_${Date.now()}`;
  
        try {
          // Lấy danh sách token cũ (nếu có)
          const storedTokens = JSON.parse(await AsyncStorage.getItem('@jwt_tokens')) || [];
  
          // Thêm token mới vào danh sách
          const updatedTokens = [...storedTokens, { email, token, timestamp: new Date().toLocaleString() }];
          await AsyncStorage.setItem('@jwt_tokens', JSON.stringify(updatedTokens));
  
          // Lưu lịch sử đăng nhập
          const loginHistory = JSON.parse(await AsyncStorage.getItem('@login_history')) || [];
          const newEntry = { email, timestamp: new Date().toLocaleString(), token };
          await AsyncStorage.setItem('@login_history', JSON.stringify([...loginHistory, newEntry]));
  
          Alert.alert('Login successful!', `Token: ${token}`);
          setIsLoggingIn(false);
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } catch (error) {
          console.error('Failed to save token:', error);
          Alert.alert('Error', 'Failed to save login token.');
          setIsLoggingIn(false);
        }
      } else {
        Alert.alert('Login failed', 'Invalid email or password');
        setIsLoggingIn(false);
      }
    }, 2000);
  };
  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {isLoggingIn ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Hiển thị loading khi đang đăng nhập
      ) : (
        <Button title="Login" onPress={handleLogin} /> // Nút đăng nhập
      )}
    </View>
  );
};

// Màn hình chính
const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null); // Trạng thái cho token

 
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedTokens = JSON.parse(await AsyncStorage.getItem('@jwt_tokens')) || [];
        if (storedTokens.length > 0) {
          setToken(storedTokens[storedTokens.length - 1].token); // Lấy token mới nhất
        } else {
          setToken(null);
        }
      } catch (error) {
        console.error('Failed to fetch token:', error);
      }
    };
  
    fetchToken();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@jwt_token');
      Alert.alert('Logout successful!', 'You have logged out!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.title}>Home Screen</Text>
      
      {token ? (
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText}>JWT Token: {token}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No token found. Please log in.</Text>
      )}
    </View>
  );
};

// Màn hình yêu thích
const FavoritesScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Favorites</Text>
    <FoodList /> {/* Hiển thị danh sách món ăn */}
  </View>
);


const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = JSON.parse(await AsyncStorage.getItem('@login_history')) || [];
        const storedTokens = JSON.parse(await AsyncStorage.getItem('@jwt_tokens')) || [];
  
        console.log('Fetched History:', storedHistory);
        console.log('Fetched Tokens:', storedTokens);
  
        // Đảm bảo số lượng token và lịch sử đăng nhập khớp nhau
        const updatedHistory = storedHistory.map((entry) => {
          const matchedToken = storedTokens.find(t => t.email === entry.email && t.timestamp === entry.timestamp);
          return { ...entry, token: matchedToken?.token || 'No token found' };
        });
  
        setHistory(updatedHistory.reverse());
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };
  
    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>Email: {item.email}</Text>
            <Text>Timestamp: {item.timestamp}</Text>
            <Text>Token: {item.token}</Text> {/* Hiển thị token */}
          </View>
        )}
      />
    </View>
  );
};
// Màn hình đăng xuất
const LogoutScreen = ({ navigation }) => {
  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    alert('You have logged out.'); // Thông báo đăng xuất
    // Đặt lại điều hướng để quay lại màn hình Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Logout Screen</Text>
      {/* Nút xác nhận đăng xuất */}
      <Button title="Confirm Logout" onPress={handleLogout} />
    </View>
  );
};

// Tùy chọn biểu tượng cho Drawer
const screenOptions = (iconName) => ({
  drawerIcon: ({ color }) => <Icon name={iconName} size={22} color={color} />, // Hiển thị biểu tượng
});

// Main App Navigator
const AppNavigator = () => {
  const screenOptions = (iconName) => ({
    drawerIcon: ({ color }) => <Icon name={iconName} size={22} color={color} />,
  });

  return (
    <Drawer.Navigator
      initialRouteName="Login"
      screenOptions={{
        drawerStyle: { backgroundColor: '#282c34' },
        drawerActiveTintColor: '#61dafb',
        drawerInactiveTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#282c34' },
        headerTintColor: '#ffffff',
      }}
    >
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={screenOptions('log-in')}
      />
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={screenOptions('home-outline')}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={screenOptions('heart-outline')}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={screenOptions('time-outline')}
      />
    </Drawer.Navigator>
  );
};


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFEBFC',
    padding: 20,
  },
  
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4CAF50', // Màu xanh pastel làm điểm nhấn
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 48,
    borderColor: '#4CAF50', 
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    fontSize: 16,
  },
  historyItem: {
    backgroundColor: '#EFEFEF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  logoutButton: {
    marginTop: 20,
    padding: 14,
    
    backgroundColor: '#FF5733', // Màu cam đỏ nổi bật
    borderRadius: 10,
    alignItems: 'center',
  
    elevation: 5, // Hiệu ứng bóng mượt
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  drawerStyle: {
    backgroundColor: '#FFFFFF', // Nền trắng tinh tế
    width: 260,
  },
  drawerItem: {
    color: '#333333',
    fontSize: 18,
  },
  drawerActiveItem: {
    color: '#4CAF50', // Xanh pastel khi được chọn
    fontSize: 20,
    fontWeight: 'bold',
  },
});

  export default AppNavigator;