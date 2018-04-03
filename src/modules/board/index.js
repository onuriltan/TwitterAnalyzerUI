import React, { Component } from 'react';

import '../board/style.scss';

import PersonChart from './person_chart';
import LocationChart from './location_chart';
import OrganizationChart from './organization_chart';
import TitleChart from './title_chart';

export default class extends Component {

    render() {
        return (
            <div className="board">
            <div className="temp">{JSON.stringify(this.props.chart)} </div>
                <div className="board1">
                    <PersonChart chartData = {this.props.chart} />
                    <LocationChart chartData = {this.props.chart}/>
                    
                </div>
                <div className="board2">
                    <OrganizationChart chartData = {this.props.chart} />
                    <TitleChart chartData = {this.props.chart}/>
                </div>
            </div>
        );
    }
}