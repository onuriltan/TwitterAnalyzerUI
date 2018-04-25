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

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class TweetPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false
        };
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {

        return (
            <div className="tweetpanel" >
                <Paper id="tweetpanel_paper" className="tweetpanel_paper">
                    <Table >
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                        >
                            <TableRow>
                                <TableHeaderColumn>Username</TableHeaderColumn>
                                <TableHeaderColumn>Tweet</TableHeaderColumn>
                                <TableHeaderColumn>Country</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        <TableBody displayRowCheckbox={this.state.showCheckBoxes}>
                            {
                                this.props.tweetData.data.tweets.map((tweet) =>
                                    <TableRow key={tweet.username + "," + this.props.tweetData.data.tweets.length} >
                                        <TableRowColumn>{tweet.username}</TableRowColumn>
                                        <TableRowColumn style={{
                                            whiteSpace: "normal",
                                            wordWrap: "break-word"
                                        }}>{tweet.tweet}</TableRowColumn>ß
                                        <TableRowColumn>{tweet.country}</TableRowColumn>
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
