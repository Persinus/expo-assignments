import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function EventItem({ item, editEvent, deleteEvent }) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => editEvent(item)} style={styles.iconButton}>
          <Icon name="edit" size={20} color="#f39c12" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteEvent(item.id)} style={[styles.iconButton, styles.deleteButton]}>
          <Icon name="trash" size={20} color="#e74c3c" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#CCFFCC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  description: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingRight: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    marginLeft: 16,
  },
};
