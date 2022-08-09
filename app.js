const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });


// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('send users list hbkjhb');
// })


app.listen(PORT, () => {
  console.log('Server listens port 3000')
});