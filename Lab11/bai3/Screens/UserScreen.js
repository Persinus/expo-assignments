import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Util/axiosInstance";
import LogoutButton from "../Component/LogOut";
import PostList from "../Component/PostList";
import EditPostModal from "../Component/EditPostModal";
import CreatePostModal from "../Component/CreatePostForm"; // ✅

export default function UserScreen() {
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState("");

  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const r = await AsyncStorage.getItem("role");
      setRole(r);
      const res = await api.get("/posts");
      setPosts(res.data);
    };
    fetchData();
  }, []);

  const createPost = async (data) => {
    const res = await api.post("/posts", data);
    setPosts((prev) => [...prev, res.data]);
  };

  const updatePost = async (data) => {
    const res = await api.patch(`/posts/${data._id}`, data);
    setPosts((prev) =>
      prev.map((p) => (p._id === data._id ? res.data : p))
    );
    setModalVisible(false);
    setSelectedPost(null);
  };

  const editPost = (id) => {
    const found = posts.find((p) => p._id === id);
    setSelectedPost(found);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Nút mở modal tạo bài */}
      <View style={{ marginBottom: 6 }}>
        <Button title="➕ Thêm bài viết" onPress={() => setCreateModalVisible(true)} />
      </View>
 <View style={{ marginBottom: 6 }}>
  <LogoutButton />
</View>
      <CreatePostModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={createPost}
      />

      <PostList
        posts={posts}
        role={role}
        onEdit={editPost}
      />

      <EditPostModal
        visible={modalVisible}
        post={selectedPost}
        onClose={() => {
          setModalVisible(false);
          setSelectedPost(null);
        }}
        onSave={updatePost}
      />
    </View>
  );
}