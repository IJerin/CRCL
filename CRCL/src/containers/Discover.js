import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Col, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(182,182,182)",
    height: "100%",
    width: "100%",
    flex: 1
  },
  rectangle: {
    width: "100%",
    height: "22%",
    backgroundColor: "rgb(41,136,148)"
  },
  triangleTopLeft: {
    width: "100%",
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 500,
    borderTopWidth: 50,
    borderRightColor: "transparent",
    borderTopColor: "rgb(41,136,148)"
  },
  h1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 32,
    textAlign: "center",
    color: "white",
    paddingTop: "15%"
  },
  circle: {
    marginLeft: "83%",
    marginTop: 0
  },
  whitebox1: {
    marginTop: "4%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 89,
    width: "92%",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center"
  },
  whitebox2: {
    marginTop: -4.5,
    marginLeft: "auto",
    marginRight: "auto",
    height: 89,
    width: "92%",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center"
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
    marginLeft: "auto",
    marginRight: "auto"

    //  marginLeft:205,
  },
  pic: {
    height: 50,
    width: 50,
    borderColor: "rgb(0,173,194)",
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 10
  },
  text1: {
    fontFamily: "Avenir-Book",
    fontSize: 15,
    color: "rgb(29,29,38)"
  },
  text2: {
    fontFamily: "Avenir-Book",
    fontSize: 12,
    color: "rgb(186,186,189)"
  },
  text3: {
    fontFamily: "avenir-light",
    fontSize: 9,
    color: "rgb(0,173,194)"
  },
  text4: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 25.5,
    color: "white",
    textAlign: "center",
    paddingTop: "2%"
  },
  text5: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 25.5,
    color: "white",
    textAlign: "center",
    paddingTop: "6%",
    marginLeft: 64,
    marginRight: 64
  },
  text6: {
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
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    marginTop: "6%"
  }
});

export default class Discovr extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  toDiscover1 = () => {
    this.props.navigation.navigate("Discover1");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
          <Text style={styles.h1}>Discover</Text>
        </View>
        <View style={styles.triangleTopLeft} />
        <View style={styles.circle}>
          <Image
            source={require("../Images/VISIBLE.png")}
            style={{
              height: 36.3,
              width: 36.7
            }}
          />
        </View>
        <View style={styles.whitebox1}>
          <Grid style={{ marginTop: 20 }}>
            <Col style={{ width: "20%" }}>
              <View>
                <Image
                  source={require("../Images/b1.png")}
                  style={styles.pic}
                />
              </View>
            </Col>
            <Col style={{ width: "60%" }}>
              <Text style={styles.text1}>Philippe</Text>
              <Text style={styles.text2}>
                Assistant Manager at Charls tyrwitt
              </Text>
            </Col>
            <Col style={{ width: "20%" }}>
              <Text style={styles.text3}>Arround now</Text>
            </Col>
          </Grid>
        </View>
        <View style={styles.whitebox2}>
          <Grid style={{ marginTop: 20 }}>
            <Col style={{ width: "20%" }}>
              <View>
                <Image
                  source={require("../Images/g1.png")}
                  style={styles.pic}
                />
              </View>
            </Col>
            <Col style={{ width: "60%" }}>
              <Text style={styles.text1}>Iliana</Text>
              <Text style={styles.text2}>Neuropsychologist at UOW</Text>
            </Col>
            <Col style={{ width: "20%" }}>
              <Text style={styles.text3}>16 min ago</Text>
            </Col>
          </Grid>
        </View>
        <View style={styles.triangle} />
        <Text style={styles.text4}>See who is around you</Text>
        <Text style={styles.text5}>Tap to find out more about them</Text>
        <TouchableOpacity onPress={this.toDiscover1}>
          <View style={styles.button}>
            <Text style={styles.text6}>OK, got it!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
