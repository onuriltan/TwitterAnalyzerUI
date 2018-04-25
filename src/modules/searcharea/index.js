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
                <TrendTopics trendTopicName="Trends In Your Area" trendTopicData={this.props.trendTopicDataInArea} />
                <div className ="middlesection">
                    <Description />
                    <SearchField />
                    <SearchButtons newChartDataListener={this.props.newChartDataListener} newMapDataListener={this.props.newMapDataListener} newTweetPanelListener={this.props.newTweetPanelListener}/>
                </div>
                <TrendTopics trendTopicName="Trends In WorldWide" trendTopicData={this.props.trendTopicDataInWorldWide} />

            </div>
        );
    }

}

