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

        this.start_twitter_stream = this.start_twitter_stream.bind(this);
        this.stop_twitter_stream = this.stop_twitter_stream.bind(this);

    }

    render() {
        return (
            <div className="searchbuttons">
                <RaisedButton className="bttn" label="Start" onClick={this.start_twitter_stream} />
                <RaisedButton className="bttn" label="Stop" onClick={this.stop_twitter_stream} />
            </div>
        );
    }

    start_twitter_stream() {
        this.state.initialState.socket_connection.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'start', 'message': this.state.initialState.keyword }));
    }

    stop_twitter_stream() {
        this.state.initialState.socket_connection.send("/app/manageTwitterStream", {}, JSON.stringify({ 'command': 'stop', 'message': null }));
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
