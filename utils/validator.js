let jwt = require('jsonwebtoken');
let DB = require('../schema/user');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            var result = schema.validate(req.body);
            if (result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    },
    validateParam: (schema, name) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${name}`] = req.params[`${name}`];
            const result = schema.validate(obj);
            if (result.error) {
                 next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    },
    validateToken: async (req, res, next) => {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            let decode = jwt.decode(token, process.env.SECRET_KEY);
            let user = await DB.findById(decode._id);
            if (user) {
                req.body.user = user;
                next();
            } else {
                next(new Error('Tokenization Error'));
            }
        } else {
            next(new Error('Tokenization Error'));
        }

    }
}