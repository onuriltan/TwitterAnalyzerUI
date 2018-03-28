import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

class SearchField extends Component {

    render() {
        return (
            <div className="searchfield">
                <TextField
                    hintText="Keyword"
                    floatingLabelText="Enter keyword"
                    type="keyword"
                />
            </div>
        );

    }

}
export default SearchField;
