const Joi = require('joi')

const createUserSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  }),
  message: "Error creating user",
};

const loginUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}



module.exports = { createUserSchema, loginUserSchema}