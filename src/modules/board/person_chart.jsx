import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

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
        return (
            <div className="chart">
                <Pie data={this.state.data}
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

        let personMap = this.props.state.reducer.person;
        let updatedData = this.state.data;

        Object.entries(personMap).forEach(([key, value]) => updatedData.labels.push(key));
        Object.entries(personMap).forEach(([key, value]) => updatedData.datasets[0].data.push(value));

        this.setState({ data: updatedData });
        console.log(this.state.data);

    }



}
PersonChart.propTypes = {
    actions: PropTypes.object,
    initialState: PropTypes.object
};

function mapStateToProps(state) {
    return { state: state };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonChart);