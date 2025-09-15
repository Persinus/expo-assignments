import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput
} from 'react-native';
import PostInterface from './PostInterface';

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    name: 'Nguyễn Văn Mạnh',
    bio: 'Lập trình viên, yêu công nghệ',
    friendsCount: 32,
    profileImageUri: 'https://i.pinimg.com/474x/86/68/64/866864e81fdf004999e673ce333eeadb.jpg',
    coverPhotoUri: 'https://i.pinimg.com/474x/4b/7e/ae/4b7eaeaf186887464decb1cb83aa0e54.jpg',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState(profileData.name);
  const [tempBio, setTempBio] = useState(profileData.bio);
  const [tempImage, setTempImage] = useState(profileData.profileImageUri);

  const handleSave = () => {
    setProfileData(prev => ({
      ...prev,
      name: tempName,
      bio: tempBio,
      profileImageUri: tempImage,
    }));
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover Photo */}
      <Image source={{ uri: profileData.coverPhotoUri }} style={styles.coverPhoto} />

      {/* Profile Info */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileData.profileImageUri }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileBio}>{profileData.bio}</Text>
          <Text style={styles.friendsCount}>{profileData.friendsCount} Bạn bè</Text>
        </View>
      </View>

      {/* Edit Profile */}
      <TouchableOpacity style={styles.editProfileButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.editProfileText}>Chỉnh sửa trang cá nhân</Text>
      </TouchableOpacity>

      {/* Post Interface */}
      <PostInterface profileData={profileData} />

      {/* Modal chỉnh sửa */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa thông tin cá nhân</Text>
            <TextInput
              value={tempName}
              onChangeText={setTempName}
              placeholder="Họ tên"
              style={styles.input}
            />
            <TextInput
              value={tempBio}
              onChangeText={setTempBio}
              placeholder="Tiểu sử"
              style={styles.input}
            />
            <TextInput
              value={tempImage}
              onChangeText={setTempImage}
              placeholder="URL ảnh đại diện"
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.btnText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileBio: {
    fontSize: 14,
    color: '#555',
  },
  friendsCount: {
    fontSize: 16,
    color: '#0078d4',
    marginTop: 5,
  },
  editProfileButton: {
    marginTop: 60,
    backgroundColor: '#0078d4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: '#0078d4',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
