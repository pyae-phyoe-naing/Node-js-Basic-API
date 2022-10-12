const DB = require('../schema/post');
const {
    responseMsg
} = require('../utils/helper');
const {
    deleteFile
} = require('../utils/gallery');

const all = async (req, res, next) => {
    let posts = await DB.find().populate('user cat', '-password -__v');
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
    let post = await DB.findById(req.params.id).populate('user cat', '-password -__v');
    if (!post) {
        next(new Error('Post not found with that ID'));
        return;
    }
    responseMsg(res, true, 'Get single post', post);
}
const update = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (!post) {
        next(new Error('Post not found with that ID'));
        return;
    }
    if (req.body.image) {
        deleteFile(post.image);
    }
    let userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    await DB.findByIdAndUpdate(post._id, req.body);
    let updatePost = await DB.findById(post._id);
    responseMsg(res, true, 'Update post', updatePost);
}
const drop = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        deleteFile(post.image);
        await DB.findByIdAndDelete(post._id);
        responseMsg(res, true, 'Delete post', post);
    } else {
        next(new Error('Post not found with that ID'));
    }
}
const byCatId = async (req, res, next) => {
    let cats = await DB.find({
        cat: req.params.id
    }).populate('user cat','-password -__V');
    responseMsg(res, true, 'Cat ID by post', cats);

}
const byUserId = async (req, res, next) => {
    let cats = await DB.find({
        user: req.params.id
    }).populate('user cat', '-password -__V');
    responseMsg(res, true, 'User ID by post', cats);

}
const paginate = async (req, res, next) => {
    let page = req.params.page;
    page = page == 1 ? 0 : page - 1;
    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * page;
    let posts = await DB.find().skip(skipCount).limit(limit);
    responseMsg(res,true,'Paginate Page',posts)
}
module.exports = {
    all,
    add,
    get,
    update,
    drop,
    byCatId,
    byUserId,
    paginate
}