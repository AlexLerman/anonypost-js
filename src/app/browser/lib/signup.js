import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import request from 'browser-request'

Yavanna.provide('Signup', () => {

  return React.createClass({
//            floatingLabelFixed={true}
    getInitialState: function() {
      return {username: "", password: "", confirmedPassword: ""}
    },

    onResponse(err, res, body){
      console.log(res)
      if(err){
          console.log(body)
          console.log(res.body)
          console.log(res)
          return
          // throw err;
      }
      this.props.handleClose()
    },

    submit(){
      request({method:'POST', url:'/api/signup', json:{username: this.state.username, password: this.state.password}}, this.onResponse)
    },

    updateUsername(event, value){
      this.setState({username: value})
    },

    updatePassword(event, value){
      this.setState({password: value})
    },


    updateConfirmedPassword(event, value){
      this.setState({confirmedPassword: value})
    },


    isNotValid(){
      if (this.state.username === "" || this.state.password === "" || this.state.password !== this.state.confirmedPassword){
        return true
      }
      return false

    },

    render() {
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.props.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          disabled={this.isNotValid()}
          onTouchTap={this.submit}
        />,
      ];

      return (
        <div>
          <Dialog
            open={this.props.open}
            modal={true}
            actions={actions}
          >
            <TextField
              autoFocus={true}
              hintText="Username"
              floatingLabelText="Username"
              // fullWidth={true}
              onChange={this.updateUsername}
             />
            <br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              onChange={this.updatePassword}
            />
            <br />
            <TextField
              hintText="Confirm Password"
              floatingLabelText="Confirm Password"
              type="password"
              onChange={this.updateConfirmedPassword}
            />
            <br />
          </Dialog>
        </div>
      )
    }

  })
})
