import React, { Component } from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialState: this.props.state.reducer
    };
    this.buildSocketConnection = this.buildSocketConnection.bind(this);
    this.buildSocketConnection();

  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="main">
          <SearchArea />
          <Board />
        </div>
      </MuiThemeProvider>

    );
  }

  buildSocketConnection() {
    let newState = this.state.initialState;
    let stompClient = null;
    var that = this;
    let socket = new SockJS('http://localhost:3001/twitterStream');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe('/topic/fetchTwitterStream', function (tokenizedTweet) {
        let tweet = JSON.parse(tokenizedTweet.body);
        if (tweet.namedEntity === 'PERSON') {
          if (newState.person.has(tweet.word)) {
            let number = newState.person.get(tweet.word);
            newState.person.set(tweet.word, number + 1);
            console.log(tweet.word, number + 1);
          }
          else {
            newState.person.set(tweet.word, 1);
            console.log(tweet.word, 1);
          }
        }
        return that.props.actions.update_person_data(newState);

      });
    });
    newState.socketConnection = stompClient;
    return this.props.actions.build_twitter_stream(newState);
  }

}

App.propTypes = {
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
)(App);
