const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('category', postSchema);
module.exports = Post;