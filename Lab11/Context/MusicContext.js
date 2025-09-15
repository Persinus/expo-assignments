import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs] = useState([
    {
      id: '1',
      title: 'Vroom Vroom',
      artist: 'Tempest',
      artwork: require('../assets/bai1.png'),
      uri: require('../assets/bai1.mp3'),
    },
    {
      id: '2',
      title: 'Zankyou Sanka',
      artist: 'Aimer',
      artwork: require('../assets/bai2.png'),
      uri: require('../assets/bai2.mp3'),
    },
    {
      id: '3',
      title: 'Trên Tình Bạn Dưới Tình Yêu',
      artist: 'Min,16 Typh',
      artwork: require('../assets/bai3.png'),
      uri: require('../assets/bai3.mp3'),
    },
    {
      id: '4',
      title: 'How Do You Like That',
      artist: 'Black Pink',
      artwork: require('../assets/bai4.png'),
      uri: require('../assets/bai4.mp3'),
    },
    {
      id: '5',
      title: 'Blue Bird',
      artist: 'Ikimono-gakari',
      artwork: require('../assets/bai5.png'),
      uri: require('../assets/bai5.mp3'),
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  const soundRef = useRef(null);
  const loadingRef = useRef(false);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setVolumeAsync(volume).catch(() => {});
    }
  }, [volume]);

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) return;
    if (status.positionMillis != null) setPosition(status.positionMillis);
    if (status.durationMillis != null) setDuration(status.durationMillis);

    if (status.didJustFinish) {
      if (repeat) {
        soundRef.current.replayAsync();
      } else {
        next();
      }
    }
  };

  const loadNewSong = async (index) => {
    try {
      if (loadingRef.current) return;
      loadingRef.current = true;

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        songs[index].uri,
        { shouldPlay: true, volume },
        onPlaybackStatusUpdate
      );

      soundRef.current = sound;
      setCurrentIndex(index);
      setIsPlaying(true);
    } catch (e) {
      console.error('Error loading song:', e);
    } finally {
      loadingRef.current = false;
    }
  };

  const play = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const pause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const next = () => {
    const nextIndex = shuffle
      ? Math.floor(Math.random() * songs.length)
      : (currentIndex + 1) % songs.length;
    loadNewSong(nextIndex);
  };

  const previous = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadNewSong(prevIndex);
  };

  const toggleRepeat = () => setRepeat(!repeat);
  const toggleShuffle = () => setShuffle(!shuffle);

  return (
    <MusicContext.Provider
      value={{
        songs,
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
        sound: soundRef.current,
        position,
        duration,
        loadNewSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
