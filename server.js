const express = require('express');
const path = require('path');
const axios = require('axios');
const sockjs_server = require('sockjs');
const sockjs_client = require('sockjs-client');
const Stomp = require('stompjs');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'build')));




/*            SOCKET            */

let fetchTwitterStream = sockjs_server.createServer({
    sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.1.4/sockjs.min.js',
    disable_cors: true
});
fetchTwitterStream.on('connection', function (conn) {

    console.log(conn);

    let socket = new sockjs_client('http://localhost:8080/twitterStream');
    let stompClient = Stomp.over(socket);

    conn.on('data', function (message) {
        console.log(message);

        stompClient.debug = null;
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/user/queue/fetchTwitterStream', function (tokenizedTweet) {
                let tweet = JSON.parse(tokenizedTweet.body);
                conn.write(tweet);
            });
            stompClient.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'start', 'message': message }));
        });

    });
    conn.on('close', function () {
        console.log('Closing ' );
        stompClient.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'stop', 'message': 'stop' }));
        stompClient.disconnect();
        console.log('Closing ' + conn);
    });
});

fetchTwitterStream.installHandlers(app, { prefix: '/fetchTwitterStream' });







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
            return res.send(error.response.data);
        });
});


app.get('/api/getTrendTopics/byAddress', function (req, res) {
    axios.get('http://localhost:8080/api/getTrendTopics/byAddress?address=' + req.query.address)
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

app.listen(process.env.PORT || 5000);
