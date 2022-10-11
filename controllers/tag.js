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

module.exports = {
    all,
    add
}