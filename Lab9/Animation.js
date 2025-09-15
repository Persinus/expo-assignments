import React, { useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const translateAnim = useRef(new Animated.Value(0)).current;

    const handleFadeIn = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const handleScale = () => {
        Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleTranslate = () => {
        Animated.timing(translateAnim, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(translateAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Animation Demo</Text>
            <Animated.View
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#FF5722', // Màu cam tươi sáng
                    marginBottom: 20,
                    opacity: fadeAnim,
                    transform: [
                        { scale: scaleAnim },
                        { translateX: translateAnim },
                    ],
                    borderRadius: 10, // Bo tròn viền
                    shadowColor: '#000', // Màu của bóng
                    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển bóng
                    shadowOpacity: 0.3, // Độ mờ của bóng
                    shadowRadius: 4, // Độ mờ của bóng 
                }}
            />
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Phòng Deluxe</Text>
                    <Text style={styles.cardPrice}>Giá: $100/đêm</Text>
                </Card.Content>
            </Card>
            <Button icon="eye" mode="contained" onPress={handleFadeIn} style={styles.button}>Fade In</Button>
            <Button icon="resize" mode="contained" onPress={handleScale} style={styles.button}> Scale </Button>
            <Button icon="arrow-right" mode="contained" onPress={handleTranslate} style={styles.button}>Translate</Button>
            <Button icon="arrow-forward" mode="contained" onPress={() => navigation.navigate('Screen2', { param1: 'React Native', param2: 'Animations' })} style={styles.button}>
                Đi đến Screen 2
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6F7E6', // Màu nền nhẹ nhàng
        padding: 20,
    },
    header: {
        fontSize: 26, // Kích thước chữ lớn hơn
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2C3E50', // Màu chữ tối
    },
    card: {
        padding: 20,
        marginVertical: 20,
        width: '80%',
        alignItems: 'center',
        borderRadius: 12, // Bo tròn viền cho card
        elevation: 4, // Tạo chiều sâu cho card
    },
    cardTitle: {
        fontSize: 20, // Kích thước chữ lớn hơn
        fontWeight: 'bold',
        color: '#34495E', // Màu chữ của tiêu đề
    },
    cardPrice: {
        fontSize: 16,
        color: 'gray',
    },
    button: {
        width: '80%',
        marginVertical: 5,
        borderRadius: 8, // Bo tròn viền cho button
        backgroundColor: '#3498DB', // Màu xanh cho nút
    }
});

export default HomeScreen;