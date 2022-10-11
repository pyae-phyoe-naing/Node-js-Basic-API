const Joi = require('joi');

module.exports = {
    RegisterSchema: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(8).max(11).required(),
        password: Joi.string().min(8).max(25).required()
    }),
    LoginSchema: Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().required()
    }),
    TagSchema: Joi.object({
        name: Joi.string().required(),
        user:Joi.optional()
    }),
    CatSchema: Joi.object({
        name: Joi.string().required()
    }),
    PostSchema: Joi.object({
        cat: Joi.string().required(),
        title: Joi.string().required(),
        desc: Joi.string().required(),
        user: Joi.optional()
    }),
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}