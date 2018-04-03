import React, { Component } from 'react';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                data: {
                    person: { },
                    location: { },
                    organization: { },
                    title: { },
                    others: { }
                }
            }
        }
    }

    handleNewData(chartData) {
        this.setState({ chartData: chartData })
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="main">
                    <SearchArea newDataListener={this.handleNewData.bind(this)} />
                    <Board chart={this.state.chartData} />
                </div>
            </MuiThemeProvider>

        );
    }

}

export default App;
