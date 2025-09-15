import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const colors = {
  primary: '#0000FF', // Màu trắng cho nút
  secondary: '#00FF00', // Xám nhạt cho nút phụ
  background: '#9FD7F9', // 🔵 Màu xanh lam nền
  text: '#ffffff', // Trắng cho chữ
  border: '#6633FF', // Màu viền input
 
};

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.10:5000/api/register', {
        username,
        password,
      });
      Alert.alert('Đăng ký thành công', 'Bạn có thể đăng nhập ngay bây giờ.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Đăng ký thất bại', error.response?.data?.error || 'Tên người dùng đã tồn tại hoặc dữ liệu không hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Đăng ký</Title>
          <Paragraph style={styles.paragraph}>Tạo tài khoản mới</Paragraph>
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button title="Đăng ký" onPress={handleRegister} color={colors.primary} />
            <Button title="Đăng nhập" onPress={() => navigation.navigate('Login')} color={colors.secondary} />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: 20,
    alignItems: "center",
  
  },
  card: {
    width: "90%",
    maxWidth: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 4,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  paragraph: {
    textAlign: "center",
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default RegisterScreen;