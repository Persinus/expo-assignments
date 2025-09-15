import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import TimerComponent from './TimeComponent';
import { InteractionManager } from 'react-native';

export default function Bai4Screen() {
    const [timers, setTimers] = useState([]);
    const [inputTime, setInputTime] = useState('');

    const addTimer = () => {
        if (inputTime > 0) {
            InteractionManager.runAfterInteractions(() => {
                setTimers(prevTimers => [
                    ...prevTimers, 
                    { id: Date.now(), time: parseInt(inputTime) }
                ]);
            });
            setInputTime('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nhập số giây để đếm ngược:</Text>
            <TextInput
                value={inputTime}
                onChangeText={setInputTime}
                keyboardType="numeric"
                style={styles.input}
            />
            <TouchableOpacity onPress={addTimer} style={styles.button}>
                <Text style={styles.buttonText}>Thêm</Text>
            </TouchableOpacity>
            <FlatList
                data={timers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.timerItem}>
                        <TimerComponent time={item.time} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#CCFFFF',
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    timerItem: {
        backgroundColor: '#fff',
        marginVertical: 8,
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
});