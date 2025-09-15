import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimerComponent({ time }) {
    const [count, setCount] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount > 0) {
                    return prevCount - 1;
                } else {
                    clearInterval(interval); // Dừng đếm khi thời gian = 0
                    return 0;
                }
            });
        }, 1000);

        // Clean up khi component bị unmount hoặc khi dừng đếm ngược
        return () => clearInterval(interval);
    }, [time]);

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Thời gian: {count}s</Text>
            {count === 0 && <Text style={styles.completeText}>Hoàn thành!</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    completeText: {
        marginTop: 10,
        fontSize: 16,
        color: 'green',
        fontWeight: '600',
    },
});