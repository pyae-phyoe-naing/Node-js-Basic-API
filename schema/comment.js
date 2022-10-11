const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    postId : { type: Schema.Types.ObjectId, required: true,ref:'post'},
    name : { type: String, required: true},
    email : { type: String, required: true},
    content : { type: String, required: true},
    created : { type: Date, default: Date.now }
});

const comment = mongoose.model('comment',commentSchema);
module.exports = comment;