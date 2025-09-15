import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colors = {
  primary: "#0000FF", // Màu trắng cho nút
  secondary: "#00FF00", // Xám nhạt cho nút phụ
  background: "#9FD7F9", // 🔵 Màu xanh lam nền
  text: "#ffffff", // Trắng cho chữ
  border: "#6633FF", // Màu viền input
};

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    console.log("Button Pressed");
    try {
      const response = await axios.post("http://192.168.1.10:5000/api/login", {
        username,
        password,
      });

      console.log("Server Response:", response.data);

      const token = response.data.token || response.data.accessToken;
      if (!token) {
        throw new Error("Token không tồn tại trong phản hồi từ server");
      }

      await AsyncStorage.setItem("token", token);

      Alert.alert("Đăng nhập thành công");

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert(
        "Đăng nhập thất bại",
        error.response?.data?.error ||
          "Tên người dùng hoặc mật khẩu không hợp lệ"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Đăng nhập</Title>
          <Paragraph style={styles.paragraph}>
            Vui lòng nhập thông tin đăng nhập
          </Paragraph>
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
            <Button
              title="Đăng nhập"
              onPress={handleLogin}
              color={colors.primary}
            />
          <Button
  title="Đăng ký"
  onPress={() => navigation.navigate("Register")}
  color={colors.secondary}
/>

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

export default LoginScreen;
