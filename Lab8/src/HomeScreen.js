import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons"; // Đảm bảo bạn đã cài đặt FontAwesome5
import { fetchRooms } from "./RoomSliceBai4";
import { useNavigation } from "@react-navigation/native";
import { FAB, Tooltip } from "react-native-paper";
import Autocomplete from "react-native-autocomplete-input";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const rooms = useSelector((state) => state.rooms?.rooms || []);
  const error = useSelector((state) => state.rooms.error);

  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [query, setQuery] = useState("");
  const [fabOpen, setFabOpen] = useState(false); // Trạng thái mở rộng FAB

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Danh sách gợi ý AutoComplete
  const availableDates = useMemo(() => [...new Set(rooms.flatMap((room) => room.availableDates || []))], [rooms]);
  const locations = useMemo(() => [...new Set(rooms.map((room) => room.location || ""))], [rooms]);

  // Lọc danh sách phòng
  const filteredRooms = useMemo(() => {
    let filtered = rooms;

    if (searchType === "name") {
      filtered = filtered.filter((room) =>
        room?.name?.toLowerCase().includes(search.toLowerCase())
      );
    } else if (searchType === "type") {
      filtered = filtered.filter((room) =>
        room?.type?.toLowerCase().includes(search.toLowerCase())
      );
    } else if (searchType === "date") {
      filtered = filtered.filter((room) =>
        room.availableDates?.includes(query)
      );
    } else if (searchType === "location") {
      filtered = filtered.filter(
        (room) => room.location?.toLowerCase() === query.toLowerCase()
      );
    }

    return filtered;
  }, [search, query, searchType, rooms]);

  if (error) {
    return <Text style={{ color: "red", textAlign: "center" }}>Lỗi: {error}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Ô tìm kiếm */}
      {searchType === "name" || searchType === "type" ? (
        <TextInput
          placeholder={`Tìm kiếm theo ${searchType === "name" ? "tên phòng" : "loại phòng"}...`}
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      ) : (
        <View>
         {searchType === "date" || searchType === "location" ? (
  <View>
    <TextInput
      placeholder={searchType === "date" ? "Chọn ngày trống..." : "Chọn địa điểm..."}
      value={query}
      onChangeText={setQuery}
      style={styles.input}
    />

    {query.length > 0 && (
      <FlatList
        data={
          searchType === "date"
            ? availableDates.filter((d) => d.includes(query))
            : locations.filter((l) =>
                l.toLowerCase().includes(query.toLowerCase())
              )
        }
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setQuery(item)}>
            <Text style={styles.suggestion}>{item}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionList}
      />
    )}
  </View>
) : (
  <TextInput
    placeholder={`Tìm kiếm theo ${searchType === "name" ? "tên phòng" : "loại phòng"}...`}
    value={search}
    onChangeText={setSearch}
    style={styles.input}
  />
)}
        </View>
      )}

      {/* Danh sách phòng */}
      {filteredRooms.length === 0 ? (
        <Text style={{ textAlign: "center", color: "#888" }}>Không có phòng nào tìm thấy.</Text>
      ) : (
        <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) =>
          item ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("RoomDetail", { room: item })}
              style={styles.roomCard}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.roomTitle}>{item.name}</Text>
      
         
      
              {/* Giá phòng */}
              <View style={styles.infoRow}>
                <FontAwesome5 name="tag" size={20} color="#007bff" />
                <Text style={styles.infoText}>Giá: {item.price.toLocaleString()} VNĐ</Text>
              </View>
      
              {/* Loại phòng */}
              <View style={styles.infoRow}>
                <FontAwesome5 name="clipboard-list" size={20} color="#007bff" />
                <Text style={styles.infoText}>Loại phòng: {item.type}</Text>
              </View>
      
              {/* Đánh giá phòng */}
              <View style={styles.infoRow}>
                <FontAwesome5 name="star" size={20} color="#007bff" />
                <Text style={styles.infoText}>Đánh giá: {item.rating}/5</Text>
              </View>
      
              {/* Ngày trống */}
              <View style={styles.infoRow}>
                <FontAwesome5 name="calendar-alt" size={20} color="#007bff" />
                <Text style={styles.infoText}>Ngày trống: {item.availableDates}</Text>
              </View>
      
              {/* Địa điểm phòng */}
              <View style={styles.infoRow}>
                <FontAwesome5 name="location-arrow" size={20} color="#007bff" />
                <Text style={styles.infoText}>Địa điểm: {item.location}</Text>
              </View>
            </TouchableOpacity>
          ) : null
        }
      />
      )}

      {/* FAB chính và menu mở rộng */}
      <View style={styles.fabContainer}>
        {fabOpen && (
          <>
            <FAB style={styles.fab} icon="format-title" label="Tên" onPress={() => setSearchType("name")} />
            <FAB style={styles.fab} icon="hotel" label="Loại phòng" onPress={() => setSearchType("type")} />
            <FAB style={styles.fab} icon="calendar" label="Ngày" onPress={() => setSearchType("date")} />
            <FAB style={styles.fab} icon="map-marker" label="Địa điểm" onPress={() => setSearchType("location")} />
          </>
        )}
        <FAB
          style={styles.mainFab}
          icon={fabOpen ? "close" : "plus"}
          onPress={() => setFabOpen(!fabOpen)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd", // Nền ứng dụng - xanh dương nhạt
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#90caf9", // Viền input xanh dương nhạt
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff", // Nền input trắng
    fontSize: 16,
    color: "#0d47a1", // Chữ chính xanh dương đậm
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionList: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#90caf9", // Viền danh sách gợi ý
    borderRadius: 8,
    maxHeight: 150,
    padding: 5,
  },
  suggestion: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 16,
    color: "#455a64", // Chữ xám đậm
  },
  roomCard: {
    backgroundColor: "#ffffff", // Nền thẻ phòng trắng
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#90caf9", // Viền xanh dương nhạt
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  roomTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d47a1", // Màu chữ chính xanh dương đậm
    marginTop: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#455a64", // Chữ phụ xám đậm
    marginBottom: 12,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  infoText: {
    fontSize: 16,
    color: "#455a64", // Màu chữ phụ xám đậm
    marginLeft: 10,
    flexShrink: 1,
  },
  priceTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0d47a1", // Giá phòng màu xanh dương đậm
  },
  icon: {
    color: "#1565c0", // Màu icon xanh dương
  },
  fabContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    alignItems: "flex-end",
  },
  fab: {
    marginBottom: 10,
    backgroundColor: "#42a5f5", // Nút FAB phụ xanh nhạt
  },
  mainFab: {
    backgroundColor: "#1565c0", // Nút FAB chính xanh dương
  },
});
export default HomeScreen;