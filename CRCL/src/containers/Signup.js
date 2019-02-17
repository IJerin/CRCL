import React, { Component } from "react";
import PropTypes from "prop-types";
import OneSignal from "react-native-onesignal";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Swiper from "react-native-swiper";
import firebase from "firebase";
import Modal from "react-native-modal";
import FirebaseApp from "../config/FirebaseConfig";
import FBSDK, {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest
} from "react-native-fbsdk";

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    backgroundColor: "#1bacc0",
    height: "100%",
    width: "100%"
  },
  circle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%"
  },
  circleImage: {
    height: 200,
    width: 202
  },
  phone: {
    alignItems: "center",
    marginTop: "-40%"
  },
  phone2: {
    alignItems: "center",
    marginTop: "10%"
  },
  inphone: {
    alignItems: "center",
    marginTop: -500
  },

  inphone2: {
    alignItems: "center",
    marginTop: 46,
  },
  slide2: {
    flex: 1,
    backgroundColor: "#1bacc0"
  },
  slide3: {
    flex: 1,
    backgroundColor: "#1bacc0",
  },
  text1: {
    fontFamily: "AvenirNext-UltraLight",
    fontSize: 40,
    textAlign: "center",
    color: "white",
    paddingTop: 0
  },
  circleText: {
    flex: 1,
    marginTop: "10%"
  },
  text2: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 35,
    textAlign: "center",
    color: "white",
    paddingTop: 38.5
  },
  text3: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 30.5,
    textAlign: "center",
    color: "white"
  },
  discoverText: {
    flex: 1,
    marginTop: "15%"
  },
  text4: {
    fontFamily: "Avenir-Book",
    fontSize: 10.6,
    color: "rgba(255, 255, 255, 0.5)",
    paddingTop: "105%",
    textAlign: "center"
  },
  text5: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 30.5,
    textAlign: "center",
    color: "white"
  },
  text6: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 30.5,
    textAlign: "center",
    color: "white"
  },
  text7: {
    fontFamily: "Avenir-Book",
    fontSize: 11.5,
    color: "rgba(255, 255, 255, 0.5)"
  },
  text8: {
    fontFamily: "Avenir-Book",
    fontSize: 11.5,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.5)",

    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
    borderRadius: 22,
    height: 15,
    width: 15,
    paddingLeft: 2.7,
    marginRight: 5
  },
  button: {
    alignItems: "center"
  },
  phoneImage: {
    height: 580,
    width: 320
  },
  dashboard1: {
    marginLeft: ".5%",
    height: 500,
    width: 286
  },
  phoneImage2: {
    position: "absolute",
    height: 320,
    width: 190
  },
  d2: {
    height: 266,
    width: 159
  },
  submitButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: "8%",
    paddingTop: 17,
    paddingBottom: 17,
    backgroundColor: "rgb(35,169,187)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  submitText: {
    color: "#fff",
    textAlign: "center"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 30
  },
  modalItemsContainer: {
    alignItems: "center"
  },
  acceptCapText: {
    fontFamily: "AvenirNext-Regular",
    fontWeight: "600",
    fontSize: 16,
    color: "black",
    paddingTop: 20
  },
  modalText: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 17,
    color: "rgba(0,0,0,.8)",

  },
  modalTextTouch: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 17,
    color: "rgba(0,0,0,.8)",
    textDecorationLine: "underline"
  },
  modalTextBorder: {
    padding: 10,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    alignItems: "center",
    flexDirection: "column",
    overflow: 'hidden'
  },
  modalButtonCancel: {
    fontFamily: "AvenirNext-Regular",
    fontWeight: "500",
    fontSize: 16,
    color: "rgba(0,0,0,.5)",
    textAlign: "center",
    padding: 20
  },
  modalButtonAgree: {
    fontFamily: "AvenirNext-Regular",
    fontWeight: "500",
    fontSize: 16,
    color: "rgb(40,20,140)",
    textAlign: "center",
    padding: 20
  },
  buttonBorder: {
    flexDirection: "row",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,.2)"
  },
  middleButtonBorder: {
    height: "100%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)"
  }
});
export default class Signup extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      bottomDot: "5%",
      userToken: null,
      userData: null,
      loading: false,
      device: {},
      appColor: "#1bacc0",
      buttonClicked: false,
      termsAndConditionModal: false
    };
  }

  componentWillMount = () => {
    //AsyncStorage.clear()
    OneSignal.addEventListener("ids", this.onIds);
    //AsyncStorage.clear()
    AsyncStorage.getItem("user").then(user => {
      AsyncStorage.getItem("userToken").then(userToken => {
        if (user !== null && userToken !== null) {
          this.props.navigation.navigate("Discover1", {
            user: JSON.parse(user),
            userToken: JSON.parse(userToken)
          });
        }
      });
    });
  };

  componentWillUnmount() {
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onIds = device => {
    this.setState({
      device
    });
  };
  //Create response callback.
  responseInfoCallback = (error, result) => {
    console.log(result);
    if (error) {
      alert(JSON.stringify(error));
    } else {
      let position;
      let company;
      let at;
      let education;
      if (result.work === undefined) {
        result.work = "none";
        position = "Currently";
        at = "not";
        company = "Working";
      } else {
        //result.work = `${result.work[0].position.name} at ${result.work[0].employer.name}`;
        position = `${result.work[0].position.name}`;
        company = `${result.work[0].employer.name}`;
      }
      if (result.email === undefined) {
        result.email = "none";
      }
      if (result.friends === undefined) {
        result.friends = "none";
      }
      if (result.location === undefined) {
        result.location = "none";
      } else {
        result.location = result.location.name;
      }
      if (result.languages === undefined) {
        result.languages = "none";
      }
      if (result.hometown === undefined) {
        result.hometown = "none";
      } else {
        result.hometown = result.hometown.name;
      }
      if (result.education === undefined) {
        result.education = "none";
        education = "none";
      } else {
        education = result.education[0].school.name;
      }
      if (result.gender === undefined) {
        result.gender = "none";
      }
      if (result.relationship_status === undefined) {
        result.relationship_status = "none";
      }
      this.state.userData = {
        name: result.name,
        work: `${position} ${at} ${company}`,
        work_history: result.work,
        email: result.email,
        propic: `http://graph.facebook.com/${
          result.id
        }/picture?type=large&height=320&width=420`,
        location: result.location,
        language: result.languages,
        gender: result.gender,
        hometown: result.hometown,
        education_history: result.education,
        lastUpdate: new Date().getTime(),
        active: "true",
        ChattingWith: "none",
        FBfriends: result.friends,
        fullName: true,
        jobTitle: true,
        company: true,
        livesIn: true,
        showLanguage: true,
        education,
        companyName: company,
        positionInJob: position,
        relationship_status: result.relationship_status,
        position: {
          latitude: " ",
          longitude: " "
        }
      };
      const query = firebase.database().ref("users");
      let userFound = false;
      let deviceFound = false;
      query
        .once("value", snapshot => {
          snapshot.forEach(firebaseUserData => {
            if (firebaseUserData.key === this.state.userToken) {
              userFound = true;
              this.setState({
                userData: firebaseUserData.val()
              });
            }
          });
        })
        .then(() => {
          if (userFound) {
            //userFound updating DB instance
            //alert(JSON.stringify(this.state.userData ))
            this.props.navigation.navigate("Discover1", {
              user: this.state.userData,
              userToken: this.state.userToken
            });
            //alert(JSON.stringify(this.state.userData))
            firebase
              .database()
              .ref(`users/${this.state.userToken}/devices`)
              .once("value", devices => {
                devices.forEach(device => {
                  if (device.val().userId === this.state.device.userId) {
                    deviceFound = true;
                  }
                });
              })
              .then(() => {
                if (!deviceFound) {
                  firebase
                    .database()
                    .ref(`users/${this.state.userToken}/devices`)
                    .push(this.state.device);
                }
              });
            AsyncStorage.setItem("user", JSON.stringify(this.state.userData));
          } else {
            //user not found, creating DB instance

            //alert(this.state.userData)
            AsyncStorage.setItem("user", JSON.stringify(this.state.userData));
            firebase
              .database()
              .ref(`users/${this.state.userToken}`)
              .set(this.state.userData)
              .catch(FirebaseError => {
                console.log(FirebaseError);
                alert("Error communicating with backend");
              });
            firebase
              .database()
              .ref(`users/${this.state.userToken}/devices`)
              .push(this.state.device)
              .then(() => {
                firebase
                  .database()
                  .ref(`users/${this.state.userToken}`)
                  .update({ appColor: this.state.appColor })
                  .then(() => {
                    firebase
                      .database()
                      .ref(`users/${this.state.userToken}`)
                      .once("value", snapshot => {
                        this.props.navigation.navigate("Discover1", {
                          user: snapshot.val(),
                          userToken: this.state.userToken
                        });
                      });
                  });
              });
          }
        })
        .catch(() => {
          //alert('Cannot Communicate with Firebase')
        });
      //    firebase.database().ref(`users/${this.state.userToken}`).set(userData)
    }
  };

  toToC = () => {
    this.setState({
      termsAndConditionModal: false
    });
    this.props.navigation.navigate("ToC");
  };

  toPrivacy = () => {
    this.setState({
      termsAndConditionModal: false
    });
    this.props.navigation.navigate("Privacy");
  };

  toWelcome = () => {
    this.setState({
      termsAndConditionModal: false,
      buttonClicked: true
    });
    LoginManager.logInWithReadPermissions([
      "public_profile",
      "user_friends",
      "email",
      "user_hometown",
      "user_likes",
      "user_location",
      "user_tagged_places"
    ])
      .then(result => {
        if (result.isCancelled) {
          this.setState({
            buttonClicked: false
          });
        } else {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              const credential = firebase.auth.FacebookAuthProvider.credential(
                data.accessToken
              );
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(user => {
                  if (user.uid) {
                    // Create a graph request asking for user information with a
                    // callback to handle the response.
                    AsyncStorage.setItem(
                      "userToken",
                      JSON.stringify(user.uid)
                    ).then(() => {
                      this.setState({
                        userToken: user.uid
                      });
                    });
                    const infoRequest = new GraphRequest(
                      "/me",
                      {
                        accessToken: data.accessToken,
                        parameters: {
                          fields: {
                            string:
                              "email,name,picture.type(large),id,education,friends,work,relationship_status,birthday,hometown,gender,location"
                          }
                        }
                      },
                      this.responseInfoCallback
                    );

                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                    //this.props.navigation.navigate('Welcome');
                  }
                })
                .catch(err => {
                  alert(JSON.stringify(err));
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  termsAndConditionModal = () =>
    this.setState({ termsAndConditionModal: true });

  dotTop = index => {
    if (index !== 0) {
      this.setState({
        bottomDot: "95%"
      });
    }
    if (index === 0) {
      this.setState({
        bottomDot: "5%"
      });
    }
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        onMomentumScrollEnd={(e, state) => this.dotTop(state.index)}
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
          flex: 1,
          bottom: this.state.bottomDot,
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <View style={styles.slide1}>
          <Text style={styles.text2}>Discover people</Text>
          <View style={styles.circle}>
            <Image
              style={styles.circleImage}
              source={require("../Images/circle2.png")}
            />
          </View>
          <View style={styles.circleText}>
            <Text style={styles.text1}>CIRCLE</Text>
          </View>
        </View>
        <View style={styles.slide2}>
          <View style={styles.discoverText}>
            <Text style={styles.text3}>Discover who has been around you</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.phone}>
              <Image
                style={styles.phoneImage}
                source={require("../Images/phone.png")}
              />
            </View>
            <View style={styles.inphone}>
              <Image
                style={styles.dashboard1}
                source={require("../Images/D1.png")}
              />
            </View>
          </View>
        </View>
        <View style={styles.slide3}>
          <View style={{ marginTop: "15%" }}>
            <Text style={styles.text5}>Connect, chat and grow</Text>
            <Text style={styles.text6}>your network</Text>
          </View>
          <View>
            <View style={styles.phone2}>
              <Image
                style={styles.phoneImage2}
                source={require("../Images/phone2.png")}
              />
            </View>
            <View style={styles.inphone2}>
              <Image style={styles.d2} source={require("../Images/D2.png")} />
            </View>
          </View>

          <View style={{ alignItems: "center", padding: 10 }}>
            <Text
              style={{
                fontFamily: "Avenir-Heavy",
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              By registering, you agree to our <Text
                onPress={this.toToC}
                style={{
                 fontWeight: "bold",
                 textDecorationLine: "underline"
               }}
              >Terms of Service
              </Text>
              <Text> and our </Text>
              <Text
                onPress={this.toPrivacy}
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  color: "rgba(255, 255, 255, 0.5)"
                }}
              >Privacy Policy
              </Text>
            </Text>

          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.termsAndConditionModal}
              underlayColor="#fff"
              disabled={this.state.buttonClicked}
            >
              <Text style={styles.submitText}>Connect With Facebook</Text>
            </TouchableOpacity>
            <Modal
              isVisible={this.state.termsAndConditionModal}
              style={{ height: 400 }}
            >
              <View style={styles.modalView}>
                <View style={styles.modalItemsContainer}>
                  <Image
                    style={{
                      height: 80,
                      width: 80
                    }}
                    source={require("../Images/accept.png")}
                  />
                  <Text style={styles.acceptCapText}> ACCEPT TERMS </Text>
                  <View style={styles.modalTextBorder}>
                    <Text style={styles.modalText}>
                      By creating an account, you agree to the Circle <Text onPress={this.toToC} style={styles.modalTextTouch}>
                        Terms of Service
                      </Text>
                      <Text> and </Text>
                      <Text
                        onPress={this.toPrivacy}
                        style={styles.modalTextTouch}
                      > Privacy Policy
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonBorder}>
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                        termsAndConditionModal: false
                      })
                      }
                    >
                      <Text style={styles.modalButtonCancel}> CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                <View style={styles.middleButtonBorder} ></View>
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <TouchableOpacity onPress={this.toWelcome}>
                      <Text style={styles.modalButtonAgree}>I AGREE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            <View>
              <Image
                style={{
                  height: 16,
                  width: 16,
                }}
                source={require("../Images/i.png")}
              />
            </View>
            <View>
              <Text style={styles.text7}> We will never post anything on Facebook </Text>
            </View>
          </View>
        </View>
      </Swiper>
    );
  }
}
