import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert,ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg"; // Cài đặt thư viện này: npm install react-native-qrcode-svg

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { room } = route.params;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    // Giả lập thanh toán thành công
    setPaymentSuccess(true);
    Alert.alert("✅ Thanh toán thành công", "Bạn đã thanh toán thành công.", [
      {
        text: "OK",
        onPress: () => navigation.navigate("RoomDetail", { room, paymentSuccess: true }), // Truyền paymentSuccess khi thanh toán thành công
      },
    ]);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.header}>💳 Thanh toán phòng {room.name}</Text>

      {/* 🔹 Khung thông tin thanh toán giả lập */}
      <View style={styles.paymentInfo}>
        <Text style={styles.bankName}>🏦 MB Bank</Text>
        <Text style={styles.accountNumber}>STK: 123 456 789</Text>
        <Text style={styles.receiver}>Người nhận: Công Ty Du Lịch XYZ</Text>
        <Text style={styles.amount}>💰 Số tiền: {room.price.toLocaleString()} VNĐ</Text>
      </View>

      {/* 🔹 QR Code */}
      <View style={styles.qrCodeContainer}>
        <QRCode
          value={`Thanh toán thành công phòng ${room.name} - Số tiền: ${room.price.toLocaleString()} VNĐ`}
          size={200}
          backgroundColor="white"
          color="black"
        />
      </View>

      <Text style={styles.instruction}>📷 Quét mã QR để thanh toán</Text>

      {/* 🔹 Nút Xác nhận thanh toán */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>✅ Xác nhận thanh toán</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e3f2fd", // Nền xanh dương nhạt
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0d47a1", // Xanh dương đậm
    textAlign: "center",
  },
  paymentInfo: {
    width: "100%",
    backgroundColor: "#ffffff", // Nền trắng
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#90caf9", // Viền xanh nhạt
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Bóng trên Android
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0", // Xanh dương đậm
    textAlign: "center",
    marginBottom: 5,
  },
  accountNumber: {
    fontSize: 16,
    color: "#455a64", // Xám đậm
    textAlign: "center",
    marginBottom: 5,
  },
  receiver: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#455a64",
    textAlign: "center",
    marginBottom: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5722", // Đỏ cam
    textAlign: "center",
    marginTop: 10,
  },
  qrCodeContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#90caf9",
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    color: "#0d47a1", // Xanh dương đậm
    textAlign: "center",
  },
  payButton: {
    backgroundColor: "#1565c0", // Màu xanh MB Bank
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PaymentScreen;
