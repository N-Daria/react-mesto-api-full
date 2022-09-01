const userRouters = require('express').Router();
const {
  getUser,
  getUsers,
  updateProfileInfo,
  updateProfilePhoto,
} = require('../controllers/user');

userRouters.get('/:userId', getUser);

userRouters.get('/', getUsers);

userRouters.patch('/me/avatar', updateProfilePhoto);

userRouters.patch('/me', updateProfileInfo);

module.exports = { userRouters };
