import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StatusBar
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import firebase from "firebase";
//import PushNotification from "react-native-push-notification";
//import { RNCamera } from "react-native-camera";
//import OneSignal from "react-native-onesignal";
import axios from "axios";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import ImagePicker from "react-native-image-picker";
import {
  KeyboardAwareListView,
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";
import UploadImage from "../components/uploadImage";

const options = {
  title: "Select Image",
  quality: 0.5,
  maxHeight: 720,
  maxWidth: 1280
};

class Messages extends Component {
  constructor(props) {
    super(props);
    const mySelf = {
      key: this.props.navigation.state.params.userToken,
      name: this.props.navigation.state.params.user.name,
      image: this.props.navigation.state.params.user.propic
    };
    const yourSelf = {
      key: this.props.navigation.state.params.uID,
      name: this.props.navigation.state.params.user.discovered[
        this.props.navigation.state.params.uID
      ].name,
      image: this.props.navigation.state.params.user.discovered[
        this.props.navigation.state.params.uID
      ].propic
    };
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      meNotSendingMassage: false,
      newMessage: "",
      listOfMessage: [],
      messageKey: null,
      myself: mySelf,
      borderColor: "gray",
      youUid: this.props.navigation.state.params.uID,
      yourself: yourSelf,
      messageRef: "",
      backgroundMessage: "",
      needToPush: false,
      loading: true,
      unlockSend: false,
      userToken: this.props.navigation.state.params.userToken,
      user: this.props.navigation.state.params.user,
      appColor: this.props.navigation.state.params.user.discovered[
        this.props.navigation.state.params.uID
      ].appColor,
      imageSource: ""
    };
  }
  componentDidMount() {
    //alert(JSON.stringify(this.state.yourself))
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    firebase
      .database()
      .ref(`users/${this.state.userToken}`)
      .update({
        ChattingWith: this.state.yourself.key
      });
    this.checkIfThreadExists();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  _keyboardDidShow = e => {
    this.refs.ListView.scrollToEnd();
  };

  checkIfThreadExists() {
    const initialDataLoaded = false;
    let threadFound = false;
    firebase
      .database()
      .ref("messages")
      .once("value", snapshot => {
        snapshot.forEach(data => {
          if (
            (data.val().key1 === this.state.myself.key &&
              data.val().key2 === this.state.yourself.key) ||
            (data.val().key1 === this.state.yourself.key &&
              data.val().key2 === this.state.myself.key)
          ) {
            threadFound = true;
            this.setState({
              messageRef: data.key
            });
            const ref = firebase
              .database()
              .ref(`users/${this.state.myself.key}/notification`);
            ref.once("value", snap => {
              snap.forEach(value => {
                if (value.key === this.state.yourself.key) {
                  firebase
                    .database()
                    .ref(`users/${this.state.myself.key}/notification`)
                    .child(value.key)
                    .remove();
                }
              });
            });
            this.recieveMessages();
          }
        });

        if (!threadFound) {
          //  alert('not found')
          firebase
            .database()
            .ref("messages")
            .push({
              key1: this.state.myself.key,
              key2: this.state.yourself.key
            })
            .then(snap => {
              this.setState({
                messageRef: snap.key
              });
              this.recieveMessages();
            });
        }
      });
    this.setState({
      loading: false
    });
  }
  recieveMessages = () => {
    let uid;
    const items = [];
    firebase
      .database()
      .ref(`messages/${this.state.messageRef}/messages/`)
      .on("child_added", child => {
        uid = child.val().key;
        items.push({
          text: child.val().text,
          key: child.val().key,
          image: child.val().image,
          hour: child.val().hour,
          minute: child.val().minute,
          picture: child.val().picture,
          url: child.val().url
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          listOfMessage: this.state.listOfMessage.concat(child.val())
        });
        this.checkIfRestricted(uid, false);
      });
  };
  handlePush = message => {
    const pushableDevices = [];
    const messageContent = {
      en: `${this.state.yourself.name}: ${message}`
    };
    firebase
      .database()
      .ref(`users/${this.state.yourself.key}/devices`)
      .once("value", devices => {
        devices.forEach(device => {
          pushableDevices.push(device.val().userId);
        });
      })
      .then(() => {
        const ONESIGNAL_URI = "https://onesignal.com/api/v1/notifications";
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

    firebase
      .database()
      .ref(
        `users/${this.state.yourself.key}/notification/${
          this.state.myself.key
        }/`
      )
      .set({
        messages: this.state.newMessage,
        name: this.state.myself.name,
        image: this.state.myself.image,
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
      });
  };
  checkIfRestricted = (uid, fromSendMessages) => {
    let flag = false;
    const ref = firebase
      .database()
      .ref(`users/${this.state.myself.key}/connections`);
    ref.once("value", snapshot => {
      snapshot.forEach(data => {
        if (data.key === this.state.yourself.key) {
          if (data.val().status === "Connected") {
            flag = true;
            this.setState({
              meNotSendingMassage: false
            });
          }
        }
      });
    });
    if (!flag) {
      if (
        (this.state.listOfMessage.length === 0 && fromSendMessages) ||
        (this.state.listOfMessage.length === 1 &&
          uid === this.state.myself.key &&
          !fromSendMessages)
      ) {
        //alert('yes')
        this.setState({
          meNotSendingMassage: true
        });
        //alert(this.state.meNotSendingMassage)
      } else {
        if (this.state.listOfMessage.length === 2) {
          firebase
            .database()
            .ref(
              `users/${this.state.myself.key}/connections/${
                this.state.yourself.key
              }/`
            )
            .update({
              status: "Connected"
            });
          firebase
            .database()
            .ref(
              `users/${this.state.yourself.key}/connections/${
                this.state.myself.key
              }/`
            )
            .update({
              status: "Connected"
            });
        }
        this.setState({
          meNotSendingMassage: false
        });
      }
    }
  };

  sendImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        UploadImage(response.uri, JSON.stringify(new Date().getTime()))
          .then(url => {
            firebase
              .database()
              .ref(`messages/${this.state.messageRef}/messages`)
              .push({
                key: this.state.myself.key,
                text: this.state.newMessage,
                name: this.state.myself.name,
                image: this.state.myself.image,
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                picture: true,
                url
              });
            const q = firebase
              .database()
              .ref(`users/${this.state.yourself.key}/`);
            q.once("value", snap => {
              if (snap.val().ChattingWith !== this.state.myself.key) {
                firebase
                  .database()
                  .ref(
                    `users/${this.state.yourself.key}/notification/${
                      this.state.myself.key
                    }`
                  )
                  .set({
                    messages: this.state.newMessage,
                    name: this.state.myself.name,
                    image: this.state.myself.image,
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes()
                  });
              }
            });
            this.handlePush(this.state.newMessage);
            this.checkIfRestricted(this.state.myself.key, true);
            this.textInput.clear();
            this.setState({
              unlockSend: false
            });
          })
          .catch(error => console.log(error));
      }
    });
  };

  sendText = () => {
    if (this.state.unlockSend) {
      firebase
        .database()
        .ref(`messages/${this.state.messageRef}/messages`)
        .push({
          key: this.state.myself.key,
          text: this.state.newMessage,
          name: this.state.myself.name,
          image: this.state.myself.image,
          hour: new Date().getHours(),
          minute: new Date().getMinutes(),
          picture: false,
          url: "none"
        });
      const q = firebase.database().ref(`users/${this.state.yourself.key}/`);
      q.once("value", snap => {
        if (snap.val().ChattingWith !== this.state.myself.key) {
          firebase
            .database()
            .ref(
              `users/${this.state.yourself.key}/notification/${
                this.state.myself.key
              }`
            )
            .set({
              messages: this.state.newMessage,
              name: this.state.myself.name,
              image: this.state.myself.image,
              hour: new Date().getHours(),
              minute: new Date().getMinutes()
            });
        }
      });
      this.handlePush(this.state.newMessage);
      this.checkIfRestricted(this.state.myself.key, true);
      this.textInput.clear();
      this.setState({
        unlockSend: false
      });
    }
  };

  handleBack = () => {
    firebase
      .database()
      .ref(`users/${this.state.myself.key}`)
      .update({
        ChattingWith: "none"
      });
    this.props.navigation.goBack();
  };
  toSeeMessages = () => {
    this.props.navigation.navigate("SeeMessages");
  };

  _changeTextInputValue(newMessage) {
    this.setState({
      newMessage,
      unlockSend: true
    });
  }

  seeFullImage(pic) {
    this.props.navigation.navigate("seeChatImg", {
      pic
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar
          backgroundColor={this.state.appColor}
          barStyle="light-content"
        />
        <KeyboardAwareListView
          ref="ListView"
          enableResetScrollToCoords={false}
          initialListSize={100}
          style={{
            flex: 1,
            backgroundColor: "rgb(28,173,193)"
          }}
          dataSource={this.state.dataSource}
          renderRow={chat => (
            <View>
              {this.state.meNotSendingMassage ? (
          <View syle={{ flex: 1 }}>
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                marginLeft: "40%",
                marginBottom: "5%"
              }}
              source={{ uri: this.state.yourself.image }}
            />
            <Text
              style={{
                fontFamily: "AvenirNext-Regular",
                fontSize: 20,
                textAlign: "center",
                marginBottom: "38%",
                marginLeft: "10%",
                marginRight: "10%"
              }}
            >
              Waiting for {this.state.yourself.name} to respond
            </Text>
          </View>
        ) : (
          <View key={chat} style={styles.row}>
            <View>
              {this.state.myself.key === chat.key ? (
                <View style={{ flexDirection: "row-reverse" }}>
                  <View>
                    <Image
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        marginTop: 5,
                        marginLeft: 4,
                        marginRight: 3
                      }}
                      source={{ uri: chat.image }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      maxWidth: "100%",
                      backgroundColor: this.state.appColor,
                      borderRadius: 10,
                      padding: "1%",
                      paddingLeft: "2%",
                      paddingRight: "2%",
                      margin: 5
                    }}
                  >
                    {!chat.picture ? (
                      <View>
                        <Text
                          style={{
                            fontFamily: "DejaVuSans",
                            fontSize: 16,
                            color: "white"
                          }}
                        >
                          {chat.text}
                        </Text>
                      </View>
                    ) : (
                      <View />
                    )}
                    {chat.picture ? (
                      <View style={{ paddingTop: "3%" }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.seeFullImage(chat.url);
                          }}
                        >
                          <Image
                            style={{ width: 150, height: 150 }}
                            source={{ uri: chat.url }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View />
                    )}

                    <View style={{ paddingTop: "2%" }}>
                      <Text style={{ fontSize: 10 }}>
                        {chat.hour}:{chat.minute}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: "row", marginTop: "2%" }}>
                  <View>
                    <Image
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        marginTop: 5,
                        marginLeft: 4,
                        marginRight: 3
                      }}
                      source={{ uri: chat.image }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      maxWidth: "100%",
                      backgroundColor: this.state.appColor,
                      borderRadius: 10,
                      padding: "1%",
                      paddingLeft: "2%",
                      paddingRight: "2%",
                      margin: 5
                    }}
                  >
                    {!chat.picture ? (
                      <View>
                        <Text
                          style={{
                            fontFamily: "DejaVuSans",
                            fontSize: 16,
                            color: "white"
                          }}
                        >
                          {chat.text}
                        </Text>
                      </View>
                    ) : (
                      <View />
                    )}
                    {chat.picture ? (
                      <View style={{ paddingTop: "3%" }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.seeFullImage(chat.url);
                          }}
                        >
                          <Image
                            style={{ width: 150, height: 150 }}
                            source={{ uri: chat.url }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View />
                    )}
                    <View style={{ paddingTop: "2%" }}>
                      <Text style={{ fontSize: 10 }}>
                        {chat.hour}:{chat.minute}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
            </View>
            
          )}
          onContentSizeChange={() => {
            this.refs.ListView.scrollToEnd();
          }}
          renderScrollComponent={props => (
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
                      position: "absolute",
                      top: 0,
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
                      height: 220,
                      backgroundColor: this.state.appColor
                    }}
                  >
                    <Grid style={{ marginTop: "5%", height: 10 }}>
                      <Row style={{ height: 60 }}>
                        <Col style={{ width: "38%", marginLeft: 10 }}>
                          <TouchableOpacity onPress={this.handleBack}>
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={require("../Images/Back_white.png")}
                            />
                          </TouchableOpacity>
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
                        <Text style={styles.text1}>
                          {this.state.yourself.name}
                        </Text>
                      </Row>
                      <Row style={{ justifyContent: "center" }}>
                        <Image
                          style={{
                            height: 45,
                            width: 45,
                            borderRadius: 22.5
                          }}
                          source={{ uri: this.state.yourself.propic }}
                        />
                      </Row>
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
                  <Grid style={{ marginTop: "5%", height: 10 }}>
                    <Row style={{ height: 60 }}>
                      <Col style={{ width: "10%", marginLeft: 10 }}>
                        <TouchableOpacity onPress={this.handleBack}>
                          <Image
                            style={{ height: 30, width: 30 }}
                            source={require("../Images/Back_white.png")}
                          />
                        </TouchableOpacity>
                      </Col>
                      <Col>
                        <Text style={styles.stickySectionText}>
                          {this.state.yourself.name}
                        </Text>
                      </Col>
                    </Row>
                  </Grid>
                </View>
              )}
            />
          )}
        />
        {this.state.meNotSendingMassage ? null : (
          [
            Platform.OS === "ios" ? (
              <KeyboardAvoidingView behavior="padding">
                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => this.sendImage()}>
                    <View style={{ paddingRight: 10 }}>
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../Images/camera.png")}
                      />
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    ref={input => {
                      this.textInput = input;
                    }}
                    autoCorrect
                    multiline
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this._changeTextInputValue(text)}
                    returnKeyType="done"
                    placeholder="Type something nice"
                  />
                  <TouchableOpacity onPress={() => this.sendText()}>
                    <Text style={styles.send}>Send</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            ) : (
              <KeyboardAvoidingView behavior="height">
                <View style={styles.footer}>
                  <TouchableOpacity onPress={() => this.sendImage()}>
                    <View style={{ paddingRight: 10 }}>
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../Images/camera.png")}
                      />
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    ref={input => {
                      this.textInput = input;
                    }}
                    autoCorrect={false}
                    multiline
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this._changeTextInputValue(text)}
                    returnKeyType="done"
                    placeholder="Type something nice"
                  />
                  <TouchableOpacity onPress={() => this.sendText()}>
                    <Text style={styles.send}>Send</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            )
          ]
        )}
      </View>
    );
  }
}

const window = Dimensions.get("window");

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 50;
const PARALLAX_HEADER_HEIGHT = 280;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(28,173,193)"
  },
  background: {
    backgroundColor: "rgb(28,173,193)",
    position: "absolute",
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    backgroundColor: "rgb(28,173,193)",
    height: STICKY_HEADER_HEIGHT,
    justifyContent: "flex-end"
  },
  stickySectionText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginRight: "15%"
  },
  parallaxHeader: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    paddingTop: 0
  },
  rowText: {
    fontSize: 20
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
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10
  },
  input: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18
  },
  send: {
    alignSelf: "center",
    color: "lightseagreen",
    fontSize: 16,
    fontWeight: "bold",
    padding: 20
  }
});

export default Messages;
