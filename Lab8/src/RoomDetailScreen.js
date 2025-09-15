import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { FontAwesome5 } from "@expo/vector-icons"; // Import icon library

const RoomDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { room, paymentSuccess } = route.params;
  const [isBooked, setIsBooked] = useState(false);
  const [bookingTime, setBookingTime] = useState(null);
  const socket = io("http://192.168.1.5:3000");

  // Function to format date from yyyy-mm-dd to dd-mm-yyyy
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        const bookedRooms = await AsyncStorage.getItem("bookedRooms");
        if (bookedRooms) {
          const parsedRooms = JSON.parse(bookedRooms);
          const bookedRoom = parsedRooms.find((bookedRoom) => bookedRoom.name === room.name);
          if (bookedRoom) {
            setIsBooked(true);
            setBookingTime(bookedRoom.time);
          }
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái đặt phòng:", error);
      }
    };

    if (paymentSuccess) {
      handlePaymentSuccess();
    }

    checkBookingStatus();
  }, [room.name, paymentSuccess]);

  const handleBooking = async () => {
    if (isBooked) {
      Alert.alert(
        "Xác nhận hủy phòng",
        "Bạn có chắc chắn muốn hủy phòng này? Chúng tôi sẽ hoàn tiền cho bạn.",
        [
          { text: "Không", style: "cancel" },
          {
            text: "Có",
            onPress: async () => {
              try {
                const bookedRooms = await AsyncStorage.getItem("bookedRooms");
                let currentBookings = bookedRooms ? JSON.parse(bookedRooms) : [];
                currentBookings = currentBookings.filter((bookedRoom) => bookedRoom.name !== room.name);
                await AsyncStorage.setItem("bookedRooms", JSON.stringify(currentBookings));
                setIsBooked(false);
                setBookingTime(null);
                socket.emit("roomCancelled", { roomName: room.name });
                Alert.alert("Hủy phòng thành công", `Bạn đã hủy phòng ${room.name} vào lúc ${new Date().toLocaleString()}.`, [{ text: "OK" }]);
              } catch (error) {
                console.error("Lỗi khi hủy phòng:", error);
                Alert.alert("Lỗi", "Có lỗi xảy ra khi hủy phòng.");
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate("Payment", { room, onPaymentSuccess: handlePaymentSuccess });
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const bookedRooms = await AsyncStorage.getItem("bookedRooms");
      let currentBookings = bookedRooms ? JSON.parse(bookedRooms) : [];
      const currentTime = new Date().toLocaleString();

      const roomWithTime = { ...room, time: currentTime };

      currentBookings.push(roomWithTime);
      await AsyncStorage.setItem("bookedRooms", JSON.stringify(currentBookings));
      console.log("Updated bookings:", currentBookings);

      setIsBooked(true);
      setBookingTime(currentTime);
      socket.emit("roomBooked", { roomName: room.name });

      Alert.alert("Đặt phòng thành công", `Bạn đã đặt phòng ${room.name} vào lúc ${currentTime}.`, [{ text: "OK" }]);
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đặt phòng.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: room.image }} style={styles.image} />
      <Text style={styles.roomName}>{room.name}</Text>
      <Text style={styles.descriptionText}>{room.description}</Text>
      
      {/* Show formatted date for available dates */}
      <View style={styles.infoRow}>
        <FontAwesome5 name="calendar-alt" size={20} color="#007bff" />
        <Text style={styles.infoText}>Ngày trống: {formatDate(room.availableDates)}</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5 name="clipboard-list" size={20} color="#007bff" />
        <Text style={styles.infoText}>Loại phòng: {room.type}</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5 name="star" size={20} color="#007bff" />
        <Text style={styles.infoText}>Đánh giá: {room.rating}/5</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5 name="location-arrow" size={20} color="#007bff" />
        <Text style={styles.infoText}>Địa điểm: {room.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <FontAwesome5 name="tag" size={20} color="#007bff" />
        <Text style={styles.infoText}>Giá: {room.price.toLocaleString()} VNĐ</Text>
      </View>

      {isBooked && bookingTime && (
        <Text style={styles.bookingTimeText}>Bạn đã đặt phòng này lúc: {bookingTime}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, isBooked ? styles.cancelButton : styles.bookButton]}
        onPress={handleBooking}
      >
        <Text style={styles.buttonText}>{isBooked ? "Hủy phòng" : "Đặt phòng"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
    container: { 
      flexGrow: 1, 
      padding: 20, 
      backgroundColor: '#e9f5fc',
      alignItems: 'center', // Center all content
    },
    image: { 
      width: "100%", 
      height: 250, 
      borderRadius: 10, 
      marginBottom: 20,
      borderColor: "#ddd", 
      borderWidth: 1, 
    },
    roomName: { 
      fontSize: 28, 
      fontWeight: "bold", 
      marginBottom: 10, 
      color: "#333",
      textAlign: "center", // Center room name
    },
    infoRow: { 
      flexDirection: "row", 
      alignItems: "center", 
      marginBottom: 15, 
      backgroundColor: "#fff", 
      padding: 15, 
      borderRadius: 8, 
      width: '100%', 
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2, // Add shadow for iOS and Android
    },
    infoText: { 
      fontSize: 16, 
      color: "#555", 
      marginLeft: 10, 
      flex: 1, // Allow text to take up available space
    },
    button: { 
      padding: 15, 
      borderRadius: 8, 
      alignItems: "center", 
      marginTop: 20, 
      width: "100%",
      backgroundColor: "#007bff", // Default to book button
    },
    bookButton: { 
      backgroundColor: "#007bff" 
    },
    cancelButton: { 
      backgroundColor: "#dc3545" 
    },
    buttonText: { 
      color: "white", 
      fontSize: 18, 
      fontWeight: "600" 
    },
    bookingTimeText: { 
      fontSize: 18, 
      fontWeight: "600", // Đậm hơn để nổi bật
      marginBottom: 20, 
      color: "#ff6347", // Màu sắc nổi bật, ví dụ như màu đỏ tươi
      fontStyle: "italic",
      textAlign: "center", // Căn giữa để nó nổi bật ở giữa màn hình
      paddingVertical: 10, // Thêm khoảng cách phía trên và dưới
      backgroundColor: "#98FB98", // Màu nền nhẹ nhàng để làm nổi bật
      borderRadius: 8, // Góc bo tròn để tạo sự mềm mại
      width: "100%", 
      textTransform: "capitalize", // Viết hoa từ đầu mỗi chữ
    },
    priceText: { 
      fontSize: 18, 
      fontWeight: "600", 
      color: "#28a745",
      marginBottom: 20,
    },
    cardContainer: {
      width: "100%", 
      padding: 10, 
      borderRadius: 10, 
      backgroundColor: "#fff", 
      marginBottom: 15,
      shadowColor: "#000", 
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1, 
      shadowRadius: 6,
      elevation: 3,
    },
    headerText: {
      fontSize: 24, 
      fontWeight: "bold", 
      marginBottom: 15,
      color: "#333",
    },
    cardTitle: {
      fontSize: 18, 
      fontWeight: "500", 
      color: "#555",
    },
    cardSubtitle: {
      fontSize: 14, 
      color: "#888", 
      marginBottom: 10, 
      fontStyle: "italic",
    },descriptionText: {
      fontSize: 16,
      color: "#455a64", // Màu chữ phụ xám đậm
      lineHeight: 22,
      textAlign: "justify",
      backgroundColor: "#ffffff",
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#90caf9",
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    
     
});

export default RoomDetailScreen;