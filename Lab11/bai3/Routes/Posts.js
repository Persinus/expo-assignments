const express = require("express");
const Post = require("../Models/Post");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// Tạo post (admin + user)
router.get("/", authenticate, authorize(["admin", "user"]), async (req, res) => {
  const posts = await Post.find().populate("author", "username role");
  res.json(posts);
});
// Lấy tất cả post
router.post("/", authenticate, authorize(["admin", "user"]), async (req, res) => {
  let post = await Post.create({ ...req.body, author: req.user.id }); // <--- 👈 đúng kiểu
post = await Post.findById(post._id).populate("author", "username role"); // 👈 để populate cho chắc

  res.json(post);
});

// Sửa post (admin + user)
router.patch("/:id", authenticate, authorize(["admin", "user"]), async (req, res) => {
  const { title, content } = req.body;

  let post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true, runValidators: true }
  ).populate("author", "username role"); // ✅ populate để trả về object

  res.json(post);
});
// Xóa post (chỉ admin)
router.delete("/:id", authenticate, authorize(["admin"]), async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;