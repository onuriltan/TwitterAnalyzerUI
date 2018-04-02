import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';

const height = 300;
const width = 300;

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
                    height={height} 
                    width= {width}
                    />
            </div>
        )
    }
}
export default PieChart;