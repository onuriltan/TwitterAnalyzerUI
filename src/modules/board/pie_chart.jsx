import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';

const data = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};
class PieChart extends Component {

    render() {
        return (
            <div className="chart">
                <Pie data={data}
                    options={{
                        responsive: false,
                        maintainAspectRatio: false,
                       
                    }}
                    height="300px" 
                    width="300px"
                    />
            </div>
        )
    }
}
export default PieChart;