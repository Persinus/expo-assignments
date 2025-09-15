import React, { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";

export default function CreatePostModal({ visible, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title || !content) return;
    onCreate({ title, content });
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tiêu đề"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Nội dung"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <Button title="📝 Tạo bài viết" onPress={handleSubmit} />
        <View style={{ height: 10 }} />
        <Button title="❌ Hủy" color="#999" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
});
