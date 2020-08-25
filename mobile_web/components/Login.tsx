import React, { Component, useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { ROOT_URI } from '../env_config';

class Login extends Component {

  loginDisabled = true;

  state = {
    username: "",
    password: "",
    jwtToken: "",
    login_message: "Please Login",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
      return (
        <View style={this.styles.container}>
          <Image style={this.styles.logo_image} source={require('./img/Blockbusted_logo.png')} />
          {/* login */}
          <View style={this.styles.container}>
            <View style={this.styles.inputContainer}>
              <TextInput
                style={this.styles.inputs}
                placeholder='Username'
                keyboardType='default'
                underlineColorAndroid='transparent'
                onChangeText={(username) => this.checkLogin(username)}
              />
            </View>

            <View style={this.styles.inputContainer}>
              <TextInput
                style={this.styles.inputs}
                placeholder='Password'
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({ password: password })}
              />
            </View>

            <Text style={this.styles.titleText}>{this.state.login_message}</Text>

            <TouchableHighlight
              disabled={this.loginDisabled}
              style={[this.styles.buttonContainer, this.styles.loginButton]}
              onPress={() => this.doLogin()}>
              <Text style={this.styles.loginText}>Login</Text>
            </TouchableHighlight>
          </View>

        </View>
      );
  }

  inValidLogin() {
    let str = this.state.username;

    return str === null || str.match(/^ *$/) !== null || str.trim().length < 6;
  }

  inValidPassword() {
    let str = this.state.password;

    return str === null || str.match(/^ *$/) !== null;
  }

  checkLogin(username: any) {
    this.setState({ username: username });
    if (!this.inValidLogin()) {
      this.loginDisabled = false;
      this.displayLoginMessage("");
    } else {
      this.loginDisabled = true;
      this.displayLoginMessage("Please provide valid login.");
    }
  }

  doLogin() {
    if (this.inValidLogin()) {
      this.displayLoginMessage("Please provide login.");
      return;
    }

    if (this.inValidPassword()) {
      this.displayLoginMessage("Please provide password.");
      return;
    }

    const val = this.state.username;

    // TO DO: Validate Username and Password against database.

    try {
      fetch(ROOT_URI + "/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          username: val,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ jwtToken: data.token });
          this.props.onLogin(data.token);
          this.displayLoginMessage("Login successful.");
        });
    } catch (e) {
      console.log(e);
      this.displayLoginMessage("Login error.");
      console.log("-------------------");
    }
    return;
  }

  displayLoginMessage(message: any) {
    this.setState({ login_message: message });
  }

  styles = StyleSheet.create({
    container: {     
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#DCDCDC",
      paddingTop: 5,
    },
    logo_image: {
      width: 230,
      height: 175,
    },
    inputContainer: {
      borderBottomColor: "#F5FCFF",
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      borderBottomWidth: 1,
      width: 250,
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: "#FFFFFF",
      flex: 1,
    },
    buttonContainer: {
      height: 45,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 250,
      borderRadius: 30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: "white",
    },
    HeadStyle: {
      height: 50,
      alignContent: "center",
      backgroundColor: "#4973d9",
      color: "#FFFFFF"
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
}

export default Login;