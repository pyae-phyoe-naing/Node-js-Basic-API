const DB = require('../schema/tag');
const {
    responseMsg
} = require('../utils/helper');
const {
    deleteFile
} = require('../utils/gallery');

const all = async (req, res, next) => {
    let tags = await DB.find();
    responseMsg(res, true, 'Get All Tags', tags);

}

const add = async (req, res, next) => {
    let checkTag = await DB.findOne({
        name: req.body.name
    });
    if (checkTag) {
        deleteFile(req.body.image);
        next(new Error('Tag name is already exists'));
        return;
    }
    let tag = await new DB(req.body).save();
    responseMsg(res, true, 'Add new Tag', tag);
}
const get = async (req, res, next) => {
    let tag = await DB.findById(req.params.id);
    if (!tag) {
        next(new Error('Tag not found with that ID'));
        return;
    }
    responseMsg(res, true, 'Get single tag', tag);
}
const patch = async (req, res, next) => {
    let tag = await DB.findById(req.params.id);
    if (!tag) {
        next(new Error('Tag not found with that ID'));
        return;
    }
    if (req.body.image) {
        deleteFile(tag.image);
    }
    await DB.findByIdAndUpdate(tag._id, req.body);
    let updateTag = await DB.findById(tag._id);
    responseMsg(res, true, 'Update tag', updateTag);
}
const drop = async (req, res, next) => {
    let tag = await DB.findById(req.params.id);
    if (!tag) {
        next(new Error('Tag not found with that ID'));
        return;
    }
    deleteFile(tag.image);
     await DB.findByIdAndDelete(tag._id);
    responseMsg(res, true, 'Delete tag', tag);
}

module.exports = {
    all,
    add,
    get,
    patch,
    drop
}