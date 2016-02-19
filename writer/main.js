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

import $ from 'jquery'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: Colors.deepOrange500,
  },
});

class WriteApp extends React.Component {
    constructor() {
        super();
        this.state = {
            companyName : '',
            jobName : '',
            comment : '',
            submitter : '',
            timestamp : 1,
            attachURL : '2',
            pw : 'qwerasdfzxcv'
        }
    }
    handleTouchTap(e){
        this.setState({timestamp : Date.now(), attachURL: document.documentURI}, ()=>{
            $.post('http://130.211.249.49:8080/smo/comment', this.state, function(r){
                console.log(r);
            });
        });
    }
    handleChange(e){
        //console.log(e.target.id);
        if(e.target.id==="name"){
            this.setState({'companyName' :e.target.value});
        }else if(e.target.id==="jname"){
            this.setState({'jobName' :e.target.value});
        }else if(e.target.id==="comment"){
            this.setState({'comment' :e.target.value});
        }else if(e.target.id==="submitter"){
            this.setState({'submitter' :e.target.value});
        }
    }
    render(){
        return (
            <div>
                <TextField value={this.state.companyName} id="name" onChange={this.handleChange.bind(this)} floatingLabelText="* 公司名稱" />
                <br/>
                <TextField value={this.state.jobName} id="jname" onChange={this.handleChange.bind(this)} floatingLabelText="* 職缺名稱" />
                <br/>
                <TextField
                    onChange={this.handleChange.bind(this)}
                    value={this.state.comment}
                    id="comment"
                    floatingLabelText="* 面試心得"
                    multiLine={true}
                    rows={4}
                />
                <br/>
                <TextField value={this.state.submitter} id="submitter" onChange={this.handleChange.bind(this)} floatingLabelText="* 作者"/>
                <br/>
                <RaisedButton
                    label="送出"
                    primary={true}
                    onTouchTap={this.handleTouchTap.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(<WriteApp />, document.getElementById("main"));
