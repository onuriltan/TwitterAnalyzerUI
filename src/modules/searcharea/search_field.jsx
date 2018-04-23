import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

class SearchField extends Component {

  constructor(props) {
    super(props);
    this.change_keyword = this.change_keyword.bind(this);
  }

  render() {
   
    return (
      <div className="searchfield">
        <TextField
          hintText="Keyword"
          floatingLabelText="Enter keyword"
          floatingLabelFocusStyle={{ color: 'black' }}
          underlineFocusStyle={{ borderColor: '#ff4081' }}
          type="keyword"
          onChange={this.change_keyword}
          value={this.props.state.reducer.keyword}
        />
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
