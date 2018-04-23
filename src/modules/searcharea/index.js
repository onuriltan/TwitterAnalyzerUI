import React, { Component } from 'react';

import SearchButtons from './search_buttons';
import Description from './description';
import SearchField from './search_field';
import TrendTopics from './trendtopics';

import '../searcharea/style.scss';

export default class extends Component {

    render() {
        return (
            <div className = "searcharea">
                <TrendTopics trendTopicData={this.props.trendTopicData} />
                <div className ="middlesection">
                    <Description />
                    <SearchField />
                    <SearchButtons newChartDataListener={this.props.newChartDataListener} newMapDataListener={this.props.newMapDataListener} newTweetPanelListener={this.props.newTweetPanelListener}/>
                </div>
            </div>
        );
    }

}

