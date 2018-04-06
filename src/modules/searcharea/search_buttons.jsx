import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

const targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";


class SearcButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            targetSVG: targetSVG,
            start_disabled: false,
            stop_disabled: true
        };

    }

    render() {
        return (
            <div className="searchbuttons">
                <RaisedButton disabled={this.state.start_disabled} className="bttn" label="Start" onClick={() => this.start_twitter_stream()} />
                <RaisedButton disabled={this.state.stop_disabled} className="bttn" label="Stop" onClick={() => this.stop_twitter_stream()} />
            </div>
        );
    }

    stop_twitter_stream() {
        this.setState({ stop_disabled: true });
        this.setState({ start_disabled: false });

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

    start_twitter_stream() {
        this.setState({ start_disabled: true });
        this.setState({ stop_disabled: false });
        if (this.props.state.reducer.initialload === false) {
            var payload = {
                data: {
                    socketConnection: null,
                    person: {},
                    location: {},
                    organization: {},
                    tweetlocation: [],
                    others: {}
                }
            }

            this.props.newChartDataListener(payload);
            this.props.actions.reset_data(payload);
        }


        let stompClient = null;
        var that = this;
        let socket = new SockJS('http://localhost:3001/twitterStream');
        stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/fetchTwitterStream', function (tokenizedTweet) {
                let payload_initialload = {
                    data: {
                        initialload: that.props.state.reducer.initialload,
                    }
                }
                that.props.actions.update_inital_load(payload_initialload);
                let tweet = JSON.parse(tokenizedTweet.body);

                if (tweet.forStreamPanel === true) {
                    let payload = {
                        data: {
                            tweets: that.props.state.reducer.tweets,
                        }
                    }
                    payload.data.tweets.push(
                        {
                            "tweet": tweet.tweet,
                        }
                    );
                    that.props.actions.update_tweets_data(payload);
                    that.props.newTweetPanelListener(payload);
                }
                if (tweet.latitude !== null && tweet.longitude !== null) {
                    let payload = {
                        data: {
                            tweetlocation: that.props.state.reducer.tweetlocation,
                        }
                    }
                    payload.data.tweetlocation.push(
                        {
                            "svgPath": that.state.targetSVG,
                            "zoomLevel": 5,
                            "scale": 0.5,
                            "title": tweet.tweet,
                            "latitude": tweet.latitude,
                            "longitude": tweet.longitude
                        }
                    );
                    that.props.actions.update_tweetlocation_data(payload);
                    that.props.newMapDataListener(payload);

                }
                if (tweet.namedEntity === 'PERSON') {
                    var payload_person = {
                        data: {
                            person: that.props.state.reducer.person,
                            location: that.props.state.reducer.location,
                            organization: that.props.state.reducer.organization,
                            others: that.props.state.reducer.others
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
                    that.props.newChartDataListener(payload_person);

                }

                if (tweet.namedEntity === 'LOCATION') {
                    var payload_location = {
                        data: {
                            person: that.props.state.reducer.person,
                            location: that.props.state.reducer.location,
                            organization: that.props.state.reducer.organization,
                            others: that.props.state.reducer.others
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
                    that.props.newChartDataListener(payload_location);
                }

                if (tweet.namedEntity === 'ORGANIZATION') {
                    var payload_organization = {
                        data: {
                            person: that.props.state.reducer.person,
                            location: that.props.state.reducer.location,
                            organization: that.props.state.reducer.organization,
                            others: that.props.state.reducer.others
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
                    that.props.newChartDataListener(payload_organization);
                }

                else {
                    var payload_others = {
                        data: {
                            person: that.props.state.reducer.person,
                            location: that.props.state.reducer.location,
                            organization: that.props.state.reducer.organization,
                            others: that.props.state.reducer.others
                        }
                    }
                    let othersMap = that.props.state.reducer.others;
                    if (tweet.word in othersMap) {
                        Object.entries(othersMap).forEach(([key, value]) => {
                            if (key === tweet.word) {
                                payload_others.data.others[tweet.word] = value + 1;
                            }
                        }
                        );
                    }
                    else {
                        payload_others.data.others[tweet.word] = 1;
                    }
                    that.props.actions.update_others_data(payload_others);
                    that.props.newChartDataListener(payload_others);
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
