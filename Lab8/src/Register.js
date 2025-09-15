import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!username || !password) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      // Kiểm tra xem người dùng đã tồn tại chưa
      const existingUser = await AsyncStorage.getItem(username);
      if (existingUser) {
        Alert.alert("Lỗi", "Tên đăng nhập đã tồn tại!");
        return;
      }

      // Lưu thông tin người dùng vào AsyncStorage
      const userData = { username, password };
      await AsyncStorage.setItem(username, JSON.stringify(userData));

      Alert.alert("Thành công", "Đăng ký thành công!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Lỗi đăng ký: ", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
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
      <Button title="Đăng Ký" onPress={handleRegister} />
      <Text style={styles.switchText}>
        Đã có tài khoản?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Đăng Nhập
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#e9f5fc", // Màu nền xanh nhạt
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2b2b2b", // Màu chữ tối giúp dễ đọc hơn
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Bóng đổ nhẹ cho input
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchText: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
