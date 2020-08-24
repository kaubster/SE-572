// import * as React from 'react';
// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';

// export default function TabTwoScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab Two</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
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


import React, { Component, useState } from "react";
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

class TabTwoScreen extends Component {
  filmObj = {
    name: "",
    rating: 0,
  };

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

  componentDidMount() {}

  componentWillUnmount() {}

  onLogin() {
    Alert.alert(
      "Credentials",
      `${this.state.username} + ${this.state.password}`
    );
  }

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.table_container}>
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
        </View>

        <Text style={this.styles.titleText}>{this.state.user_message}</Text>

        <TouchableHighlight
          style={[this.styles.buttonContainer, this.styles.loginButton]}
          onPress={() => this.getFilms()}>
          <Text style={this.styles.loginText}>Get Films</Text>
        </TouchableHighlight>
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

  // validRating(rating: number) {
  //   if (rating) {
  //     return true;
  //   }
  //   return false;
  // }

  // validRatingRange(rating: number) {
  //   if (rating && rating >= 0 && rating <= 100) {
  //     return true;
  //   }
  //   return false;
  // }

  // createFilm() {
  //   let name = this.state.filmName;

  //   if (name) {
  //     let rating = this.state.filmRating;

  //     if (!this.validRating(rating)) {
  //       this.displayMessage("Please provide a rating score (0 to 100%).");
  //       return;
  //     }

  //     if (!this.validRatingRange(rating)) {
  //       this.displayMessage("Please rate 0 to 100%.");
  //       return;
  //     }

  //     let record = {
  //       name: name,
  //       rating: rating,
  //     };

  //     this.addFilm(record);

  //     // filmNameBx.value = "";
  //     // filmRatingBx.value = 0;

  //     this.displayMessage(record.name + " added.");
  //     return;
  //   }
  //   this.displayMessage("Please enter a film name.");
  //   return false;
  // }

  // addFilm(record: any) {
  //   let scope = this;
  //   try {
  //     fetch("http://192.168.80.1:8080/api/v1/films", {
  //       method: "POST",
  //       body: JSON.stringify({ name: record.name, rating: record.rating }),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + this.state.jwtToken,
  //       },
  //     }).then((resp) => {
  //       setTimeout(function () {
  //         if (resp.status == 200) {
  //           scope.displayMessage("Authorized. Film was added.");
  //         } else if (resp.status == 400) {
  //           scope.displayMessage(
  //             "Authorized. Film exists, please add another film."
  //           );
  //         } else {
  //           scope.displayMessage(
  //             "Login Error (Error Code: " +
  //               resp.status +
  //               " " +
  //               resp.statusText +
  //               "). Did you login?"
  //           );
  //         }
  //       }, 0);
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     console.log("-----------------");
  //   }
  // }

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
          console.log("got films" + JSON.stringify(films));
        });
    } catch (e) {
      console.log(e);
      console.log("-----------------");
    }
  }

  displayFilms(films: any) {
    if (this.filmsExist(films)) {

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
      marginBottom: 20,
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
      paddingTop: 35,
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

export default TabTwoScreen;