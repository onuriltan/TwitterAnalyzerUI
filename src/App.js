import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';



class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trendTopicData: [],
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
        this.callApi()
            .then(res => this.setState({ trendTopicData: res.trendTopics }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        let response = null;
        response = await fetch('api/getTrendTopics');
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
        return (
            <MuiThemeProvider>
                <div className="main">
                    <SearchArea trendTopicData={this.state.trendTopicData} newChartDataListener={this.handleChartData.bind(this)} newMapDataListener={this.handleMapData.bind(this)} newTweetPanelListener={this.handleTweetPanelData.bind(this)} />
                    <Board chartData={this.state.chartData} mapData={this.state.mapData} tweetData={this.state.tweetData} />
                </div>
            </MuiThemeProvider>

        );
    }

}

export default App;
