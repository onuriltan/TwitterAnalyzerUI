const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));



/*             API             */

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/api/ping', function (req, res) {
    return res.send('pong');
});

app.get('/api/getTrendTopics/byGeolocation', function (req, res) {
    axios.get('http://localhost:8080/api/getTrendTopics/byGeolocation?lat=' + req.query.lat + '&lng=' + req.query.lng)
        .then(function (response) {
            return res.send(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data)
            return res.send(error.response.data);
        });
});


app.get('/api/getTrendTopics/byAddress', function (req, res) {
    axios.get('http://localhost:8080/api/getTrendTopics/byAddress?address=' + req.query.address)
        .then(function (response) {
            return res.send(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data)
            return res.send(error.response.data);
        });
});


app.get('/api/getTrendTopics/inWorldWide', function (req, res) {
    axios.get('http://localhost:8080/api/getTrendTopics/inWorldWide')
        .then(function (response) {
            return res.send(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data)
            return res.send(error.response.data);
        });
});

app.listen(process.env.PORT || 5000 ,() => console.log('twitteranalyzerui is listening on port 5000!'));
