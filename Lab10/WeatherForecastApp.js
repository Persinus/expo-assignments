import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from "react-native";
import { useNetworkStatus } from "./Network"; // Custom hook
import axios from "axios";
import * as Notifications from 'expo-notifications';

const cityBackgrounds = {
  Hanoi: "https://i.pinimg.com/474x/87/9a/a0/879aa0d98eab8913cdab628e0ba35be7.jpg",
  Saigon: "https://i.pinimg.com/474x/ef/78/37/ef78370fd9db0d29245b16444393baf6.jpg",
  Tokyo: "https://i.pinimg.com/474x/b1/3f/75/b13f753f5b64f66b7601f0de6f76a83f.jpg",
  Seoul: "https://i.pinimg.com/474x/83/89/52/83895264750bf768114d2c65459641db.jpg",
  Shanghai: "https://i.pinimg.com/474x/1a/d7/a3/1ad7a3be4ec49597d84429b84d0c956a.jpg",
  Bangkok: "https://i.pinimg.com/474x/15/25/02/152502b64f520bdca0f57deaa9273f98.jpg",
};

export default function WeatherForecastApp() {
  const { networkStatus } = useNetworkStatus(); // Custom hook
  const [weatherData, setWeatherData] = useState(null);
  const [lastSelectedCity, setLastSelectedCity] = useState(null);
  const isOffline = networkStatus === "You are offline!";
  const cities = ["Hanoi", "Saigon", "Tokyo", "Seoul", "Shanghai", "Bangkok"];

  const getBackgroundImage = () => {
    return cityBackgrounds[lastSelectedCity] || "https://i.pinimg.com/474x/05/34/fa/0534fa3e1acdfebc0e796a9676fe44ae.jpg";
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=90a653edaf7d4389b1532422250504&q=${city}`
      );
      setWeatherData(response.data);
      setLastSelectedCity(city);
      sendNotification(
        `Thời tiết tại ${city}`,
        `Nhiệt độ: ${response.data.current.temp_c} °C\nĐộ ẩm: ${response.data.current.humidity}%`
      );
    } catch (error) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
    }
  };

  const sendNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null,
    });
  };

  return (
    <ImageBackground
      source={{ uri: getBackgroundImage() }}
      style={styles.container}
    >
      <Text style={styles.title}>Weather Forecast</Text>

      <View
        style={[
          styles.statusContainer,
          { backgroundColor: isOffline ? "#FF3300" : "#00FF99" },
        ]}
      >
        <Text style={styles.statusText}>
          {isOffline ? "No network connection." : "Connected"}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {isOffline && weatherData ? (
          <Image
            source={{ uri: "https://i.pinimg.com/736x/ee/ce/45/eece454d38a9d04b0ef952128a64ff36.jpg" }}
            style={styles.offlineImage}
          />
        ) : null}

        {weatherData && !isOffline ? (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>
              📍 {weatherData.location.name}
            </Text>
            <Text style={styles.weatherText}>
              Temperature: {weatherData.current.temp_c} °C
            </Text>
            <Text style={styles.weatherText}>
              Condition: {weatherData.current.condition.text}
            </Text>
            <Image
              source={{ uri: `https:${weatherData.current.condition.icon}` }}
              style={styles.weatherIcon}
            />
            <Text style={styles.weatherText}>
              Humidity: {weatherData.current.humidity}%
            </Text>
            <Text style={styles.weatherText}>
              Wind: {weatherData.current.wind_kph} kph
            </Text>
          </View>
        ) : (
          isOffline && (
            <View style={styles.loadingContainer}>
              <Text style={styles.offlineText}>
                No network connection. Please check your internet.
              </Text>
            </View>
          )
        )}
      </View>

      <View style={styles.fabContainer}>
        {cities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.fab}
            onPress={() => fetchWeatherByCity(city)}
          >
            <Text style={styles.fabText}>{city}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  statusContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignSelf: "center",
  },
  statusText: {
    fontSize: 16,
    color: "#000",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  offlineImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  weatherContainer: {
    alignItems: "center",
    backgroundColor: "rgba(242, 228, 228, 0.7)",
    padding: 15,
    borderRadius: 10,
  },
  cityName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 16,
    color: "#fff",
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  offlineText: {
    color: "#fff",
    textAlign: "center",
  },
  fabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  fab: {
    backgroundColor: "#03dac6",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 5,
  },
  fabText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
});
