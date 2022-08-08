const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });


const User = require('./models/user');
const Card = require('./models/card');

app.get('/', (req, res) => {
  res.send('send users list hbkjhb');
})

// app.get('/users', (req, res) => {
//   res.send('send users list hbkjhb');
// })

// app.get('/users/: userId', (req, res) => {
//   res.send('send ID user');
// })

// app.post('/users', (req, res) => {
//   const { name, about, avatar } = req.body;

//   User.create({ name, about, avatar })
//     .then(user => res.send({ data: user }))
//     .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
// })


app.listen(PORT, () => {
  console.log('Server listens port 3000')
});