const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { userRouters } = require('./routes/user');
const { cardRouters } = require('./routes/card');
const { undefinedPage } = require('./controllers/undefinedPage');
const { login, createUser } = require('./controllers/auth');
const { authorization } = require('./middlewares/authorization');

const { PORT = 3000 } = process.env;
const app = express();

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });

  await app.listen(PORT);
}

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62f39dfeaedf19d711093bc2',
  };

  next();
});

app.use(cookieParser());

app.use('/users', userRouters);
app.use('/cards', cardRouters);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(authorization);

app.use('*', undefinedPage);

startServer();

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;

//   res
//     .status(statusCode)
//     .send({
//       message: statusCode === 500
//         ? 'На сервере произошла ошибка'
//         : message
//     });
// });
