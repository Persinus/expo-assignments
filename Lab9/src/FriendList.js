import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, Alert, StyleSheet, TouchableOpacity, Image, Modal, ActivityIndicator } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://192.168.1.5:5000/friends"; // Địa chỉ API của bạn

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchFriends = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
      Alert.alert("Error", "Error fetching friends.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFriends();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    setFilteredFriends(
      friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, friends]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const openModal = (friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (selectedFriend) {
      navigation.navigate("AddFriend", { friend: selectedFriend });
      setModalVisible(false);
    }
  };

  const handleDelete = async () => {
    if (selectedFriend) {
      try {
        await axios.delete(`${API_URL}/${selectedFriend._id}`);
        Alert.alert("Success", "Friend has been deleted!");
        fetchFriends();
      } catch (error) {
        Alert.alert("Error", "Error deleting friend");
      } finally {
        setModalVisible(false);
      }
    }
  };

  const handleAddFriend = () => {
    navigation.navigate("AddFriend");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.friendItem} onPress={() => openModal(item)}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.friendDetails}>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text>{item.email}</Text>
                <Text>{item.phone}</Text>
              </View>
            </TouchableOpacity>
          )}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedFriend && (
              <>
                <Image source={{ uri: selectedFriend.avatar }} style={styles.modalAvatar} />
                <Text style={styles.modalName}>{selectedFriend.name}</Text>
                <View style={styles.infoContainer}>
                  <Text>Email: {selectedFriend.email}</Text>
                  <Text>Số điện thoại: {selectedFriend.phone}</Text>
                  <Text>{selectedFriend.address ? `Địa chỉ: ${selectedFriend.address}` : "No address available"}</Text>
                  <Text>{selectedFriend.birthday ? `Ngày sinh: ${new Date(selectedFriend.birthday).toLocaleDateString()}` : "No birthday available"}</Text>
                  <Text>{selectedFriend.relationshipStatus ? `Tình trạng hôn nhân: ${selectedFriend.relationshipStatus}` : "No relationship status available"}</Text>
                  <Text>{selectedFriend.socialMedia && selectedFriend.socialMedia.length > 0 ? `Mạng xã hội: ${selectedFriend.socialMedia.join(", ")}` : "No social media available"}</Text>
                </View>
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Icon name="edit" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Icon name="delete" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.fab} onPress={handleAddFriend}>
        <Icon name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#CCFFFF',
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  friendItem: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "lightblue",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  infoContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  editButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Tạo hiệu ứng đổ bóng
  },
});

export default FriendList;