import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default (keyword) => {
    let stompClient = null;

    let socket = new SockJS('http://localhost:3001/twitterStream');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
    }); 

    return stompClient;
}