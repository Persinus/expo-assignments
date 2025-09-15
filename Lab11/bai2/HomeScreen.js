import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/batchu.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>🎮 Welcome to Guess the Image Game!</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("GuessImageGame")}
        >
          <Text style={styles.startButtonText}>🚀 Start Playing</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#841584",
    padding: 15,
    borderRadius: 10,
  },
  startButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
