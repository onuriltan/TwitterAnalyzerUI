import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';


const height = 300;
const width = 300;


class LocationChart extends Component {

    render() {
        var data = this.fetch_chartdata_from_global_state();

        return (
            <div className="chart">
                <label className="description"> Location </label>
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
                    '#FFCE56',
                    '#FF0000',
                    '#8A46FF'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF0000',
                    '#8A46ff'
                ]
            }]
        };

        let map = this.props.chartData.data.location;

        if (typeof (map) !== "undefined" && map !== null && (Object.keys(map).length !== 0 && map.constructor === Object)) {

            let tuples = [];

            for (let key in map) tuples.push([key, map[key]]);

            tuples.sort(function (a, b) {
                a = a[1];
                b = b[1];

                return a > b ? -1 : (a < b ? 1 : 0);
            });

            for (var i = 0; i < tuples.length; i++) {
                if (i < 5) {
                    let key = tuples[i][0] + " - " + tuples[i][1];
                    let value = tuples[i][1];

                    updatedData.labels.push(key);
                    updatedData.datasets[0].data.push(value);
                }
            }

        }
        else {
            updatedData.labels.push("No Data");
            updatedData.datasets[0].data.push(1);
        }
        return updatedData;

    }

}




export default LocationChart;