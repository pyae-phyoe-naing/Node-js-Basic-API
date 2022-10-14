const DB = require('../schema/post');
const commentDB = require('../schema/comment');
const {
    responseMsg
} = require('../utils/helper');
const {
    deleteFile
} = require('../utils/gallery');

const all = async (req, res, next) => {
    let posts = await DB.find().populate('user cat tag', '-password -__v');
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
    let post = await DB.findById(req.params.id).populate('user cat tag', '-password -email -phone -created -image -__v').select('title desc image');
    if (!post) {
        next(new Error('Post not found with that ID'));
        return;
    }
    let comments = await commentDB.find({
        postId: post._id
    });
    post = post.toObject(); // Mongo Object to Object change
    post['comments'] = comments;
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
    }).populate('user cat tag', '-password -__V');
    responseMsg(res, true, 'Cat ID by post', cats);

}
const byUserId = async (req, res, next) => {
    let cats = await DB.find({
        user: req.params.id
    }).populate('user cat tag', '-password -__V');
    responseMsg(res, true, 'User ID by post', cats);

}
const byTagId = async (req, res, next) => {
    let posts = await DB.find({
        tag: req.params.id
    }).populate('user cat tag', '-password -__V');
    if (posts.length > 1) {
        for (let [index, post] of posts.entries()) {
            let comments = await commentDB.find({
                postId: post._id
            });
            post = post.toObject();
            post['comments'] = comments;
            posts[index] = post;
        }
        responseMsg(res, true, 'Tag ID by post', posts);
    } else {
        next(new Error('Post not found with that Tag ID'));
    }
}

const paginate = async (req, res, next) => {
    let page = req.params.page;
    page = page == 1 ? 0 : page - 1;
    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * page;
    let posts = await DB.find().skip(skipCount).limit(limit).populate('user cat tag', '-password -__V');
    responseMsg(res, true, 'Paginate Page', posts)
}
const toggleLike = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        if (req.params.likeCheck == 1) {
            post.like = post.like + 1;

        } else {
            post.like > 0 ? post.like = post.like - 1 : post.like = 0;
        }
        await DB.findByIdAndUpdate(post._id, post);
        let likePost = await DB.findById(post._id);
        responseMsg(res, true, 'Like', likePost)
    } else {
        next(new Error('Post Not Found'));
    }
}
const removeLike = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        if (post.like > 0) {
            post.like = post.like - 1;
            await DB.findByIdAndUpdate(post._id, post);
            let likePost = await DB.findById(post._id);
            responseMsg(res, true, 'You Like', likePost)
        }

    } else {
        next(new Error('Post Not Found'));
    }
}
module.exports = {
    all,
    add,
    get,
    update,
    drop,
    byCatId,
    byTagId,
    byUserId,
    paginate,
    toggleLike
}