import React, { Component } from "react";
import PropTypes from "prop-types";
import ToggleSwitch from "toggle-switch-react-native";
import Modal from "react-native-modal";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Swiper from "react-native-swiper";
import { Col, Row, Grid } from "react-native-easy-grid";
import Tabs from "./tabs";

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    backgroundColor: "rgb(1,173,194)",
    height: "100%",
    width: "100%",
    flex: 1
  },

  slide2: {
    backgroundColor: "rgb(1,173,194)",
    height: "100%",
    width: "100%",
    flex: 1
  },
  slide3: {
    backgroundColor: "rgb(35,169,187)",
    height: "100%",
    width: "100%",
    flex: 1
  },
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
  rectangle1: {
    width: "100%",
    height: 170,
    backgroundColor: "rgb(1,173,194)"
  },
  triangleTopLeft1: {
    width: "100%",
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 500,
    borderTopWidth: 50,
    borderRightColor: "transparent",
    borderTopColor: "rgb(1,173,194)"
  },

  text1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    paddingTop: 29.5
  },
  circle: {
    marginLeft: "85%",
    marginTop: 0
  },
  whitebox1: {
    marginTop: 20,
    marginLeft: 15.5,
    height: 89,
    width: "92%",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center"
  },
  whitebox2: {
    marginTop: -3.5,
    marginLeft: 15.5,
    height: 89,
    width: "92%",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center"
  },

  pic: {
    height: 50,
    width: 50,
    borderColor: "rgb(0,173,194)",
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 10
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
    fontSize: 12,
    color: "rgb(186,186,189)",
    textAlign: "center",
    paddingTop: 5,
    marginLeft: "80%"
  },
  text5: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    paddingTop: 20
  },
  h2: {
    fontFamily: "AvenirNext-regular",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    paddingTop: 0
  },
  text6: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 20
  },
  text7: {
    fontFamily: "Avenir-Book",
    fontSize: 13,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 10
  },
  invite: {
    alignItems: "center"
  },
  color: {
    alignItems: "center"
  },
  text8: {
    fontFamily: "AvenirNext-regular",
    fontSize: 11,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.6)",
    paddingTop: 3
  },
  text9: {
    fontFamily: "AvenirNext-regular",
    fontSize: 11,
    marginLeft: 22,
    color: "rgba(255, 255, 255, 0.6)",
    paddingTop: 3
  },
  text10: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 12,
    color: "rgb(186,186,189)",
    textAlign: "center",
    paddingTop: 0,
    marginLeft: "65%",
    marginBottom: "3%"
  },
  text11: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 20,
    color: "rgb(186,186,189)",
    textAlign: "center",
    marginTop: "-10%",
    marginLeft: "65%"
  },
  proPic: {
    paddingLeft: "80%",
    marginTop: -80
  },
  container1: {
    flex: 1
  },
  privacyText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 17,
    color: "rgba(0,0,0,0.8)"
  },
  mText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 15,
    color: "rgba(0,0,0,0.8)"
  },
  hideText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 14,
    color: "rgba(0,0,0,0.3)"
  },
  modalText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 25,
    color: "rgba(0,0,0,0.6)",
    textAlign: "center",
    paddingTop: 0
  },
  modalText2: {
    fontFamily: "AvenirNext-regular",
    fontSize: 25,
    color: "rgba(0,0,0,0.6)",
    textAlign: "center",
    paddingTop: 50
  },

  modalText1: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 22,
    color: "rgba(0,0,0,0.4)",
    textAlign: "center",
    paddingTop: 60,
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    height: 80,
    width: "100%",
    marginTop: 30,
    backgroundColor: "rgb(35,169,187)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 25,
    color: "white",
    textAlign: "center"
  },
  button1: {
    height: 50,
    width: 190,
    marginTop: 40,
    backgroundColor: "rgb(186,186,189)",
    borderRadius: 4,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    marginBottom: "5%"
  },
  modal: {
    flex: 0,
    height: 600
  },
  container2: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    flex: 1
  },
  rectangle2: {
    width: "100%",
    height: 150,
    backgroundColor: "rgb(1,173,194)"
  },
  triangleTopLeft2: {
    width: "100%",
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 500,
    borderTopWidth: 50,
    borderRightColor: "transparent",
    borderTopColor: "rgb(1,173,194)"
  },
  text112: {
    fontFamily: "avenir-next-regular",
    fontSize: 30,
    textAlign: "center",
    color: "white",
    paddingTop: 29.5
  },
  circle2: {
    marginLeft: 340,
    marginTop: 0
  },
  pic2: {
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  text22: {
    fontFamily: "avenir-next-regular",
    fontSize: 23,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: 26
  },
  text32: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 18,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: 50
  },
  text42: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 18,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: 5,
    marginBottom: 50
  },
  text52: {
    fontFamily: "avenir-next-regular",
    fontSize: 20,
    color: "white",
    textAlign: "center"
  },
  button22: {
    height: 49,
    width: 209.5,
    backgroundColor: "rgb(0,173,194)",
    borderRadius: 4,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  text62: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 12,
    color: "rgb(186,186,189)",
    textAlign: "center",
    paddingTop: 5,
    marginLeft: 305
  }
});

