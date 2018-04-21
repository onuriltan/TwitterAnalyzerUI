import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TablePagination,
    TableRowColumn,
    TableFooter
  } from 'material-ui/Table';
  import Paper from 'material-ui/Paper';




/*let config = {
    paginated: true,
    search: 'name',   
    data:  (typeof (this.props.tweetData.data) !== "undefined" ) ? this.props.tweetData.data.tweets : [],
    columns: [
      { property: 'username', title: 'Username'},
      { property: 'tweet', title: 'Tweet' },
    ],
    viewSearchBarOnload: true // set to true or false. Default it is set to false. Shows the search bar or not depending on the value set
  };*/



class TweetPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
                 page: 0,
                 rowsPerPage: 10,
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
            <div className= "tweetpanel" >
                <Paper className="tweetpanel_paper">

                 <Table>
                    <TableHeader>
                       <TableRow>
                          <TableHeaderColumn>Username</TableHeaderColumn>
                           <TableHeaderColumn>Tweet</TableHeaderColumn>
                       </TableRow>
                    </TableHeader>
           
                    <TableBody>
                         { 
                                this.props.tweetData.data.tweets.map((tweet) => 
                                   <TableRow>
                                      <TableRowColumn>{tweet.username}</TableRowColumn>
                                       <TableRowColumn>{tweet.tweet}</TableRowColumn>
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