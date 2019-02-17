/* eslint-disable no-alert, no-console, */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Col, Row } from "react-native-easy-grid";
import firebase from "firebase";
import BackIcon from "../Images/Back.png";
import B1 from "../Images/b1.png";
import MessagesIcon from "../Images/Message.png";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    flex: 1
  },
  text1: {
    fontFamily: "avenir-next-regular",
    fontSize: 20,
    color: "rgba(0,0,0,0.8)"
  },
  text2: {
    fontFamily: "AvenirNext-Mediumr",
    fontSize: 18,
    color: "black"
  },
  hideText1: {
    fontFamily: "Avenir-Book",
    fontSize: 17,
    color: "rgba(0,0,0,0.5)"
  },
  mText1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 17,
    color: "rgba(0,0,0,0.7)"
  },
  hideText2: {
    fontFamily: "Avenir-Book",
    fontSize: 12,
    color: "rgba(0,0,0,0.4)"
  }
});

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      messageNotification: []
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("userToken")
      .then(token => {
        this.setState({
          userToken: token
        });
        this.notification();
      })
      .catch(error => {
        alert("en error occured");
        console.log(error);
      });
  }
  // componentWillUnmount() {
  //   clearInterval(this.notification());
  // }
  notification() {
    const notiRef = firebase
      .database()
      .ref(`users/${this.state.userToken}/notification`);
    notiRef.once("value", snap => {
      let people = [];
      snap.forEach(notification => {
        const peep = {};
        peep.key = notification.key;
        peep.name = notification.val().name;
        peep.propic = notification.val().image;
        peep.messages = notification.val().messages;
        peep.hour = notification.val().hour;
        peep.minute = notification.val().minute;
        people = people.concat([peep]);
        console.log(peep.key);
      });
      this.setState({
        messageNotification: people
      });
    });
  }
  handleBack = () => {
    this.props.navigation.navigate("Discover1");
  };
  toMessages = uID => {
    this.props.navigation.navigate("Message", { uID });
  };

  render() {
    return (
      <View style={styles.container}>
        <Row style={{ height: "12%", paddingTop: "5%" }}>
          <Col style={{ width: "10%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.handleBack}>
              <Image source={BackIcon} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
          </Col>
          <Col style={{ width: "80%", alignItems: "center" }}>
            <View>
              <Text style={styles.text1}>Notification</Text>
            </View>
          </Col>
        </Row>
        <Row style={{ height: ".5%" }}>
          <Col
            style={{
              width: "100%",
              height: 1.5,
              borderTopColor: "rgb(186,186,189)",
              borderTopWidth: 0.8
            }}
          />
        </Row>

        <Row
          style={{
            height: "12%",
            paddingTop: "5%",
            marginTop: 0,
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Col style={{ width: "15%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.handleBack}>
              <Image
                source={B1}
                style={{ height: 50, width: 50, borderRadius: 25 }}
              />
            </TouchableOpacity>
          </Col>
          <Col style={{ width: "70%", paddingLeft: 15 }}>
            <View>
              <Text style={styles.text2}>Connection Request</Text>
            </View>
          </Col>
        </Row>
        <Row style={{ height: ".5%" }}>
          <Col
            style={{
              width: "100%",
              height: 1.5,
              borderTopColor: "rgb(186,186,189)",
              borderTopWidth: 0.8
            }}
          />
        </Row>
        <Row
          style={{
            height: "12%",
            paddingTop: "5%",
            marginTop: 0,
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          <Col style={{ width: "15%", alignItems: "center" }}>
            <TouchableOpacity onPress={this.handleBack}>
              <Image source={MessagesIcon} style={{ height: 38, width: 45 }} />
            </TouchableOpacity>
          </Col>
          <Col style={{ width: "70%", paddingLeft: 15 }}>
            <View>
              <Text style={styles.text2}>Massages</Text>
            </View>
          </Col>
        </Row>
        <Row style={{ height: ".5%" }}>
          <Col
            style={{
              width: "100%",
              height: 1.5,
              borderTopColor: "rgb(186,186,189)",
              borderTopWidth: 1
            }}
          />
        </Row>
        <ScrollView>
          {this.state.messageNotification.map(x => (
            <View key={x.key}>
              <Row
                style={{
                  height: 80,
                  paddingTop: "5%",
                  marginTop: 0,
                  marginLeft: "5%",
                  marginRight: "5%"
                }}
              >
                <Col style={{ width: "18%" }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.toMessages(x.key);
                    }}
                  >
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 25 }}
                      source={{ uri: x.propic }}
                    />
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      this.toMessages(x.key);
                    }}
                  >
                    <Text style={styles.mText1}>{x.name}</Text>
                  </TouchableOpacity>
                </Col>

                <Col style={{ width: "10%" }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.toMessages(x.key);
                    }}
                  >
                    <Text style={styles.hideText2}>
                      {x.hour}: {x.minute}
                    </Text>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{ width: "22%" }} />
                <Col style={{ width: "85%", marginTop: -30 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.toMessages(x.key);
                    }}
                  >
                    <Text style={styles.hideText1}>{x.messages}</Text>
                  </TouchableOpacity>
                </Col>
                <Col />
              </Row>
              <Row style={{ height: 2 }}>
                <Col
                  style={{
                    width: "100%",
                    height: 1.5,
                    borderTopColor: "rgb(186,186,189)",
                    borderTopWidth: 1
                  }}
                />
              </Row>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
