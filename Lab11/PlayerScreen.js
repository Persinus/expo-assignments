import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import { useMusic } from "./Context/MusicContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function PlayerScreen() {
  const {
    currentSong,
    isPlaying,
    play,
    pause,
    next,
    previous,
    repeat,
    toggleRepeat,
    shuffle,
    toggleShuffle,
    volume,
    setVolume,
    position,
    duration,
    sound,
  } = useMusic();

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const rotation = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(null);

  useFocusEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  });

  useEffect(() => {
    stopRotation();
    rotation.setValue(0);
    if (isPlaying) startRotation();
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) startRotation();
    else stopRotation();
  }, [isPlaying]);

  const startRotation = () => {
    rotateAnim.current = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    );
    rotateAnim.current.start();
  };

  const stopRotation = () => {
    if (rotateAnim.current) rotateAnim.current.stop();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleSeek = async (value) => {
    if (sound) {
      const millis = value * duration;
      await sound.setPositionAsync(millis);
    }
  };

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!currentSong) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "#999", fontSize: 16 }}>🎧 Chưa chọn bài hát</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && { backgroundColor: "#121212" }]}>
      <ImageBackground
        source={currentSong.artwork}
        style={styles.background}
        blurRadius={40}
        resizeMode="cover"
      >
        <BlurView intensity={80} style={styles.blurContainer} tint={isDark ? "dark" : "light"}>
          <Animated.View>
            <View style={styles.artworkWrapper}>
              <Animated.Image
                source={currentSong.artwork}
                style={[styles.artwork, { transform: [{ rotate: rotateInterpolate }] }]}
              />
            </View>

            <View style={styles.songInfo}>
              <Text style={styles.title}>{currentSong.title}</Text>
              <Text style={styles.artist}>{currentSong.artist}</Text>
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                value={position / duration}
                minimumValue={0}
                maximumValue={1}
                onSlidingComplete={handleSeek}
                thumbTintColor="#1DB954"
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="#555"
              />
              <View style={styles.timeWrapper}>
                <Text style={styles.time}>{formatTime(position)}</Text>
                <Text style={styles.time}>{formatTime(duration)}</Text>
              </View>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity onPress={previous}>
                <Icon name="skip-previous" size={40} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={isPlaying ? pause : play}>
                <Icon
                  name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
                  size={80}
                  color="#1DB954"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={next}>
                <Icon name="skip-next" size={40} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomRow}>
              <TouchableOpacity onPress={toggleRepeat}>
                <Icon name="repeat" size={30} color={repeat ? "#1DB954" : "#999"} />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleShuffle}>
                <Icon name="shuffle" size={30} color={shuffle ? "#1DB954" : "#999"} />
              </TouchableOpacity>

              <View style={styles.volumeContainer}>
                <Text style={styles.volumeLabel}>
                  Volume: {Math.round(volume * 100)}%
                </Text>
                <Slider
                  value={volume}
                  minimumValue={0}
                  maximumValue={1}
                  onValueChange={(v) => {
                    setVolume(v);
                    if (sound) sound.setVolumeAsync(v);
                  }}
                  minimumTrackTintColor="#1DB954"
                  maximumTrackTintColor="#ccc"
                  thumbTintColor="#1DB954"
                />
              </View>
            </View>
          </Animated.View>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  background: { flex: 1 },
  blurContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  artworkWrapper: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  artwork: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    borderWidth: 10,
    borderColor: "#f0f0f0",
  },
  songInfo: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  artist: {
    fontSize: 16,
    color: "#ccc",
  },
  sliderContainer: {
    width: "100%",
    marginTop: 30,
    Backgroundcolor: "#000",
  },
  timeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "#ddd",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 30,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  volumeContainer: {
    width: "80%",
  },
  volumeLabel: {
    fontSize: 14,
    color: "#eee",
    marginBottom: 4,
    textAlign: "right",
  },
  volumeSlider: {
    width: "100%",
  },
});
