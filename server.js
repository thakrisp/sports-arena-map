if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const axios = require('axios');
const _ = require('lodash');

app.use(express.json());
app.use(express.static('public'));

const NHL = require('./Scripts/NHL.json');
const NBA = require('./Scripts/NBA.json');

app.get('/arenas', (req, res) => {
  res.header('content-Type', 'application/json');
  res.send(NHL);
});

// app.get('/arenas', (req, res) => {
//   const url = `https://raw.github.com/nhlscorebot/arenas/master/teams.json`;

//   axios({
//     url: url,
//     responseType: 'json',
//   })
//     .then(massageData)
//     .then((array) => res.json(array));
// });

// function massageData(payload) {
//   let a = payload.data;

//   return _.map(_.keys(a), (k) => _.merge({ team: k }, a[k]));
// }

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
