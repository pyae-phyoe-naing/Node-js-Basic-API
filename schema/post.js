const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    cat: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'category'
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    }
});
const Post = mongoose.model('post', postSchema);
module.exports = Post;