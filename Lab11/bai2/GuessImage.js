import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { easyImages, mediumImages, hardImages } from "./images";
import { shuffleArray, getRandomLetters } from "./util";
import styles from "./styles";

const GuessImageGame = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [letters, setLetters] = useState([]);
  const [gameStarted, setGameStarted] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const startGame = () => {
    setDifficulty("easy");
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    setPaused(false);
    const list = shuffleArray(getImageListByDifficulty("easy"));
    setQuestionList(list);
    setCurrentIndex(0);
    setCurrentImage(list[0]);
    setSelectedLetters([]);
    setLetters(shuffleArray(getRandomLetters(list[0].answer)));
    setTimeLeft(15);
  };

  useEffect(() => {
    if (!gameStarted || paused) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        Alert.alert("⏱ Hết giờ!", `Bạn đã thua. Đáp án là: ${currentImage.answer}`);
        endGame();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, paused]);

  useEffect(() => {
    if (gameStarted) {
      const list = getImageListByDifficulty(difficulty);
      setQuestionList(shuffleArray(list));
      setCurrentIndex(0);
    }
  }, [difficulty, gameStarted]);

  useEffect(() => {
    if (gameStarted && questionList.length > 0) {
      setCurrentImage(questionList[currentIndex]);
      setSelectedLetters([]);
      setLetters(shuffleArray(getRandomLetters(questionList[currentIndex].answer)));
      setTimeLeft(15);
      setPaused(false);
    }
  }, [currentIndex, questionList]);

  const getImageListByDifficulty = (level) => {
    switch (level) {
      case "easy":
        return [...easyImages];
      case "medium":
        return [...mediumImages];
      case "hard":
        return [...hardImages];
      default:
        return [];
    }
  };

  const handleLetterPress = (letter) => {
    if (selectedLetters.length < currentImage.answer.length) {
      setSelectedLetters((prev) => [...prev, letter]);
    }
  };

  const handleDeletePress = () => {
    setSelectedLetters((prev) => prev.slice(0, -1));
  };

  const handleConfirmPress = () => {
    const guess = selectedLetters.join("").toLowerCase();
    if (guess === currentImage.answer.toLowerCase()) {
      Alert.alert("✅ Chính xác!", "Bạn đoán đúng rồi!");
      setScore((prev) => prev + 1);
      handleNextQuestion();
    } else {
      Alert.alert("❌ Sai rồi!", `Bạn đã thua. Đáp án là: ${currentImage.answer}`);
      endGame();
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex === 10) {
      if (difficulty === "easy") {
        Alert.alert("🥳 Chuyển độ khó", "Bạn đã hoàn thành cấp độ dễ. Bắt đầu cấp độ trung bình!");
        setDifficulty("medium");
      } else if (difficulty === "medium") {
        Alert.alert("🔥 Đến cấp độ khó!", "Cố lên nào!");
        setDifficulty("hard");
      } else {
        endGame();
      }
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const endGame = () => {
    setGameStarted(false);
    setGameOver(true);
  };

  return (
    <View style={styles.container}>
      {gameStarted ? (
        <>
          <Text style={styles.header}>🎯 Đoán Hình Ảnh</Text>
          <Image source={currentImage?.src} style={styles.image} resizeMode="contain" />
          <Text style={styles.timer}>⏱ {timeLeft}s</Text>
          <Text style={styles.score}>Điểm: {score}</Text>
          <Text style={styles.selectedLetters}>{selectedLetters.join("")}</Text>

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity onPress={handleDeletePress} style={styles.controlButton}>
              <Icon name="backspace" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirmPress} style={styles.controlButton}>
              <Text style={{ color: "white" }}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaused((prev) => !prev)}
              style={styles.controlButton}
            >
              <Icon name={paused ? "play-arrow" : "pause"} size={24} color="white" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={letters}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.letterButton} onPress={() => handleLetterPress(item)}>
                <Text style={styles.letterText}>{item}</Text>
              </TouchableOpacity>
            )}
            numColumns={5}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.letterContainer}
          />
        </>
      ) : (
        <Modal visible={gameOver} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 30,
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>🎉 Kết thúc!</Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Điểm của bạn: {score}</Text>
              <Button title="Chơi lại" onPress={startGame} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default GuessImageGame;