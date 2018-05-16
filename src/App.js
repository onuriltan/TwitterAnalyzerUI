import React, { Component } from 'react';

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
            mapData: {
                data: {
                    tweetslocation: []
                }
            },
            tweetData: {
                data: {
                    tweets: []
                }
            },
            chartData: {
                data: {
                    person: {},
                    location: {},
                    organization: {},
                    others: {}
                }
            }
        }
    }

    componentDidMount() {

        this.updateTrendTopicsInWorldWide();

        if ("geolocation" in navigator) {
            var that = this;
            navigator.geolocation.getCurrentPosition(function (position) {
                that.updateTrendTopicsInArea(position.coords.latitude, position.coords.longitude)

            },
            function(error) {
                if(error.code === 1){ // if user does not allow geolocation
                    let payload = {
                        data: {
                            trendTopicDataInArea: {
                                errorCode: 404,
                                trendTopics: []
                            },
                        }
                    }
            
                    that.props.actions.update_trendtopics_inarea(payload);

                }
            }

        );
          

        } 


    }









updateTrendTopicsInArea = async (lat, lng) => {
    let response = null;
    response = await fetch('api/getTrendTopics/byGeolocation?lat=' + lat + '&lng=' + lng);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }
    else if (typeof body.errorCode !== 'undefined') {
        let payload = {
            data: {
                trendTopicDataInArea: {
                    errorCode: body.errorCode,
                    trendTopics: []
                },
            }
        }

        this.props.actions.update_trendtopics_inarea(payload);

    }
    else {
        let payload = {
            data: {
                trendTopicDataInArea: {
                    errorCode: '',
                    trendTopics: body.trendTopics
                },
            }
        }

        this.props.actions.update_trendtopics_inarea(payload);

    }

};

updateTrendTopicsInWorldWide = async () => {
    let response = null;
    response = await fetch('api/getTrendTopics/inWorldWide');
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }
    else if (typeof body.errorCode !== 'undefined') {
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
    else {
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

};


handleChartData(chartData) {
    this.setState({ chartData: chartData });
}

handleMapData(mapData) {
    this.setState({ mapData: mapData });
}

handleTweetPanelData(tweetData) {
    this.setState({ tweetData: tweetData });
}

render() {
    return (
        <MuiThemeProvider>
            <div className="main">
                <SearchArea newChartDataListener={this.handleChartData.bind(this)} newMapDataListener={this.handleMapData.bind(this)} newTweetPanelListener={this.handleTweetPanelData.bind(this)} />
                <Board chartData={this.state.chartData} mapData={this.state.mapData} tweetData={this.state.tweetData} />
            </div>
        </MuiThemeProvider>

    );
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
