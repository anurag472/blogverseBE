const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)