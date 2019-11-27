const Joi = require('@hapi/joi');

exports.validateStoreProduct = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        // price: Joi.number().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        color: Joi.string().required(),
    });

    return schema.validate(data);
}