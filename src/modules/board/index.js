import React, { Component } from 'react';

import '../board/style.scss';

import PersonChart from './charts/person_chart';
import LocationChart from './charts/location_chart';
import OrganizationChart from './charts/organization_chart';
import OthersChart from './charts/others_chart';
import WorldMap from './worldmap/world_map';

import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon'


export default class extends Component {

    render() {
        return (
            <div className="board">
                <Tabs>
                    <Tab
                        icon={<FontIcon className="material-icons">pie_chart</FontIcon>}
                        label="CHARTS"
                        className="customtab">

                        <div className="board1">
                            <PersonChart chartData={this.props.chartData} />
                            <LocationChart chartData={this.props.chartData} />

                        </div>
                        <div className="board2">
                            <OrganizationChart chartData={this.props.chartData} />
                            <OthersChart chartData={this.props.chartData} />
                        </div>

                    </Tab>
                    <Tab
                        icon={<FontIcon className="material-icons">location_on</FontIcon>}
                        label="TWEETMAP"
                        className="customtab">
                            <WorldMap mapData={this.props.mapData}/>

                    </Tab>


                </Tabs>
            </div>
        );
    }
}