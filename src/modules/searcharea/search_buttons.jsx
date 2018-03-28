import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';


class SearcButtons extends Component {

    render() {
        return (
            <div className="searchbuttons">
                <RaisedButton className="bttn" label="Start" />
                <RaisedButton className="bttn" label="Stop" />
            </div>
        );
    }

    
}
export default SearcButtons;
