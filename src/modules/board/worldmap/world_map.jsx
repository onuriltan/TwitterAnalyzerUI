import React, { Component } from 'react';

import AmCharts from '@amcharts/amcharts3-react';


class WorldMap extends Component {


    constructor(props) {
        super(props);
        this.state = {
            map: null,
            mapData: [],
            zoomLevel: 1,
            zoomLatitude: 14,
            zoomLongitude: 0

        }
    }

    componentDidMount() {
        var map = this.createChart(this.mapData);
        this.setState({ map: map });
    }


    componentWillReceiveProps(nextProps) {

        if(this.state.map) {
            var updatedMap = this.state.map;
            updatedMap.dataProvider.images = this.props.mapData.data.tweetslocation;
            updatedMap.dataProvider.zoomLevel =  this.state.map.zoomLevel();
            updatedMap.dataProvider.zoomLatitude =  updatedMap.dataProvider.zoomLatitude =  this.state.map.zoomLatitude();
            updatedMap.dataProvider.zoomLongitude =  updatedMap.dataProvider.zoomLongitude =  this.state.map.zoomLongitude();
            this.setState({map : updatedMap})
            this.state.map.validateData(); //update above data
            console.log(this.state.map)
        }

    }

    render() {
        return (
            <div id="worldmap" >

            </div>

        );
    }

    createChart(mapData) {
        var map = AmCharts.makeChart("worldmap", {
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
                "outlineThickness": 0.1,
                "autoZoom": true

            },
            "dataProvider": {
                "map": "worldLow",
                "zoomLevel": this.state.zoomLevel,
                "zoomLatitude": this.state.zoomLatitude,
                "zoomLongitude": this.state.zoomLongitude,
                "images": [...this.state.mapData],
            },
            
        });

        window.myMap = map;

        return map;
    }



    /*createChart(mapData) {

        var map = <AmCharts.React
            style={{
                width: "100%",
                height: "1000px"
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
                    "outlineThickness": 0.1,
                    "autoZoom": true

                },

                "dataProvider": {
                    "map": "worldLow",
                    "images": [...mapData],
                    "zoomLatitude": 0,
                    "zoomLongitude": 0,
                }

            }} />

        console.log(map)

        return map;
    }*/



}
export default WorldMap;