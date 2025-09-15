import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';

const TodoScreen = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        setTodos([
            { id: 1, text: 'Học lập trình React Native', completed: false },
            { id: 2, text: 'Làm ứng dụng Todo List', completed: false },
        ]);
    }, []);

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
            setTodos([...todos, newTodoItem]);
            setNewTodo('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newTodo}
                    onChangeText={setNewTodo}
                    placeholder="Nhập công việc mới"
                    placeholderTextColor="#b0bec5"
                />
                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                    <Text style={styles.addButtonText}>Thêm</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Animated.View style={[styles.todoItem, { opacity: fadeAnim }]}>
                        <Text style={styles.todoText}>{item.text}</Text>
                        <TouchableOpacity 
                            style={[styles.statusButton, item.completed ? styles.completed : styles.notCompleted]}
                            onPress={() => toggleComplete(item.id)}
                        >
                            <Text style={styles.statusText}>
                                {item.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                            <Text style={styles.deleteButton}>X</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#263238',
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#4db6ac',
        borderRadius: 8,
        padding: 12,
        color: '#ffffff',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#4db6ac',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginLeft: 10,
    },
    addButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    todoItem: {
        backgroundColor: '#37474f',
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 3,
    },
    todoText: {
        fontSize: 18,
        color: '#ffffff',
        flex: 1,
    },
    statusButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    completed: {
        backgroundColor: '#81c784',
    },
    notCompleted: {
        backgroundColor: '#ffb74d',
    },
    statusText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    deleteButton: {
        color: '#ff5252',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TodoScreen;

