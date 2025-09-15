const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect(
  'mongodb+srv://nguyenmanh2004devgame:FaEE2405@cluster0.oaaypkq.mongodb.net/React-native-Lab7',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Định nghĩa Schema cho Room
const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  type: String,
  rating: Number,
  availableDates: String,
  location: String,
});

const Room = mongoose.model('phongDB', RoomSchema, 'phongDB');

// API lấy danh sách phòng
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error('Lỗi khi lấy phòng:', error);
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu phòng' });
  }
});


io.on('connection', (socket) => {
  console.log('Người dùng kết nối');

  // Lắng nghe sự kiện phòng đã đặt
  socket.on('roomBooked', (data) => {
    console.log(`Phòng ${data.roomName} đã được đặt.`);
  });

  // Lắng nghe sự kiện phòng đã hủy
  socket.on('roomCancelled', (data) => {
    console.log(`Phòng ${data.roomName} đã bị hủy.`);
  });

  socket.on('disconnect', () => {
    console.log('Người dùng ngắt kết nối');
  });
});
server.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));