import React, { useState, useEffect } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";

export default function EditPostModal({ visible, onClose, post, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

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
        <Button title="💾 Lưu chỉnh sửa" onPress={() => onSave({ ...post, title, content })} />
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
