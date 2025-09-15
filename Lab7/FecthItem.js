const mongoose = require('mongoose');

// Kết nối tới MongoDB
mongoose.connect('mongodb+srv://nguyenmanh2004devgame:FaEE2405@cluster0.oaaypkq.mongodb.net/React-native-Lab7', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Tạo Schema và Model cho Item
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('bai1', itemSchema);

// Hàm để lấy danh sách items từ MongoDB
const fetchItems = async () => {
  try {
    const items = await Item.find();
    console.log('Items:', items);
  } catch (error) {
    console.error('Lỗi khi lấy items:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Gọi hàm fetchItems để thực hiện truy vấn
fetchItems();