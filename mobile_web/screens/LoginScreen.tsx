import React, { Component, useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';

import { ROOT_URI } from '../env_config';

class LoginScreen extends Component {

  loginDisabled = true;

  state = {
    username: "",
    password: "",
    jwtToken: "",
    HeadTable: ["Film", "Rating"],
    DataTable: [],
    filmName: "",
    filmRating: 100,
    user_message: "",
    login_message: "Please Login",
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {

  if(this.state.jwtToken){
      return (
        <View style={this.styles.container}>
          {/* Add Film */}
          <View style={this.styles.container}>
            <View style={this.styles.inputContainer}>
              <TextInput
                style={this.styles.inputs}
                placeholder='Enter Film Name'
                keyboardType='default'
                underlineColorAndroid='transparent'
                onChangeText={(film_name) => {
                  this.setState({ filmName: film_name });
                  this.validFilmName(film_name);
                }}
              />
            </View>

            <View style={this.styles.inputContainer}>
              <TextInput
                style={this.styles.inputs}
                placeholder='Enter Rating'
                keyboardType='default'
                underlineColorAndroid='transparent'
                onChangeText={(film_rating) => {
                  this.setState({ filmRating: film_rating });
                  let num = film_rating as unknown;
                  this.validRating(num as number);
                }}
              />
            </View>

            <Text style={this.styles.titleText}>{this.state.user_message}</Text>

            <TouchableHighlight
              style={[this.styles.filmButtonContainer, this.styles.filmButton]}
              onPress={() => this.createFilm()}>
              <Text style={this.styles.loginText}>Add Film</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[this.styles.filmButtonContainer, this.styles.filmButton]}
              onPress={() => this.modifyFilm()}>
              <Text style={this.styles.loginText}>Modify Film</Text>
            </TouchableHighlight>
          </View>

          {/* Get Films */}
          <View style={this.styles.container}>

            <TouchableHighlight
              style={[this.styles.getFilmButtonContainer, this.styles.filmButton]}
              onPress={() => this.getFilms()}>
              <Text style={this.styles.loginText}>Get Films</Text>
            </TouchableHighlight>

            <View style={this.styles.table_container}>
              {!this.state.DataTable ||
              this.state.DataTable.length == 0 ? null : (
                <Table borderStyle={this.styles.table_border}>
                  <Row
                    data={this.state.HeadTable}
                    style={this.styles.HeadStyle}
                    textStyle={this.styles.HeaderText}
                  />
                  <Rows
                    data={this.state.DataTable}
                    textStyle={this.styles.TableText}
                  />
                </Table>
              )}
            </View>
          </View>
        </View>
      );
  } else {
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

  displayMessage(message: any) {
    this.setState({ user_message: message });
  }

  filmsExist(films: any) {
    if (!films || films.length == 0) return false;
    return true;
  }

  clearTable(table: any) {
    if (table) {
      while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
      }
    }
  }

  generateTable(arrayOfFilms: [{ name: ""; rating: "" }]) {
    if (arrayOfFilms) {
      this.setState({ DataTable: [] });
      let data = [["", ""]];
      data.pop();
      arrayOfFilms.map((film) => data.push([film.name, film.rating]));
      this.setState({ DataTable: data });
    }
  }

  validFilmName(filmName: string) {
    if (!this.validateFileName(filmName)) {
      this.displayMessage("Please provide a film name.");
      return false;
    }

    this.displayMessage("");
    return true;
  }

  validRating(rating: number) {
    if (!this.validRatingLength(rating)) {
      this.displayMessage("Please provide a rating score (0 to 100%).");
      return false;
    }

    if (!this.validRatingRange(rating)) {
      this.displayMessage("Please rate 0 to 100%.");
      return false;
    }

    this.displayMessage("");
    return true;
  }

  validRatingLength(rating: number) {
    if (rating) {
      return true;
    }
    return false;
  }

  validRatingRange(rating: number) {
    if (rating && rating >= 0 && rating <= 100) {
      return true;
    }
    return false;
  }

  validateFileName(filmName: string) {
    return !(
      filmName === null ||
      filmName.match(/^ *$/) !== null ||
      filmName.trim().length < 1
    );
  }

  createFilm() {
    let filmName = this.state.filmName;

    if (this.validFilmName(filmName)) {
      let filmRating = this.state.filmRating;

      if (!this.validRating(filmRating)) {
        return;
      }

      let record = {
        name: filmName,
        rating: filmRating,
      };

      this.addFilm(record);

      this.displayMessage(record.name + " added.");
      return;
    }
    this.displayMessage("Please enter a film name.");
    return false;
  }

  modifyFilm() {
    let filmName = this.state.filmName;

    if (this.validFilmName(filmName)) {
      let filmRating = this.state.filmRating;

      if (!this.validRating(filmRating)) {
        return;
      }

      let record = {
        name: filmName,
        rating: filmRating,
      };

      this.updateFilm(record);

      this.displayMessage(record.name + " added.");
      return;
    }
    this.displayMessage("Please enter a film name.");
    return false;
  };

  addFilm(record: any) {
    let scope = this;
    try {
      fetch(ROOT_URI + "/api/v1/films", {
        method: "POST",
        body: JSON.stringify({ name: record.name, rating: record.rating }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.jwtToken,
        },
      }).then((resp) => {
        setTimeout(function () {
          if (resp.status == 200) {
            scope.displayMessage("Authorized. Film was added.");
          } else if (resp.status == 400) {
            scope.displayMessage(
              "Authorized. Film exists, please add another film."
            );
          } else {
            scope.displayMessage(
              "Login Error (Error Code: " +
                resp.status +
                " " +
                resp.statusText +
                "). Did you login?"
            );
          }
        }, 0);
      });
    } catch (e) {
      console.log(e);
      console.log("-----------------");
    }
  }

  updateFilm(record: any) {
    let scope = this;
    try {
      fetch(ROOT_URI + "/api/v1/films", {
        method: "PUT",
        body: JSON.stringify({ name: record.name, rating: record.rating }),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.state.jwtToken,
        },
      }).then((resp) => {
        setTimeout(function () {
          if (resp.status == 200) {
            scope.displayMessage("Authorized. Film was updated.");
          } else if (resp.status == 400) {
            scope.displayMessage("Authorized. Film does not exist, please add another film.");
          } else {
            scope.displayMessage(
              "Login Error (Error Code: " + resp.status + " " + resp.statusText + "). Did you login?"
            );
          }
        }, 0);
      });
    } catch (e) {
      console.log(e);
      console.log("-----------------");
    }
  };

  getFilms() {
    try {
      fetch(ROOT_URI + "/api/v1/films", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((films) => {
          this.displayFilms(films);
        });
    } catch (e) {
      console.log(e);
      console.log("-----------------");
    }
  }

  displayFilms(films: any) {
    if (this.filmsExist(films)) {
      console.log("got films" + JSON.stringify(films));

      this.generateTable(films);

      this.displayMessage("Displayed film DB.");
      return;
    }
    this.displayMessage("Film DB empty. Please enter a film name.");
    return;
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
    inputIcon: {
      width: 30,
      height: 30,
      marginLeft: 15,
      justifyContent: "center",
    },
    buttonContainer: {
      height: 45,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 250,
      borderRadius: 30,
    },
    filmButtonContainer: {
      height: 25,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 200,
      borderRadius: 10,
      marginBottom: 10
    },
    getFilmButtonContainer: {
      height: 25,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 200,
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 5
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    filmButton: {
      backgroundColor: "#00a4ec",
    },
    loginText: {
      color: "white",
    },
    table_container: {
      backgroundColor: "#ffffff",
      width: 200

    },
    table_border: {
      borderWidth: 0,
      borderColor: "#4973d9"
    },
    HeadStyle: {
      height: 50,
      alignContent: "center",
      backgroundColor: "#4973d9",
      color: "#FFFFFF"
    },
    TableText: {
      margin: 10
    },
    HeaderText: {
      margin: 10,
      color: "#FFFFFF"
    },
    baseText: {
      fontFamily: "Cochin",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });
}

export default LoginScreen;