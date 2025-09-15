import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route }) => {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const storedFavorites = JSON.parse(await AsyncStorage.getItem('@favorites')) || [];
      setIsFavorite(storedFavorites.some(fav => fav.id === movie.id));
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    let storedFavorites = JSON.parse(await AsyncStorage.getItem('@favorites')) || [];

    if (isFavorite) {
      storedFavorites = storedFavorites.filter(fav => fav.id !== movie.id);
    } else {
      storedFavorites.push(movie);
    }

    await AsyncStorage.setItem('@favorites', JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      {/* Trailer Video */}
      <View style={styles.videoContainer}>
        <WebView 
          source={{ uri: `https://www.youtube.com/embed/${movie.trailer}` }} 
          style={styles.video} 
        />
      </View>

      {/* Nội dung phim */}
      <View style={styles.content}>
        {/* Hình ảnh phim */}
        <Image source={{ uri: movie.image }} style={styles.image} />

        {/* Thông tin phim */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.description}>📅 Năm phát hành: {movie.year}</Text>
          <Text style={styles.description}>🎬 Đạo diễn: {movie.director}</Text>
        </View>
      </View>

      {/* Nút Thêm vào Yêu thích */}
      <TouchableOpacity 
        style={[styles.favoriteButton, isFavorite ? styles.favorited : styles.notFavorited]} 
        onPress={toggleFavorite}
      >
        <Text style={styles.buttonText}>
          {isFavorite ? '❤️ Đã yêu thích' : '🤍 Thêm vào Yêu thích'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFCDB' },
  videoContainer: { width: '100%', height: 250, backgroundColor: '#000' },
  video: { flex: 1 },
  content: { 
    flexDirection: 'row', 
    padding: 20, 
    alignItems: 'center' 
  },
  image: { 
    width: '40%', 
    height: 150,  
    borderRadius: 10,
    resizeMode: 'cover',
  },
  infoContainer: { 
    flex: 1, 
    paddingLeft: 15, 
    justifyContent: 'center' 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  description: { fontSize: 16, color: '#555', marginTop: 5 },

  // Nút yêu thích ở dưới cùng và rõ ràng hơn
  favoriteButton: { 
    position: 'absolute',
    bottom: 20, 
    left: '10%',
    right: '10%',
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center',
  },
  buttonText: { fontSize: 18, fontWeight: 'bold' },
  
  // Trạng thái nút
  favorited: { backgroundColor: '#E91E63' }, // Màu đỏ đậm khi đã yêu thích
  notFavorited: { backgroundColor: '#64B5F6' }, // Màu xám khi chưa yêu thích
});

export default DetailScreen;