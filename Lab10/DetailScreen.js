import React, { useState, useEffect ,useRef }from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, Modal, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventItem from "./EventItem"; // component hiển thị từng event nhỏ

const horoscopes = {
  '2025-04-01': 'Hôm nay là một ngày tuyệt vời để bắt đầu những dự án mới.',
  '2025-04-02': 'Bạn có thể sẽ gặp gỡ một người có ý nghĩa trong cuộc sống của bạn.',
  '2025-04-03': 'Thời điểm tuyệt vời để tập trung vào sức khỏe của bạn.',
  '2025-04-04': 'Sự sáng tạo của bạn sẽ tỏa sáng, hãy tận dụng điều này.',
  '2025-04-05': 'Một thông điệp quan trọng sẽ đến với bạn hôm nay.',
  '2025-04-06': 'Hãy dành thời gian cho những người bạn yêu quý.',
  '2025-04-07': 'Một cơ hội mới sẽ xuất hiện, hãy nắm bắt lấy.',
  '2025-04-08': 'Ngày này rất thích hợp để thư giãn và tái nạp năng lượng.',
  '2025-04-09': 'Hãy cẩn thận với các quyết định tài chính hôm nay.',
  '2025-04-10': 'Một kế hoạch dường như đang diễn ra theo chiều hướng tích cực.',
  '2025-04-11': 'Nghe theo trực giác của bạn trong ngày hôm nay.',
  '2025-04-12': 'Bạn sẽ tìm thấy niềm cảm hứng từ một nguồn bất ngờ.',
  '2025-04-13': 'Thời gian cho bản thân, chăm sóc sức khỏe tinh thần của bạn.',
  '2025-04-14': 'Bạn sẽ có cơ hội để thể hiện tài năng của mình một cách tốt nhất.',
  '2025-04-15': 'Ngày hôm nay sẽ mang lại những trải nghiệm đáng nhớ.',
  '2025-04-16': 'Dành thời gian cho gia đình sẽ mang lại hạnh phúc.',
  '2025-04-17': 'Mọi thứ sẽ diễn ra tốt đẹp hơn nếu bạn có kế hoạch rõ ràng.',
  '2025-04-18': 'Một chuyến đi ngắn sẽ giúp bạn tái tạo năng lượng.',
  '2025-04-19': 'Hãy kiên nhẫn, thành công đang đến gần.',
  '2025-04-20': 'Tình yêu sẽ bùng nổ từ những điều giản dị hôm nay.',
  '2025-04-21': 'Hãy thận trọng với những quyết định trong công việc.',
  '2025-04-22': 'Sự hỗ trợ từ bạn bè sẽ giúp bạn vượt qua khó khăn.',
  '2025-04-23': 'Đây là thời điểm tốt để đặt ra những mục tiêu mới.',
  '2025-04-24': 'Hãy tận hưởng những điều tốt đẹp mà cuộc sống mang lại.',
  '2025-04-25': 'Bạn có thể gặp phải một số thách thức, nhưng hãy tự tin.',
  '2025-04-26': 'Ngày này sẽ mang lại nhiều cơ hội để bạn tỏa sáng.',
  '2025-04-27': 'Hãy lắng nghe trái tim và trực giác của bạn.',
  '2025-04-28': 'Mọi người xung quanh bạn sẽ cần sự giúp đỡ từ bạn.',
  '2025-04-29': 'Cuộc sống sẽ mang lại cho bạn những điều bất ngờ.',
  '2025-04-30': 'Hãy kết thúc tháng với những suy nghĩ tích cực và lạc quan.',
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  export default function DetailScreen({ route }) {
    const { date } = route.params;
    const [horoscope, setHoroscope] = useState("");
    const [events, setEvents] = useState([]);
    const [description, setDescription] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [editEventId, setEditEventId] = useState(null);
    const flatListRef = useRef(null);
  
    useEffect(() => {
      setHoroscope(horoscopes[date] || "Không có dữ liệu cho ngày này.");
      loadEvents();
    }, [date]);
  
    useEffect(() => {
      saveEvents();
    }, [events]);
  
    const loadEvents = async () => {
      try {
        const data = await AsyncStorage.getItem(`events-${date}`);
        if (data) {
          setEvents(JSON.parse(data));
        }
      } catch (e) {
        console.log("Lỗi load events", e);
      }
    };
  
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem(`events-${date}`, JSON.stringify(events));
      } catch (e) {
        console.log("Lỗi lưu events", e);
      }
    };
  
    const addEvent = () => {
      if (!description) {
        Alert.alert("Lỗi", "Vui lòng nhập mô tả sự kiện.");
        return;
      }
  
      const newEvent = { id: Date.now().toString(), date, description };
      setEvents(prev => [...prev, newEvent]);
      setDescription("");
      setModalMessage("Đã thêm sự kiện thành công.");
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };
  
    const editEvent = (event) => {
      setDescription(event.description);
      setEditEventId(event.id);
      setModalMessage("Hãy sửa nội dung và nhấn 'Cập nhật sự kiện' để lưu.");
    };
  
    const saveEditedEvent = () => {
      if (!description) {
        Alert.alert("Lỗi", "Vui lòng nhập mô tả sự kiện.");
        return;
      }
  
      setEvents(prev =>
        prev.map(event => event.id === editEventId ? { ...event, description } : event)
      );
      setDescription("");
      setEditEventId(null);
      setModalMessage("Sự kiện đã được cập nhật thành công.");
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };
  
    const deleteEvent = (id) => {
      Alert.alert("Xác nhận", "Bạn có chắc muốn xóa sự kiện này?", [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa", onPress: () => {
            setEvents(events.filter(event => event.id !== id));
            setModalMessage("Đã xóa sự kiện thành công.");
          },
        },
      ]);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tử vi ngày {formatDate(date)}</Text>
        <Text style={styles.horoscope}>{horoscope}</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Nhập mô tả sự kiện"
          value={description}
          onChangeText={setDescription}
        />
  
        {editEventId ? (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 5 }]} onPress={saveEditedEvent}>
              <Text style={styles.buttonText}>Cập nhật sự kiện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#ccc", flex: 1, marginLeft: 5 }]}
              onPress={() => {
                setEditEventId(null);
                setDescription("");
                setModalMessage("Đã hủy chỉnh sửa.");
                flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
              }}
            >
              <Text style={[styles.buttonText, { color: "#333" }]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={addEvent}>
            <Text style={styles.buttonText}>Thêm sự kiện</Text>
          </TouchableOpacity>
        )}
  
        <FlatList
          ref={flatListRef}
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventItem
              item={item}
              editEvent={editEvent}
              deleteEvent={deleteEvent}
            />
          )}
        />
  
        <Modal transparent visible={!!modalMessage} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
  
              <TouchableOpacity
                style={[styles.modalButton, styles.closeBtn]}
                onPress={() => setModalMessage("")}
              >
                <Text style={styles.modalButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#CCFFFF", // Màu nền nhẹ nhàng hơn
    },
    title: {
      fontSize: 26,
      fontWeight: "700",
      color: "#2e3a59", // Màu xanh đậm cho tiêu đề
      marginBottom: 10,
      textAlign: "center", // Canh giữa
    },
    horoscope: {
      fontSize: 18,
      color: "#fff", // Màu chữ trắng
      backgroundColor: "#5c6bc0", // Màu nền tử vi
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      lineHeight: 24,
      shadowColor: "#000", // Thêm bóng mờ
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4, // Để cho nền tử vi có hiệu ứng 3D
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 12,
      backgroundColor: "#fff",
      fontSize: 16,
      marginBottom: 15,
      color: "#333", // Màu chữ cho input
    },
    button: {
      backgroundColor: "#f56b2a", // Màu cam sáng cho nút
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "80%",
      backgroundColor: "#fff",
      padding: 20,
      alignItems: "center",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    modalMessage: {
      fontSize: 18,
      color: "#333",
      textAlign: "center",
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    modalButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    closeBtn: {
      backgroundColor: "#4CAF50",
    },
    eventCard: {
      backgroundColor: "#ffffff", // Màu nền của mỗi sự kiện
      padding: 15,
      marginBottom: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3, // Thêm hiệu ứng cho các sự kiện
    },
    eventText: {
      fontSize: 16,
      color: "#333",
      lineHeight: 22,
    },
    eventActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    eventActionButton: {
      backgroundColor: "#f56b2a", // Nút chỉnh sửa và xóa với màu cam
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    eventActionText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
    eventDeleteButton: {
      backgroundColor: "#d32f2f", // Nút xóa với màu đỏ
    },
  });