const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/twitteranalyzer/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/twitteranalyzer/api/getTrendTopics', function (req, res) {
  axios.get('http://localhost:8080/api/getTrendTopics')
    .then(function (response) {
      console.log(response.data)
      return res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(process.env.PORT|| 5000);