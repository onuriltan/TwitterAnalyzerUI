import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';



let SelectableList = makeSelectable(List);

class TrendTopics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trendTopicData: {
                errorCode: '',
                trendTopics: []
            },
            address: ''
        }

        this.getAddressFromUser = this.getAddressFromUser.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        if (this.props.trendTopicName === "Trends In Your Area") {
            this.setState({
                trendTopicData: nextProps.state.reducer.trendTopicDataInArea,
            })
        }
        if (this.props.trendTopicName === "Trends In WorldWide") {
            this.setState({
                trendTopicData: nextProps.state.reducer.trendTopicDataInWorldWide
            })
        }
    }


    render() {
        if (this.state.trendTopicData.errorCode === '') {
            if (this.state.trendTopicData.trendTopics.length !== 0) {
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
                                    this.state.trendTopicData.trendTopics.map((trendTopic) =>
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
        }
        if (this.state.trendTopicData.errorCode !== '') {
            return (
                <div className="trendtopics">
                    <Subheader style={{ fontSize: '200%', textAlign: 'center', fontFamily: 'Permanent Marker, cursive', color: 'black' }}>{this.props.trendTopicName}</Subheader>
                    <div className="enteraddress"
                        style={{
                            margin: 'auto',
                            display: 'block',
                            justifyContent: 'center',
                            textAlign: 'center'

                        }}>
                        <div className="addressField"
                            style={{
                                margin: '2%'
                            }}>
                            <TextField
                                hintText="City Name"
                                floatingLabelText="Enter your city to get trends"
                                floatingLabelFocusStyle={{ color: 'black' }}
                                underlineFocusStyle={{ borderColor: '#ff4081' }}
                                type="keyword"
                                errorText=""
                                onChange={this.getAddressFromUser}

                            />
                        </div>
                        <div className="searchTrendsButton"
                            style={{
                                margin: '2%'

                            }}>
                            <RaisedButton className="bttn" label="Search" onClick={() => this.searchTrendTopics()} />
                        </div>

                    </div>

                </div >

            );
        }

        return (
            <div className="trendtopics" >
                <Subheader style={{ fontSize: '200%', textAlign: 'center', fontFamily: 'Permanent Marker, cursive', color: 'black' }}>{this.props.trendTopicName}</Subheader>
                <CircularProgress id="circularProgrss" size={60} thickness={7} color='black'
                    style={{
                        display: 'flex',
                        margin: 'auto',
                        paddingTop: '5%',
                        justifyContent: 'center'
                    }} />
            </div>
        );


    }


    handleClick(trendTopic) {
        let payload = {
            data: {
                keyword: trendTopic,
            }
        }

        this.props.actions.set_keyword_field(payload);

    }


    getAddressFromUser(event) {
        this.setState({ address: event.target.value })
    }



    searchTrendTopics = async () => {
        this.setState({
            trendTopicData: {
                errorCode: '',
                trendTopics: []
            }
        })

        let response = null;
        response = await fetch('api/getTrendTopics/byAddress?address=' + this.state.address);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        else if (typeof body.errorCode !== 'undefined') {
            if (this.props.trendTopicName === "Trends In Your Area") {
                let payload = {
                    data: {
                        trendTopicDataInArea: {
                            errorCode: body.errorCode,
                            trendTopics: []
                        },
                    }
                }

                this.props.actions.update_trendtopics_inarea(payload);
            } else {
                let payload = {
                    data: {
                        trendTopicDataInWorldWide: {
                            errorCode: body.errorCode,
                            trendTopics: []
                        },
                    }
                }

                this.props.actions.update_trendtopics_inworldwide(payload);
            }

        }
        else {
            if (this.props.trendTopicName === "Trends In Your Area") {
                let payload = {
                    data: {
                        trendTopicDataInArea: {
                            errorCode: '',
                            trendTopics: body.trendTopics
                        },
                    }
                }

                this.props.actions.update_trendtopics_inarea(payload);
            } else {
                let payload = {
                    data: {
                        trendTopicDataInWorldWide: {
                            errorCode: '',
                            trendTopics: body.trendTopics
                        },
                    }
                }

                this.props.actions.update_trendtopics_inworldwide(payload);
            }

        }

    };


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
