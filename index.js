const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Blog = require("./models/blogModel");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: "50mb" }))

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/create", async (req, res) => {
    console.log(req.body);
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get("/blogs", async (req, res) => {
    try {
        const page = req.query.page || 1
        const search = req.query.search || ''
        const regex = new RegExp(search, 'i')
        const limit = 9
        const skip = (page - 1) * limit;
        const blogs = await Blog.find({
            $or: [
                { name: { $regex: regex } },
                { creator: { $regex: regex } }
              ]
        }).skip(skip).limit(limit)
        res.json(blogs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
