import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';

const height = 300;
const width = 300;


class PersonChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
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
            }
        }

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

        console.log(this.props.chartData.data.person);

        let personMap = this.props.chartData.data.person;

        Object.entries(personMap).forEach(([key, value]) => updatedData.labels.push(key));
        Object.entries(personMap).forEach(([key, value]) => updatedData.datasets[0].data.push(value));

        console.log(this.state.data);

        return updatedData;

    }



}


export default PersonChart;