const { PORT = 3000 } = process.env;

const express = require('express');
const app = express();

app.listen(PORT, () => {
  console.log('LF!!')
});