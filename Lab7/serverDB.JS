const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://nguyenmanh2004devgame:FaEE2405@cluster0.oaaypkq.mongodb.net/React-native-Lab7');

// Tạo schema và Model cho Item
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('bai1', itemSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoints
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu items' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm item' });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật item' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item đã được xóa' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi xóa item' });
  }
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});