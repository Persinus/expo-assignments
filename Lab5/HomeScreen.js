import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ROOMS = [
  { 
    id: '1', 
    name: 'Deluxe Room', 
    price: '$120', 
    image: 'https://i.pinimg.com/474x/ad/6b/a7/ad6ba7bf5446d0acbc39adb41cbc94c9.jpg', 
    features: 'Giường đôi, ban công, view đẹp' 
  },
  { 
    id: '2', 
    name: 'Suite Room', 
    price: '$200', 
    image: 'https://i.pinimg.com/474x/07/e9/64/07e964d3f1fe1daf98e67c67eb53f8e3.jpg', 
    features: 'Không gian rộng, bồn tắm, dịch vụ cao cấp' 
  },
  { 
    id: '3', 
    name: 'Single Room', 
    price: '$80', 
    image: 'https://i.pinimg.com/474x/30/f6/a3/30f6a34dc534cbc2b5eacaa7009e7839.jpg', 
    features: 'Giường đơn, phù hợp cá nhân, tiện nghi cơ bản' 
  },
  { 
    id: '4', 
    name: 'Family Room', 
    price: '$150', 
    image: 'https://i.pinimg.com/474x/81/fc/fb/81fcfb47e9f996e2fd62dff0c5e18e10.jpg', 
    features: 'Không gian lớn, nhiều giường, phù hợp gia đình' 
  },
  { 
    id: '5', 
    name: 'Luxury Suite', 
    price: '$300', 
    image: 'https://i.pinimg.com/474x/6c/88/6a/6c886a58955b62b80b29d29a69432904.jpg', 
    features: 'Thiết kế sang trọng, bể bơi riêng, dịch vụ 5 sao' 
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách phòng khách sạn</Text>
      <FlatList
        data={ROOMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.features}>{item.features}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD', // Màu nền nhẹ
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: {
    flex: 1,
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 5,
  },
  features: {
    fontSize: 14,
    color: '#424242',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
