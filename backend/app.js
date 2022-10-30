const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { userRouters } = require('./routes/user');
const { cardRouters } = require('./routes/card');
const { undefinedPage } = require('./controllers/undefinedPage');
const { login, createUser } = require('./controllers/auth');
const { authorization } = require('./middlewares/authorization');
const { errorHandling } = require('./middlewares/errorHandling');
const { regExUrl } = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCors } = require('./middlewares/cors');

const { PORT = 3001 } = process.env;
const app = express();

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  await app.listen(PORT);
}

app.use(express.json());

app.use(cookieParser());

app.use(allowedCors);

app.use(requestLogger);

app.use('/users', authorization, userRouters);

app.use('/cards', authorization, cardRouters);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(2),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExUrl),
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

app.use('*', undefinedPage);

app.use(errorLogger);

app.use(errors());
app.use(errorHandling);

startServer();
