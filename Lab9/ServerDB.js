const express = require('express'); // Import thư viện Express
const mongoose = require('mongoose'); // Import thư viện Mongoose để làm việc với MongoDB
const cors = require('cors'); // Import thư viện CORS để cho phép yêu cầu từ các nguồn khác
const bodyParser = require('body-parser'); // Import thư viện body-parser để phân tích dữ liệu từ request

const app = express(); // Khởi tạo ứng dụng Express
const PORT = 5000; // Cổng mà server sẽ lắng nghe

// Kết nối MongoDB
mongoose.connect('mongodb+srv://nguyenmanh2004devgame:FaEE2405@cluster0.oaaypkq.mongodb.net/Lab9', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected')) // Log khi kết nối thành công
    .catch(err => console.error('MongoDB connection error:', err)); // Log lỗi nếu có

// Middleware
app.use(cors()); // Cho phép CORS
app.use(bodyParser.json()); // Phân tích dữ liệu JSON từ request



const friendSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên bạn bè
    phone: { type: String, required: true }, // Số điện thoại
    email: { type: String, required: true }, // Địa chỉ email
    avatar: { type: String, required: true }, // URL ảnh đại diện
    address: { type: String, required: false }, // Địa chỉ nhà
    birthday: { type: Date, required: false }, // Ngày sinh
    relationshipStatus: { type: String, required: false }, // Tình trạng quan hệ
    socialMedia: { type: [String], required: false }, // Mạng xã hội
    createdAt: { type: Date, default: Date.now }, // Ngày tạo hồ sơ
});

const Friend = mongoose.model('Friend', friendSchema, 'Friend');


// API endpoint để lấy danh sách bạn bè
// API endpoint để lấy danh sách bạn bè
app.get('/friends', async (req, res) => {
  try {
      const { search } = req.query; // Lấy tham số tìm kiếm từ query
      let friends;

      if (search) {
          // Nếu có tham số tìm kiếm, tìm kiếm theo tên
          friends = await Friend.find({ name: new RegExp(search, 'i') }); // Tìm kiếm không phân biệt chữ hoa chữ thường
      } else {
          // Nếu không có tham số tìm kiếm, lấy tất cả bạn bè
          friends = await Friend.find();
      }

      // Trả về danh sách bạn bè
      res.status(200).json(friends); // Trả dữ liệu về cho client
  } catch (error) {
      console.error('Error fetching friends:', error);
      res.status(500).json({ message: 'Error fetching friends' }); // Trả lỗi nếu có
  }
});
// API endpoint để thêm bạn bè
app.post('/friends', async (req, res) => {
    try {
      const { name } = req.body;
      const existingFriend = await Friend.findOne({ name });
      if (existingFriend) {
        return res.status(400).json({ message: 'Friend with this name already exists' });
      }
      const newFriend = new Friend(req.body);
      await newFriend.save();
      res.status(201).json(newFriend);
    } catch (error) {
      console.error('Error adding friend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // API endpoint để cập nhật bạn bè
  app.put('/friends/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const updatedFriend = await Friend.findOneAndUpdate({ _id: id }, req.body, { new: true });
      if (!updatedFriend) {
        return res.status(404).json({ message: 'Friend not found' });
      }
      res.json(updatedFriend);
    } catch (error) {
      console.error('Error updating friend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // API endpoint để xóa bạn bè
  app.delete('/friends/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedFriend = await Friend.findOneAndDelete({ _id: id });
      if (!deletedFriend) {
        return res.status(404).json({ message: 'Friend not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting friend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
