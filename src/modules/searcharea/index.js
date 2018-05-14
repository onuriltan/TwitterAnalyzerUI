import React, { Component } from 'react';

import SearchButtons from './search_buttons';
import Description from './description';
import TrendTopics from './trendtopics';

import '../searcharea/style.scss';

export default class extends Component {

    render() {
        return (
            <div className = "searcharea">
                <TrendTopics trendTopicName="Trends In Area"/>

                <div className ="middlesection">
                    <Description />
                    <SearchButtons newChartDataListener={this.props.newChartDataListener} newMapDataListener={this.props.newMapDataListener} newTweetPanelListener={this.props.newTweetPanelListener}/>
                </div>
                
                <TrendTopics trendTopicName="Trends In World"/>

            </div>
        );
    }

}

