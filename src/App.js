import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trendTopicDataInArea: [],
            trendTopicDataInWorldWide: [],
            address: '',
            woeid: '',
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

        this.getTrendTopicsInWorldWide()
            .then(res => this.setState({ trendTopicDataInWorldWide: res.trendTopics }))
            .catch(err => console.log(err));

        if ("geolocation" in navigator) {
            var that = this;
            navigator.geolocation.getCurrentPosition(function (position) {
                that.getTrendTopicsInArea(position.coords.latitude, position.coords.longitude)
                    .then(res => that.setState({ trendTopicDataInArea: res.trendTopics }))
                    .catch(err => console.log(err));
             });
        }
        
    }


    getTrendTopicsInArea = async (lat,lng) => {
        let response = null;
        response = await fetch('api/getTrendTopics/byGeolocation?lat='+lat+'&lng='+lng);
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    getTrendTopicsInWorldWide = async () => {
        let response = null;
        response = await fetch('api/getTrendTopics/inWorldWide');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
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
        console.log(this.state)
        return (
            <MuiThemeProvider>
                <div className="main">
                    <SearchArea trendTopicDataInWorldWide={this.state.trendTopicDataInWorldWide} trendTopicDataInArea={this.state.trendTopicDataInArea} newChartDataListener={this.handleChartData.bind(this)} newMapDataListener={this.handleMapData.bind(this)} newTweetPanelListener={this.handleTweetPanelData.bind(this)} />
                    <Board chartData={this.state.chartData} mapData={this.state.mapData} tweetData={this.state.tweetData} />
                </div>
            </MuiThemeProvider>

        );
    }

}

export default App;
