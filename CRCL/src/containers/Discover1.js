/* eslint-disable no-alert, no-console*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
  Alert,
  AppState,
  ActivityIndicator,
  StatusBar,
  Switch
} from "react-native";
import Swiper from "react-native-swiper";
import { Col, Row, Grid } from "react-native-easy-grid";
import Modal from "react-native-modal";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import Tabs from "./tabs";
import Hidden from "../Images/HIDDEN.png";
import Visible from "../Images/VISIBLE.png";
import findMatch from "../components/FindMatch";
import TimeDifference from "../components/TimeDifference";
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import BackgroundTimer from "react-native-background-timer";

const PARALLAX_HEADER_HEIGHT = 220;
const STICKY_HEADER_HEIGHT = 80;

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
    backgroundColor: "white",
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
  text1: {
    fontFamily: "Avenir-Book",
    fontSize: 15,
    color: "rgb(29,29,38)",
    backgroundColor: "transparent",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    textShadowColor: "black"
  },
  circle: {
    marginLeft: "81.5%",
    marginTop: 0
  },
  circle2: {
    marginLeft: "81.5%",
    marginTop: 0,
    fontSize: 10
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
    height: 55,
    width: 55,
    borderRadius: 55 / 2
  },
  pic1: {
    height: 50,
    width: 50,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 10
  },
  text2: {
    fontFamily: "Avenir-Book",
    fontSize: 12,
    color: "rgb(186,186,189)",
    paddingTop: 5
  },
  text3: {
    fontFamily: "avenir-light",
    fontSize: 9,
    color: "rgb(0,173,194)"
  },

  text5: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    paddingTop: "7%"
  },
  circleText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 30,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    paddingTop: "18%"
  },
  text20: {
    fontFamily: "AvenirNext-regular",
    fontSize: 20,
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
    paddingTop: "7%"
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
    color: "rgba(0,0,0,0.8)",
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
  buttonText: {
    fontFamily: "AvenirNext-regular",
    fontSize: 25,
    color: "white",
    textAlign: "center"
  },
  modal: {
    flex: 0,
    height: 600
  },
  pic22: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  text22: {
    fontFamily: "AvenirNext-regular",
    fontSize: 23,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: 50
  },
  text223: {
    fontFamily: "AvenirNext-regular",
    fontSize: 23,
    color: "rgb(91,91,91)",
    textAlign: "center"
  },
  text32: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 20,
    color: "rgb(91,91,91)",
    textAlign: "center",
    paddingTop: 50
  },
  text42: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 18,
    color: "rgb(27,172,192)",
    textAlign: "center",
    paddingTop: 5,
    marginBottom: 50
  },
  inviteText: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center"
  },
  inviteModalView: {
    flex: 0,
    borderRadius: 10,
    backgroundColor: "white"
  },
  inviteModalText: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 22,
    color: "rgba(0,0,0,0.8)",
    textAlign: "center"
  },
  modalIconContainer: {
    marginTop: 20,
    marginLeft: "5%",
    alignItems: "center",
    marginRight: "5%"
  },
  copylinkContainer: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgb(1,173,194)"
  },
  inviteIconContainer: {
    flexDirection: "column",
    width: "30%",
    alignItems: "center"
  },
  inviteIconText: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 14,
    color: "rgb(26,26,26)",
    textAlign: "center",
    marginTop: 5
  }
});

export default class Discover1 extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.FirebaseSyncRef = null;
    this.timer = null;
    console.log(this.props.navigation.state.params.user)
    this.state = {
      userToken: this.props.navigation.state.params.userToken,
      appColor: this.props.navigation.state.params.user.appColor,
      myName: this.props.navigation.state.params.user.name,
      myJobPostion: this.props.navigation.state.params.user.positionInJob,
      myCompany: this.props.navigation.state.params.user.companyName,
      whereIlive: this.props.navigation.state.params.user.hometown,
      myLanguage: this.props.navigation.state.params.user.language,
      myPic: this.props.navigation.state.params.user.propic,
      fullName: this.props.navigation.state.params.user.fullName,
      jobTitle: this.props.navigation.state.params.user.jobTitle,
      company: this.props.navigation.state.params.user.company,
      livesIn: this.props.navigation.state.params.user.livesIn,
      showLanguage: this.props.navigation.state.params.user.showLanguage,
      latitude: this.props.navigation.state.params.user.position.latitude,
      longitude: this.props.navigation.state.params.user.position.latitude,
      connection: [],
      activeNow: [],
      activeNotNow: [],
      isHiddenModalVisible: false,
      isColorModalVisible: false,
      isDeleteModalVisible: false,
      iswhereIliveModalModalVisible: false,
      hiddenImage: Visible,
      hidden: false,
      inactiveTime: {},
      inactiveTimeStamp: this.props.navigation.state.params.user.inactiveTime,
      numberOfDiscoveredPeople: 0,
      backGroundDiscoverNew: null,
      backGroundDiscoverOld: null,
      notiIcon: false,
      statusText: "",
      locationOn: true,
      loading: false,
      user: [],
      activeMinutesAgo: [],
      activeDaysAgo: [],
      currentlyActive: [],
      activeHoursAgo: [],
      inviteModal: false
    };
  }

  componentDidMount() {
    BackgroundTimer.start();
    const intervalId = BackgroundTimer.setInterval(() => {
      this.discover();
    }, 10000);

    if (this.state.inactiveTimeStamp !== 0) {
      this.setState({
        hidden: true,
        hiddenImage: Hidden
      });

      timeDifference = TimeDifference(
        new Date().getTime(),
        this.state.inactiveTimeStamp
      );

      this.setState({
        inactiveTime: timeDifference
      });
      this.startHiddenTImer();
    }
    this.discover();
    this.AppSync();

    BackgroundGeolocation.start();

    BackgroundGeolocation.on("location", location => {
      //console.log(location);
      BackgroundGeolocation.startTask(taskKey => {
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude
        });
        firebase
          .database()
          .ref(`users/${this.state.userToken}`)
          .update({
            position: location,
            lastUpdate: new Date().getTime()
          });
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on("error", error => {
      console.log("[ERROR] BackgroundGeolocation error:", error);
    });

    BackgroundGeolocation.on("authorization", status => {
      console.log(
        "[INFO] BackgroundGeolocation authorization status: " + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        this.setState({
          locationOn: false
        });
      } else {
        this.setState({
          locationOn: true
        });
      }
    });
  }

  componentWillUnmount() {
    FirebaseSyncRef.off();
  }

  onBlur() {
    console.log("blurring");
    this.setState({
      //borderColor: "gray"
    });
  }

  AppSync = () => {
    FirebaseSyncRef = firebase.database().ref(`users/${this.state.userToken}`);
    FirebaseSyncRef.on("value", value => {
      //alert(JSON.stringify(value))
      this.setState({
        user: value.val(),
        inactiveTimeStamp: value.val().inactiveTime
      });
      AsyncStorage.setItem("user", JSON.stringify(value.val()));
    });
  };

  updateActive = (item, value) => {
    this.setState({ [item]: value });
    firebase
      .database()
      .ref(`users/${this.state.userToken}`)
      .update({
        [item]: value
      });
  };
  toRad = number => {
    return number * Math.PI / 180;
  };
  discover() {
    if (this.state.latitude && this.state.longitude) {
      let discoveryKeys;
      firebase
        .database()
        .ref("users")
        .once("value", snapshot => {
          snapshot.forEach(data => {
            if (data.key !== this.state.userToken) {
              if (data.val().position !== undefined) {
                const lat1 = this.state.latitude;
                const lon1 = this.state.longitude;
                const lat2 = data.val().position.latitude;
                const lon2 = data.val().position.longitude;
                var R = 6371; // km
                var dLat = this.toRad(lat2 - lat1);
                var dLon = this.toRad(lon2 - lon1);
                var lat1 = this.toRad(lat1);
                var lat2 = this.toRad(lat2);
                var a =
                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.sin(dLon / 2) *
                    Math.sin(dLon / 2) *
                    Math.cos(lat1) *
                    Math.cos(lat2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                var discovered = false;
                if (this.state.user.discovered !== undefined) {
                  discoveryKeys = Object.keys(this.state.user.discovered);
                }

                // if ( d <= 1 && new Date().getTime() - data.val().lastUpdate <= 60000) {
                if (
                  d <= 1 &&
                  new Date().getTime() - data.val().lastUpdate <= 60000
                ) {
                  if (this.state.user.discovered !== undefined) {
                    discoveryKeys.map(key => {
                      if (data.key === key) {
                        discovered = true;
                        firebase
                          .database()
                          .ref(
                            `users/${this.state.userToken}/discovered/${
                              data.key
                            }/`
                          )
                          .update({
                            discoveryTime: new Date().getTime(),
                            discoverCount:
                              this.state.user.discovered[key].discoverCount + 1,
                            discoverCountFlag: false
                          });
                      }
                      return null;
                    });
                  }
                  if (!discovered) {
                    const DiscoveredUserData = Object.assign(data.val(), {
                      discoveryTime: new Date().getTime(),
                      discoverCount: 1,
                      discoverCountFlag: false,
                      isActiveWhenDiscovered: !this.state.hidden
                    });
                    firebase
                      .database()
                      .ref(
                        `users/${this.state.userToken}/discovered/${data.key}/`
                      )
                      .set(DiscoveredUserData);
                  }
                }
              }
            }
          });
        })
        .then(() => {
          this.showDiscoveredData(discoveryKeys);
        });
      firebase
        .database()
        .ref(`users/${this.state.userToken}/`)
        .update({
          lastUpdate: new Date().getTime()
        });
    }
  }

  // calculateTimeDiff(startTime, endTime) {
  //   const timeDiff = endTime - startTime;
  //   const oneMinute = 1000 * 60;
  //   const oneHour = 1000 * 60 * 60;
  //   const oneDay = 1000 * 60 * 60 * 24;
  //   let diff;
  //   if (Math.round(timeDiff / oneDay) <= 0) {
  //     if (Math.round(timeDiff / oneHour) <= 0) {
  //       if (Math.round(timeDiff / oneMinute) <= 0) {
  //         return "Few seconds ago";
  //       }
  //       diff = Math.round(timeDiff / oneMinute);
  //       return `${diff} minute ago`;
  //     }
  //     diff = Math.round(timeDiff / oneHour);
  //     return `${diff} hour ago`;
  //   }
  //   this.setState({
  //     TimeDifference: diff
  //   });
  //   console.log(this.state.TimeDifference);
  //   diff = Math.round(timeDiff / oneDay);
  //   return `${diff} day ago`;
  // }

  connectedPeople = () => {
    let connectedPeople = [];
    connectedKeys = Object.keys(this.state.user.connected);
    let numberOfConnections = Object.keys(connectedKeys).length;
    connectedKeys.map(key => {
      const peep = {};
      peep.key = key;
      peep.name = this.state.user.connections[key].name;
      peep.propic = this.state.user.connections[key].propic;
      connectedPeople = connectedPeople.concat([peep]);
      this.setState({
        connection: this.state.connection.concat([peep]),
        numberOfConnections
      });
    });
  };

  showDiscoveredData = discoveryKeys => {
    let countPeopl;
    let currentlyActive = [];
    let activeMinutesAgo = [];
    let activeHoursAgo = [];
    let activeDaysAgo = [];

    if (this.state.user.discovered !== undefined) {
      discoveryKeys.map(key => {
        const CheckStatus = TimeDifference(
          new Date().getTime(),
          this.state.user.discovered[key].discoveryTime
        );
        if (CheckStatus.duration === "seconds") {
          countPeopl += 1;
          const peep = {};
          peep.key = key;
          peep.discoveryTime = this.state.user.discovered[key].discoveryTime;
          peep.status = CheckStatus.text;
          peep.work = this.state.user.discovered[key].work;
          peep.name = this.state.user.discovered[key].name;
          peep.propic = this.state.user.discovered[key].propic;
          peep.isActiveWhenDiscovered = this.state.user.discovered[
            key
          ].isActiveWhenDiscovered;
          currentlyActive = currentlyActive.concat([peep]);
        } else if (CheckStatus.duration === "minutes") {
          countPeopl += 1;
          const peep = {};
          peep.key = key;
          peep.discoveryTime = this.state.user.discovered[key].discoveryTime;
          peep.status = CheckStatus.text;
          peep.work = this.state.user.discovered[key].work;
          peep.name = this.state.user.discovered[key].name;
          peep.propic = this.state.user.discovered[key].propic;
          peep.isActiveWhenDiscovered = this.state.user.discovered[
            key
          ].isActiveWhenDiscovered;
          activeMinutesAgo = activeMinutesAgo.concat([peep]);
        } else if (CheckStatus.duration === "hours") {
          countPeopl += 1;
          const peep = {};
          peep.key = key;
          peep.discoveryTime = this.state.user.discovered[key].discoveryTime;
          peep.status = CheckStatus.text;
          peep.work = this.state.user.discovered[key].work;
          peep.name = this.state.user.discovered[key].name;
          peep.propic = this.state.user.discovered[key].propic;
          peep.isActiveWhenDiscovered = this.state.user.discovered[
            key
          ].isActiveWhenDiscovered;
          activeHoursAgo = activeHoursAgo.concat([peep]);
        } else if (CheckStatus.duration === "days") {
          countPeopl += 1;
          const peep = {};
          peep.key = key;
          peep.discoveryTime = this.state.user.discovered[key].discoveryTime;
          peep.status = CheckStatus.text;
          peep.work = this.state.user.discovered[key].work;
          peep.name = this.state.user.discovered[key].name;
          peep.propic = this.state.user.discovered[key].propic;
          peep.isActiveWhenDiscovered = this.state.user.discovered[
            key
          ].isActiveWhenDiscovered;
          activeDaysAgo = activeDaysAgo.concat([peep]);
        }
        return null;
      });
    }

    this.setState({
      currentlyActive,
      activeMinutesAgo,
      activeHoursAgo,
      activeDaysAgo
    });
  };

  startHiddenTImer = () => {
    let timeDifference;
    timer = setInterval(() => {
      timeDifference = TimeDifference(
        new Date().getTime(),
        this.state.inactiveTimeStamp
      );
      console.log(timeDifference);
      this.setState({
        inactiveTime: timeDifference
      });
    }, 5000);
  };

  discoverOFF = () => {
    this.setState({
      isHiddenModalVisible: true,
      hiddenImage: Hidden,
      hidden: true,
      inactiveTime: "Few seconds ago"
    });
    const activeRef = firebase.database().ref(`users/${this.state.userToken}`);
    activeRef.update({
      active: false,
      inactiveTime: new Date().getTime()
    });
    this.startHiddenTImer();
  };

  discoverON = () => {
    this.setState({
      hidden: false,
      hiddenImage: Visible
    });
    const activeRef = firebase.database().ref(`users/${this.state.userToken}`);
    activeRef.update({
      active: true,
      inactiveTime: 0
    });
    clearTimeout(timer);
  };

  showHiddenModal = () => this.setState({ isHiddenModalVisible: true });
  hideHiddenModal = () => this.setState({ isHiddenModalVisible: false });
  showColorModal = () => this.setState({ isColorModalVisible: true });
  showDeleteModal = () => this.setState({ isDeleteModalVisible: true });
  inviteModal = () => this.setState({ inviteModal: true });
  whereIliveModal = () =>
    this.setState({ iswhereIliveModalModalVisible: true });
  Logout = () => {
    AsyncStorage.clear()
      .then(() => {
        this.props.navigation.navigate("Signup");
      })
      .catch(() => {
        alert("Error logging out.");
      });
  };
  chooseColor = color => {
    this.setState({
      appColor: color
    });

    firebase
      .database()
      .ref(`users/${this.state.userToken}/`)
      .update({
        appColor: color
      });
  };

  toWelcome = () => {
    this.props.navigation.navigate("Welcome");
  };
  toHidden = () => {
    this.props.navigation.navigate("Hidden");
  };
  toDeck = (number, key) => {
    this.props.navigation.navigate("Deck", {
      numberOfPeople: number,
      key,
      user: this.state.user,
      userToken: this.state.userToken
    });
  };
  toAbout = () => {
    this.props.navigation.navigate("About");
  };

  toNotification = () => {
    this.props.navigation.navigate("Notification");
  };
  toHiddenFromModal = () => {
    this.setState({ isHiddenModalVisible: false });
    this.props.navigation.navigate("Hidden");
  };

  toHideColor = () => {
    this.setState({ isColorModalVisible: false });
  };
  toHideColor = () => {
    this.setState({ isColorModalVisible: false });
  };
  toPost = (ifStatus, image, item) => {
    this.props.navigation.navigate("Post", {
      ifStatus,
      image,
      item,
      appColor: this.state.appColor,
      user: this.props.navigation.state.params.user,
      userToken: this.state.userToken
    });
  };
  _changeTextInputValue(statusText) {
    this.setState({
      statusText
    });
  }
  sendText = () => {
    firebase
      .database()
      .ref(`users/${this.state.userToken}/`)
      .update({
        userProfileStatus: this.state.statusText
      });
    this.textInput.clear();
  };
  changeWhereIlive = whereIlive => {
    this.setState({
      whereIlive
    });
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        index={1}
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
          bottom: "95%",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <View style={styles.slide1}>
          <View style={styles.container}>
            <StatusBar
              backgroundColor={this.state.appColor}
              barStyle="light-content"
            />
            <ParallaxScrollView
              useNativeDriver
              backgroundColor={this.state.appColor}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}
              fadeOutForeground={false}
              isForegroundTouchable={true}
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
                <View key="parallax-header" style={styles.parallaxHeader}>
                  <View
                    style={{
                      width: "100%",
                      height: 170,
                      backgroundColor: this.state.appColor
                    }}
                  >
                    <Grid style={{ paddingTop: 40 }}>
                      <Row style={{ height: 30 }}>
                        <Col style={{ width: "20%" }}>
                          <TouchableOpacity onPress={this.showColorModal}>
                            <View style={styles.invite}>
                              <Image
                                source={require("../Images/color.png")}
                                style={{ height: 30, width: 30 }}
                              />
                              <Text style={styles.inviteText}>
                                {" "}
                                Your Colour
                              </Text>
                              <Modal
                                isVisible={this.state.isColorModalVisible}
                                style={styles.modal}
                              >
                                <View
                                  style={{
                                    flex: 0,
                                    backgroundColor: "white",
                                    borderRadius: 10
                                  }}
                                >
                                  <TouchableOpacity onPress={this.toHideColor}>
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        marginTop: "5%",
                                        marginLeft: "5%"
                                      }}
                                    >
                                      {" "}
                                      X
                                    </Text>
                                  </TouchableOpacity>
                                  <Text style={styles.modalText}>
                                    Pick your colour
                                  </Text>
                                  <View
                                    style={{
                                      alignItems: "center",
                                      paddingTop: 30
                                    }}
                                  >
                                    <Image
                                      source={require("../Images/color.png")}
                                      style={{
                                        height: 100,
                                        width: 100
                                      }}
                                    />
                                  </View>

                                  <Text
                                    style={{
                                      fontFamily: "AvenirNext-Regular",
                                      fontSize: 25,
                                      textAlign: "center",
                                      marginRight: "10%",
                                      marginLeft: "10%",
                                      paddingTop: "5%"
                                    }}
                                  >
                                    Select the color of your profile
                                  </Text>
                                  <View>
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        marginLeft: "5%",
                                        marginRight: "5%",
                                        marginTop: 18,
                                        marginBottom: 10
                                      }}
                                    >
                                      <View
                                        style={{
                                          flexDirection: "column",
                                          paddingLeft: "5%",
                                          paddingRight: "5%"
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.chooseColor("rgb(0,172,193)");
                                          }}
                                        >
                                          <Image
                                            style={{ height: 60, width: 60 }}
                                            source={require("../Images/Cyan.png")}
                                          />
                                          <Text
                                            style={{
                                              fontFamily: "AvenirNext-Regular",
                                              fontSize: 15,
                                              marginTop: "15%",
                                              marginLeft: 13
                                            }}
                                          >
                                            Cyan
                                          </Text>
                                        </TouchableOpacity>
                                      </View>

                                      <View
                                        style={{
                                          flexDirection: "column",
                                          paddingLeft: "10%",
                                          paddingRight: "5%"
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.chooseColor("rgb(64,64,64)");
                                          }}
                                        >
                                          <Image
                                            source={require("../Images/Graphic.png")}
                                            style={{ height: 60, width: 60 }}
                                          />
                                          <Text
                                            style={{
                                              fontFamily: "AvenirNext-Regular",
                                              fontSize: 15,
                                              marginTop: "16%"
                                            }}
                                          >
                                            Graphite
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: "column",
                                          paddingLeft: "9%",
                                          paddingRight: "3%"
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.chooseColor("rgb(246,36,89)");
                                          }}
                                        >
                                          <Image
                                            source={require("../Images/VividRed.png")}
                                            style={{ height: 60, width: 60 }}
                                          />
                                          <Text
                                            style={{
                                              fontFamily: "AvenirNext-Regular",
                                              fontSize: 15,
                                              marginTop: "15%",
                                              marginLeft: -5
                                            }}
                                          >
                                            {" "}
                                            Vivid Red
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        marginLeft: "5%",
                                        marginRight: "5%",
                                        marginTop: 5,
                                        marginBottom: 10
                                      }}
                                    >
                                      <View
                                        style={{
                                          flexDirection: "column",
                                          paddingLeft: "5%",
                                          paddingRight: "5%"
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.chooseColor("rgb(255,187,0)");
                                          }}
                                        >
                                          <Image
                                            source={require("../Images/Yellow.png")}
                                            style={{ height: 60, width: 60 }}
                                          />
                                          <Text
                                            style={{
                                              fontFamily: "AvenirNext-Regular",
                                              fontSize: 15,
                                              marginTop: "15%",
                                              marginLeft: 10
                                            }}
                                          >
                                            Yellow
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: "column",
                                          paddingLeft: "11%",
                                          paddingRight: "5%"
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.chooseColor("rgb(22,160,107)");
                                          }}
                                        >
                                          <Image
                                            source={require("../Images/Green.png")}
                                            style={{ height: 60, width: 60 }}
                                          />
                                          <Text
                                            style={{
                                              fontFamily: "AvenirNext-Regular",
                                              fontSize: 15,
                                              marginTop: "15%",
                                              marginLeft: 9
                                            }}
                                          >
                                            Green
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: "column",
                                          paddingLeft: 30,
                                          paddingRight: 30
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() => {
                                            this.chooseColor("rgb(35,112,119)");
                                          }}
                                        >
                                          <Image
                                            source={require("../Images/DarkCyan.png")}
                                            style={{ height: 60, width: 60 }}
                                          />
                                          <Text
                                            style={{
                                              fontFamily: "AvenirNext-Regular",
                                              fontSize: 15,
                                              marginTop: "15%",
                                              marginLeft: -9
                                            }}
                                          >
                                            {" "}
                                            Dark Cyan
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </Modal>
                            </View>
                          </TouchableOpacity>
                        </Col>
                        <Col style={{ width: "60%" }}>
                          <Text style={styles.h2}>Settings</Text>
                        </Col>
                        <Col style={{ width: "20%" }} />
                      </Row>
                      <View style={{ marginTop: 25, alignItems: "center" }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.toPost(true, this.state.myPic, "Status");
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              color: "rgba(255, 255, 255, 1)",
                              fontSize: 15
                            }}
                          >
                            Tap here to share something...
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </Grid>
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
                  <View style={styles.proPic}>
                    <Image
                      source={{ uri: this.state.myPic }}
                      style={{ height: 60, width: 60, borderRadius: 30 }}
                    />
                  </View>
                </View>
              )}
              renderStickyHeader={() => (
                <View
                  key="sticky-header"
                  style={{
                    backgroundColor: this.state.appColor,
                    height: STICKY_HEADER_HEIGHT,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      textAlign: "center",
                      marginBottom: 10
                    }}
                  >
                    Settings
                  </Text>
                  <View>
                    <TouchableOpacity onPress={this.inviteModal}>
                      <Image
                        style={{
                          height: 30,
                          width: 37
                        }}
                        source={require("../Images/i1.png")}
                      />
                      <Text style={styles.inviteText}>Invite</Text>
                      <Modal
                        isVisible={this.state.inviteModal}
                        style={styles.inviteModalView}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              inviteModal: false
                            })
                          }
                        >
                          <View
                            style={{
                              flexDirection: "row-reverse",
                              padding: 20
                            }}
                          >
                            <Image
                              style={{
                                height: 25,
                                width: 25
                              }}
                              source={require("../Images/closeBlack.png")}
                            />
                          </View>
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                          <Text style={styles.inviteModalText}>
                            Invite friends
                          </Text>
                          <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                            <Image
                              style={{
                                height: 107,
                                width: 140
                              }}
                              source={require("../Images/Invite.png")}
                            />
                          </View>
                          <Text style={styles.inviteModalText}>
                            Spread the word and grow your Circle
                          </Text>
                        </View>
                        <View style={styles.modalIconContainer}>
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                flexDirection: "column",
                                width: "30%",
                                alignItems: "center"
                              }}
                            >
                              <View style={styles.copylinkContainer}>
                                <TouchableOpacity>
                                  <Image
                                    style={{
                                      height: 32,
                                      width: 27
                                    }}
                                    source={require("../Images/Copy.png")}
                                  />
                                </TouchableOpacity>
                              </View>
                              <Text style={styles.inviteIconText}>
                                Copy Link
                              </Text>
                            </View>
                            <View style={styles.inviteIconContainer}>
                              <TouchableOpacity>
                                <Image
                                  style={{
                                    height: 60,
                                    width: 60
                                  }}
                                  source={require("../Images/whatsapp.png")}
                                />
                              </TouchableOpacity>
                              <Text style={styles.inviteIconText}>
                                WhatsApp
                              </Text>
                            </View>
                            <View style={styles.inviteIconContainer}>
                              <TouchableOpacity>
                                <Image
                                  style={{
                                    height: 60,
                                    width: 60
                                  }}
                                  source={require("../Images/messenger.png")}
                                />
                              </TouchableOpacity>
                              <Text style={styles.inviteIconText}>
                                Messanger
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 20,
                              marginBottom: 20
                            }}
                          >
                            <View style={styles.inviteIconContainer}>
                              <TouchableOpacity>
                                <Image
                                  style={{
                                    height: 60,
                                    width: 60
                                  }}
                                  source={require("../Images/messageGreen.png")}
                                />
                              </TouchableOpacity>
                              <Text style={styles.inviteIconText}>Message</Text>
                            </View>
                            <View style={styles.inviteIconContainer}>
                              <TouchableOpacity>
                                <Image
                                  style={{
                                    height: 60,
                                    width: 60
                                  }}
                                  source={require("../Images/twitter.png")}
                                />
                              </TouchableOpacity>
                              <Text style={styles.inviteIconText}>Twitter</Text>
                            </View>
                            <View style={styles.inviteIconContainer}>
                              <TouchableOpacity>
                                <Image
                                  style={{
                                    height: 60,
                                    width: 60
                                  }}
                                  source={require("../Images/facebook.png")}
                                />
                              </TouchableOpacity>
                              <Text style={styles.inviteIconText}>
                                Facebook
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            >
              <Tabs activeColor={this.state.appColor}>
                {/* First tab */}
                <View title="PROFILE">
                  <ScrollView>
                    <Grid
                      style={{
                        marginTop: 40,
                        marginLeft: 30,
                        marginRight: 20,
                        marginBottom: 10
                      }}
                    >
                      <Row>
                        <Col style={{ width: "80%" }} />
                        <Col style={{ width: "20%" }}>
                          <Text style={styles.mText}>VISIBLE</Text>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 20 }}>
                        <Col style={{ width: "15%", marginTop: 16 }}>
                          <Image
                            style={{ height: 35, width: 35 }}
                            source={require("../Images/full.png")}
                          />
                        </Col>
                        <Col style={{ width: "68%", height: 57 }}>
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              fontSize: 14,
                              color: "rgba(0,0,0,0.3)"
                            }}
                          >
                            Full Name
                          </Text>
                        </Col>
                        <Col style={{ marginTop: 10 }}>
                          <Switch
                            value={this.state.fullName}
                            tintColor={this.state.appColor}
                            onTintColor={this.state.appColor}
                            onValueChange={value => {
                              this.updateActive("fullName", value);
                            }}
                          />
                        </Col>
                      </Row>
                      {this.state.myName === "none" ? (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <Text style={styles.mText}>Add your Name</Text>
                          </Col>
                          <Col />
                        </Row>
                      ) : (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <Text style={styles.mText}>
                              {this.state.myName}
                            </Text>
                          </Col>
                          <Col />
                        </Row>
                      )}

                      <Row style={{ marginTop: 30 }}>
                        <Col style={{ width: "15%" }}>
                          <Image
                            style={{ height: 35, width: 35, marginTop: 5 }}
                            source={require("../Images/Job.png")}
                          />
                        </Col>
                        <Col style={{ width: "68%", height: 57 }}>
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              fontSize: 14,
                              color: "rgba(0,0,0,0.3)"
                            }}
                          >
                            Job Titile
                          </Text>
                        </Col>
                        <Col style={{ paddingTop: 10 }}>
                          <Switch
                            value={this.state.jobTitle}
                            tintColor={this.state.appColor}
                            onTintColor={this.state.appColor}
                            onValueChange={value => {
                              this.updateActive("jobTitle", value);
                            }}
                          />
                        </Col>
                      </Row>
                      {this.state.myJobPostion === "Currently" ? (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.toPost(
                                  false,
                                  require("../Images/Job.png"),
                                  "myJobPostion"
                                );
                              }}
                            >
                              <Text style={styles.mText}>Add Job Position</Text>
                            </TouchableOpacity>
                          </Col>
                          <Col />
                        </Row>
                      ) : (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <Text style={styles.mText}>
                              {this.state.myJobPostion}
                            </Text>
                          </Col>
                          <Col />
                        </Row>
                      )}
                      <Row style={{ marginTop: 30 }}>
                        <Col style={{ width: "15%" }}>
                          <Image
                            style={{ height: 35, width: 35, marginTop: 5 }}
                            source={require("../Images/Company.png")}
                          />
                        </Col>
                        <Col style={{ width: "68%", height: 57 }}>
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              fontSize: 14,
                              color: "rgba(0,0,0,0.3)"
                            }}
                          >
                            Company
                          </Text>
                        </Col>
                        <Col style={{ paddingTop: 10 }}>
                          <Switch
                            value={this.state.company}
                            tintColor={this.state.appColor}
                            onTintColor={this.state.appColor}
                            onValueChange={value => {
                              this.updateActive("company", value);
                            }}
                          />
                        </Col>
                      </Row>
                      {this.state.myCompany === "Working" ? (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.toPost(
                                  false,
                                  require("../Images/Company.png"),
                                  "myCompany"
                                );
                              }}
                            >
                              <Text style={styles.mText}>Add company name</Text>
                            </TouchableOpacity>
                          </Col>
                          <Col />
                        </Row>
                      ) : (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <Text style={styles.mText}>
                              {this.state.myCompany}
                            </Text>
                          </Col>
                          <Col />
                        </Row>
                      )}
                      <Row style={{ marginTop: 30 }}>
                        <Col style={{ width: "15%" }}>
                          <Image
                            style={{ height: 35, width: 35, marginTop: 5 }}
                            source={require("../Images/home.png")}
                          />
                        </Col>
                        <Col style={{ width: "68%" }}>
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              fontSize: 14,
                              color: "rgba(0,0,0,0.3)"
                            }}
                          >
                            Lives in
                          </Text>
                        </Col>
                        <Col style={{ paddingTop: 10 }}>
                          <Switch
                            value={this.state.livesIn}
                            tintColor={this.state.appColor}
                            onTintColor={this.state.appColor}
                            onValueChange={value => {
                              this.updateActive("livesIn", value);
                            }}
                          />
                        </Col>
                      </Row>
                      {this.state.whereIlive === "none" ? (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.toPost(
                                  false,
                                  require("../Images/home.png"),
                                  "whereIlive"
                                );
                              }}
                            >
                              <Text style={styles.mText}>
                                Add where you Live
                              </Text>
                            </TouchableOpacity>
                          </Col>
                          <Col />
                        </Row>
                      ) : (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <Text style={styles.mText}>
                              {this.state.whereIlive}
                            </Text>
                          </Col>
                          <Col />
                        </Row>
                      )}
                      <Row style={{ marginTop: 30 }}>
                        <Col style={{ width: "15%" }}>
                          <Image
                            style={{ height: 35, width: 35, marginTop: 5 }}
                            source={require("../Images/lang.png")}
                          />
                        </Col>
                        <Col style={{ width: "68%" }}>
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              fontSize: 14,
                              color: "rgba(0,0,0,0.3)"
                            }}
                          >
                            Language
                          </Text>
                        </Col>
                        <Col style={{ paddingTop: 10 }}>
                          <Switch
                            value={this.state.showLanguage}
                            tintColor={this.state.appColor}
                            onTintColor={this.state.appColor}
                            onValueChange={value => {
                              this.updateActive("showLanguage", value);
                            }}
                          />
                        </Col>
                      </Row>
                      {this.state.myLanguage === "none" ? (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.toPost(
                                  false,
                                  require("../Images/lang.png"),
                                  "myLanguage"
                                );
                              }}
                            >
                              <Text style={styles.mText}>
                                Add your language
                              </Text>
                            </TouchableOpacity>
                          </Col>
                          <Col />
                        </Row>
                      ) : (
                        <Row>
                          <Col style={{ width: "15%" }} />
                          <Col style={{ width: "80%", marginTop: -15 }}>
                            <Text style={styles.mText}>
                              {this.state.myLanguage}
                            </Text>
                          </Col>
                          <Col />
                        </Row>
                      )}
                    </Grid>
                  </ScrollView>
                </View>
                {/* Second tab */}
                <View title="GENERAL" style={styles.content}>
                  <ScrollView>
                    <Grid style={{ marginTop: 20, marginLeft: 30 }}>
                      <Row>
                        <Col>
                          <Text style={styles.privacyText}>PRIVACY</Text>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 20 }}>
                        <Col style={{ width: "85%" }}>
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              fontSize: 15,
                              color: "rgba(0,0,0,0.8)"
                            }}
                          >
                            Hide me here
                          </Text>
                        </Col>
                        <Col>
                          <Switch
                            disabled
                            value={false}
                            tintColor={this.state.appColor}
                            onTintColor={this.state.appColor}
                          />
                        </Col>
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

                      <Row style={{ marginTop: 20 }}>
                        <Col style={{ width: "85%" }}>
                          <Text
                            style={{
                              fontFamily: "AvenirNext-regular",
                              fontSize: 15,
                              color: "rgba(0,0,0,0.8)"
                            }}
                          >
                            New users around
                          </Text>
                        </Col>
                        <Col>
                          <Switch
                            disabled
                            value={true}
                            tintColor={this.state.appColor}
                            onTintColor={this.state.appColor}
                          />
                        </Col>
                      </Row>
                      <TouchableOpacity onPress={this.toAbout}>
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
                            <Image
                              style={{ height: 20.2, width: 10.5 }}
                              source={require("../Images/list.png")}
                            />
                          </Col>
                        </Row>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.toAbout}>
                        <Row style={{ marginTop: 25 }}>
                          <Col style={{ width: "80%" }}>
                            <Text style={styles.mText}>Feedback</Text>
                          </Col>
                          <Col style={{ marginLeft: 50 }}>
                            <Image
                              style={{ height: 20.2, width: 10.5 }}
                              source={require("../Images/list.png")}
                            />
                          </Col>
                        </Row>
                      </TouchableOpacity>
                      <Row style={{ marginTop: 35 }}>
                        <Col>
                          <Text style={styles.privacyText}>ACCOUNT</Text>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 25 }}>
                        <Col style={{ width: "80%" }}>
                          <TouchableOpacity onPress={this.Logout}>
                            <Text style={styles.mText}>Log out</Text>
                          </TouchableOpacity>
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
                      <TouchableOpacity onPress={this.showDeleteModal}>
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
                                    this.setState({
                                      isDeleteModalVisible: false
                                    })
                                  }
                                >
                                  <View style={styles.button}>
                                    <Text style={styles.buttonText}>
                                      Cancel
                                    </Text>
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
            </ParallaxScrollView>
          </View>
        </View>

        <View style={styles.slide2}>
          <View style={styles.container}>
            <ParallaxScrollView
              useNativeDriver
              backgroundColor={this.state.appColor}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}
              fadeOutForeground={false}
              isForegroundTouchable={true}
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
                      height: 150,
                      backgroundColor: this.state.appColor
                    }}
                  >
                    <Grid>
                      <Row style={{ height: 30, marginTop: 40 }}>
                        <Col style={{ width: "20%" }} />
                        <Col style={{ width: "60%" }}>
                          <Text style={styles.h2}>Discover</Text>
                        </Col>
                        {this.state.notiIcon ? (
                          <Col style={{ width: "20%" }}>
                            <TouchableOpacity onPress={this.toNotification}>
                              <View style={styles.invite}>
                                <Image
                                  source={require("../Images/noti.png")}
                                  style={{ height: 38, width: 31 }}
                                />
                              </View>
                            </TouchableOpacity>
                          </Col>
                        ) : (
                          <Col style={{ width: "20%" }}>
                            <TouchableOpacity onPress={this.toNotification}>
                              <View style={styles.invite}>
                                <Image
                                  source={require("../Images/noti1.png")}
                                  style={{ height: 34, width: 31 }}
                                />
                              </View>
                            </TouchableOpacity>
                          </Col>
                        )}
                      </Row>
                      {this.state.hidden ? (
                        <Text style={styles.text20}>
                          {this.state.inactiveTime.text}
                        </Text>
                      ) : (
                        <Text style={styles.text5}>Today</Text>
                      )}
                    </Grid>
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
                </View>
              )}
              renderStickyHeader={() => (
                <View
                  key="sticky-header"
                  style={{
                    backgroundColor: this.state.appColor,
                    height: STICKY_HEADER_HEIGHT,
                    justifyContent: "flex-end"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      textAlign: "center",
                      marginBottom: 10
                    }}
                  >
                    {this.state.hidden ? (
                      <Text style={styles.text20}>
                        {this.state.inactiveTime.text}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          textAlign: "center",
                          marginBottom: 10
                        }}
                      >
                        Today
                      </Text>
                    )}
                  </Text>
                </View>
              )}
            >
              {this.state.locationOn ? (
                <View style={{ marginTop: 20 }}>
                  {//Check if hidden or not
                  this.state.hidden ? (
                    <TouchableOpacity onPress={this.discoverON}>
                      <View style={styles.circle}>
                        <Image
                          source={this.state.hiddenImage}
                          style={{
                            height: 36.3,
                            width: 36.7
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={this.discoverOFF}>
                      <View style={styles.circle}>
                        <Image
                          source={this.state.hiddenImage}
                          style={{
                            height: 36.3,
                            width: 36.7
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}

                  <Modal
                    isVisible={this.state.isHiddenModalVisible}
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
                        Your profile is hidden
                      </Text>
                      <View style={{ alignItems: "center", paddingTop: 50 }}>
                        <Image
                          source={{ uri: this.state.myPic }}
                          style={{
                            height: 90,
                            width: 90,
                            borderRadius: 45,
                            borderWidth: 2,
                            borderColor: "grey"
                          }}
                        />
                      </View>
                      <Text style={styles.modalText1}>
                        While your Profile is hidden you won't be able to see
                        new users around you
                      </Text>
                      <TouchableOpacity onPress={this.hideHiddenModal}>
                        <View
                          style={{
                            height: 80,
                            width: "100%",
                            marginTop: 30,
                            backgroundColor: this.state.appColor,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            justifyContent: "center"
                          }}
                        >
                          <Text style={styles.buttonText}>OK, got it</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </Modal>

                  <ScrollView>
                    <Grid style={{ marginTop: 20 }}>
                      {this.state.currentlyActive
                        .sort((a, b) => a.discoveryTime > b.discoveryTime)
                        .map(x => (
                          <View>
                            <Row
                              style={{ height: 70 }}
                              key={x.key}
                              onPress={() => {
                                this.toDeck(
                                  this.state.numberOfDiscoveredPeople,
                                  x.key
                                );
                              }}
                            >
                              <Col style={{ width: "20%" }}>
                                <View>
                                  {!x.isActiveWhenDiscovered ? (
                                    <Image
                                      source={{ uri: x.propic }}
                                      style={styles.pic}
                                      blurRadius={10}
                                    />
                                  ) : (
                                    <View
                                      style={{
                                        height: 62,
                                        width: 62,
                                        backgroundColor: this.state.appColor,
                                        borderRadius: 62 / 2,
                                        justifyContent: "center",
                                        marginLeft: 4,
                                        alignItems: "center"
                                      }}
                                    >
                                      <Image
                                        source={{ uri: x.propic }}
                                        style={styles.pic}
                                      />
                                    </View>
                                  )}
                                </View>
                              </Col>
                              <Col style={{ width: "60%" }}>
                                <View>
                                  <Text style={styles.text1}>{x.name}</Text>
                                </View>
                                <Text style={styles.text2}>{x.work}</Text>
                              </Col>
                              <Col style={{ width: "20%" }}>
                                <Text style={styles.text3}>{x.status}</Text>
                              </Col>
                            </Row>
                            <View
                              style={{
                                marginLeft: "2%",
                                width: "100%",
                                height: 1.5,
                                borderTopColor: "rgb(243,243,244)",
                                borderTopWidth: 0.8
                              }}
                            />
                          </View>
                        ))}
                      {this.state.activeMinutesAgo
                        .sort((a, b) => a.discoveryTime > b.discoveryTime)
                        .map((x, index) => (
                          <View>
                            {index < 1 ? (
                              <View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    color: "rgb(104, 104, 110)",
                                    paddingLeft: "2%",
                                    paddingBottom: "4%"
                                  }}
                                >
                                  Past Hour
                                </Text>
                                <Row
                                  style={{ height: 70 }}
                                  key={x.key}
                                  onPress={() => {
                                    this.toDeck(
                                      this.state.numberOfDiscoveredPeople,
                                      x.key
                                    );
                                  }}
                                >
                                  <Col style={{ width: "20%" }}>
                                    <View>
                                      {!x.isActiveWhenDiscovered ? (
                                        <Image
                                          source={{ uri: x.propic }}
                                          style={styles.pic}
                                          blurRadius={10}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            height: 62,
                                            width: 62,
                                            backgroundColor: "#C3C3C3",
                                            borderRadius: 62 / 2,
                                            justifyContent: "center",
                                            marginLeft: 4,
                                            alignItems: "center"
                                          }}
                                        >
                                          <Image
                                            source={{ uri: x.propic }}
                                            style={styles.pic}
                                          />
                                        </View>
                                      )}
                                    </View>
                                  </Col>
                                  <Col style={{ width: "60%" }}>
                                    <View>
                                      <Text style={styles.text1}>{x.name}</Text>
                                    </View>
                                    <Text style={styles.text2}>{x.work}</Text>
                                  </Col>
                                  <Col style={{ width: "20%" }}>
                                    <Text style={styles.text3}>{x.status}</Text>
                                  </Col>
                                </Row>
                                <View
                                  style={{
                                    marginLeft: "2%",
                                    width: "100%",
                                    height: 1.5,
                                    borderTopColor: "rgb(243,243,244)",
                                    borderTopWidth: 0.8
                                  }}
                                />
                              </View>
                            ) : (
                              <View>
                                <Row
                                  style={{ height: 70 }}
                                  key={x.key}
                                  onPress={() => {
                                    this.toDeck(
                                      this.state.numberOfDiscoveredPeople,
                                      x.key
                                    );
                                  }}
                                >
                                  <Col style={{ width: "20%" }}>
                                    <View>
                                      {!x.isActiveWhenDiscovered ? (
                                        <Image
                                          source={{ uri: x.propic }}
                                          style={styles.pic}
                                          blurRadius={10}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            height: 62,
                                            width: 62,
                                            backgroundColor: "#C3C3C3",
                                            borderRadius: 62 / 2,
                                            justifyContent: "center",
                                            marginLeft: 4,
                                            alignItems: "center"
                                          }}
                                        >
                                          <Image
                                            source={{ uri: x.propic }}
                                            style={styles.pic}
                                          />
                                        </View>
                                      )}
                                    </View>
                                  </Col>
                                  <Col style={{ width: "60%" }}>
                                    <View>
                                      <Text style={styles.text1}>{x.name}</Text>
                                    </View>
                                    <Text style={styles.text2}>{x.work}</Text>
                                  </Col>
                                  <Col style={{ width: "20%" }}>
                                    <Text style={styles.text3}>{x.status}</Text>
                                  </Col>
                                </Row>
                                <View
                                  style={{
                                    marginLeft: "2%",
                                    width: "100%",
                                    height: 1.5,
                                    borderTopColor: "rgb(243,243,244)",
                                    borderTopWidth: 0.8
                                  }}
                                />
                              </View>
                            )}
                          </View>
                        ))}
                      {this.state.activeHoursAgo
                        .sort((a, b) => a.discoveryTime > b.discoveryTime)
                        .map((x, index) => (
                          <View>
                            {index < 1 ? (
                              <View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    color: "rgb(104, 104, 110)",
                                    paddingLeft: "2%",
                                    paddingBottom: "4%"
                                  }}
                                >
                                  Earlier Today
                                </Text>
                                <Row
                                  style={{ height: 70 }}
                                  key={x.key}
                                  onPress={() => {
                                    this.toDeck(
                                      this.state.numberOfDiscoveredPeople,
                                      x.key
                                    );
                                  }}
                                >
                                  <Col style={{ width: "20%" }}>
                                    <View>
                                      {!x.isActiveWhenDiscovered ? (
                                        <Image
                                          source={{ uri: x.propic }}
                                          style={styles.pic}
                                          blurRadius={10}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            height: 62,
                                            width: 62,
                                            backgroundColor: "#C3C3C3",
                                            borderRadius: 62 / 2,
                                            justifyContent: "center",
                                            marginLeft: 4,
                                            alignItems: "center"
                                          }}
                                        >
                                          <Image
                                            source={{ uri: x.propic }}
                                            style={styles.pic}
                                          />
                                        </View>
                                      )}
                                    </View>
                                  </Col>
                                  <Col style={{ width: "60%" }}>
                                    <View>
                                      <Text style={styles.text1}>{x.name}</Text>
                                    </View>
                                    <Text style={styles.text2}>{x.work}</Text>
                                  </Col>
                                  <Col style={{ width: "20%" }}>
                                    <Text style={styles.text3}>{x.status}</Text>
                                  </Col>
                                </Row>
                                <View
                                  style={{
                                    marginLeft: "2%",
                                    width: "100%",
                                    height: 1.5,
                                    borderTopColor: "rgb(243,243,244)",
                                    borderTopWidth: 0.8
                                  }}
                                />
                              </View>
                            ) : (
                              <View>
                                <Row
                                  style={{ height: 70 }}
                                  key={x.key}
                                  onPress={() => {
                                    this.toDeck(
                                      this.state.numberOfDiscoveredPeople,
                                      x.key
                                    );
                                  }}
                                >
                                  <Col style={{ width: "20%" }}>
                                    <View>
                                      {!x.isActiveWhenDiscovered ? (
                                        <Image
                                          source={{ uri: x.propic }}
                                          style={styles.pic}
                                          blurRadius={10}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            height: 60,
                                            width: 60,
                                            backgroundColor: "rgb(64,64,64)",
                                            borderRadius: 60 / 2,
                                            justifyContent: "center",
                                            marginLeft: 4,
                                            alignItems: "center"
                                          }}
                                        >
                                          <Image
                                            source={{ uri: x.propic }}
                                            style={styles.pic}
                                          />
                                        </View>
                                      )}
                                    </View>
                                  </Col>
                                  <Col style={{ width: "60%" }}>
                                    <View>
                                      <Text style={styles.text1}>{x.name}</Text>
                                    </View>
                                    <Text style={styles.text2}>{x.work}</Text>
                                  </Col>
                                  <Col style={{ width: "20%" }}>
                                    <Text style={styles.text3}>{x.status}</Text>
                                  </Col>
                                </Row>
                                <View
                                  style={{
                                    marginLeft: "2%",
                                    width: "100%",
                                    height: 1.5,
                                    borderTopColor: "rgb(243,243,244)",
                                    borderTopWidth: 0.8
                                  }}
                                />
                              </View>
                            )}
                          </View>
                        ))}
                      {this.state.activeDaysAgo
                        .sort((a, b) => a.discoveryTime > b.discoveryTime)
                        .map((x, index) => (
                          <View>
                            {index < 1 ? (
                              <View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    color: "rgb(104, 104, 110)",
                                    paddingLeft: "2%",
                                    paddingBottom: "4%"
                                  }}
                                >
                                  Days Ago
                                </Text>
                                <Row
                                  style={{ height: 70 }}
                                  key={x.key}
                                  onPress={() => {
                                    this.toDeck(
                                      this.state.numberOfDiscoveredPeople,
                                      x.key
                                    );
                                  }}
                                >
                                  <Col style={{ width: "20%" }}>
                                    <View>
                                      {!x.isActiveWhenDiscovered ? (
                                        <Image
                                          source={{ uri: x.propic }}
                                          style={styles.pic}
                                          blurRadius={10}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            height: 60,
                                            width: 60,
                                            backgroundColor: "rgb(64,64,64)",
                                            borderRadius: 60 / 2,
                                            justifyContent: "center",
                                            marginLeft: 4,
                                            alignItems: "center"
                                          }}
                                        >
                                          <Image
                                            source={{ uri: x.propic }}
                                            style={styles.pic}
                                          />
                                        </View>
                                      )}
                                    </View>
                                  </Col>
                                  <Col style={{ width: "60%" }}>
                                    <View>
                                      <Text style={styles.text1}>{x.name}</Text>
                                    </View>
                                    <Text style={styles.text2}>{x.work}</Text>
                                  </Col>
                                  <Col style={{ width: "20%" }}>
                                    <Text style={styles.text3}>{x.status}</Text>
                                  </Col>
                                </Row>
                                <View
                                  style={{
                                    marginLeft: "2%",
                                    width: "100%",
                                    height: 1.5,
                                    borderTopColor: "rgb(243,243,244)",
                                    borderTopWidth: 0.8
                                  }}
                                />
                              </View>
                            ) : (
                              <View>
                                <Row
                                  style={{ height: 70 }}
                                  key={x.key}
                                  onPress={() => {
                                    this.toDeck(
                                      this.state.numberOfDiscoveredPeople,
                                      x.key
                                    );
                                  }}
                                >
                                  <Col style={{ width: "20%" }}>
                                    <View>
                                      {!x.isActiveWhenDiscovered ? (
                                        <Image
                                          source={{ uri: x.propic }}
                                          style={styles.pic}
                                          blurRadius={10}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            height: 60,
                                            width: 60,
                                            backgroundColor: "rgb(64,64,64)",
                                            borderRadius: 60 / 2,
                                            justifyContent: "center",
                                            marginLeft: 4,
                                            alignItems: "center"
                                          }}
                                        >
                                          <Image
                                            source={{ uri: x.propic }}
                                            style={styles.pic}
                                          />
                                        </View>
                                      )}
                                    </View>
                                  </Col>
                                  <Col style={{ width: "60%" }}>
                                    <View>
                                      <Text style={styles.text1}>{x.name}</Text>
                                    </View>
                                    <Text style={styles.text2}>{x.work}</Text>
                                  </Col>
                                  <Col style={{ width: "20%" }}>
                                    <Text style={styles.text3}>{x.status}</Text>
                                  </Col>
                                </Row>
                                <View
                                  style={{
                                    marginLeft: "2%",
                                    width: "100%",
                                    height: 1.5,
                                    borderTopColor: "rgb(243,243,244)",
                                    borderTopWidth: 0.8
                                  }}
                                />
                              </View>
                            )}
                          </View>
                        ))}
                    </Grid>
                  </ScrollView>
                </View>
              ) : (
                <View>
                  <View style={styles.pic22}>
                    <Image
                      source={require("../Images/enableLocation.png")}
                      style={{ height: 92.5, width: 92.5 }}
                    />
                  </View>
                  <Text style={styles.text22}>Oh no! I can't access</Text>
                  <Text style={styles.text223}>your location</Text>
                  <Text style={styles.text32}>
                    Circle needs to know your location to
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      BackgroundGeolocation.showAppSettings();
                    }}
                  >
                    <Text style={styles.text42}>
                      Click here to enable location service.
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ParallaxScrollView>
          </View>
        </View>
        <View style={styles.slide3}>
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
                    height: 150,
                    backgroundColor: this.state.appColor
                  }}
                >
                  <Text style={styles.circleText}>My Circle</Text>
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
              </View>
            )}
            renderStickyHeader={() => (
              <View
                key="sticky-header"
                style={{
                  backgroundColor: this.state.appColor,
                  height: STICKY_HEADER_HEIGHT,
                  justifyContent: "flex-end"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    marginBottom: 10
                  }}
                >
                  My Circle
                </Text>
              </View>
            )}
          >
            {this.state.connection.map(x => (
              <Row
                style={{
                  height: 70,
                  marginTop: 10,
                  marginLeft: 5,
                  marginRight: 5
                }}
                key={x.key}
                onPress={() => {
                  this.toDeck(this.state.numberOfDiscoveredPeople, x.key);
                }}
              >
                <Col style={{ width: "20%" }}>
                  <View>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 60 / 2,
                        marginLeft: 10
                      }}
                    >
                      <Image source={{ uri: x.propic }} style={styles.pic} />
                    </View>
                  </View>
                </Col>
                <Col style={{ width: "60%", marginTop: 10 }}>
                  <View>
                    <Text style={styles.text1}>{x.name}</Text>
                  </View>
                </Col>
                <Col style={{ width: "20%" }} />
              </Row>
            ))}
          </ParallaxScrollView>
        </View>
      </Swiper>
    );
  }
}
