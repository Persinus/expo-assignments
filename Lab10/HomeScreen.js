import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Hàm tính thứ của một ngày trong tuần
const getDayOfWeek = (year, month, day) => {
  const date = new Date(year, month - 1, day); // Tháng bắt đầu từ 0 trong JS
  return date.getDay(); // Trả về giá trị từ 0 (Chủ Nhật) đến 6 (Thứ Bảy)
};

export default function HomeScreen({ navigation }) {
  const renderCalendar = () => {
    const days = [];
    const firstDayOfMonth = getDayOfWeek(2025, 4, 1); // Tính thứ của ngày 1 tháng 4, 2025

    // Thêm các ngày trống nếu tháng bắt đầu không phải Chủ Nhật
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />);
    }

    // Thêm các ngày trong tháng
    for (let i = 1; i <= 30; i++) {
      const date = `2025-04-${i.toString().padStart(2, "0")}`;
      const dayOfWeek = getDayOfWeek(2025, 4, i); // Lấy thứ trong tuần của ngày
      const dayName = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"][dayOfWeek]; // Mảng tên thứ

      days.push(
        <View key={date} style={styles.dayWrapper}>
          <TouchableOpacity
            style={styles.dayButton}
            onPress={() => navigation.navigate("Detail", { date })}
          >
            <Text style={styles.dayText}>{i}</Text>
          </TouchableOpacity>
          <Text style={styles.dayOfWeek}>{dayName}</Text>
        </View>
      );
    }

    // Thêm các dòng trống nếu cần để hoàn thành 7 ngày cho mỗi tuần
    while (days.length % 7 !== 0) {
      days.push(<View key={`empty-${days.length}`} style={styles.emptyDay} />);
    }

    // Chia các ngày thành các dòng có 7 ngày mỗi dòng
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <View style={styles.calendarContainer}>
        {weeks.map((week, index) => (
          <View key={`week-${index}`} style={styles.weekRow}>
            {week}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch tháng 4 - 2025</Text>

      {/* Form container bao quanh các ô ngày */}
      <View style={styles.calendarWrapper}>
        {renderCalendar()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#CCFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  // Thêm khung và nền cho phần lịch
  calendarWrapper: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#EAEAEA", // Hình nền của phần lịch
    borderWidth: 2,
    borderColor: "#6200EE", // Màu viền của khung
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  calendarContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Giảm khoảng cách giữa các ngày
    marginBottom: 6, // Khoảng cách giữa các tuần
  },
  dayWrapper: {
    alignItems: "center",
    margin: 0, // Giảm khoảng cách giữa các ô
  },
  dayButton: {
    width: 40,
    height: 40,
    margin: 4,
    backgroundColor: "#6200EE",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dayText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14, // Giảm kích thước chữ
  },
  dayOfWeek: {
    fontSize: 10,
    color: "#333",
    marginTop: 3,
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 3,
  },
});