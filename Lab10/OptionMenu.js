import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler 
} from 'react-native';

function OptionMenu() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State cho chế độ sáng/tối

  const handleMenuPress = (optionKey) => {
    switch (optionKey) {
      case 'info':
        setModalVisible(true); // Hiện modal
        break;
      case 'mode':
        // Thông báo khi chuyển chế độ sáng/tối
        Alert.alert(
          isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối',
          `Bạn có muốn chuyển chế độ ${isDarkMode ? 'sáng' : 'tối'} không?`,
          [
            { text: 'Huỷ', style: 'cancel' },
            { 
              text: 'OK', 
              onPress: () => {
                setIsDarkMode(!isDarkMode); // Chuyển chế độ sáng/tối
                Alert.alert(`Chế độ ${isDarkMode ? 'sáng' : 'tối'} đã được bật!`);
              }
            }
          ]
        );
        break;
      case 'exit':
        Alert.alert(
          'Thoát ứng dụng',
          'Bạn có muốn thoát không?',
          [{ text: 'Huỷ', style: 'cancel' }, { text: 'Thoát', onPress: () => BackHandler.exitApp() }]
        );
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.optionMenuContainer}>
      <TouchableOpacity
        style={[styles.optionButton, { backgroundColor: isDarkMode ? '#555' : '#FFCC66' }]}
        onPress={() => handleMenuPress('mode')}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#000000' }]}>Chế độ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, { backgroundColor: isDarkMode ? '#555' : '#FFCC66' }]}
        onPress={() => handleMenuPress('exit')}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#000000' }]}>Thoát</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, { backgroundColor: isDarkMode ? '#555' : '#FFCC66' }]}
        onPress={() => handleMenuPress('info')}
      >
        <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#000000' }]}>Thông tin</Text>
      </TouchableOpacity>

      {/* Modal hiển thị thông tin */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : 'white' }]}>
            <Text style={[styles.modalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Thông tin mục</Text>
            <Text style={{ color: isDarkMode ? '#ccc' : '#333' }}>Mã SV: 122001472</Text>
            <Text style={{ color: isDarkMode ? '#ccc' : '#333' }}>Họ tên: Nguyễn Văn Mạnh</Text>
            <Text style={{ color: isDarkMode ? '#ccc' : '#333' }}>Lớp: 22CT115</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  optionMenuContainer: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  optionButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default OptionMenu;