import React, { Component } from 'react';

import AmCharts from '@amcharts/amcharts3-react';

class WorldMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapData: []

        }
    }

    componentWillReceiveProps() {
        this.setState({ mapData: this.props.mapData.data.tweetslocation })
        this.forceUpdate();
    }


    render() {
        return (
            <div className="worldmap" >
                {createChart(this.state.mapData)}
            </div>

        );

        function createChart(mapData) {
            return <AmCharts.React
                style={{
                    width: "100%",
                    height: "800px"
                }}
                options={{
                    "type": "map",
                    "projection": "winkel3",
                    "theme": "dark",
                    "imagesSettings": {
                        "rollOverColor": "#089282",
                        "rollOverScale": 3,
                        "selectedScale": 3,
                        "selectedColor": "#089282",
                        "color": "#13564e"
                    },

                    "areasSettings": {
                        "unlistedAreasColor": "#15A892",
                        "outlineThickness": 0.1
                    },

                    "dataProvider": {
                        "map": "worldLow",
                        "images": [...mapData],
                    }
                }} />
        }
    }



}
export default WorldMap;