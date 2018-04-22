import React, { Component } from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

let SelectableList = makeSelectable(List);

class TrendTopics extends Component {
    render(){
        return(
            <div className="trendtopics">
              <SelectableList defaultValue={1}  style={{maxHeight: '65%', overflow: 'auto',  transform:'scaleX(-1)', 
                    float       : 'none', 
                    width       : '20em',
                    marginLeft  : 'auto',
                    marginRight : 'auto'}}>
              <div className="trendtopiclist" style={{transform:'scaleX(-1)'}}>
                    <Subheader>Trend Topics</Subheader>
                    <ListItem
                        value={1}
                        primaryText="Brendan Lim"
                        
                    />
                    <ListItem
                        value={2}
                        primaryText="Kerem Suer"
                    />
                    <ListItem
                        value={3}
                        primaryText="Eric Hoffman"
                    />
                    <ListItem
                        value={4}
                        primaryText="Raquel Parrado"
                    />
                    <ListItem
                        value={5}
                        primaryText="Raquel Parrado"
                    />
                    <ListItem
                        value={6}
                        primaryText="Raquel Parrado"
                    />
                </div>

                    </SelectableList>

            </div>

        );
    }
}
export default TrendTopics;
