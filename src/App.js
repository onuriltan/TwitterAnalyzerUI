import React, { Component } from 'react';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapData: [ ],

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

    render() {
        return (
            <MuiThemeProvider>
                <div className="main">
                    <SearchArea newChartDataListener={this.handleChartData.bind(this)} newMapDataListener={this.handleMapData.bind(this)} />
                    <Board chartData={this.state.chartData} mapData={this.state.mapData} />
                </div>
            </MuiThemeProvider>

        );
    }

}

export default App;
