import React from "react";
import { Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LogoutButton() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("role");
          navigation.replace("Login"); // quay về login
        },
      },
    ]);
  };

  return <Button title="🚪 Đăng xuất" color="#e74c3c" onPress={handleLogout} />;
}
