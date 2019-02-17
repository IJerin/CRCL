/* eslint-disable no-alert, no-console, */

import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext
} from "react-native-popup-menu";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import firebase from "firebase";
import ConnectIcon from "../Images/Connect.png";
import ConnectedIcon from "../Images/Connected.png";
import CloseIcon from "../Images/close.png";
import MoreIcon from "../Images/More.png";
import MessageIcon from "../Images/Message.png";
import LanguageIcon from "../Images/lang.png";
import HomeIcon from "../Images/home.png";
import CompanyIcon from "../Images/Company.png";
import JobIcon from "../Images/Job.png";
import LocationIcon from "../Images/location.png";
import HistoryIcon from "../Images/History.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  },
  headerView: {
    flexDirection: "row",
    height: 70,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20
  },
  menu: {
    flexDirection: "column",
    paddingTop: 10,
    paddingRight: 80,
    height: "100%",
    width: "60%",
    marginLeft: "60%"
  },
  name: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10
  },
  small: {
    fontFamily: "AvenirNext-regular",
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
    textAlign: "center"
  },
  h2: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 30,
    color: "rgba(0,0,0,0.6)",
    textAlign: "center"
  },
  h1: {
    fontFamily: "AvenirNext-regular",
    fontSize: 20,
    color: "rgba(0,0,0,0.5)",
    textAlign: "center"
  },
  hideText1: {
    marginLeft: 30,
    fontFamily: "Avenir-Book",
    fontSize: 17,
    color: "rgba(0,0,0,0.3)"
  },
  mText1: {
    marginTop: 10,
    marginLeft: 30,
    fontFamily: "AvenirNext-regular",
    fontSize: 17,
    color: "rgba(0,0,0,0.7)"
  }
});

const PARALLAX_HEADER_HEIGHT = 290;
const STICKY_HEADER_HEIGHT = 70;

