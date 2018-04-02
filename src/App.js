import React, { Component } from 'react';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';

class App extends Component {

     render() {
        return (
            <MuiThemeProvider>
                <div className="main">
                    <SearchArea />
                    <Board />
                </div>
            </MuiThemeProvider>

        );
    }

}

export default App;
