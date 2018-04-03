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
                <div className="board1">
                    <PersonChart />
                    <LocationChart />
                </div>
                <div className="board2">
                    <OrganizationChart />
                    <TitleChart />
                </div>
            </div>
        );
    }
}