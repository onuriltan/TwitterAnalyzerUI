import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

import SearchArea from './modules/searcharea';
import Board from './modules/board';
import BuildSocketConnection from './functions/socket_connection';

class App extends Component {

  constructor(){
    super();
    BuildSocketConnection();
  }

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
