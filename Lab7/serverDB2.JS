const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://nguyenmanh2004devgame:FaEE2405@cluster0.oaaypkq.mongodb.net/React-native-Lab7', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tạo schema và model cho người dùng
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('users', userSchema);

// Dữ liệu người dùng (thay thế bằng cơ sở dữ liệu trong thực tế)
let users = [];

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route đăng ký
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered!');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
});

// Route đăng nhập
app.post('/api/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(400).send('Không tìm thấy người dùng');
  
      // So sánh password nhập vào với mật khẩu đã hash trong database
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return res.status(400).send('Sai mật khẩu');
  
      // Nếu đúng, tạo token
      const accessToken = jwt.sign({ username: user.username }, 'your_secret_key');
      res.json({ token: accessToken });
    } catch (error) {
      res.status(500).send('Lỗi server');
    }
  });
// Route lấy thông tin người dùng
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send();
  }
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});