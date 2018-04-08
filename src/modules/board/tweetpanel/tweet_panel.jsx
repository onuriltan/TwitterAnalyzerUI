import React, { Component } from 'react';
import DataTables from 'material-ui-datatables';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const TABLE_COLUMNS = [
    {
        key: 'username',
        label: 'Username',
    }, {
        key: 'tweet',
        label: 'Tweet',
    },
];



class TweetPanel extends Component {
    handleFilterValueChange = (value) => {
        // your filter logic
    }

    handleSortOrderChange = (key, order) => {
        // your sort logic
    }

    render() {
        console.log(this.props.tweetData.data);

        return (
            <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={   
                    (typeof (this.props.tweetData.data) !== "undefined" ) ? this.props.tweetData.data.tweets : []
                }
                showCheckboxes={false}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
                page={1}
                count={100}
            />
        );
    }
}
export default TweetPanel;