import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Natalia from "../Images/natalia.png";
import Alex from "../Images/alex1.png";
import HistoryIcon from "../Images/History.png";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    flex: 1
  },
  rectangle: {
    width: "100%",
    height: 220,
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
  h1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)"
  },
  text1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 25,
    textAlign: "center",
    color: "rgba(255,255,255,0.9)"
  },
  text2: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 17,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)"
  },
  text3: {
    fontFamily: "AvenirNext-regular",
    fontSize: 20,
    textAlign: "center",
    color: "rgba(0,0,0,0.8)",
    paddingTop: "4%"
  },
  text4: {
    fontFamily: "AvenirNext-regular",
    fontSize: 10,
    textAlign: "center",
    color: "rgba(0,0,0,0.6)",
    paddingTop: "4%"
  },
  text5: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 20,
    textAlign: "center",
    color: "rgba(0,0,0,0.6)",
    paddingTop: "2%"
  },
  Vcenter: {
    alignItems: "center"
  }
});

export default class SeeMessages extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  toDiscover = () => {
    this.props.navigation.navigate("Discover");
  };
  toSeeMessages = () => {
    this.props.navigation.navigate("SeeMessages");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
          <Grid style={{ marginTop: "5%", height: 10 }}>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "10%", alignItems: "center" }}>
                <Image style={{ height: 30, width: 28 }} source={HistoryIcon} />
              </Col>
              <Col style={{ width: "90%" }}>
                <Text style={styles.h1}>Messages</Text>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", height: 40 }}>
              <Text style={styles.text2}>
                The start of your conversation with
              </Text>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Text style={styles.text1}>Natalia</Text>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Image
                style={{ height: 50, width: 50, borderRadius: 25 }}
                source={Natalia}
              />
            </Row>
          </Grid>
        </View>
        <View style={styles.triangleTopLeft} />
        <View style={{ alignItems: "center", paddingTop: "2%" }}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 25 }}
            source={Alex}
          />
        </View>
        <View style={styles.Vcenter}>
          <Text style={styles.text3}>Hey, do you have time for coffee?</Text>
        </View>
        <View style={styles.Vcenter}>
          <Text style={styles.text4}>yesterday 12:35 pm</Text>
        </View>
        <View
          style={{
            height: 1,
            marginTop: "5%",
            borderWidth: 0.5,
            borderColor: "rgba(0,0,0,0.6)",
            width: "100%"
          }}
        />
        <View style={{ alignItems: "center", paddingTop: "5%" }}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 25 }}
            source={Natalia}
          />
        </View>
        <View style={styles.Vcenter}>
          <Text style={styles.text3}>Natalia</Text>
          <Text style={styles.text5}>is now a connection</Text>
        </View>
        <View style={styles.Vcenter}>
          <Text style={styles.text4}>yesterday 12:35 pm</Text>
        </View>
      </View>
    );
  }
}
