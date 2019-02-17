import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import firebase from "firebase";
import W1Icon from "../Images/w1.png";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    flex: 1
  },
  rectangle: {
    width: "100%",
    height: 180,
    backgroundColor: "rgb(1,173,194)"
  },
  triangleTopLeft: {
    width: "100%",
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 500,
    borderTopWidth: 50,
    borderRightColor: "transparent",
    borderTopColor: "rgb(1,173,194)"
  },
  // h1: {
  //   fontFamily: 'AvenirNext-regular',
  //   fontSize: 25,
  //   textAlign: 'center',
  //   color: 'white',
  //   paddingTop: 25.5,
  // },
  text1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "white",
    paddingTop: "18%"
  },
  pic: {
    paddingTop: "6%",
    alignItems: "center",
    justifyContent: "center"
  },
  text2: {
    fontFamily: "AvenirNext-regular",
    fontSize: 23,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: "4%"
  },
  text3: {
    fontFamily: "AvenirNext-regular",
    fontSize: 23,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: "12%"
  },
  text4: {
    fontFamily: "AvenirNext-regular",
    fontSize: 23,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: 5
  },
  text5: {
    fontFamily: "AvenirNext-regular",
    fontSize: 20,
    color: "white",
    textAlign: "center"
  },
  button: {
    height: 49,
    width: 209.5,
    backgroundColor: "rgb(0,173,194)",
    borderRadius: 4,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15%"
  }
});

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }

  componentWillMount() {
    const q = firebase.database().ref("users");
    AsyncStorage.getItem("userToken").then(userID => {
      q.once("value", snapshot => {
        snapshot.forEach(data => {
          if (data.key === userID) {
            const firstWord = data
              .val()
              .name.substr(0, data.val().name.indexOf(" "));
            this.setState({
              name: firstWord
            });
          }
        });
      });
    });
  }
  toDiscover = () => {
    this.props.navigation.navigate("Discover");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
          <Text style={styles.text1}>Welcome, {this.state.name}! </Text>
        </View>
        <View style={styles.triangleTopLeft} />
        <View style={styles.pic}>
          <Image source={W1Icon} style={{ height: 92.5, width: 92.5 }} />
        </View>
        <Text style={styles.text2}>Start discovering</Text>
        <Text style={styles.text3}>Circle uses your location to discover</Text>
        <Text style={styles.text4}>people around you</Text>
        <TouchableOpacity onPress={this.toDiscover}>
          <View style={styles.button}>
            <Text style={styles.text5}>OK, got it!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
