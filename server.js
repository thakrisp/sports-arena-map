if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const NHL = require('./Scripts/NHL.json');
const NBA = require('./Scripts/NBA.json');
const NFL = require('./Scripts/NFL.json');
const MLB = require('./Scripts/MLB.json');

app.get('/NHL', (req, res) => {
  res.header('content-Type', 'application/json');
  res.send(NHL);
});

app.get('/NBA', (req, res) => {
  res.header('content-Type', 'application/json');
  res.send(NBA);
});

app.get('/NFL', (req, res) => {
  res.header('content-Type', 'application/json');
  res.send(NFL);
});

app.get('/MLB', (req, res) => {
  res.header('content-Type', 'application/json');
  res.send(MLB);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
