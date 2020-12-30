const express = require('express');
const mongoose = require('mongoose');
const genera = require('./routes/generes');
const home = require('./routes/home');
//Simple
mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log('Could not connect to mongodb'));
const app = express();
app.use(express.json());
app.use('/api/generes', genera);
app.use('/', home);
app.listen(1000, () => {
  console.log('listening');
});
