/* eslint-disable no-alert, no-console*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import firebase from "firebase";

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    backgroundColor: "white",
    flex: 1
  },
  barContainer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "rgb(1,173,194)"
  },
  backButton: {
    width: "10%",
    flexDirection: "row-reverse",
    alignItems: "center"
  },
  barTitle: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "AvenirNext-regular",
    fontSize: 22,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)"
  }
});
export default class Discover1 extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      ifStatus: this.props.navigation.state.params.ifStatus,
      image: this.props.navigation.state.params.image,
      item: this.props.navigation.state.params.item,
      uid: this.props.navigation.state.params.userToken,
      userToken: this.props.navigation.state.params.userToken,
      text: "",
      user: this.props.navigation.state.params.user,
      appColor: this.props.navigation.state.params.appColor
    };
  }
  onBlur() {
    this.setState({
      borderColor: "gray"
    });
  }
  changeTextInputValue(text) {
    this.setState({
      text
    });
  }
  sendText() {
    if (this.state.item === "Status") {
      firebase
        .database()
        .ref(`users/${this.state.uid}/`)
        .update({
          userProfileStatus: this.state.text
        })
        .then(() => {
          firebase
            .database()
            .ref(`users/${this.state.userToken}`)
            .once("value", snapshot => {
              this.setState({
                user: snapshot.val()
              });
              AsyncStorage.setItem("user", JSON.stringify(snapshot.val()));
            });
        });
    }
    if (this.state.item === "myJobPostion") {
      firebase
        .database()
        .ref(`users/${this.state.uid}/`)
        .update({
          positionInJob: this.state.text
        })
        .then(() => {
          firebase
            .database()
            .ref(`users/${this.state.userToken}`)
            .once("value", snapshot => {
              this.setState({
                user: snapshot.val()
              });
              AsyncStorage.setItem("user", JSON.stringify(snapshot.val()));
            });
        });
    }
    if (this.state.item === "myCompany") {
      firebase
        .database()
        .ref(`users/${this.state.uid}/`)
        .update({
          companyName: this.state.text
        })
        .then(() => {
          firebase
            .database()
            .ref(`users/${this.state.userToken}`)
            .once("value", snapshot => {
              this.setState({
                user: snapshot.val()
              });
              AsyncStorage.setItem("user", JSON.stringify(snapshot.val()));
            });
        });
    }
    if (this.state.item === "whereIlive") {
      firebase
        .database()
        .ref(`users/${this.state.uid}/`)
        .update({
          hometown: this.state.text
        })
        .then(() => {
          firebase
            .database()
            .ref(`users/${this.state.userToken}`)
            .once("value", snapshot => {
              this.setState({
                user: snapshot.val()
              });
              AsyncStorage.setItem("user", JSON.stringify(snapshot.val()));
            });
        });
    }
    if (this.state.item === "myLanguage") {
      firebase
        .database()
        .ref(`users/${this.state.uid}/`)
        .update({
          language: this.state.text
        })
        .then(() => {
          firebase
            .database()
            .ref(`users/${this.state.userToken}`)
            .once("value", snapshot => {
              this.setState({
                user: snapshot.val()
              });
              AsyncStorage.setItem("user", JSON.stringify(snapshot.val()));
            });
        });
    }
    this.textInput.clear();
  }

  toDiscover1 = () => {
    this.props.navigation.navigate("Discover1", {
      user: this.state.user,
      userToken: this.state.uid
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            height: 60,
            backgroundColor: this.state.appColor
          }}
        >
          <View style={styles.backButton}>
            <TouchableOpacity onPress={this.toDiscover1}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("../Images/close.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.barTitle}>
            {this.state.ifStatus ? (
              <Text style={styles.title}> Post</Text>
            ) : (
              <Text style={styles.title}> Add</Text>
            )}
          </View>
          <View style={{ width: "10%" }} />
        </View>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 15 }}>
          <View style={{ width: "10%", paddingTop: 3 }}>
            {this.state.ifStatus ? (
              <Image
                style={{ height: 40, width: 40, borderRadius: 20 }}
                source={{ uri: this.state.image }}
              />
            ) : (
              <Image
                style={{ height: 40, width: 40 }}
                source={this.state.image}
              />
            )}
          </View>
          <View style={{ width: "70%", paddingLeft: 10 }}>
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              maxLength={35}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              onChangeText={text => this.changeTextInputValue(text)}
              returnKeyType="done"
              onBlur={() => this.onBlur()}
              placeholder="Tap here to Add"
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.sendText()}>
              {this.state.ifStatus ? (
                <Text style={{ paddingTop: 10 }}>Post</Text>
              ) : (
                <Text style={{ paddingTop: 10 }}>Add</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
