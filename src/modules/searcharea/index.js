import React, { Component } from 'react';

import SearchButtons from './search_buttons';
import Description from './description';
import SearchField from './search_field';

import '../searcharea/style.scss';

export default class extends Component {

    render() {
        return (
            <div className = "searcharea">
                <Description />
                <SearchField />
                <SearchButtons newChartDataListener={this.props.newChartDataListener} newMapDataListener={this.props.newMapDataListener} newTweetPanelListener={this.props.newTweetPanelListener}/>
            </div>
        );
    }

}

