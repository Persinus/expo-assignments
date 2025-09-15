import React, { useEffect, useState } from "react";
import { View, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Util/axiosInstance";
import LogoutButton from "../Component/LogOut";
import PostList from "../Component/PostList";
import EditPostModal from "../Component/EditPostModal";
import CreatePostModal from "../Component/CreatePostForm"; // 👈 NHỚ import!

export default function AdminScreen() {
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState("");

  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [createModalVisible, setCreateModalVisible] = useState(false);

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    const fetchData = async () => {
      const r = await AsyncStorage.getItem("role");
      setRole(r);
      const res = await api.get("/posts");
      setPosts(res.data);
    };
    fetchData();
  }, []);

  // Tạo bài viết
  const createPost = async (data) => {
    const res = await api.post("/posts", data);
    setPosts((prev) => [...prev, res.data]);
  };

  // Cập nhật bài viết
  const updatePost = async (data) => {
    const res = await api.patch(`/posts/${data._id}`, data);
    setPosts((prev) =>
      prev.map((p) => (p._id === data._id ? res.data : p))
    );
    setModalVisible(false);
    setSelectedPost(null);
  };

  // Xoá bài viết
  const deletePost = (id) => {
    Alert.alert("Xác nhận", "Bạn chắc chắn muốn xoá bài viết này?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          await api.delete(`/posts/${id}`);
          setPosts((prev) => prev.filter((p) => p._id !== id));
        },
      },
    ]);
  };

  // Sửa bài viết
  const editPost = (id) => {
    const found = posts.find((p) => p._id === id);
    setSelectedPost(found);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Nút mở modal tạo bài */}
      <View style={{ marginBottom: 12 }}>
        <Button title="➕ Thêm bài viết" onPress={() => setCreateModalVisible(true)} />
      </View>
      <View style={{ marginBottom: 12 }}>
  <LogoutButton />
</View>
      {/* Modal tạo bài viết */}
      <CreatePostModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={createPost}
      />

      {/* Danh sách bài viết */}
      <PostList
        posts={posts}
        role={role}
        onEdit={editPost}
        onDelete={deletePost}
      />

      {/* Modal chỉnh sửa bài viết */}
      <EditPostModal
        visible={modalVisible}
        post={selectedPost}
        onClose={() => {
          setModalVisible(false);
          setSelectedPost(null); // ✅ reset lại
        }}
        onSave={updatePost}
      />
    </View>
  );
}
