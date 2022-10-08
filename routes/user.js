const { celebrate, Joi } = require('celebrate');
const userRouters = require('express').Router();
const {
  getUser,
  getUsers,
  updateProfileInfo,
  updateProfilePhoto,
  getUserInfo,
} = require('../controllers/user');

userRouters.get('/', getUsers);

userRouters.get('/me', getUserInfo);

userRouters.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().min(2).pattern(/^(http(s)?:\/{2})((w{3}\.)?)([\w\-\._~:\/?#\[\]@!$&'\(\)*\+,;=]+)$(#)?/im),
  }).unknown(true),
}), updateProfilePhoto);

userRouters.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateProfileInfo);

userRouters.get('/:userId', getUser);

module.exports = { userRouters };
