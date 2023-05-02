const Joi = require("joi");
const uservalidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  dob: Joi.date().max('now').iso().required(),
  residentialAddressStreet1: Joi.string().required(),
  residentialAddressStreet2: Joi.string().required(),
  permanentAddressStreet1: Joi.string().required(),
  permanentAddressStreet2: Joi.string().required(),
  fileName1:Joi.string().required(),
  fileType1:Joi.string().required(),
  fileName2:Joi.string().required(),
  fileType2:Joi.string().required(),
  uploadDocument1:Joi.string(),
  // uploadDocument2:Joi.string()
});
module.exports = {
  uservalidation,
};
