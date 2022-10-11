const DB = require('../schema/category');
const {
    responseMsg
} = require('../utils/helper');
const {
    deleteFile
} = require('../utils/gallery');

const all = async (req, res, next) => {
    let cats = await DB.find();
    responseMsg(res, true, 'All Category', cats);
}
const add = async (req, res, next) => {
    let existCat = await DB.findOne({ name: req.body.name });
    if (existCat) {
        deleteFile(req.body.image);
        next(new Error('Category name is already exists'));
        return;
    }
    let cat = await new DB(req.body).save();
    responseMsg(res, true, 'Add new category', cat);
}
const get = async (req, res, next) => {
    let cat = await DB.findById(req.params.id);
    if (!cat) {
        next(new Error('Category not found with that ID'));
        return;
    }
    responseMsg(res, true, 'Get single category', cat);
}
module.exports = {
    all,
    add,
    get
}