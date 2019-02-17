import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import CircleIcon from "../Images/circle.png";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "rgb(1,173,194)",
    height: "100%",
    width: "100%",
    flex: 1
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 128.5
  },
  text: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 40,
    textAlign: "center",
    color: "white",
    paddingTop: 51.4
  },
  circleImage: {
    height: 200,
    width: 200
  }
});

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  toSignup = () => {
    this.props.navigation.navigate("Signup");
  };
  toedit = () => {
    this.props.navigation.navigate("edit");
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={this.toedit}>
          <View style={styles.circle}>
            <Image style={styles.circleImage} source={CircleIcon} />
          </View>
        </TouchableOpacity>
        <ScrollView>
          <TouchableOpacity onPress={this.toSignup}>
            <Text style={styles.text}>CIRCLE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
