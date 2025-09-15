import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await axios.get('http://192.168.1.10:5000/items');
      setItems(response.data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải items');
      console.error(error);
    }
  };

  const addItem = async () => {
    if (!name || !description) {
      Alert.alert('Lỗi', 'Vui lòng nhập cả tên và mô tả');
      return;
    }

    try {
      const newItem = { name, description };
      await axios.post('http://192.168.1.10:5000/items', newItem);
      Alert.alert('Thông báo', 'Item đã được thêm thành công');
      loadItems();
      resetForm();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm item');
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://192.168.1.10:5000/items/${id}`);
      Alert.alert('Thông báo', 'Item đã được xóa thành công');
      loadItems();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa item');
      console.error(error);
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setDescription(item.description);
  };

  const updateItem = async () => {
    if (!name || !description) {
      Alert.alert('Lỗi', 'Vui lòng nhập cả tên và mô tả');
      return;
    }

    try {
      const updatedItem = { name, description };
      await axios.put(`http://192.168.1.10:5000/items/${editingId}`, updatedItem);
      Alert.alert('Thông báo', 'Item đã được cập nhật thành công');
      loadItems();
      resetForm();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật item');
      console.error(error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setEditingId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}: {item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item._id)}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách Items</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />

      {editingId ? (
        <Button title="Cập nhật Item" onPress={updateItem} color="#0066cc" />
      ) : (
        <Button title="Thêm Item" onPress={addItem} color="#28a745" />
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ItemList;
