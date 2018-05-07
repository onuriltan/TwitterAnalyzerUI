const express = require('express');
const path = require('path');
const axios = require('axios');
const sockjs = require('sockjs');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));




/*            SOCKET            */

let fetchTwitterStream = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.1.4/sockjs.min.js' });
fetchTwitterStream.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
        console.log(message);

    });
    conn.on('close', function() {
      console.log('Closing ' + conn);
    });
});

fetchTwitterStream.installHandlers(app, {prefix:'/fetchTwitterStream'});



/*             API             */

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/api/ping', function (req, res) {
  return res.send('pong');
});

app.get('/api/getTrendTopics/byGeolocation', function (req, res) {
  axios.get('http://localhost:8080/api/getTrendTopics/byGeolocation?lat='+req.query.lat+'&lng='+req.query.lng)
    .then(function (response) {
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});


app.get('/api/getTrendTopics/byAddress', function (req, res) {
  axios.get('http://localhost:8080/api/getTrendTopics/byAddress?address='+req.query.address)
    .then(function (response) {
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});


app.get('/api/getTrendTopics/inWorldWide', function (req, res) {
  axios.get('http://localhost:8080/api/getTrendTopics/inWorldWide')
    .then(function (response) {
      return res.send(response.data);
    })
    .catch(function (error) {
      return res.send(error.response.data);
    });
});

app.listen(process.env.PORT|| 5000);