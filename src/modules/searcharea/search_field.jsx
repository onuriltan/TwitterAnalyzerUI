import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

class SearchField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialState: this.props.state.reducer
    };
    this.change_keyword = this.change_keyword.bind(this);

  }

  render() {
    return (
      <div className="searchfield">
        <TextField
          hintText="Keyword"
          floatingLabelText="Enter keyword"
          type="keyword"
          onChange={this.change_keyword}
        />
      </div>
    );

  }

  change_keyword(event) {
    let newState = this.state.initialState;
    newState.keyword = event.target.value;
    return this.props.actions.build_twitter_stream(newState);
  }
}

SearchField.propTypes = {
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
)(SearchField);
