import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';
import BuildSocketConnection from './functions/socket_connection';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialState: this.props.state.reducer
    };
    this.build_socket_connection = this.build_socket_connection.bind(this);
    this.build_socket_connection();

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

  build_socket_connection() {
    let newState = this.state.initialState;
    newState.socket_connection = BuildSocketConnection();
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

