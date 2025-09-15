import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = JSON.parse(await AsyncStorage.getItem('@favorites')) || [];
      setFavorites(storedFavorites);
    };

    const focusListener = navigation.addListener('focus', loadFavorites);
    return focusListener;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 Danh sách yêu thích</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Chưa có phim nào trong danh sách yêu thích.</Text>
      ) : (
        <FlatList
  key={2} // Số cột phải là một key để FlatList render lại
  keyExtractor={(item) => item.id}
  data={favorites}
  numColumns={2} // Cố định số cột
  columnWrapperStyle={styles.row}
  renderItem={({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Details', { movie: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.info}>📅 {item.year}</Text>
      <Text style={styles.info}>🎬 {item.director}</Text>
    </TouchableOpacity>
  )}
/>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#C8E6C9', padding: 10 }, 
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: 'gray' },
  row: { justifyContent: 'space-between' },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    overflow: 'hidden',
    width: '48%', 
    marginBottom: 10,
    elevation: 5,
    paddingBottom: 10,
    alignItems: 'center'
  },
  image: { width: '100%', height: 180, resizeMode: 'cover' },
  movieTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 5 },
  info: { fontSize: 14, color: 'gray', textAlign: 'center' },
});

export default FavoritesScreen;
