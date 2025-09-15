const express = require('express'); // Nhập thư viện Express
const http = require('http'); // Nhập thư viện HTTP
const { Server } = require('socket.io'); // Nhập Socket.IO

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Xử lý kết nối từ client
io.on('connection', (socket) => {
    console.log('🔗 A user connected');

    // Lắng nghe tin nhắn từ user
    socket.on('message', (message) => {
        console.log(`👤 User: ${message.text}`); // Log câu hỏi của user

        // Phát lại tin nhắn user đến tất cả client
        io.emit('message', message);
    });

    // Lắng nghe phản hồi từ AI do client gửi lên
    socket.on('ai-response', (aiMessage) => {
        console.log(`🤖 AI: ${aiMessage.text}`); // Log câu trả lời AI
        io.emit('message', aiMessage); // Phát tin nhắn AI đến tất cả client
    });

    // Xử lý khi người dùng ngắt kết nối
    socket.on('disconnect', () => {
        console.log('❌ User disconnected');
    });
});

// Chạy server trên cổng 3000
server.listen(3000, () => {
    console.log('🚀 Server is running on http://localhost:3000');
});