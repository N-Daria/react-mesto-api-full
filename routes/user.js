const userRouters = require('express').Router();
const {
  createUser,
  getUser,
  getUsers,
  updateProfileInfo,
  updateProfilePhoto,
} = require('../controllers/user');

userRouters.post('/users', createUser);

userRouters.get('/users/:userId', getUser);

userRouters.get('/users', getUsers);

userRouters.patch('/me/avatar', updateProfilePhoto);

userRouters.patch('/me', updateProfileInfo);

module.exports = { userRouters };
