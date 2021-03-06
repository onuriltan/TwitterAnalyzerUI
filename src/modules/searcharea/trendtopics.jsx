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
            address: "",
            errorText: "",

        }

        this.getAddressFromUser = this.getAddressFromUser.bind(this);


    }

    componentWillReceiveProps(nextProps) {
        if (this.props.trendTopicName === "Trends In Area") {
            this.setState({
                trendTopicData: nextProps.state.reducer.trendTopicDataInArea,
            })
        
        }
        if (this.props.trendTopicName === "Trends In World") {
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
                        <Subheader className="trendtopicheader">{this.props.trendTopicName}</Subheader>
                        <SelectableList id="trendtopicid">
                            <div className="trendtopiclistitems">
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
        if (parseInt(this.state.trendTopicData.errorCode, 10) === 404 || parseInt(this.state.trendTopicData.errorCode, 10) === 405) {
            return (
                
                <div className="trendtopics">
                    <Subheader className="trendtopicheader">{this.props.trendTopicName}</Subheader>
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
                                floatingLabelText="Enter your city"
                                floatingLabelFocusStyle={{ color: 'black' }}
                                underlineFocusStyle={{ borderColor: '#ff4081' }}
                                type="keyword"
                                errorText={this.state.errorText}
                                onChange={this.getAddressFromUser}
                                defaultValue={this.state.address}

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

        if (parseInt(this.state.trendTopicData.errorCode, 10) === 401) {
            return (
                <div className="trendtopics">
                    <Subheader className="trendtopicheader">{this.props.trendTopicName}</Subheader>
                    <div className="enteraddress"
                        style={{
                            margin: 'auto',
                            display: 'block',
                            justifyContent: 'center',
                            textAlign: 'center'

                        }}>
                        <label className="errorExplanation"
                            style={{
                                marginTop: '5%',
                                display: 'block',
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontSize: '120%'

                            }}> Trends api rate limited </label>

                    </div>

                </div >

            );
        }

        return (
            <div className="trendtopics" >
                <Subheader className="trendtopicheader">{this.props.trendTopicName}</Subheader>
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

        if (this.state.address === "") {
            this.setState({ errorText: "Please enter a keyword" });
        }

        else if (this.state.address.length < 2) {
            this.setState({ errorText: "Please enter at least four characters" });
        }
       

        else {
            this.setState({
                trendTopicData: {
                    errorCode: '',
                    trendTopics: []
                },
                errorText: ""
            })

            let response = null;
            response = await fetch('api/getTrendTopics/byAddress?address=' + this.state.address);
            const body = await response.json();


            if (response.status !== 200) {
                throw Error(body.message);
            }
            else if (typeof body.errorCode !== 'undefined') {
                if (this.props.trendTopicName === "Trends In Area") {
                  
                    let payload = {
                        data: {
                            trendTopicDataInArea: {
                                errorCode: body.errorCode,
                                cityName : '',
                                trendTopics: []
                            },
                        }
                    }

                    this.props.actions.update_trendtopics_inarea(payload);

                    if (this.state.trendTopicData.errorCode !== '') {
                        if(parseInt(body.errorCode, 10) === 404 ) {
                            this.setState({ errorText: "City not found" });
                        }
                    }
                          
                    
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
                if (this.props.trendTopicName === "Trends In Area") {
                    let payload = {
                        data: {
                            trendTopicDataInArea: {
                                errorCode: '',
                                cityName: '',
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
        }
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
