import React, { Component } from 'react';

import '../board/style.scss';

import PieChart from './pie_chart';

export default class extends Component {

    render() {
        return (
            <div className="board">
                <div className="board1">
                    <PieChart name="NAME"/>
                    <PieChart name="LOCATION"/>
                </div>
                <div className="board2">
                    <PieChart name="ORGANIZATION"/>
                    <PieChart name="TITLE"/>
                </div>
            </div>
        );
    }
}