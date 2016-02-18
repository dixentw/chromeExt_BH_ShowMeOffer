'use strict'

import React from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import TextField from 'material-ui/lib/text-field';
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
            <div>
                <TextField floatingLabelText="* 公司名稱" />
                <br/>
                <TextField floatingLabelText="* 職缺名稱" />
                <br/>
                <TextField
                    floatingLabelText="* 面試心得"
                    multiLine={true}
                />
                <br/>
                <TextField floatingLabelText="* 作者"/>
                <br/>
                <RaisedButton
                    label="送出"
                    primary={true}
                    onTouchTap={this.handleTouchTap}
                />
            </div>
        );
    }
}

ReactDOM.render(<WriteApp />, document.getElementById("main"));
