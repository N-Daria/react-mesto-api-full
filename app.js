const { PORT = 3000 } = process.env;

const express = require('express');
const mestodb = require('mongoose');

mestodb.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// const mongoose = require('mongoose');

// ???  what is it?
const { default: mongoose } = require("mongoose");


const app = express();

app.listen(PORT, () => {
  console.log('LF!!')
});