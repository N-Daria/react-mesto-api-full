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

userRouters.patch('/me/avatar', updateProfilePhoto);

userRouters.patch('/me', updateProfileInfo);

userRouters.get('/:userId', getUser);

module.exports = { userRouters };
