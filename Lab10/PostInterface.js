import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import Icon from "react-native-vector-icons/Ionicons";

const initialPosts = [
  {
    id: 1,
    username: "LHU MEDIA",
    profileImageUri: "https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-1/334300767_750766786366910_5254728129830373425_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeHkHNiz3hMZnK8GksoxA6UNcGuzNiw-3YJwa7M2LD7dgr_nLdEYirHWMPXvMj5OE_DmP2rPI_leVpVVw1q19vAx&_nc_ohc=He0XcCUMzjkQ7kNvwGvzgOs&_nc_oc=AdmWDgIf0U_WZcgBFpC-P5uXyUHqNpXVLbNKwFyhFgEQxBbJ23Xeu9OkO-ws_bFnIDMvqBKvBfWEYvJx22s9hVPI&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=gpRlEUBnPXEyld8wr9HzaQ&oh=00_AfE5gHVDbKgCIXS6fFrWnnDULolmO6WNnKAlv8yB_iJWgw&oe=67F9789A",
    title: "Lạc Hồng UniverSity.",
    content: "📢THÔNG BÁO NGHỈ LỄ📢.",
    imageUrl: "https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/488082916_1255669946474588_282966995700913071_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFCfiHlo7dY6a29XfJbUZRdO1DtIZQUhA87UO0hlBSED5isfXf83yom6k6Kcgznu9vHBGt2NQceACBv948rvU5J&_nc_ohc=YjGvsfGW6bsQ7kNvwFOFKbF&_nc_oc=AdmBfcLD0Y8BMBM_tXf4lr57EEad0MTinSMKvIfWuNd2DHEX3sm9ippfk6cTKo06quaaF2tEWJTTVOga1yTTwDIp&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=I9l4QbFJmhfx8IzzhDMeIQ&oh=00_AfHdpu0olIADJzff-6w4qhCIaB4K13NVEk7yS2i17hW1Og&oe=67F98403",
    likes: 32,
    comments: 5,
    shares: 3,
  },
  {
    id: 2,
    username: "IT-LHU ",
    profileImageUri: "https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-1/305582218_568823318372428_4016786712606027032_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeERJOhzhJVxXDu5tt0DW4E4WNT6R4K7S_9Y1PpHgrtL_9anP5xbmfX0kfUyS56aKWUhRnFL5Xaw6fqqNjigSTu8&_nc_ohc=xb2o67LItqMQ7kNvwELYIQz&_nc_oc=AdkT5VFgcrUGBC0OrN7JUH8W6rCUs-0n58PC--1RbjZX4kzJ45RZNhbA3745yjmtOa_D37CocG2MZ90hkpqWhlt0&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=Rri_w-wpm-4VdkBjWLTnTA&oh=00_AfE4NRxo1m3VVPZ8rVvHgdKPW9r0WrPFFwIZGvTJPIzrZA&oe=67F9770E",
    title: "Khoa Công Nghệ Thông Tin - LHU ",
    content: "Đại học Lạc Hồng vinh dự chào đón đoàn Đại học HAMK, Phần Lan – đối tác quan trọng trong dự án EMVITET từ năm 2018. Đây không chỉ là một buổi gặp gỡ mà còn là cơ hội để hai trường thảo luận về những kế hoạch hợp tác trong thời gian tới.",
    imageUrl: "https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/486388341_1159396465981774_6311962522880869185_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFkcWI_LHaF8uxJQGlT0t_B6KlQBO52JT3oqVAE7nYlPbrhdukrCLaGghWPs0E_cveA3QdrplbVgY8PBzVqq_ZO&_nc_ohc=jNH48C37LPcQ7kNvwGyADQT&_nc_oc=AdkMZwkH2GabrZlQe9VA3bbDhFBeMaR7rY3oiFmDVMp5lK9izqTiVJFcGVUU1D1m89WSKF4E8wOiiAnCNXOUrXCP&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=9F6k7Ncjh0OORZbscA7GXQ&oh=00_AfE6p12itsPkAHMH8RopirT4hnoUJsCGcf8Q50eue02ICA&oe=67F9A145",
    likes: 10,
    comments: 2,
    shares: 1,
  },
];

