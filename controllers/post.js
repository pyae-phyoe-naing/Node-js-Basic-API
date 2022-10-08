const DB = require('../schema/post');
const {
    responseMsg
} = require('../utils/helper');

const all = async (req, res, next) => {
    let posts = await DB.find();
    responseMsg(res, true, 'Get all posts', posts);
}
const add = async (req, res, next) => {
    let userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    let post = await new DB(req.body).save();
    responseMsg(res, true, 'Add new post', post);
}
const get = async (req, res, next) => {
    let post = await DB.findById(req.params.id).populate('cat', '-__v').populate('user', '-password -__v');
    if (!post) {
        next(new Error('Post not found with that ID'));
        return;
    }
    responseMsg(res, true, 'Get single post', post);
}
module.exports = {
    all,
    add,
    get
}