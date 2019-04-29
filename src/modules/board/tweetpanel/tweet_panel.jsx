import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import Paper from 'material-ui/Paper';

class TweetPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false
        };
    }

    render() {

        return (
            <div className="tweetpanel" >
                <Paper id="tweetpanel_paper" className="tweetpanel_paper">
                    <Table>
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow className="tableHeader">
                                <TableHeaderColumn>Username</TableHeaderColumn>
                                <TableHeaderColumn>Tweet</TableHeaderColumn>
                                <TableHeaderColumn>Location</TableHeaderColumn>
                                <TableHeaderColumn>CreateDate</TableHeaderColumn>

                            </TableRow>
                        </TableHeader>

                        <TableBody id="tweetpanel_body" className="tweetpanel_body" displayRowCheckbox={this.state.showCheckboxes}>
                            {
                                this.props.tweetData.data.tweets.map((tweet) =>
                                    <TableRow
                                        key={tweet.username + "," + this.props.tweetData.data.tweets.length}
                                       >
                                       <TableRowColumn style={{
                                                whiteSpace: "normal",
                                                wordWrap: "break-word"
                                            }}> <a target="_blank" href={tweet.link}>{tweet.username}</a></TableRowColumn>
                                        <TableRowColumn
                                            style={{
                                                whiteSpace: "normal",
                                                wordWrap: "break-word"
                                            }}
                                        >
                                            {tweet.tweet}
                                        </TableRowColumn>
                                        <TableRowColumn style={{
                                                whiteSpace: "normal",
                                                wordWrap: "break-word"
                                            }}>{tweet.location}</TableRowColumn>
                                        <TableRowColumn style={{
                                                whiteSpace: "normal",
                                                wordWrap: "break-word"
                                            }}>{tweet.createDate}</TableRowColumn>

                                    </TableRow>
                                )
                            }

                        </TableBody>
                    </Table>
                </Paper>
            </div >

        );
    }
}
export default TweetPanel;