export default function PostInterface({ profileData }) {
  const [posts, setPosts] = useState(initialPosts);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openEditModal = (post) => {
    setNewPost({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
    });
    setEditingPostId(post.id);
    setIsEditMode(true);
    setModalVisible(true);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
    setOptionsModalVisible(false); // Close the options modal after delete
  };

  const handleSave = () => {
    if (isEditMode) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPostId
            ? { ...p, title: newPost.title, content: newPost.content, imageUrl: newPost.imageUrl }
            : p
        )
      );
    } else {
      const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
      setPosts((prev) => [
        ...prev,
        {
          id: newId,
          username: profileData.name,
          profileImageUri: profileData.profileImageUri,
          time: "Vừa thêm",
          ...newPost,
          likes: 0,
          comments: 0,
          shares: 0,
        },
      ]);
    }

    setNewPost({ title: "", content: "", imageUrl: "" });
    setModalVisible(false);
    setIsEditMode(false);
    setEditingPostId(null);
  };

  const openOptionsModal = (post) => {
    setSelectedPost(post);
    setOptionsModalVisible(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalVisible(false);
    setSelectedPost(null);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: item.profileImageUri }} style={styles.avatar} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Menu>
          <MenuTrigger>
            <Icon name="ellipsis-vertical" size={20} onPress={() => openOptionsModal(item)} />
          </MenuTrigger>
        </Menu>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      <View style={styles.reactionsContainer}>
        <TouchableOpacity style={styles.reactionButton}>
          <Icon name="heart-outline" size={18} color="red" />
          <Text style={styles.reactionText}>{item.likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Icon name="chatbubble-outline" size={18} />
          <Text style={styles.reactionText}>{item.comments} Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <Icon name="share-social-outline" size={18} />
          <Text style={styles.reactionText}>{item.shares} Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <MenuProvider>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
      />

      <TouchableOpacity style={styles.createPostButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.createPostText}>Tạo bài viết mới</Text>
      </TouchableOpacity>

      {/* Modal for creating/editing post */}
      <Modal visible={modalVisible} animationType="slide">
  <View style={styles.modalContent}>
    <TextInput
      placeholder="Nhóm đề bài viết"
      style={styles.input}
      value={newPost.title}
      onChangeText={(text) => setNewPost({ ...newPost, title: text })}
    />
    <TextInput
      placeholder="Nội dung bài viết"
      style={styles.input}
      value={newPost.content}
      onChangeText={(text) => setNewPost({ ...newPost, content: text })}
    />
    <TextInput
      placeholder="Link ảnh"
      style={styles.input}
      value={newPost.imageUrl}
      onChangeText={(text) => setNewPost({ ...newPost, imageUrl: text })}
    />
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSave}>
        <Text style={styles.buttonText}>{isEditMode ? "Lưu" : "Đăng bài"}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => setModalVisible(false)}>
        <Text style={styles.buttonText}>Đóng</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      {/* Options Modal for editing, deleting, or canceling */}
      <Modal visible={optionsModalVisible} animationType="slide">
      <View style={styles.optionsModalContent}>
  <Button style={styles.button} title="✏️ Sửa bài viết" onPress={() => { openEditModal(selectedPost); closeOptionsModal(); }} />
  <Button style={styles.button} title="🗑️ Xoá bài viết" onPress={() => { deletePost(selectedPost.id); closeOptionsModal(); }} />
  <Button style={styles.button} title="❌ Hủy" onPress={closeOptionsModal} />
</View>
      </Modal>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  postCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    color: "#333",
  },
  content: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  reactionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  reactionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
  createPostButton: {
    backgroundColor: '#0078d4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
  },
  TextInput:{
    borderWidth: 1,
    borderColor: '#33FF66',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },

  createPostText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
  

    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",  // Màu nền của modal content
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',  // Màu nền của nút "Lưu" hoặc "Đăng bài"
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#f44336',  // Màu nền của nút "Đóng"
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',  // Màu chữ trên các nút
    fontWeight: 'bold',
  },
  optionsModalContent: {
  
    padding: 20,
    backgroundColor: "#9FD7F9",
    flex: 1,
    justifyContent: "center",
    flexDirection: 'column',
    gap: 10, // Khoảng cách giữa các nút
  },
  button: {
    backgroundColor: "#0078d4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  
});
