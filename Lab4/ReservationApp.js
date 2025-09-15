import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Button,
  Keyboard,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";
import Autocomplete from "react-native-autocomplete-input";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReservationApp = () => {
  const [restaurant, setRestaurant] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const restaurants = [
    {
      name: "Nhà Hàng Sen Garden",
      image:
        "https://i.pinimg.com/474x/a5/a5/82/a5a582c2415d7788188c0b45936af384.jpg",
    },
    {
      name: "Nhà hàng Cây Dừa",
      image:
        "https://i.pinimg.com/474x/b9/90/1d/b9901d56a8dc3e6a14438a0c6aa2c9ad.jpg",
    },
    {
      name: "Nhà hàng Cọ Dầu",
      image:
        "https://i.pinimg.com/474x/26/7d/36/267d3631beb89fd8007142d80726e8d8.jpg",
    },
    {
      name: "Nhà hàng Du Long",
      image:
        "https://i.pinimg.com/474x/66/9e/6a/669e6a0223fcf0bce1881af020711501.jpg",
    },
    {
      name: "Nhà hàng Hầm Rượu Vũ Lê",
      image:
        "https://i.pinimg.com/474x/5c/6f/90/5c6f904ebda80d0ca0f83974937dd3ad.jpg",
    },
    {
      name: "Nhà Hàng Sông Quê",
      image:
        "https://i.pinimg.com/474x/59/15/07/5915073a1a4c242626a05512966e02dc.jpg",
    },
    {
      name: "Nhà Hàng Bông Lau",
      image:
        "https://i.pinimg.com/474x/66/9e/6a/669e6a0223fcf0bce1881af020711501.jpg",
    },
    {
      name: "Nhà hàng Kaiserin",
      image:
        "https://i.pinimg.com/474x/9a/2a/83/9a2a83a69638ffd50618549347685526.jpg",
    },
    {
      name: "Nhà hàng lẩu Gà tươi Ông Chọn",
      image:
        "https://i.pinimg.com/474x/91/2b/1b/912b1b765eafdfecd5f4b1f599375746.jpg",
    },
    {
      name: "Nhà Hàng Gió",
      image:
        "https://i.pinimg.com/474x/b5/9b/9f/b59b9f942787ccdfcd0a8b77bb89ef61.jpg",
    },
  ];

  const handleSearch = (text) => {
    setRestaurant(text);
    if (text) {
      const filteredData = restaurants.filter((item) =>
        item.name.toLowerCase().startsWith(text.toLowerCase()) // So sánh không phân biệt hoa thường và tìm kiếm theo bắt đầu
      );
      setFilteredRestaurants(filteredData); // Cập nhật filteredRestaurants khi có kết quả lọc
    } else {
      setFilteredRestaurants([]); // Nếu không có từ khóa nhập thì không lọc
    }
  };

  const handleReservation = () => {
    if (!restaurant || !numberOfPeople || !date) {
      Alert.alert("Xác nhận", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Xác nhận",
        `Đặt bàn thành công!\nNhà hàng: ${restaurant}\nSố người: ${numberOfPeople}\nThời gian: ${date.toLocaleString()}`
      );
    }, 2000);
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShowPicker(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Màn hình overlay khi đang loading */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Đang xử lý...</Text>
        </View>
      )}
      <FlatList
        ListHeaderComponent={
          <View style={styles.form}>
            <Autocomplete
              data={filteredRestaurants} // Hiển thị danh sách nhà hàng đã lọc
              value={restaurant}
              onChangeText={handleSearch} // Khi nhập sẽ gọi hàm handleSearch để lọc
              flatListProps={{
                keyExtractor: (_, index) => index.toString(),
                keyboardShouldPersistTaps: "handled",
                renderItem: ({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setRestaurant(item.name); // Chọn nhà hàng từ gợi ý
                      setFilteredRestaurants([]); // Xóa danh sách lọc khi đã chọn
                      Keyboard.dismiss();
                    }}
                    style={styles.autocompleteItem}
                  >
                    <Text style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
                ),
              }}
              inputContainerStyle={styles.inputContainer}
              placeholder="Hãy nhập tên nhà hàng"
            />
    
            <Input
              placeholder="Số lượng người"
              keyboardType="number-pad"
              value={numberOfPeople}
              onChangeText={setNumberOfPeople}
              containerStyle={styles.input}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => showMode("date")}
                style={styles.dateTimeButton}
              >
                <Text>
                  {" "}
                  <Icon name="calendar" size={20} color="#2980b9" /> Chọn ngày
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showMode("time")}
                style={styles.dateTimeButton}
              >
                <Text>
                  {" "}
                  <Icon name="clock-o" size={20} color="#2980b9" /> Chọn giờ
                </Text>
              </TouchableOpacity>
            </View>
    
            {showPicker && (
              <DateTimePicker
                value={date}
                mode={mode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onChange}
              />
            )}
            <Text></Text>
            <Text> 📅 Ngày/giờ đặt hàng: {date.toLocaleString()}</Text>
          </View>
        }
        data={filteredRestaurants.length > 0 ? filteredRestaurants : restaurants} // Hiển thị danh sách lọc hoặc danh sách đầy đủ
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <Image source={{ uri: item.image }} style={styles.restaurantImage} />
            <Text style={styles.restaurantName}>{item.name}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.buttonContainer}>
            <Button
              title="Đặt Bàn"
              onPress={handleReservation}
              color="#2980b9"
              disabled={loading}
            />
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
  
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6e6fa", padding: 10 },
  form: {
    padding: 20,
    backgroundColor: "#f9f9f9", // Màu nền nhẹ tạo sự thoải mái
    borderRadius: 12, // Bo góc mượt hơn
    marginBottom: 12,
    backgroundColor: "#e6e6fa",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Hiệu ứng đổ bóng trên Android
  },
   // Overlay loading style
   overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền bán trong suốt
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Đảm bảo overlay nằm trên các thành phần khác
  },
  input: { marginBottom: 10 },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#2980b9", // Viền xanh dương nổi bật
    borderRadius: 8, // Bo góc nhẹ
    backgroundColor: "#f1faff", // Nền xanh nhạt tạo cảm giác sạch sẽ
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  autocompleteItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2980b9", // Màu xanh dương đậm hơn
    backgroundColor: "#d0ebff", // Màu xanh nhạt hơn nhưng rõ ràng hơn
    borderRadius: 8,
    marginVertical: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  itemText: { fontSize: 16, color: "#333" },
  row: { justifyContent: "space-between", paddingHorizontal: 10 },
  restaurantCard: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fdf6ec", // Màu nền nhẹ nhàng (màu be nhạt)
    margin: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 50,
    transform: [{ scale: 1 }], // Giữ nguyên kích thước, có thể thêm hiệu ứng sau
  },

  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  restaurantName: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  buttonContainer: { padding: 20 },
});

export default ReservationApp;
