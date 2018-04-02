import React, { Component } from 'react';

import { Pie } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';


const height = 300;
const width = 300;


class PieChart extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
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

        this.fetch_chartdata_from_global_state();
    }

    componentWillReceiveProps(newProps) {
        console.warn(newProps)
        this.fetch_chartdata_from_global_state(newProps);
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
        console.warn("calısıtı mı")
        if (this.state.name === "ORGANIZATION") {
            let organizationMap = this.props.state.reducer.organization;
            let updatedData = this.state.data;
            Object.entries(organizationMap).forEach(([key, value]) => updatedData.labels.push(key));
            Object.entries(organizationMap).forEach(([key, value]) => updatedData.labels.push(value));
            this.setState({ data: updatedData });

        }
        if (this.state.name === "PERSON") {
            let personMap = this.props.state.reducer.person;
            let updatedData = this.state.data;
            Object.entries(personMap).forEach(([key, value]) => updatedData.labels.push(key));
            Object.entries(personMap).forEach(([key, value]) => updatedData.labels.push(value));
            this.setState({ data: updatedData });
        }
        if (this.state.name === "LOCATION") {
            let locationMap = this.props.state.reducer.location;
            let updatedData = this.state.data;
            Object.entries(locationMap).forEach(([key, value]) => updatedData.labels.push(key));
            Object.entries(locationMap).forEach(([key, value]) => updatedData.labels.push(value));
            this.setState({ data: updatedData });
        }
        if (this.state.name === "TITLE") {
            let titleMap = this.props.state.reducer.title;
            let updatedData = this.state.data;
            Object.entries(titleMap).forEach(([key, value]) => updatedData.labels.push(key));
            Object.entries(titleMap).forEach(([key, value]) => updatedData.labels.push(value));
            this.setState({ data: updatedData });
        }

    }


}
PieChart.propTypes = {
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
)(PieChart);