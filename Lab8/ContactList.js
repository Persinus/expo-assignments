import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, IconButton, FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Lỗi khi tải contacts:', error);
    }
  };

  const editContact = (contact, index) => {
    navigation.navigate('AddContact', { contact, index });
  };

  const deleteContact = (index) => {
    Alert.alert(
      'Xóa Liên Hệ',
      'Bạn có chắc chắn muốn xóa liên hệ này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const updatedContacts = contacts.filter((_, i) => i !== index);
            setContacts(updatedContacts);
            AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card style={styles.contactCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.contactInfo}>
                <Title style={styles.contactName}>{item.name}</Title>
                <Paragraph style={styles.contactNumber}>{item.phoneNumber}</Paragraph>
              </View>
              <View style={styles.cardActions}>
                <IconButton icon="pencil" onPress={() => editContact(item, index)} style={styles.iconButton} />
                <IconButton icon="trash-can" onPress={() => deleteContact(index)} style={styles.iconButton} />
              </View>
            </Card.Content>
          </Card>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddContact')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5fc", // Màu nền theo yêu cầu
    padding: 15,
  },
  contactCard: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: "#ffffff", // Nền trắng để tạo điểm nhấn
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderLeftWidth: 6,
    borderLeftColor: "#007bff", // Đường viền xanh nổi bật
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  contactNumber: {
    fontSize: 15,
    color: "#4b5563",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: "#f8f9fa", // Màu nền icon nhẹ nhàng
    borderRadius: 50,
    padding: 8,
    elevation: 3,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#007bff", // Màu xanh nổi bật cho nút FAB
    elevation: 5,
  },
});

export default ContactList;
