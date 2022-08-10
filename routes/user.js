const userRouters = require('express').Router();
const { createUser, getUser, getUsers } = require('../controllers/user');

userRouters.post('/users', createUser);

userRouters.get('/users/:userId', getUser)

userRouters.get('/users', getUsers)

module.exports = { userRouters }