export default class noNewUser extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  state = {
    isHiddenModalVisible: false,
    isDeleteModalVisible: false,
    isInviteModalVisible: false
  };

  _showHiddenModal = () => this.setState({ isHiddenModalVisible: true });
  _showDeleteModal = () => this.setState({ isDeleteModalVisible: true });
  _showInviteModal = () => this.setState({ isInviteModalVisible: true });

  toWelcome = () => {
    this.props.navigation.navigate("Welcome");
  };
  toHidden = () => {
    this.props.navigation.navigate("Hidden");
  };
  toDeck = () => {
    this.props.navigation.navigate("Deck");
  };
  toAbout = () => {
    this.props.navigation.navigate("About");
  };

  toHiddenFromModal = () => {
    this.props.navigation.navigate("Hidden");
  };
  toNotification = () => {
    this.props.navigation.navigate("Notification");
  };
  toHiddenFromModal = () => {
    this.setState({ isHiddenModalVisible: false });
    this.props.navigation.navigate("Hidden");
  };
  toHideInvite = () => {
    this.setState({ isInviteModalVisible: false });
  };

  render() {
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        dot={
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              borderWidth: 2,
              borderColor: "rgba(255, 255, 255, 0.3)",
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "white",
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
        paginationStyle={{
          bottom: 636,
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <View style={styles.slide1}>
          <View style={styles.container}>
            <View style={styles.rectangle1}>
              <Grid style={{ paddingTop: 35 }}>
                <Row style={{ height: 30 }}>
                  <Col style={{ width: "20%" }}>
                    <View style={styles.invite}>
                      <Image
                        source={require("../Images/color.png")}
                        style={{ height: 30, width: 35 }}
                      />
                    </View>
                  </Col>
                  <Col style={{ width: "60%" }}>
                    <Text style={styles.h2}>Settings</Text>
                  </Col>
                  <Col style={{ width: "20%" }} />
                </Row>

                <Row>
                  <Col>
                    <Text style={styles.text6}>Alexandros</Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Text style={styles.text7}>PRODUCT Manager</Text>
                  </Col>
                </Row>
              </Grid>
            </View>
            <View style={styles.triangleTopLeft1} />
            <View style={styles.proPic}>
              <Image
                source={require("../Images/alex1.png")}
                style={{ height: 60, width: 60, borderRadius: 30 }}
              />
            </View>

            <Tabs>
              {/* First tab */}
              <View title="PROFILE">
                <ScrollView>
                  <Grid
                    style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
                  >
                    <Row>
                      <Col style={{ width: "80%" }} />
                      <Col style={{ width: "20%" }}>
                        <Text style={styles.mText}>VISIBLE</Text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                      <Col style={{ width: "15%" }}>
                        <Image
                          style={{ height: 35, width: 35, marginTop: 5 }}
                          source={require("../Images/full.png")}
                        />
                      </Col>
                      <Col>
                        <ToggleSwitch
                          isOn={false}
                          onColor="rgb(57,136,181)"
                          offColor="#bdbdbd"
                          label={<Text style={styles.hideText}>Full name</Text>}
                          labelStyle={{ width: "72%" }}
                          size="small"
                          onToggle={isOn => console.log("changed to : ", isOn)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ width: "17%" }} />
                      <Col style={{ width: "80%", marginTop: -15 }}>
                        <Text style={styles.mText}>Alexandros Dimas</Text>
                      </Col>
                      <Col />
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                      <Col style={{ width: "15%" }}>
                        <Image
                          style={{ height: 35, width: 35, marginTop: 5 }}
                          source={require("../Images/Job.png")}
                        />
                      </Col>
                      <Col>
                        <ToggleSwitch
                          isOn={false}
                          onColor="rgb(57,136,181)"
                          offColor="#bdbdbd"
                          label={<Text style={styles.hideText}>Job title</Text>}
                          labelStyle={{ width: "72%" }}
                          size="small"
                          onToggle={isOn => console.log("changed to : ", isOn)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ width: "17%" }} />
                      <Col style={{ width: "80%", marginTop: -15 }}>
                        <Text style={styles.mText}>Product Manager</Text>
                      </Col>
                      <Col />
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                      <Col style={{ width: "15%" }}>
                        <Image
                          style={{ height: 35, width: 35, marginTop: 5 }}
                          source={require("../Images/Company.png")}
                        />
                      </Col>
                      <Col>
                        <ToggleSwitch
                          isOn={false}
                          onColor="rgb(57,136,181)"
                          offColor="#bdbdbd"
                          label={<Text style={styles.hideText}>Company</Text>}
                          labelStyle={{ width: "72%" }}
                          size="small"
                          onToggle={isOn => console.log("changed to : ", isOn)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ width: "17%" }} />
                      <Col style={{ width: "80%", marginTop: -15 }}>
                        <Text style={styles.mText}>Visual Arts Ltd.</Text>
                      </Col>
                      <Col />
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                      <Col style={{ width: "15%" }}>
                        <Image
                          style={{ height: 35, width: 35, marginTop: 5 }}
                          source={require("../Images/home.png")}
                        />
                      </Col>
                      <Col>
                        <ToggleSwitch
                          isOn={false}
                          onColor="rgb(57,136,181)"
                          offColor="#bdbdbd"
                          label={<Text style={styles.hideText}>Lives in</Text>}
                          labelStyle={{ width: "72%" }}
                          size="small"
                          onToggle={isOn => console.log("changed to : ", isOn)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ width: "17%" }} />
                      <Col style={{ width: "80%", marginTop: -15 }}>
                        <Text style={styles.mText}>London, UK</Text>
                      </Col>
                      <Col />
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                      <Col style={{ width: "15%" }}>
                        <Image
                          style={{ height: 35, width: 35, marginTop: 5 }}
                          source={require("../Images/lang.png")}
                        />
                      </Col>
                      <Col>
                        <ToggleSwitch
                          isOn={false}
                          onColor="rgb(57,136,181)"
                          offColor="#bdbdbd"
                          label={<Text style={styles.hideText}>Language</Text>}
                          labelStyle={{ width: "72%" }}
                          size="small"
                          onToggle={isOn => console.log("changed to : ", isOn)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ width: "17%" }} />
                      <Col style={{ width: "80%", marginTop: -15 }}>
                        <Text style={styles.mText}>
                          English, Greek, Finnish
                        </Text>
                      </Col>
                      <Col />
                    </Row>
                  </Grid>
                </ScrollView>
              </View>
              {/* Second tab */}
              <View title="GENERAL" style={styles.content}>
                <ScrollView>
                  <Grid
                    style={{ marginTop: 20, marginLeft: 30, marginRight: 20 }}
                  >
                    <Row>
                      <Col>
                        <Text style={styles.privacyText}>PRIVACY</Text>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: -10, marginTop: 20 }}>
                      <ToggleSwitch
                        isOn={false}
                        onColor="rgb(57,136,181)"
                        offColor="#bdbdbd"
                        label={<Text style={styles.mText}>Hide me here</Text>}
                        labelStyle={{ width: "80%" }}
                        size="small"
                        onToggle={isOn => console.log("changed to : ", isOn)}
                      />
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col style={{ width: "80%" }}>
                        <Text style={styles.hideText}>
                          Hide your prifile around your current location e.g
                          around home or work
                        </Text>
                      </Col>
                      <Col />
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col style={{ width: "80%" }}>
                        <Text style={styles.mText}>Block users</Text>
                      </Col>
                      <Col style={{ marginLeft: 50 }}>
                        <TouchableOpacity>
                          <Image
                            style={{ height: 20.2, width: 10.5 }}
                            source={require("../Images/list.png")}
                          />
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 35 }}>
                      <Col>
                        <Text style={styles.privacyText}>NOTIFICATIONS</Text>
                      </Col>
                    </Row>

                    <Row style={{ marginLeft: -10, marginTop: 20 }}>
                      <ToggleSwitch
                        isOn={false}
                        onColor="rgb(57,136,181)"
                        offColor="#bdbdbd"
                        label={
                          <Text style={styles.mText}>New users around</Text>
                        }
                        labelStyle={{ width: "80%" }}
                        size="small"
                        onToggle={isOn => console.log("changed to : ", isOn)}
                      />
                    </Row>
                    <Row style={{ marginTop: 35 }}>
                      <Col>
                        <Text style={styles.privacyText}>SUPPORT</Text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                      <Col style={{ width: "80%" }}>
                        <Text style={styles.mText}>About</Text>
                      </Col>
                      <Col style={{ marginLeft: 50 }}>
                        <TouchableOpacity onPress={this.toAbout}>
                          <Image
                            style={{ height: 20.2, width: 10.5 }}
                            source={require("../Images/list.png")}
                          />
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 25 }}>
                      <Col style={{ width: "80%" }}>
                        <Text style={styles.mText}>Feedback</Text>
                      </Col>
                      <Col style={{ marginLeft: 50 }}>
                        <TouchableOpacity>
                          <Image
                            style={{ height: 20.2, width: 10.5 }}
                            source={require("../Images/list.png")}
                          />
                        </TouchableOpacity>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 35 }}>
                      <Col>
                        <Text style={styles.privacyText}>ACCOUNT</Text>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 25 }}>
                      <Col style={{ width: "80%" }}>
                        <Text style={styles.mText}>Log out</Text>
                      </Col>
                      <Col />
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <Col style={{ width: "80%" }}>
                        <Text style={styles.hideText}>
                          Logged in using Facebook
                        </Text>
                      </Col>
                      <Col />
                    </Row>
                    <TouchableOpacity onPress={this._showDeleteModal}>
                      <Row style={{ marginTop: 20, marginBottom: 50 }}>
                        <Col style={{ width: "80%" }}>
                          <Text style={styles.mText}>Delete account</Text>
                          <Modal
                            isVisible={this.state.isDeleteModalVisible}
                            style={styles.modal}
                          >
                            <View
                              style={{
                                flex: 0,
                                backgroundColor: "white",
                                borderRadius: 10
                              }}
                            >
                              <Text style={styles.modalText2}>
                                Delete account{" "}
                              </Text>
                              <View>
                                <Text style={styles.modalText1}>
                                  Are you sure you want to delete your account
                                  and all associated data?
                                </Text>
                              </View>
                              <View style={styles.button1}>
                                <Text style={styles.buttonText}>Confirm</Text>
                              </View>
                              <TouchableOpacity
                                onPress={() =>
                                  this.setState({ isDeleteModalVisible: false })
                                }
                              >
                                <View style={styles.button}>
                                  <Text style={styles.buttonText}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </Modal>
                        </Col>
                        <Col style={{ marginLeft: 50 }} />
                      </Row>
                    </TouchableOpacity>
                  </Grid>
                </ScrollView>
              </View>
            </Tabs>
          </View>
        </View>

        <View style={styles.slide2}>
          <View style={styles.container}>
            <View style={styles.rectangle}>
              <Text style={styles.h2}>Discover</Text>
              <Text style={styles.text112}>No new users today</Text>
            </View>
            <View style={styles.triangleTopLeft} />
            <TouchableOpacity onPress={this._showHiddenModal}>
              <View style={styles.circle2}>
                <Image
                  source={require("../Images/VISIBLE.png")}
                  style={{
                    height: 36.3,
                    width: 36.7
                  }}
                />
              </View>
            </TouchableOpacity>
            <Modal
              isVisible={this.state.isHiddenModalVisible}
              style={styles.modal}
            >
              <View
                style={{ flex: 0, backgroundColor: "white", borderRadius: 10 }}
              >
                <Text style={styles.modalText2}>Your profile is hidden</Text>
                <View style={{ alignItems: "center", paddingTop: 50 }}>
                  <Image
                    source={require("../Images/alex1.png")}
                    style={{
                      height: 90,
                      width: 90,
                      borderRadius: 45,
                      borderWidth: 2,
                      borderColor: "grey"
                    }}
                    blurRadius={1.5}
                  />
                </View>
                <Text style={styles.modalText1}>
                  While your Profile is hidden you aon't be able to see new
                  users around you
                </Text>
                <TouchableOpacity onPress={this.toHiddenFromModal}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>OK, got it</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <Text style={styles.text62}>VISIBLE</Text>
            <View style={styles.pic2}>
              <Image
                source={require("../Images/n1.png")}
                style={{ height: 97.5, width: 97.5 }}
              />
            </View>
            <Text style={styles.text22}>It's just me here</Text>
            <Text style={styles.text32}>
              Carry on with your day and I'll let you know
            </Text>
            <Text style={styles.text42}>when you've discovered someone</Text>
            <TouchableOpacity onPress={this.toDiscover}>
              <View style={styles.button22}>
                <Text style={styles.text52}>Notify me</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.slide3}>
          <View style={styles.container}>
            <View style={styles.rectangle}>
              <Grid>
                <Row style={{ height: 30, marginTop: 30 }}>
                  <Col style={{ width: "20%" }}>
                    <TouchableOpacity onPress={this._showInviteModal}>
                      <View style={styles.invite}>
                        <Image
                          source={require("../Images/i1.png")}
                          style={{ height: 26, width: 30 }}
                        />
                      </View>
                      <Modal
                        isVisible={this.state.isInviteModalVisible}
                        style={styles.modal}
                      >
                        <View
                          style={{
                            flex: 0,
                            backgroundColor: "white",
                            borderRadius: 10
                          }}
                        >
                          <TouchableOpacity onPress={this.toHideInvite}>
                            <Image
                              source={require("../Images/Back.png")}
                              style={{
                                height: 25,
                                width: 25,
                                marginTop: "5%",
                                marginLeft: "5%"
                              }}
                            />
                          </TouchableOpacity>
                          <Text style={styles.modalText}>Invite friends</Text>
                          <View
                            style={{ alignItems: "center", paddingTop: 30 }}
                          >
                            <Image
                              source={require("../Images/Invite.png")}
                              style={{
                                height: 94,
                                width: 123.5
                              }}
                            />
                          </View>

                          <Text
                            style={{
                              fontFamily: "avenir-next-regular",
                              fontSize: 25,
                              textAlign: "center",
                              marginRight: "10%",
                              marginLeft: "10%"
                            }}
                          >
                            Spread the word and grow your Circle
                          </Text>
                          <View>
                            <Image
                              source={require("../Images/Copy.png")}
                              style={{
                                backgroundColor: "rgb(1,173,194)",
                                marginLeft: "10%",
                                marginBottom: "2%",
                                marginTop: "8%"
                              }}
                            />

                            <Text
                              style={{
                                fontFamily: "avenir-next-regular",
                                fontSize: 15,
                                marginLeft: "9%",
                                marginBottom: "5%",
                                marginTop: "1%"
                              }}
                            >
                              {" "}
                              Copy link
                            </Text>

                            <Image
                              source={require("../Images/whatsapp.png")}
                              style={{
                                height: 70,
                                width: 70,
                                marginLeft: "40%",
                                marginBottom: 10,
                                marginTop: "-31%"
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: "avenir-next-regular",
                                fontSize: 15,
                                marginBottom: "5%",
                                marginLeft: "40%",
                                marginTop: "-1%"
                              }}
                            >
                              {" "}
                              WhatsApp
                            </Text>
                            <Image
                              source={require("../Images/messenger.png")}
                              style={{
                                height: 70,
                                width: 70,
                                marginLeft: "72%",
                                marginBottom: 10,
                                marginTop: "-32%"
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: "avenir-next-regular",
                                fontSize: 15,
                                marginBottom: "5%",
                                marginLeft: "72%",
                                marginTop: "0%"
                              }}
                            >
                              {" "}
                              Messenger
                            </Text>
                            <Image
                              source={require("../Images/Copy.png")}
                              style={{
                                backgroundColor: "rgb(1,173,194)",
                                marginLeft: "10%",
                                marginBottom: "2%",
                                marginTop: "3%"
                              }}
                            />

                            <Text
                              style={{
                                fontFamily: "avenir-next-regular",
                                fontSize: 15,
                                marginLeft: "9%",
                                marginBottom: "5%",
                                marginTop: "1%"
                              }}
                            >
                              {" "}
                              Copy link
                            </Text>

                            <Image
                              source={require("../Images/twitter.png")}
                              style={{
                                height: 70,
                                width: 70,
                                marginLeft: "40%",
                                marginBottom: 10,
                                marginTop: "-31%"
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: "avenir-next-regular",
                                fontSize: 15,
                                marginBottom: "5%",
                                marginLeft: "41%",
                                marginTop: "-1%"
                              }}
                            >
                              {" "}
                              Twitter
                            </Text>
                            <Image
                              source={require("../Images/facebook.png")}
                              style={{
                                height: 70,
                                width: 70,
                                marginLeft: "72%",
                                marginBottom: 10,
                                marginTop: "-32%"
                              }}
                            />
                            <Text
                              style={{
                                fontFamily: "avenir-next-regular",
                                fontSize: 15,
                                marginBottom: "5%",
                                marginLeft: "72%",
                                marginTop: "0%"
                              }}
                            >
                              {" "}
                              Facebook
                            </Text>
                          </View>
                        </View>
                      </Modal>
                    </TouchableOpacity>
                  </Col>
                  <Col style={{ width: "60%" }}>
                    <Text style={styles.h2}>Your Circle</Text>
                  </Col>
                  <Col style={{ width: "20%" }}>
                    <View style={styles.invite}>
                      <Image
                        source={require("../Images/noti1.png")}
                        style={{ height: 28, width: 25 }}
                      />
                    </View>
                  </Col>
                </Row>
                <Text style={styles.text5}>Today</Text>
              </Grid>
            </View>
            <View style={styles.triangleTopLeft} />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: -60
              }}
            >
              <Image
                source={require("../Images/alex1.png")}
                style={{ height: 70, width: 70 }}
              />
            </View>

            <Text style={styles.text11}>24</Text>

            <Text style={styles.text10}>Connectors</Text>
            <ScrollView>
              <Grid style={{ marginTop: 20 }}>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>

                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(186,186,189)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
                <Row style={{ height: 15 }}>
                  <Col style={{ width: "5%" }} />
                  <Col
                    style={{
                      width: "95%",
                      height: 1.5,
                      borderTopColor: "rgb(201,201,208)",
                      borderTopWidth: 1
                    }}
                  />
                </Row>
                <TouchableOpacity onPress={this.toDeck}>
                  <Row style={{ height: 60 }}>
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
                  </Row>
                </TouchableOpacity>
              </Grid>
            </ScrollView>
          </View>
        </View>
      </Swiper>
    );
  }
}
