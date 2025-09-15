import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
} from "react-native";
import axios from "axios";

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false); // Kiểm tra trạng thái offline

    const fetchWeatherData = async () => {
        setLoading(true);  // Đảm bảo trạng thái loading luôn được cập nhật khi bắt đầu gọi API
        try {
            const response = await axios.get("http://api.weatherapi.com/v1/current.json?key=90a653edaf7d4389b1532422250504&q=saigon"); // Gọi API
            setWeatherData(response.data); // Cập nhật dữ liệu thời tiết
            setIsOffline(false);  // Nếu thành công, đánh dấu không phải offline
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setIsOffline(true); // Đánh dấu là offline nếu có lỗi
        } finally {
            setLoading(false); // Cập nhật loading khi API trả về kết quả
        }
    };

    useEffect(() => {
        fetchWeatherData(); // Gọi hàm lấy dữ liệu khi component được mount
    }, []);

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/20831/pexels-photo-209831.jpeg' }}
            style={styles.container}
        >
            <Text style={styles.title}>Weather Forecast</Text>

            <View style={[styles.statusContainer, { backgroundColor: isOffline ? "#ffcccc" : "#eefeff" }]}>
                <Text style={styles.statusText}>
                    {isOffline ? "Bạn đang offline." : "Kết nối thành công."}
                </Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#6200ee" />
            ) : (
                <View style={styles.weatherContainer}>
                    {weatherData ? (
                        <>
                            <Text style={styles.weatherTitle}>Weather in {weatherData.location.name}</Text>
                            <Text style={styles.weatherText}>Temperature: {weatherData.current.temp_c} °C</Text>
                            <Text style={styles.weatherText}>Condition: {weatherData.current.condition.text}</Text>
                            <Image
                                source={{ uri: `https:${weatherData.current.condition.icon}` }}
                                style={styles.weatherIcon}
                            />
                        </>
                    ) : (
                        <Text style={styles.offlineText}>Không thể lấy dữ liệu thời tiết.</Text>
                    )}
                    <TouchableOpacity style={styles.refreshButton} onPress={fetchWeatherData}>
                        <Text style={styles.refreshButtonText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    statusContainer: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    statusText: {
        fontSize: 16,
        color: '#000',
    },
    weatherContainer: {
        alignItems: 'center',
        padding: 20,
    },
    weatherTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    weatherText: {
        fontSize: 16,
        color: '#fff',
    },
    weatherIcon: {
        width: 50,
        height: 50,
        marginTop: 5,
    },
    refreshButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    refreshButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    offlineText: {
        color: '#fff',
        textAlign: 'center',
    },
});
