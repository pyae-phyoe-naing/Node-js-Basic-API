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
}