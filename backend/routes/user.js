const { celebrate, Joi } = require('celebrate');
const userRouters = require('express').Router();
const {
  getUser,
  getUsers,
  updateProfileInfo,
  updateProfilePhoto,
  getUserInfo,
} = require('../controllers/user');
const { regExUrl } = require('../utils/utils');

userRouters.get('/', getUsers);

userRouters.get('/me', getUserInfo);

userRouters.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).pattern(regExUrl),
  }).unknown(true),
}), updateProfilePhoto);

userRouters.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateProfileInfo);

userRouters.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

module.exports = { userRouters };
