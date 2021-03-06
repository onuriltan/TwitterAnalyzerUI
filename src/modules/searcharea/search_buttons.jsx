
import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import Alertify from 'alertify.js';


class SearchButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            errorText: '',
            start_disabled: false,
            stop_disabled: true,
        };
        this.change_keyword = this.change_keyword.bind(this);

    }

    componentWillUnmount() {
        this.stop_twitter_stream();
    }



    render() {
        return (
            <div className="searchfield">

                <TextField
                    className="textField"
                    hintText="Keyword"
                    floatingLabelText="Enter keyword"
                    floatingLabelFocusStyle={{ color: 'black' }}
                    underlineFocusStyle={{ borderColor: '#ff4081' }}
                    type="keyword"
                    errorText={this.state.errorText}
                    onChange={this.change_keyword}
                    value={this.props.state.reducer.keyword}
                />
                <div className="searchbuttons">
                    <RaisedButton disabled={this.state.start_disabled} className="bttn" label="Start" onClick={() => this.start_twitter_stream()} />
                    <RaisedButton disabled={this.state.stop_disabled} className="bttn" label="Stop" onClick={() => this.stop_twitter_stream()} />
                </div>
            </div>

        );
    }


    change_keyword(event) {
        var keyword = event.target.value;
        this.setState({ keyword: event.target.value })
        let payload = {
            data: {
                keyword: keyword,
            }
        }
        this.props.actions.set_keyword_field(payload);

    }

    stop_twitter_stream() {
        this.setState({ stop_disabled: true });
        this.setState({ start_disabled: false });

        var socketConnection = this.props.state.reducer.socketConnection;
        if (socketConnection != null) {
            socketConnection.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'stop', 'message': 'stop' }));
            socketConnection.disconnect();
            let payload = {
                data: {
                    socketConnection: null
                }
            }

            this.props.actions.stop_twitter_stream(payload);

            let payload_loading = {
                data: {
                    loading: false,
                }
            }
            this.props.actions.update_loading_screen(payload_loading);

        }
        Alertify.logPosition("bottom right");
        Alertify.log('Twitter stream stopped');



    }

    start_twitter_stream() {
        if (this.props.state.reducer.keyword.length > 3 && this.props.state.reducer.keyword !== "") {
            this.setState({ errorText: "" });

            this.setState({ start_disabled: true });
            this.setState({ stop_disabled: false });
            var payload = {
                data: {
                    socketConnection: null,
                    tweets: [],
                    location: {},
                    organization: {},
                    person: {},
                    tweetslocation: [],
                    others: {},
                    searchTextError: "",
                    loading: true


                }
            }

            this.props.newChartDataListener(payload);
            this.props.newMapDataListener(payload);
            this.props.actions.reset_data(payload);
            this.props.newTweetPanelListener(payload);

            let stompClient = null;
            let socket;
            if (process.env.NODE_ENV === "development") {
                socket = new SockJS('http://localhost:8080/twitterStream');
            }
            if (process.env.NODE_ENV === "production") {
                socket = new SockJS('https://twitteranalyzerapi.herokuapp.com/twitterStream');
            }
            stompClient = Stomp.over(socket);

            stompClient.debug = null;
            stompClient.connect({}, function (frame) {
                Alertify.logPosition("bottom right");
                Alertify.log('Waiting for tweets');

                stompClient.subscribe('/user/queue/fetchTwitterStream', function (tokenizedTweet) {

                    let tweet = JSON.parse(tokenizedTweet.body);

                    if (tweet.exception !== null) {
                        if (tweet.exception === "420") {
                            this.stop_twitter_stream();
                            Alertify.alert('Twitter API rate limit exceeded by other users.');

                        }

                    }
                    if(tweet.exception === null && this.props.state.reducer.initialload === true) {
                        let payload_loading = {
                            data: {
                                loading: false,
                            }
                        }
                        this.props.actions.update_loading_screen(payload_loading);

                        Alertify.logPosition("bottom right");
                        Alertify.log('Tweets receiving');

                    }
                    let payload_initialload = {
                        data: {
                            initialload: false,
                        }
                    }
                    this.props.actions.update_inital_load(payload_initialload);

                    let payload_loading = {
                        data: {
                            loading: false,
                        }
                    }
                    this.props.actions.update_loading_screen(payload_loading);



                    if (tweet.forStreamPanel === true) {
                        let payload = {
                            data: {
                                tweets: this.props.state.reducer.tweets,
                            }
                        }
                        payload.data.tweets.unshift(
                            {
                                "link": tweet.link,
                                "username": tweet.username,
                                "tweet": tweet.tweet,
                                "location": tweet.location,
                                "createDate": tweet.createDate,
                            }
                        );

                        var temp = false;
                        this.props.state.reducer.tweets.forEach((theTweet) => {
                            if (theTweet.link === tweet.link) {
                                temp = true;
                            }
                        });
                        if (temp === false) {
                            this.props.actions.update_tweets_data(payload);
                            this.props.newTweetPanelListener(payload);
                        }
                    }
                    if (tweet.latitude !== null && tweet.longitude !== null) {
                        let payload = {
                            data: {
                                tweetslocation: this.props.state.reducer.tweetslocation,
                            }
                        }
                        payload.data.tweetslocation.push(
                            {
                                "svgPath": this.props.state.reducer.targetSVG,
                                "zoomLevel": 5,
                                "scale": 0.5,
                                "title": tweet.tweet,
                                "latitude": tweet.latitude,
                                "longitude": tweet.longitude
                            }
                        );
                        this.props.actions.update_tweetslocation_data(payload);
                        this.props.newMapDataListener(payload);

                    }
                    if (tweet.namedEntity === 'PERSON') {
                        var payload_person = {
                            data: {
                                person: this.props.state.reducer.person,
                                location: this.props.state.reducer.location,
                                organization: this.props.state.reducer.organization,
                                others: this.props.state.reducer.others
                            }
                        }
                        let personMap = this.props.state.reducer.person;
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

                        this.props.actions.update_person_data(payload_person);
                        this.props.newChartDataListener(payload_person);

                    }

                    if (tweet.namedEntity === 'LOCATION' || tweet.namedEntity === 'COUNTRY' || tweet.namedEntity === 'STATE_OR_PROVINCE') {
                        var payload_location = {
                            data: {
                                person: this.props.state.reducer.person,
                                location: this.props.state.reducer.location,
                                organization: this.props.state.reducer.organization,
                                others: this.props.state.reducer.others
                            }
                        }
                        let locationMap = this.props.state.reducer.location;
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
                        this.props.actions.update_location_data(payload_location);
                        this.props.newChartDataListener(payload_location);
                    }

                    if (tweet.namedEntity === 'ORGANIZATION') {
                        var payload_organization = {
                            data: {
                                person: this.props.state.reducer.person,
                                location: this.props.state.reducer.location,
                                organization: this.props.state.reducer.organization,
                                others: this.props.state.reducer.others
                            }
                        }
                        let organizationMap = this.props.state.reducer.organization;
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
                        this.props.actions.update_organization_data(payload_organization);
                        this.props.newChartDataListener(payload_organization);
                    }

                    else {
                        var payload_others = {
                            data: {
                                person: this.props.state.reducer.person,
                                location: this.props.state.reducer.location,
                                organization: this.props.state.reducer.organization,
                                others: this.props.state.reducer.others
                            }
                        }
                        let othersMap = this.props.state.reducer.others;
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
                        this.props.actions.update_others_data(payload_others);
                        this.props.newChartDataListener(payload_others);
                    }


                }.bind(this));
                stompClient.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'start', 'message': this.props.state.reducer.keyword }));
                let payload = {
                    data: {
                        socketConnection: stompClient
                    }
                }
                this.props.actions.start_twitter_stream(payload);

            }.bind(this));

        }
        if (this.props.state.reducer.keyword.length < 4) {
            this.setState({ errorText: "Please enter at least four characters" });
        }
        if (this.props.state.reducer.keyword === "") {
            this.setState({ errorText: "Please enter a keyword" });
        }
    }


}

SearchButtons.propTypes = {
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
)(SearchButtons);
