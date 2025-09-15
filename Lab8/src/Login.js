import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      // Kiểm tra xem tài khoản có tồn tại không
      const storedUser = await AsyncStorage.getItem(username);
      if (!storedUser) {
        Alert.alert("Lỗi", "Tài khoản không tồn tại!");
        return;
      }

      const userData = JSON.parse(storedUser);
      if (userData.password !== password) {
        Alert.alert("Lỗi", "Mật khẩu không chính xác!");
        return;
      }

      // Lưu trạng thái đăng nhập
      await AsyncStorage.setItem("loggedInUser", username);

      Alert.alert("Thành công", "Đăng nhập thành công!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Lỗi đăng nhập: ", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
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
      <Button title="Đăng Nhập" onPress={handleLogin} />
      <Text style={styles.switchText}>
        Chưa có tài khoản?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
          Đăng Ký
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
    backgroundColor: "#e9f5fc", // Cập nhật màu nền xanh nhạt
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2b2b2b", // Màu chữ tối để dễ đọc hơn trên nền xanh nhạt
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff", // Giữ màu trắng để input nổi bật
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Hiệu ứng bóng cho input
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

export default LoginScreen;
