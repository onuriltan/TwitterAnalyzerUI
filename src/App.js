import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapData:  {
                data: {
                    tweetslocation: []
                }
            },
            tweetData : { 
                data: {
                    tweets: []
                }
            }, 
            chartData: {
                data: {
                    person: { },
                    location: { },
                    organization: { },
                    others: { }
                }
            }
        }
    }

    handleChartData(chartData) {
        this.setState({ chartData : chartData });
    }

    handleMapData(mapData) {
        this.setState({ mapData : mapData });
    }
    handleTweetPanelData(tweetData) {
        this.setState({ tweetData : tweetData });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="main">
                    <SearchArea newChartDataListener={this.handleChartData.bind(this)} newMapDataListener={this.handleMapData.bind(this)} newTweetPanelListener={this.handleTweetPanelData.bind(this)}/>
                    <Board chartData={this.state.chartData} mapData={this.state.mapData} tweetData={this.state.tweetData}/>
                </div>
            </MuiThemeProvider>

        );
    }

}

export default App;
