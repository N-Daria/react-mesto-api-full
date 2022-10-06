const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { userRouters } = require('./routes/user');
const { cardRouters } = require('./routes/card');
const { undefinedPage } = require('./controllers/undefinedPage');
const { login, createUser } = require('./controllers/auth');
const { authorization } = require('./middlewares/authorization');
const { errorHandling } = require('./middlewares/errorHandling');

const { PORT = 3000 } = process.env;
const app = express();

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  await app.listen(PORT);
}

app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', authorization, userRouters);
app.use('/cards', authorization, cardRouters);
app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', undefinedPage);

app.use(errorHandling);

startServer();
