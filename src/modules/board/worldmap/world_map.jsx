import React, { Component } from 'react';

import AmCharts from '@amcharts/amcharts3-react';
import 'ammap3/ammap/ammap.js';

class WorldMap extends Component {

    render() {

        var mapData = this.props.mapData.data.tweetslocation;
       
        return (
            <div id="worldmap" >
                <AmCharts.React
                    style={{
                        width: "100%",
                        height: "800px"
                    }}
                    options={{
                        "type": "map",
                        "projection": "winkel3",
                        "theme": "light",
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
                            "images": mapData,
                        },
                        "export": {
                            "enabled": true
                        }
                    }} />

            </div>

        );
    }



}
export default WorldMap;