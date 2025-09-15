import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const movies = [
  { id: '1', title: 'Inside Out 2', year: '2024', director: 'Kelsey Mann', image: 'https://i.pinimg.com/474x/a0/bf/eb/a0bfebcc8b0532bfe616e66b709a04be.jpg', trailer: 'LEjhY15eCx0' },
  { id: '2', title: 'Kung Fu Panda 4', year: '2024', director: 'Mike Mitchell', image: 'https://i.pinimg.com/474x/50/5f/9b/505f9be607ca87cfda9f1fd49b070660.jpg', trailer: '_inKs4eeHiI' },
  { id: '3', title: 'Moana 2', year: '2024', director: 'David Derrick Jr.', image: 'https://i.pinimg.com/474x/07/c2/9a/07c29adaa43e4685ab33466c50ba4d3e.jpg', trailer: 'hDZ7y8RP5HE' },
  { id: '4', title: 'Despicable Me 4', year: '2024', director: 'Chris Renaud', image: 'https://i.pinimg.com/474x/b7/2e/87/b72e87cf45c1ee343ec21616537bac89.jpg', trailer: 'qQlr9-rF32A' },
];

const numColumns = 2; // Hiển thị 2 cột

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={movies}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Details', { movie: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.info}>📅 {item.year}</Text>
            <Text style={styles.info}>🎬 {item.director}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFE0B2', padding: 10 }, 
  row: { justifyContent: 'space-between' }, 
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    overflow: 'hidden',
    width: '48%', 
    marginBottom: 10,
    elevation: 5,
  },
  image: { 
    width: '100%', 
    height: 180, 
    resizeMode: 'cover', 
  },
  title: { 
    marginTop: 5, 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center',
    paddingHorizontal: 5, 
  },
  info: { 
    fontSize: 14, 
    color: 'gray', 
    textAlign: 'center', 
    marginBottom: 5, 
  },
});

export default HomeScreen;
