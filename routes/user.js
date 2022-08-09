const router = require('express').Router();
const { createUser, getUser, getUsers } = require('../controllers/user');

router.post('/users', createUser);

router.get('/users/:userId', getUser)

router.get('/users', getUsers)
