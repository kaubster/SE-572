import React, { Component, useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Login from "../components/Login";
import Films from "../components/Films";

class LoginScreen extends Component {
  loginDisabled = true;

  state = {
    jwtToken: "",
  };

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleLogin(value){
    this.setState({ jwtToken: value });
  }

  render() {
    if (this.state.jwtToken) {
      return (
        <Films jwtToken={this.state.jwtToken} />
      );
    } else {
      return (
        <Login onLogin={this.handleLogin} />
      );
    }
  }

  styles = StyleSheet.create({
    // Nada...
  });
}

export default LoginScreen;