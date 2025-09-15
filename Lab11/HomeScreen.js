import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { useMusic } from './Context/MusicContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const {
    songs,
    currentIndex,
    currentSong,
    isPlaying,
    loadNewSong,
    play,
    pause,
    previous,
    next,
  } = useMusic();
  const navigation = useNavigation();

  const rotation = useRef(new Animated.Value(0)).current;
  const [categoryIndex, setCategoryIndex] = useState(0);

  const categories = [
    {
      title: 'Top 100 Hàn Quốc',
      image: 'https://i.pinimg.com/736x/f4/eb/25/f4eb256ff49c924729ea487c885d12ce.jpg',
    },
    {
      title: 'Top 100 Pop Âu Mỹ',
      image: 'https://i.pinimg.com/474x/a4/d3/18/a4d31824a21c0aaa6513bff15d6d7dd8.jpg',
    },
    {
      title: 'Top 100 Rap Việt',
      image: 'https://i.pinimg.com/474x/4a/e6/f3/4ae6f3f0e37f02770150262bcef915ce.jpg',
    },
    {
      title: 'Top 100 EDM',
      image: 'https://i.pinimg.com/474x/b9/1d/70/b91d70e7ea42d38b88d512feb4b21bbc.jpg',
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotation.stopAnimation();
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handlePress = (index) => {
    loadNewSong(index);
    navigation.navigate('Player');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Danh mục nổi bật với ảnh từ web */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {categories.map((cat, idx) => (
            <Animated.View
              key={idx}
              style={[
                styles.categoryCard,
                {
                  opacity: categoryIndex === idx ? 1 : 0.5,
                  transform: [{ scale: categoryIndex === idx ? 1 : 0.95 }],
                },
              ]}
            >
              <Image source={{ uri: cat.image }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{cat.title}</Text>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Bắt đầu nghe */}
        <TouchableOpacity
          style={styles.featuredSong}
          onPress={() => {
            loadNewSong(0);
            navigation.navigate('Player');
          }}
        >
          <Image source={songs[0].artwork} style={styles.featuredImage} />
          <View>
            <Text style={styles.featuredTitle}>Bắt đầu nghe</Text>
            <Text style={styles.featuredSubtitle}>{songs[0].title}</Text>
          </View>
        </TouchableOpacity>

        {/* Gợi ý cho bạn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
          <Text style={{ color: '#777' }}>• Có thể bạn sẽ thích "Song 2"</Text>
        </View>

        {/* Danh sách bài hát */}
        <Text style={styles.title}>Tất cả bài hát</Text>
        <FlatList
          data={songs}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.item} onPress={() => handlePress(index)}>
              <Image source={item.artwork} style={styles.artwork} />
              <View style={styles.info}>
                <Text>{item.title}</Text>
                <Text>{item.artist}</Text>
              </View>
              <Icon name="play-arrow" size={30} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Mini player cố định */}
      {currentSong && (
        <TouchableOpacity style={styles.miniPlayer} onPress={() => navigation.navigate('Player')}>
          <Animated.Image
            source={currentSong.artwork}
            style={[styles.miniArtwork, { transform: [{ rotate: rotateInterpolate }] }]}
          />
          <View style={styles.miniInfo}>
            <Text style={styles.songTitle} numberOfLines={1}>{currentSong.title}</Text>
            <Text style={styles.songArtist} numberOfLines={1}>{currentSong.artist}</Text>
          </View>
          <View style={styles.miniControls}>
            <TouchableOpacity onPress={previous} style={styles.controlBtn}>
              <Icon name="skip-previous" size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={isPlaying ? pause : play} style={styles.controlBtn}>
              <Icon name={isPlaying ? 'pause' : 'play-arrow'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={next} style={styles.controlBtn}>
              <Icon name="skip-next" size={28} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#FFE1FF' },

  // Danh mục
  categoryScroll: {
    marginBottom: 24,
  },
  categoryCard: {
    width: 120,
    height: 140,
    backgroundColor: '#FFCCFF',
    borderRadius: 16,
    marginRight: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  categoryImage: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    marginBottom: 6,
    resizeMode: 'cover',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  featuredSong: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9999FF',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  featuredImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  featuredTitle: { fontSize: 16, fontWeight: '700' },
  featuredSubtitle: { fontSize: 13, color: '#666' },

  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },

  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 16, marginBottom: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 12,
    borderBottomWidth: 0.5,
    borderColor: '#FF6600',
  },
  artwork: { width: 50, height: 50, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },

  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#CC66FF',
    elevation: 10,
  },
  miniArtwork: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  miniInfo: { flex: 1 },
  songTitle: { fontSize: 14, fontWeight: '600' },
  songArtist: { fontSize: 12, color: '#CC66FF' },
  miniControls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  controlBtn: { marginHorizontal: 4 },
});
