import React, { Component } from 'react';

import '../board/style.scss';

import PieChart from './pie_chart';

export default class extends Component {

    render() {
        return (
            <div className="board">
                <div className="board1">
                    <PieChart />
                    <PieChart />
                </div>
                <div className="board2">
                    <PieChart />
                    <PieChart />
                </div>
            </div>
        );
    }
}