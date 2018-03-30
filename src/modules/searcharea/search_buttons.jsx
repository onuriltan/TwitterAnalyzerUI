import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

class SearcButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialState: this.props.state.reducer
        };
    }

    render() {
        return (
            <div className="searchbuttons">
                <RaisedButton className="bttn" label="Start" onClick={() => this.start_twitter_stream()} />
                <RaisedButton className="bttn" label="Stop"  onClick={() => this.stop_twitter_stream()} />
            </div>
        );
    }

    start_twitter_stream() {
        let newState = this.state.initialState;
        newState.socketConnection.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'start', 'message': newState.keyword }));
        return this.props.actions.start_twitter_stream(newState);
    }

    stop_twitter_stream() {
        let newState = this.state.initialState;
        newState.socketConnection.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'stop', 'message': null }));
        newState.socketConnection.unsubscribe("/topic/fetchTwitterStream");
        return this.props.actions.stop_twitter_stream(newState);
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
