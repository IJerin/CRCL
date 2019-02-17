import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import listIcon from "../Images/list.png";
import VisibleIcon from "../Images/VISIBLE.png";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    flex: 1
  },
  rectangle: {
    width: "100%",
    height: 150,
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
    color: "rgba(255,255,255,0.8)",
    paddingTop: 25.5
  },
  text1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    paddingTop: 29.5
  },
  mText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 15,
    color: "rgba(0,0,0,0.7)"
  },
  vText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 12,
    color: "rgba(0,0,0,0.7)",
    marginTop: "2%"
  }
});

export default class About extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  toDiscover = () => {
    this.props.navigation.navigate("Discover");
  };

  toToC = () => {
    this.props.navigation.navigate("ToC");
  };

  toPrivacy = () => {
    this.props.navigation.navigate("Privacy");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
          <Text style={styles.h1}>Settings</Text>
          <Text style={styles.text1}>About</Text>
        </View>
        <View style={styles.triangleTopLeft} />
        <Grid style={{ marginTop: "10%", height: "50%" }}>
          <TouchableOpacity onPress={this.toToC}>
            <Row style={{ marginTop: 20, height: 35 }}>
              <Col style={{ width: "10%" }} />
              <Col style={{ width: "80%" }}>
                <Text style={styles.mText}>Terms and Condition</Text>
              </Col>
              <Col>
                <Image
                  style={{ height: 20.2, width: 10.5 }}
                  source={listIcon}
                />
              </Col>
            </Row>
          </TouchableOpacity>
          <Row style={{ height: 15 }}>
            <Col
              style={{
                width: "100%",
                height: 1.5,
                borderTopColor: "rgb(243,243,244)",
                borderTopWidth: 0.8
              }}
            />
          </Row>
          <TouchableOpacity onPress={this.toPrivacy}>
            <Row style={{ height: 35 }}>
              <Col style={{ width: "10%" }} />
              <Col style={{ width: "80%" }}>
                <Text style={styles.mText}>Privacy Policy</Text>
              </Col>
              <Col>
                <Image
                  style={{ height: 20.2, width: 10.5 }}
                  source={listIcon}
                />
              </Col>
            </Row>
          </TouchableOpacity>
          <Row style={{ height: 15 }}>
            <Col
              style={{
                width: "100%",
                height: 1.5,
                borderTopColor: "rgb(243,243,244)",
                borderTopWidth: 0.8
              }}
            />
          </Row>
          <Row style={{ height: 35 }}>
            <Col style={{ width: "10%" }} />
            <Col style={{ width: "80%" }}>
              <Text style={styles.mText}>Help</Text>
            </Col>
            <Col>
              <TouchableOpacity onPress={this.toAbout}>
                <Image
                  style={{ height: 20.2, width: 10.5 }}
                  source={listIcon}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{ height: 15 }}>
            <Col
              style={{
                width: "100%",
                height: 1.5,
                borderTopColor: "rgb(243,243,244)",
                borderTopWidth: 0.8
              }}
            />
          </Row>
          <Row style={{ height: 35 }}>
            <Col style={{ width: "10%" }} />
            <Col style={{ width: "80%" }}>
              <Text style={styles.mText}>Rate the App</Text>
            </Col>
            <Col>
              <TouchableOpacity onPress={this.toAbout}>
                <Image
                  style={{ height: 20.2, width: 10.5 }}
                  source={listIcon}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={{ height: 15 }}>
            <Col
              style={{
                width: "100%",
                height: 1.5,
                borderTopColor: "rgb(243,243,244)",
                borderTopWidth: 0.8
              }}
            />
          </Row>
          <Row>
            <Col style={{ marginTop: "10%" }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image source={VisibleIcon} style={{ height: 50, width: 50 }} />
                <Text style={styles.vText}>Version 1.0</Text>
              </View>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}
