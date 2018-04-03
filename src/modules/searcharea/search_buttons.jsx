import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';


class SearcButtons extends Component {

    render() {
        return (
            <div className="searchbuttons">
                <RaisedButton className="bttn" label="Start" onClick={() => this.start_twitter_stream()} />
                <RaisedButton className="bttn" label="Stop" onClick={() => this.stop_twitter_stream()} />
            </div>
        );
    }

    stop_twitter_stream() {
        var socketConnection = this.props.state.reducer.socketConnection;
        socketConnection.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'stop', 'message': null }));
        socketConnection.disconnect();
        let payload = {
            data: {
                socketConnection: null
            }
        }

        return this.props.actions.stop_twitter_stream(payload);
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps.state.reducer);
    }

    start_twitter_stream() {

        let stompClient = null;
        var that = this;
        let socket = new SockJS('http://localhost:3001/twitterStream');
        stompClient = Stomp.over(socket);
        stompClient.debug = null;
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
                            }
                        }
                        );
                    }
                    else {
                        payload_person.data.person[tweet.word] = 1;
                    }

                    that.props.actions.update_person_data(payload_person);
                    that.props.newDataListener(payload_person);

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
                            }
                        }
                        );
                    }
                    else {
                        payload_location.data.location[tweet.word] = 1;
                    }
                    that.props.actions.update_location_data(payload_location);
                    //that.props.newDataListener(payload_location);
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
                            }
                        }
                        );
                    }
                    else {
                        payload_organization.data.organization[tweet.word] = 1;
                    }
                    that.props.actions.update_organization_data(payload_organization);
                    //that.props.newDataListener(payload_organization);
                }



            });
            stompClient.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'start', 'message': that.props.state.reducer.keyword }));
            let payload = {
                data: {
                    socketConnection: stompClient
                }
            }
            that.props.actions.start_twitter_stream(payload);

        });

    }

}

SearcButtons.propTypes = {
    actions: PropTypes.object,
    initialState: PropTypes.object
};

function mapStateToProps(state) {
    return { state: state };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearcButtons);
