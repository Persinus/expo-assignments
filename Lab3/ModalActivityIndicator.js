import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

const ModalActivityIndicator = () => {
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái của Modal
  const [loading, setLoading] = useState(false); // Trạng thái của ActivityIndicator

  const handleButtonPress = () => {
    setLoading(true);
    setModalVisible(true); // Hiện modal

    // Ẩn ActivityIndicator sau 3 giây
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const hideModal = () => {
    setModalVisible(false); // Đóng Modal
  };

  // Xử lý khi nhấn nút back
  const handleBackPress = () => {
    if (modalVisible) {
      Alert.alert(
        'Thông báo',
        'Bạn có muốn đóng Modal?',
        [
          {
            text: 'Hủy',
            style: 'cancel', // Không đóng Modal
          },
          {
            text: 'Đồng ý',
            onPress: hideModal, // Đóng Modal khi nhấn "Đồng ý"
          },
        ]
      );
      return true; // Ngăn không cho hành động mặc định xảy ra
    }
    return false; // Nếu Modal không mở, không chặn nút back
  };

  // Đăng ký sự kiện hardwareBackPress
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => backHandler.remove(); // Gỡ sự kiện khi component bị unmount
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Mở Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleBackPress} // Xử lý khi nhấn nút back trên Modal
      >
        <View style={styles.modalView}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#00ffcc"
              style={styles.activityIndicator}
            />
          )}
          <Text style={styles.modalText}>Đang tải... Vui lòng chờ!</Text>
          <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
            <Text style={styles.buttonText}>Ẩn Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  openButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5, // Đổ bóng
  },
  closeButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Nền tối với độ trong suốt
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ffcc',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 1, // Khoảng cách chữ
  },
  activityIndicator: {
    marginBottom: 20,
  },
});

export default ModalActivityIndicator;
