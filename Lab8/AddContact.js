import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContact = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (route.params?.contact) {
      const contact = route.params.contact;
      setName(contact.name);
      setPhoneNumber(contact.phoneNumber);
    }
  }, [route.params?.contact]);

  const saveContact = async () => {
    if (!name || !phoneNumber) {
      Alert.alert('Lỗi', 'Vui lòng nhập cả tên và số điện thoại.');
      return;
    }

    const newContact = { name, phoneNumber };
    const storedContacts = await AsyncStorage.getItem('contacts');
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];

    if (route.params?.index !== undefined) {
      contacts[route.params.index] = newContact;
    } else {
      contacts.push(newContact);
    }

    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    navigation.navigate('Contacts');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Thêm Liên Hệ Mới</Title>
      <TextInput
        label="Nhập Tên"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
        theme={{ colors: { primary: '#007bff' } }}
      />
      <TextInput
        label="Nhập Số Điện Thoại"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
        theme={{ colors: { primary: '#007bff' } }}
      />
      <Button mode="contained" onPress={saveContact} style={styles.button}>
        Lưu Liên Hệ
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F6F9', // Màu nền nhẹ nhàng
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333', // Màu chữ đậm cho tiêu đề
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff', // Màu nền trắng cho input
    borderRadius: 8, // Bo góc input
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff', // Màu xanh nổi bật cho nút
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default AddContact;
