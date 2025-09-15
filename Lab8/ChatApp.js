import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, Button, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';

const GEMINI_API_KEY = 'AIzaSyAe88TPEMD-VaXGDeFZSN_wxw56pSWXggU';
const socket = io('http://192.168.1.5:3000');


const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: message.text, sender: 'ai' }
      ]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: input, sender: 'user' }
    ]);

    socket.emit('message', { text: input }); // Gửi tin nhắn của user lên server

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
        contents: [{ role: 'user', parts: [{ text: input }] }],
        generationConfig: {
            temperature: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: 'text/plain'
        }
    };

    try {
        const response = await axios.post(apiUrl, payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const aiMessage = response.data.candidates[0].content.parts[0].text;
        socket.emit('ai-response', { text: aiMessage }); // Gửi phản hồi AI đến server

        setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now().toString(), text: aiMessage, sender: 'ai' }
        ]);
    } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now().toString(), text: `Không thể tải dữ liệu. Lỗi: ${error.message}`, sender: 'ai' }
        ]);
    }

    setInput('');
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat với Gemini AI✨</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'user' ? styles.userContainer : styles.aiContainer]}>
            <Image source={item.sender === 'user' ? require('./assets/user.png') : require('./assets/bot.png')} style={styles.avatar} />
            <Text style={item.sender === 'user' ? styles.userMessage : styles.aiMessage}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="Gửi" onPress={sendMessage} color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5fc',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007BFF',
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  userMessage: {
    backgroundColor: '#dcf8c6',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  aiMessage: {
    backgroundColor: '#efefef',
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
});

export default ChatApp;
