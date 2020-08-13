// import * as React from 'react';
// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

// export default function TabOneScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabOneScreen.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });


import React, { Component, useState, ReactNode } from "react";
import {
  AccessibilityInfo,
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";


class TabOneScreen extends Component {
  jwtToken: ReactNode;

  state = {
    username: "",
    password: "",
    jwtToken: "",
    HeadTable: ["Film", "Rating"],
    DataTable: [],
    filmName: "",
    filmRating: 100,
    user_message: "",
  };

  constructor(props) {
    super(props);
    // this.setState({ jwtToken: this.props.jwtToken });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // <AwtContext.Consumer>
    //   {(value) => (

    //   )}
    // </AwtContext.Consumer>;

    const { name, age, location, skill } = this.props;
    return (
      <View style={this.styles.container}>
        {/* <View style={this.styles.inputContainer}>
          <Image
            style={this.styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db",
            }}
          />
          <TextInput
            style={this.styles.inputs}
            placeholder='Username'
            keyboardType='default'
            underlineColorAndroid='transparent'
            onChangeText={(username) => this.checkLogin(username)}
          />
        </View>

        <View style={this.styles.inputContainer}>
          <Image
            style={this.styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db",
            }}
          />
          <TextInput
            style={this.styles.inputs}
            placeholder='Password'
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({ password: password })}
          />
        </View>

        <Text style={this.styles.titleText}>{this.state.user_message}</Text>

        <TouchableHighlight
          style={[this.styles.buttonContainer, this.styles.loginButton]}
          onPress={() => this.doLogin()}>
          <Text style={this.styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.styles.buttonContainer}
          onPress={() => Alert.alert("Future feature...")}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.styles.buttonContainer}
          onPress={() => Alert.alert("Future feature...")}>
          <Text>Register</Text>
        </TouchableHighlight> */}

        <View style={this.styles.container}>
          <View style={this.styles.inputContainer}>
            {/* <Image
              style={this.styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db",
              }}
            /> */}
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
            {/* <Image
              style={this.styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db",
              }}
            /> */}
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
            style={[this.styles.buttonContainer, this.styles.loginButton]}
            onPress={() => this.createFilm()}>
            <Text style={this.styles.loginText}>Add Film</Text>
          </TouchableHighlight>
        </View>

        <View style={this.styles.container}>
          <View style={this.styles.table_container}>
            {!this.state.DataTable ||
            this.state.DataTable.length == 0 ? null : (
              <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
                <Row
                  data={this.state.HeadTable}
                  style={this.styles.HeadStyle}
                  textStyle={this.styles.TableText}
                />
                <Rows
                  data={this.state.DataTable}
                  textStyle={this.styles.TableText}
                />
              </Table>
            )}

            <TouchableHighlight
              style={[this.styles.buttonContainer, this.styles.loginButton]}
              onPress={() => this.getFilms()}>
              <Text style={this.styles.loginText}>Get Films</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  // inValidLogin() {
  //   let str = this.state.username;

  //   return str === null || str.match(/^ *$/) !== null || str.trim().length < 6;
  // }

  // inValidPassword() {
  //   let str = this.state.password;

  //   return str === null || str.match(/^ *$/) !== null;
  // }

  // checkLogin(username: any) {
  //   this.setState({ username: username });
  //   // const loginBtn = document.getElementById("LoginBtn");
  //   if (!this.inValidLogin()) {
  //     //loginBtn.disabled = false;
  //     this.displayMessage("");
  //   } else {
  //     //loginBtn.disabled = true;
  //     this.displayMessage("Please provide valid login.");
  //   }
  // }

  // doLogin() {
  //   const pwd = this.state.password;

  //   if (this.inValidLogin()) {
  //     this.displayMessage("Please provide login.");
  //     return false;
  //   }

  //   if (this.inValidPassword()) {
  //     this.displayMessage("Please provide password.");
  //     return false;
  //   }

  //   const val = this.state.username;

  //   // TO DO: Validate Username and Password against database.

  //   try {
  //     fetch("http://192.168.80.1:8080/api/v1/login", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         username: val,
  //       }),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         this.state.jwtToken = data.token;
  //         this.displayMessage("Login successful.");
  //       });
  //   } catch (e) {
  //     console.log(e);
  //     this.displayMessage("Login error.");
  //     console.log("-------------------");
  //   }
  //   return false;
  // }

  displayMessage(message: any) {
    //Alert.alert(message);
    this.state.user_message = message;
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
      this.state.DataTable = [];
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
      let rating = this.state.filmRating;

      if (!this.validRating(rating)) {
        return;
      }

      let record = {
        name: name,
        rating: rating,
      };

      this.addFilm(record);

      // filmNameBx.value = "";
      // filmRatingBx.value = 0;

      this.displayMessage(record.name + " added.");
      return;
    }
    this.displayMessage("Please enter a film name.");
    return false;
  }

  addFilm(record: any) {
    let scope = this;
    try {
      fetch("http://192.168.80.1:8080/api/v1/films", {
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

  getFilms() {
    try {
      fetch("http://192.168.80.1:8080/api/v1/films", {
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
      return false;
    }
    this.displayMessage("Film DB empty. Please enter a film name.");
    return false;
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#DCDCDC",

      paddingTop: 35,
      paddingBottom: 35,
    },
    inputContainer: {
      borderBottomColor: "#F5FCFF",
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      borderBottomWidth: 1,
      width: 250,
      height: 45,
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
      marginBottom: 5,
      marginTop: 5,
      width: 250,
      borderRadius: 30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: "white",
    },

    table_container: {
      flex: 1,
      padding: 18,
      backgroundColor: "#ffffff",
    },
    HeadStyle: {
      height: 50,
      alignContent: "center",
      backgroundColor: "#ffe0f0",
    },
    TableText: {
      margin: 10,
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

export default TabOneScreen;