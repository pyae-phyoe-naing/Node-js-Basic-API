const DB = require('../schema/comment');
const postDB = require('../schema/post');
const userDB = require('../schema/user');
const {
    responseMsg
} = require('../utils/helper');

const add = async (req, res, next) => {
    req.body.name = req.body.user.name;
    req.body.email = req.body.user.email;
    delete req.body.user;
    let comment = await new DB(req.body).save();
    responseMsg(res, true, 'Comment Add', comment);
}
const drop = async (req, res, next) => {
    let comment = await DB.findById(req.params.id);
    let deleteEmail = req.body.user.email;
    if (!comment) {
        next(new Error('Comment not found'));
        return;
    }
    let post = await postDB.findById(comment.postId);
    let postOwner = await userDB.findById(post.user);
    if (deleteEmail == comment.email || deleteEmail == postOwner.email) {
        await DB.findByIdAndDelete(comment._id);
        responseMsg(res, true, 'Comment deleted', comment);
    } else {
        next(new Error('Cannot accept comment'));
    }
}
module.exports = {
    add,
    drop
}