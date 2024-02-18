const yup = require('yup');
const { UserModel } = require('../database/db');
require('yup-password')(yup);

const createUserValidator = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .test('unique-email', 'Email already exists', async (email, context) => {
      const user = await UserModel.findOne({ where: { email } });
      return user == undefined || user == null;
    }),
  password: yup
    .string()
    .required()
    .min(8)
    .max(32)
    .minLowercase(1)
    .minSymbols(1)
    .minUppercase(1),
});

const loginValidator = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const updateUserValidator = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .test('unique-email', 'Email already exists', async (value, context) => {
      // avoid database call if context is same
      if (value === context.options.context) {
        return true;
      }
      const user = await UserModel.findOne({ where: { email: value } });

      return user == undefined || user == null;
    }),
  password: yup
    .string()
    .required()
    .min(8)
    .max(32)
    .minLowercase(1)
    .minSymbols(1)
    .minUppercase(1)
    .minNumbers(1),
});

module.exports = { createUserValidator, loginValidator, updateUserValidator };
