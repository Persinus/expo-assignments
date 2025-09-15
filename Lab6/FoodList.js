import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const foodData = [
  { name: 'Pizza', image: 'https://i.pinimg.com/474x/ab/e6/57/abe65721a6d06545c99230151aab0177.jpg' },
  { name: 'Burger', image: 'https://i.pinimg.com/474x/eb/cb/c6/ebcbc6aaa9deca9d6efc1efc93b66945.jpg' },
  { name: 'Sushi', image: 'https://i.pinimg.com/474x/ad/10/24/ad1024bec8ffd60319b5157195847ba5.jpg' },
  { name: 'Pasta', image: 'https://i.pinimg.com/474x/a6/e1/8f/a6e18f7038d0e901d70e872f53ebf818.jpg' },
  { name: 'Steak', image: 'https://i.pinimg.com/474x/2f/11/07/2f11077517c74244340b8b727a76977e.jpg' },
  { name: 'Salad', image: 'https://i.pinimg.com/474x/72/d9/af/72d9af964d384fc2a16fd087c1062a7c.jpg' },
  { name: 'Taco', image: 'https://i.pinimg.com/474x/f5/20/10/f52010f1acafbe3969cc567c41d44865.jpg' },
  { name: 'Ice Cream', image: 'https://i.pinimg.com/474x/96/c1/55/96c155a1d1c568bbf2708a405eb36e84.jpg' },
  { name: 'Pancake', image: 'https://i.pinimg.com/474x/98/6e/80/986e8020d901fe1c313e9460495ec5c3.jpg' },
  { name: 'Soup', image: 'https://i.pinimg.com/474x/42/9e/bc/429ebc0c25b0da48178708315f2da1af.jpg' },
  { name: 'Fries', image: 'https://i.pinimg.com/474x/73/7e/d9/737ed93987aae98a76fc2e5f12fc0ecc.jpg' },
  { name: 'Sandwich', image: 'https://i.pinimg.com/474x/9e/00/07/9e00078d29c02713a5d1d0915a2f2fc6.jpg' },
];

const FoodList = () => {
  return (
    <FlatList
      data={foodData}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.foodItem}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
 
    container: {
      flex: 1,
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Cho phép item tự động xuống dòng
      justifyContent: 'space-between',
    },
    foodItem: {
      flexGrow: 1, // Cho phép item mở rộng để điền vào không gian còn trống
      flexShrink: 1, // Đảm bảo item có thể co lại khi cần
      width: '48%', // Giữ khoảng cách đẹp giữa các item
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      marginBottom: 10, // Tạo khoảng cách giữa các hàng
    },
    image: {
      width: '100%', // Căn chỉnh hình ảnh theo item
      height: 120,
      borderRadius: 10,
    },
    text: {
      textAlign: 'center',
      marginTop: 5,
      fontWeight: 'bold',
      fontSize: 16,
    },

});

export default FoodList;
