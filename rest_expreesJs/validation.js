const Joi = require("@hapi/joi");

//validatio registion
const registeration = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };

  return Joi.validate(data,schema);
};

const loginValdation = (data) => {
    const schema = {
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    };
  
    return Joi.validate(data,schema);
  };


module.exports.registeration = registeration;
module.exports.loginValdation = loginValdation;
