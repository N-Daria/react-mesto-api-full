const express = require('express');
const mongoose = require('mongoose');
const { userRouters } = require('./routes/user')

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(userRouters)

// app.get('/', (req, res) => {
//   res.send('send users list hbkjhb');
// })

app.listen(PORT, () => {
  console.log('Server listens port 3000')
});