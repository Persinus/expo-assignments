// seedUsers.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./Models/User");

mongoose.connect("mongodb+srv://nguyenmanh2004devgame:FaEE2405@cluster0.oaaypkq.mongodb.net/blogManagement");


async function seed() {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const users = [
      {
        username: "NguyenManh",
        password: hashedPassword,
        role: "admin",
      },
      {
        username: "PhanTho",
        password: hashedPassword,
        role: "user",
      },
    ];

    await User.deleteMany({}); // Xóa sạch user cũ nếu có
    await User.insertMany(users);

    console.log("Seeded users successfully.");
    process.exit();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seed();