import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.1.5:5000/friends"; // Thay đổi URL API của bạn

const AddFriend = ({ navigation, route }) => {
  const { friend } = route.params || {};

  // Cập nhật state cho các trường mới
  const [name, setName] = useState(friend ? friend.name : "");
  const [phone, setPhone] = useState(friend ? friend.phone : "");
  const [email, setEmail] = useState(friend ? friend.email : "");
  const [avatar, setAvatar] = useState(friend ? friend.avatar : "");
  const [address, setAddress] = useState(friend ? friend.address : ""); // Thêm trường address
  const [birthday, setBirthday] = useState(friend ? friend.birthday : ""); // Thêm trường birthday
  const [relationshipStatus, setRelationshipStatus] = useState(friend ? friend.relationshipStatus : ""); // Thêm trường relationshipStatus
  const [socialMedia, setSocialMedia] = useState(friend ? friend.socialMedia.join(", ") : ""); // Thêm trường socialMedia

  const handleAddOrUpdateFriend = async () => {
    if (!name || !phone || !email || !avatar) {
      Alert.alert("Error", "Please fill in all required fields!");
      return;
    }

    try {
      const socialMediaArray = socialMedia.split(",").map((item) => item.trim()); // Chuyển chuỗi socialMedia thành mảng

      const friendData = {
        name,
        phone,
        email,
        avatar,
        address,
        birthday,
        relationshipStatus,
        socialMedia: socialMediaArray, // Đảm bảo gửi dưới dạng mảng
      };

      if (friend) {
        // Cập nhật thông tin bạn bè
        await axios.put(`${API_URL}/${friend._id}`, friendData);
        Alert.alert("Success", "Friend information has been updated!");
      } else {
        // Thêm bạn bè mới
        await axios.post(API_URL, friendData);
        Alert.alert("Success", "Friend has been added!");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error saving friend:", error);
      Alert.alert("Error", "Error saving friend.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{friend ? "Edit Friend" : "Add New Friend"}</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        value={avatar}
        onChangeText={setAvatar}
      />

      <TextInput
        style={styles.input}
        placeholder="Address (Optional)"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Birthday (Optional)"
        value={birthday}
        onChangeText={setBirthday}
      />

      <TextInput
        style={styles.input}
        placeholder="Relationship Status (Optional)"
        value={relationshipStatus}
        onChangeText={setRelationshipStatus}
      />

      <TextInput
        style={styles.input}
        placeholder="Social Media (comma separated)"
        value={socialMedia}
        onChangeText={setSocialMedia}
      />

      <Button
        title={friend ? "Update" : "Add"}
        onPress={handleAddOrUpdateFriend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
});

export default AddFriend;