import React, { Component } from 'react';

import '../board/style.scss';

import PersonChart from './person_chart';
import LocationChart from './location_chart';
import OrganizationChart from './organization_chart';
import OthersChart from './others_chart';

import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon'


export default class extends Component {

    render() {
        return (
            <div className="board">
                <Tabs>
                    <Tab
                        icon={<FontIcon className="material-icons">pie_chart</FontIcon>}
                        label="CHARTS">
                        <div className="board1">
                            <PersonChart chartData={this.props.chart} />
                            <LocationChart chartData={this.props.chart} />

                        </div>
                        <div className="board2">
                            <OrganizationChart chartData={this.props.chart} />
                            <OthersChart chartData={this.props.chart} />
                        </div>
                    </Tab>
                    <Tab icon={<FontIcon className="material-icons">location_on</FontIcon>}
                        label="TWEETMAP">


                    </Tab>


                </Tabs>
            </div>
        );
    }
}