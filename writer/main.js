'use strict'

import React from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: Colors.deepOrange500,
  },
});

class WriteApp extends React.Component {
    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton
                    label="Super Secret Password"
                    primary={true}
                    onTouchTap={this.handleTouchTap}
                />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<WriteApp />, document.getElementById("main"));
