import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

export default function PostList({ posts, role, onDelete, onEdit }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.author}>
            ✍️ Người viết: {item.author?.username || "Không rõ"} ({item.author?.role || ""})
          </Text>
          <Text style={styles.time}>
            🕒 Viết lúc: {formatDate(item.createdAt)}
          </Text>
          {item.updatedAt !== item.createdAt && (
            <Text style={styles.time}>
              🔁 Đã chỉnh sửa lúc: {formatDate(item.updatedAt)}
            </Text>
          )}

          <View style={styles.buttonGroup}>
            <Button title="✏️ Sửa" onPress={() => onEdit?.(item._id)} />
            {role === "admin" && (
              <Button
                title="🗑️ Xoá"
                color="#e74c3c"
                onPress={() => onDelete?.(item._id)}
              />
            )}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  author: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
});
