const DB = require('../schema/user');
const { responseMsg,encodePass,comparePass ,makeToken} = require('../utils/helper');

const register = async (req, res, next) => {
    let existEmail = await DB.findOne({
        email: req.body.email
    });
    if (existEmail) {
        next(new Error('Email is already in use'));
        return;
    }
    let exitPhone = await DB.findOne({
        phone: req.body.phone
    });

    if (exitPhone) {
        next(new Error('Phone is already in use'));
        return;
    }
    req.body.password = encodePass(req.body.password);
    let user = await new DB(req.body).save();
    responseMsg(res, true, 'Register Success', user);
}
const login = async (req, res, next) => {
    let phoneUser = await DB.findOne({ phone: req.body.phone }).select('-__v');
    if (!phoneUser) {
        next(new Error('Creditial Error'));
        return;
    }
    let checkPassword = comparePass(req.body.password, phoneUser.password);
    if (!checkPassword) {
        next(new Error('Creditial Error'));
        return;
    }
    let user = phoneUser.toObject();
    delete user.password;
    user.token = makeToken(user);
    responseMsg(res, true, 'Login Success', user);
}
module.exports = {
    register,
    login
}