import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


let SelectableList = makeSelectable(List);

class TrendTopics extends Component {

    handleClick(trendTopic) {
        let payload = {
            data: {
                keyword: trendTopic,
            }
        }

        this.props.actions.set_keyword_field(payload);

    }


    render() {
        if (this.props.trendTopicData.length !== 0) {
            return (
                <div className="trendtopics">
                    <Subheader style={{ fontSize: '200%', textAlign: 'center', fontFamily: 'Permanent Marker, cursive', color: 'black' }}>{this.props.trendTopicName}</Subheader>
                    <SelectableList id="trendtopicid"
                        style={{
                            maxHeight: '8em', overflow: 'auto', transform: 'scaleX(-1)',
                            float: 'none',
                            width: '20em',
                            marginLeft: 'auto',
                            marginRight: 'auto'

                        }}>
                        <div className="trendtopiclistitems" style={{ transform: 'scaleX(-1)' }}>
                            {
                                this.props.trendTopicData.map((trendTopic) =>
                                    <ListItem
                                        key={trendTopic}
                                        value={trendTopic}
                                        primaryText={trendTopic}
                                        onClick={() => this.handleClick(trendTopic)}
                                    />
                                )
                            }
                        </div>
                    </SelectableList>
                </div>

            );
        }
        return (

            <div className="trendtopics" >
                <Subheader style={{ fontSize: '200%', textAlign: 'center', fontFamily: 'Permanent Marker, cursive', color: 'black' }}>{this.props.trendTopicName}</Subheader>
                <CircularProgress id="circularProgrss" size={60} thickness={7} color='black' 
                    style={{
                        display: 'flex',
                        margin: 'auto',
                        paddingTop : '5%',
                        justifyContent: 'center'

                        }} />
            </div>
        );

    }

}
TrendTopics.propTypes = {
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
)(TrendTopics);
