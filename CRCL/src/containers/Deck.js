/* eslint-disable no-alert, no-console, prefer-destructuring, react/no-array-index-key*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import CarouselPager from "react-native-carousel-pager";
import { Col, Row, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: "rgb(1,173,194)"
  },
  name: {
    fontFamily: "avenir-light",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(0,0,0, 0.7)"
  },
  text: {
    fontFamily: "AvenirNext-regular",
    fontSize: 25,
    color: "rgba(255,255,255,.8)"
  },
  h1: {
    //  textTransform: 'uppercase',
    fontFamily: "AvenirNext-regular",
    fontSize: 20,
    color: "rgb(29,29,38)",
    textAlign: "center"
  },
  arround: {
    fontFamily: "AvenirNext-regular",
    fontSize: 15,
    color: "rgb(29,29,38)"
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent"
  }
});

export default class Deck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      userToken: this.props.navigation.state.params.userToken,
      cards: [],
      activeNow: [],
      personUID: this.props.navigation.state.params.key,
      loading: true,
      appColor: this.props.navigation.state.params.user.appColor
    };
  }
  componentDidMount() {
    let peeps = [];
    let count = 0;
    let connectedKeys;
    if (this.state.user.connections) {
      connectedKeys = Object.keys(this.state.user.connections);
    }
    const discoveryKeys = Object.keys(this.state.user.discovered);
    discoveryKeys.map(key => {
      const peep = {};
      peep.key = count + 1;
      count += 1;
      peep.text4 = key;
      peep.text1 = this.state.user.discovered[key].discoverCount;
      peep.text2 = this.state.user.discovered[key].name;
      peep.upperCaseName = this.state.user.discovered[key].name
        .toUpperCase()
        .substr(0, this.state.user.discovered[key].name.indexOf(" "));
      peep.image = this.state.user.discovered[key].propic;
      peep.ifConnectedWithMe = "connect";
      if (this.state.user.discovered[key].connections) {
        peep.connectionsCount = Object.keys(
          this.state.user.discovered[key].connections
        ).length;
      } else {
        peep.connectionsCount = 0;
      }
      if (this.state.user.connections) {
        connectedKeys.map(connKey => {
          if (connKey === key) {
            peep.ifConnectedWithMe = this.state.user.connections[key].status;
          }
        });
      }
      peep.status = this.state.user.discovered[key].userProfileStatus;
      peeps = peeps.concat([peep]);
    });
    let temp;
    for (let i = 0; i < peeps.length; i += 1) {
      if (peeps[i].text4 === this.state.personUID) {
        temp = peeps[i];
        peeps[i] = peeps[0];
        peeps[0] = temp;
      }
    }
    //  alert(JSON.stringify(peeps));
    this.setState(
      {
        activeNow: peeps,
        loading: false
      },
      () => {
        this.state.activeNow.map((activeNow, index) => {
          this.state.cards.push(
            <View
              key={`page-${index}`}
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#fff",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  padding: 20
                }}
              >
                <Text style={styles.name}>{activeNow.text2}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.toProfile(activeNow);
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    paddingBottom: 30
                  }}
                >
                  <Image
                    style={{ height: 125, width: 125, borderRadius: 62.5 }}
                    source={{ uri: activeNow.image }}
                  />
                </View>
              </TouchableOpacity>

              <Row style={{ height: "12%" }}>
                {activeNow.ifConnectedWithMe === "Connected" ? (
                  <Col>
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{ height: 26, width: 25 }}
                        source={require("../Images/Connected.png")}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: "AvenirNext-regular",
                        fontSize: 10,
                        textAlign: "center"
                      }}
                    >
                      {activeNow.ifConnectedWithMe}
                    </Text>
                  </Col>
                ) : (
                  <Col>
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{ height: 26, width: 25 }}
                        source={require("../Images/Connect.png")}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: "AvenirNext-regular",
                        fontSize: 10,
                        textAlign: "center"
                      }}
                    >
                      {activeNow.ifConnectedWithMe}
                    </Text>
                  </Col>
                )}
                <Col>
                  <TouchableOpacity
                    onPress={() => {
                      this.toMessage(activeNow.text4);
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{ height: 25, width: 30 }}
                        source={require("../Images/Message.png")}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: "AvenirNext-regular",
                        fontSize: 10,
                        textAlign: "center"
                      }}
                    >
                      Message
                    </Text>
                  </TouchableOpacity>
                </Col>
                <Col>
                  <Text
                    style={{
                      fontFamily: "AvenirNext-UltraLight",
                      fontSize: 20,
                      textAlign: "center"
                    }}
                  >
                    {activeNow.connectionsCount}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "AvenirNext-regular",
                      fontSize: 10,
                      textAlign: "center"
                    }}
                  >
                    Connections
                  </Text>
                </Col>
              </Row>
              <ScrollView>
                <Grid
                  style={{
                    marginLeft: "12%",
                    marginRight: "12%",
                    height: "100%"
                  }}
                >
                  <Row>
                    <Text style={styles.arround}>{activeNow.status}</Text>
                  </Row>
                  <Row style={{ justifyContent: "center", height: 50 }}>
                    <Text style={styles.h1}>
                      YOU AND {activeNow.upperCaseName}
                    </Text>
                  </Row>
                  <Row style={{ marginTop: 25 }}>
                    <Col style={{ width: "15%", marginTop: "3%" }}>
                      <Image
                        style={{ height: 30, width: 28, marginTop: 5 }}
                        source={require("../Images/History.png")}
                      />
                    </Col>
                    <Col>
                      <Text style={styles.hideText1}>History</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ width: "15%" }} />
                    <Col style={{ width: "85%", marginTop: -15 }}>
                      <Text style={styles.arround}>
                        Around you {activeNow.text1} times
                      </Text>
                    </Col>
                    <Col />
                  </Row>
                  <Row style={{ marginTop: 25 }}>
                    <Col style={{ width: "15%", marginTop: "3%" }}>
                      <Image
                        style={{ height: 32, width: 24, marginTop: 5 }}
                        source={require("../Images/location.png")}
                      />
                    </Col>
                    <Col>
                      <Text style={styles.hideText1}>Last Seen Around</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ width: "15%" }} />
                    <Col style={{ width: "85%", marginTop: -15 }}>
                      <Text style={styles.arround}>{activeNow.text3}</Text>
                    </Col>
                    <Col />
                  </Row>
                </Grid>
              </ScrollView>
            </View>
          );
          return false;
        });
      }
    );
  }

  toMessage = uID => {
    this.props.navigation.navigate("Message", {
      uID,
      user: this.state.user,
      userToken: this.state.userToken
    });
  };

  toProfile = activeNow => {
    this.props.navigation.navigate("profile", {
      uid: activeNow.text4,
      userToken: this.state.userToken,
      user: this.state.user,
      connectionStatus: activeNow.ifConnectedWithMe
    });
  };
  toDiscover1 = () => {
    this.props.navigation.navigate("Discover1", {
      user: this.state.user,
      userToken: this.state.userToken
    });
  };

  render() {
    return (
      <View
        style={{
          marginTop: 0,
          flex: 1,
          backgroundColor: this.state.appColor
        }}
      >
        <Row style={{ height: 50, paddingTop: 10 }}>
          <Col style={{ width: "38%" }}>
            <View style={{ marginTop: 8, marginLeft: 20 }}>
              <TouchableOpacity onPress={this.toDiscover1}>
                <Image
                  style={{ height: 25, width: 25 }}
                  source={require("../Images/close.png")}
                />
              </TouchableOpacity>
            </View>
          </Col>
          <Col>
            <Text
              style={{
                fontFamily: "AvenirNext-regular",
                fontSize: 25,
                color: "rgba(255,255,255,.8)",
                marginTop: 10
              }}
            >
              Discover
            </Text>
          </Col>
        </Row>
        {this.state.loading ? (
          <View />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: this.state.appColor,
              paddingTop: 30,
              paddingBottom: -10
            }}
          >
            {
              <CarouselPager
                containerPadding={30}
                blurredZoom={1}
                blurredOpacity={1}
                pageStyle={{
                  backgroundColor: this.state.appColor,
                  padding: 0
                }}
                animationDuration={10}
              >
                {this.state.cards}
              </CarouselPager>
            }
          </View>
        )}
      </View>
    );
  }
}
