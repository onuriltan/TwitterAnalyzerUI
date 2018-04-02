import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function createSocketConnection(that) {

    let stompClient = null;
    let socket = new SockJS('http://localhost:3001/twitterStream');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/fetchTwitterStream', function (tokenizedTweet) {
            let tweet = JSON.parse(tokenizedTweet.body);
            if (tweet.namedEntity === 'PERSON') {
                var payload_person = {
                    data: {
                        person: that.props.state.reducer.person
                    }
                }
                let personMap = that.props.state.reducer.person;
                if (tweet.word in personMap) {
                    Object.entries(personMap).forEach(([key, value]) => {
                        if (key === tweet.word) {
                            payload_person.data.person[tweet.word] = value + 1;
                            console.log(tweet.word, value + 1);
                        }
                    }
                    );
                }
                else {
                    payload_person.data.person[tweet.word] = 1;
                    console.log(tweet.word, 1);
                }
                that.props.actions.update_person_data(payload_person);


            }

            if (tweet.namedEntity === 'LOCATION') {
                var payload_location = {
                    data: {
                        location: that.props.state.reducer.location
                    }
                }
                let locationMap = that.props.state.reducer.location;
                if (tweet.word in locationMap) {
                    Object.entries(locationMap).forEach(([key, value]) => {
                        if (key === tweet.word) {
                            payload_location.data.location[tweet.word] = value + 1;
                            console.log(tweet.word, value + 1);
                        }
                    }
                    );
                }
                else {
                    payload_location.data.location[tweet.word] = 1;
                    console.log(tweet.word, 1);
                }
                that.props.actions.update_location_data(payload_location);
            }

            if (tweet.namedEntity === 'ORGANIZATION') {
                var payload_organization = {
                    data: {
                        organization: that.props.state.reducer.organization
                    }
                }
                let organizationMap = that.props.state.reducer.organization;
                if (tweet.word in organizationMap) {
                    Object.entries(organizationMap).forEach(([key, value]) => {
                        if (key === tweet.word) {
                            payload_organization.data.organization[tweet.word] = value + 1;
                            console.log(tweet.word, value + 1);
                        }
                    }
                    );
                }
                else {
                    payload_organization.data.organization[tweet.word] = 1;
                    console.log(tweet.word, 1);
                }
                that.props.actions.update_organization_data(payload_organization);
            }

        });
    });

    let payload = {
        data: {
            socketConnection: stompClient,
        }
    }
    return payload;
}