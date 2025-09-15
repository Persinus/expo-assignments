const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auths");
const postRoutes = require("./Routes/Posts");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://nguyenmanh2004devgame:FaEE2405@cluster0.oaaypkq.mongodb.net/blogManagement"); // <- Thay Mongo URI

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(3000, () => console.log("Server running"));