export default class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    let initialConnectIcon = ConnectIcon;
    let connectionStatus = "connect";
    if (this.props.navigation.state.params.user.connections) {
      if (
        this.props.navigation.state.params.user.connections[
          this.props.navigation.state.params.uid
        ]
      ) {
        connectionStatus = this.props.navigation.state.params.user.connections[
          this.props.navigation.state.params.uid
        ].status;
        initialConnectIcon = ConnectedIcon;
      }
    }

    this.state = {
      uid: this.props.navigation.state.params.uid,
      lastLocation: this.props.navigation.state.params.lastLocation,
      connectionStatus,
      connectionPic: initialConnectIcon,
      appColor: this.props.navigation.state.params.user.appColor,
      user: this.props.navigation.state.params.user,
      userToken: this.props.navigation.state.params.userToken
    };
  }

  componentDidMount() {
    const discoveryKeys = Object.keys(this.state.user.discovered);
    let personConnection;
    let jobTitle = true;
    let livesIn = true;
    let company = true;
    let showLanguage = true;
    // let personLocation;
    discoveryKeys.map(key => {
      if (key === this.state.uid) {
        if (!this.state.user.discovered[key].connectedPeople) {
          personConnection = 0;
        } else {
          personConnection = this.state.user.discovered[key].connectedPeople;
        }
        if (this.state.user.discovered[key].positionInJob === "Currently") {
          jobTitle = false;
        }
        if (this.state.user.discovered[key].companyName === "Working") {
          company = false;
        }
        if (this.state.user.discovered[key].location === "none") {
          livesIn = false;
        }
        if (this.state.user.discovered[key].language === "none") {
          showLanguage = false;
        }
        this.setState({
          personName: this.state.user.discovered[key].name,
          personNameInUpperCase: this.state.user.discovered[key].name
            .toUpperCase()
            .substr(0, this.state.user.discovered[key].name.indexOf(" ")),
          personProPic: this.state.user.discovered[key].propic,
          personJobPostion: this.state.user.discovered[key].positionInJob,
          personCompany: this.state.user.discovered[key].companyName,
          personLanguage: this.state.user.discovered[key].language,
          personLocation: this.state.user.discovered[key].location,
          personConnection,
          status: this.state.user.discovered[key].userProfileStatus,
          discoverCount: this.state.user.discovered[key].discoverCount,
          jobTitle,
          company,
          livesIn,
          showLanguage,
          surName: this.state.user.discovered[key].name.substr(
            0,
            this.state.user.discovered[key].name.indexOf(" ")
          )
        });
      }
      this.appSync();
      this.checkingConnectionStatus();
      return null;
    });
  }

  appSync = () => {
    const FirebaseSyncRef = firebase
      .database()
      .ref(`users/${this.state.userToken}`);
    FirebaseSyncRef.on("value", value => {
      //alert(JSON.stringify(value))
      this.setState({
        user: value.val()
      });
      AsyncStorage.setItem("user", JSON.stringify(value.val()));
    });
  };

  checkingConnectionStatus = () => {
    const ref = firebase
      .database()
      .ref(`users/${this.state.userToken}/connections`);
    ref.once("value", snapshot => {
      snapshot.forEach(data => {
        if (data.key === this.state.uid) {
          //    alert('yes')
          this.setState({
            connectionStatus: data.val().status
          });
          if (this.state.connectionStatus === "Connected") {
            this.setState({
              connectionPic: ConnectedIcon
            });
          }
        }
      });
    });
    //  alert(this.state.connectionStatus)
  };

  connection = you => {
    if (this.state.connectionStatus === "connect") {
      firebase
        .database()
        .ref(`users/${this.state.userToken}/connections/${this.state.uid}/`)
        .set({
          status: "Request Sent"
        });
      firebase
        .database()
        .ref(`users/${this.state.uid}/connections/${this.state.userToken}/`)
        .set({
          status: "Waiting For Response"
        });
      firebase
        .database()
        .ref(`users/${this.state.uid}/notification/${this.state.userToken}/`)
        .set({
          messages: "Wants to connect with you",
          name: this.state.user.name,
          image: this.state.user.propic,
          hour: new Date().getHours(),
          minute: new Date().getMinutes()
        })
        .then(() => {
          const pushableDevices = [];
          const messageContent = {
            en: `${this.state.userName} wants to connect with you!`
          };
          firebase
            .database()
            .ref(`users/${this.state.uid}/devices`)
            .once("value", devices => {
              devices.forEach(device => {
                pushableDevices.push(device.val().userId);
              });
            })
            .then(() => {
              const ONESIGNAL_URI =
                "https://onesignal.com/api/v1/notifications";
              const headers = {
                "Content-Type": "application/json",
                Authorization:
                  "Basic MGM2Zjc0NmEtOTAxYy00ZDM4LWFlNTQtYmRhZjFiMTI5MzQ5"
              };
              const config = {
                headers
              };
              //alert(pushableDevices);
              const body = JSON.stringify({
                app_id: "3aa5a7c5-8fb3-496e-b402-c3cf87920e8e",
                include_player_ids: pushableDevices,
                contents: messageContent,
                template_id: "23b0f481-0201-421a-93bb-4bae7f45d40b"
              });
              axios
                .post(ONESIGNAL_URI, body, config)
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log(error);
                });
            });
        });
      this.setState({
        connectionStatus: "Request Sent"
      });
    }
    if (this.state.connectionStatus === "Waiting For Response") {
      firebase
        .database()
        .ref(`users/${this.state.userToken}/connections/${you}/`)
        .set({
          status: "Connected",
          name: this.state.personName,
          image: this.state.personProPic
        });

      this.setState({
        connectionStatus: "Connected"
      });
      const q = firebase.database().ref(`users/${this.state.userToken}`);
      q.once("value", snapshot => {
        this.setState({
          userName: snapshot.val().name,
          userPic: snapshot.val().propic
        });
        firebase
          .database()
          .ref(`users/${you}/connections/${this.state.userToken}/`)
          .set({
            status: "Connected",
            name: this.state.userName,
            image: this.state.userPic
          });
        firebase
          .database()
          .ref(`users/${you}/notification/${this.state.userToken}/`)
          .set({
            messages: "Is now Connected!",
            name: this.state.userName,
            image: this.state.userPic,
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
          });
      });
      let myConnectedPeople = 0;
      const ref1 = firebase.database().ref(`users/${this.state.userToken}/`);
      ref1.once("value", snap => {
        myConnectedPeople = snap.val().connectedPeople;
      });
      firebase
        .database()
        .ref(`users/${this.state.userToken}/`)
        .update({
          connectedPeople: myConnectedPeople
        });
      let yourConnectedPeople = 0;
      const ref2 = firebase.database().ref(`users/${you}/`);
      ref2.once("value", snap => {
        yourConnectedPeople = snap.val().connectedPeople;
      });
      firebase
        .database()
        .ref(`users/${you}/`)
        .update({
          connectedPeople: yourConnectedPeople
        });
    }
    if (this.state.connectionStatus === "Connected") {
      this.setState({
        connectionStatus: "connect"
      });
      firebase
        .database()
        .ref(`users/${this.state.userToken}/connections`)
        .child(you)
        .remove();
      firebase
        .database()
        .ref(`users/${you}/connections`)
        .child(this.state.userToken)
        .remove();
    }
    this.checkingConnectionStatus();
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };
  toMessage = uID => {
    this.props.navigation.navigate("Message", {
      uID,
      user: this.state.user,
      userToken: this.state.userToken
    });
  };
  toseeProPic = pic => {
    this.props.navigation.navigate("seeProPic", { pic });
  };
  render() {
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          useNativeDriver
          backgroundColor={this.state.appColor}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          backgroundSpeed={10}
          fadeOutForeground={false}
          renderBackground={() => (
            <View key="background">
              <View
                style={{
                  width: window.width,
                  backgroundColor: "white",
                  height: PARALLAX_HEADER_HEIGHT
                }}
              />
            </View>
          )}
          renderForeground={() => (
            <View>
              <View
                style={{
                  width: "100%",
                  height: 160,
                  backgroundColor: this.state.appColor
                }}
              >
                <View style={styles.headerView}>
                  <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity onPress={this.handleBack}>
                      <View style={{ paddingTop: 20, paddingLeft: 10 }}>
                        <Image
                          style={{ height: 20, width: 20 }}
                          source={CloseIcon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menu}>
                    <MenuContext>
                      <Menu>
                        <MenuTrigger>
                          <View style={{ paddingLeft: 60 }}>
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={MoreIcon}
                            />
                          </View>
                        </MenuTrigger>
                        <MenuOptions style={{ height: "100%", width: "100%" }}>
                          <MenuOption
                            onSelect={() =>
                              alert("Do you want to block this ID")
                            }
                          >
                            <Text style={{ color: "black" }}>Block</Text>
                          </MenuOption>
                          <MenuOption
                            onSelect={() =>
                              alert("Do you want to report this ID")
                            }
                          >
                            <Text style={{ color: "red" }}>Report</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>
                    </MenuContext>
                  </View>
                </View>
                <View>
                  <Text style={styles.name}>{this.state.personName}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderRightWidth: 500,
                  borderTopWidth: 50,
                  borderRightColor: "transparent",
                  borderTopColor: this.state.appColor
                }}
              />
              <View style={{ alignItems: "center", marginTop: "-18%" }}>
                <TouchableOpacity
                  onPress={() => {
                    this.toseeProPic(this.state.personProPic);
                  }}
                >
                  <Image
                    style={{ height: 125, width: 125, borderRadius: 62.5 }}
                    source={{ uri: this.state.personProPic }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          renderStickyHeader={() => (
            <View
              key="sticky-header"
              style={{
                backgroundColor: this.state.appColor,
                height: STICKY_HEADER_HEIGHT,
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  textAlign: "center"
                }}
              >
                {this.state.surName}
              </Text>
            </View>
          )}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 40,
              paddingRight: 30
            }}
          >
            <View style={{ flexDirection: "column", width: "30%" }}>
              {this.state.connectionStatus === "connect" ? (
                <TouchableOpacity
                  onPress={() => {
                    this.connection(this.state.uid);
                  }}
                >
                  <View style={{ alignItems: "center", marginTop: "5%" }}>
                    <Image
                      style={{ height: 35, width: 35 }}
                      source={ConnectIcon}
                    />
                    <View style={{ marginTop: "2%" }}>
                      <Text style={styles.small}>Connect</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.connection(this.state.uid);
                  }}
                >
                  {this.state.connectionStatus === "Connected" ? (
                    <View style={{ alignItems: "center", marginTop: "5%" }}>
                      <Image
                        style={{ height: 35, width: 40 }}
                        source={this.state.connectionPic}
                      />
                    </View>
                  ) : (
                    <View style={{ alignItems: "center", marginTop: "5%" }}>
                      <View style={{ marginTop: "2%" }}>
                        <Image
                          style={{ height: 35, width: 40 }}
                          source={this.state.connectionPic}
                        />
                      </View>
                    </View>
                  )}

                  <Text style={styles.small}>
                    {this.state.connectionStatus}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flexDirection: "column", width: "40%" }}>
              <TouchableOpacity
                onPress={() => {
                  this.toMessage(this.state.uid);
                }}
              >
                <View style={{ alignItems: "center", marginTop: "5%" }}>
                  <Image
                    style={{ height: 33, width: 37 }}
                    source={MessageIcon}
                  />
                </View>
                <View style={{ marginTop: "2%" }}>
                  <Text style={styles.small}>Message</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column", width: "30%" }}>
              <Text style={styles.h2}>{this.state.personConnection}</Text>
              <Text style={styles.small}>Connections</Text>
            </View>
          </View>
          <View style={{ marginRight: 25 }}>
            <Text style={styles.mText1}>{this.state.status}</Text>
          </View>
          <View style={{ flex: 1, paddingTop: 25 }}>
            <Text style={styles.h1}>
              YOU AND {this.state.personNameInUpperCase}
            </Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 24, paddingTop: "10%" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", marginTop: 15 }}>
                <Image style={{ height: 30, width: 28 }} source={HistoryIcon} />
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.hideText1}>History</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.mText1}>
                    Around you {this.state.discoverCount} times
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 20 }}>
              <View style={{ flexDirection: "column", marginTop: 15 }}>
                <Image
                  style={{ height: 32, width: 24, marginTop: 5 }}
                  source={LocationIcon}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.hideText1}>Last Seen Around</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.mText1}>{this.state.lastLocation}</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.h1}>ABOUT</Text>
            </View>
            {this.state.jobTitle ? (
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ flexDirection: "column", marginTop: 15 }}>
                  <Image
                    style={{ height: 35, width: 35, marginTop: 5 }}
                    source={JobIcon}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.hideText1}>Job title</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.mText1}>
                      {this.state.personJobPostion}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.company ? (
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ flexDirection: "column", marginTop: 15 }}>
                  <Image
                    style={{ height: 35, width: 35, marginTop: 5 }}
                    source={CompanyIcon}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.hideText1}>Company</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.mText1}>
                      {this.state.personCompany}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.livesIn ? (
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ flexDirection: "column", marginTop: 15 }}>
                  <Image
                    style={{ height: 35, width: 35, marginTop: 5 }}
                    source={HomeIcon}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.hideText1}>Lives in</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.mText1}>
                      {this.state.personLocation}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.showLanguage ? (
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                <View style={{ flexDirection: "column", marginTop: 15 }}>
                  <Image
                    style={{ height: 35, width: 35, marginTop: 5 }}
                    source={LanguageIcon}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.hideText1}>Language</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.mText1}>
                      {this.state.personLanguage}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}
