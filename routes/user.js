const userRouters = require('express').Router();
const {
  createUser,
  getUser,
  getUsers,
  updateProfileInfo,
  updateProfilePhoto,
} = require('../controllers/user');

userRouters.post('/', createUser);

userRouters.get('/:userId', getUser);

userRouters.get('/', getUsers);

userRouters.patch('/me/avatar', updateProfilePhoto);

userRouters.patch('/me', updateProfileInfo);

module.exports = { userRouters };
