import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';


const height = 300;
const width = 300;


class TitleChart extends Component {

    fetch_chartdata_from_global_state() {

        let updatedData = {
            labels: [

            ],
            datasets: [{
                data: [],
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

        let titleMap = this.props.chartData.data.others;

        if (typeof(titleMap) !== "undefined" && titleMap !== null) {
            Object.entries(titleMap).forEach(([key, value]) => updatedData.labels.push(key));
            Object.entries(titleMap).forEach(([key, value]) => updatedData.datasets[0].data.push(value));
        }
        return updatedData;

    }


    render() {
        var data = this.fetch_chartdata_from_global_state();

        return (
            <div className="chart">
                <Pie data={data}
                    options={{
                        responsive: false,
                        maintainAspectRatio: false,

                    }}
                    height={height}
                    width={width}
                />
            </div>
        )
    }



}

export default TitleChart;