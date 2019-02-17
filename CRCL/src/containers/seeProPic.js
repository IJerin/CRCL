import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Image, AsyncStorage } from "react-native";
import firebase from "firebase";
import CloseIcon from "../Images/close.png";

export default class seeProPic extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      pic: this.props.navigation.state.params.pic,
      appColor: "rgb(35,169,187)"
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("userToken").then(token => {
      this.setState({
        userToken: token
      });
      this.appColor();
    });
  }
  appColor = () => {
    const notiRef = firebase
      .database()
      .ref(`users/${this.state.userToken}/appColor`);
    notiRef.once("value", snap => {
      if (snap.val() === null) {
        this.setState({
          appColor: "rgb(35,169,187)"
        });
      } else {
        this.setState({
          appColor: snap.val()
        });
      }
    });
  };
  toDiscover = () => {
    this.props.navigation.navigate("Discover");
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.appColor,
          height: "100%",
          width: "100%"
        }}
      >
        <TouchableOpacity onPress={this.handleBack}>
          <Image
            style={{ height: 25, width: 25, marginTop: "8%", marginLeft: "8%" }}
            source={CloseIcon}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center", paddingTop: "25%" }}>
          <Image
            style={{ height: 320, width: 320, borderRadius: 320 / 2 }}
            source={{ uri: this.state.pic }}
          />
        </View>
      </View>
    );
  }
}
