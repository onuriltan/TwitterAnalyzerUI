import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default (keyword) => {

    var stompClient = null;

    var socket = new SockJS('http://localhost:3001/twitterStream');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/fetchTwitterStream', function (tokenizedTweet) {
          console.log(JSON.parse(tokenizedTweet.body));
        });
    }); 
    return stompClient;
}