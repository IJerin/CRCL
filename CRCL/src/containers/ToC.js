import React, { Component } from "react";
import PropTypes from "prop-types";
import { WebView } from "react-native";

export default class ToC extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  toDiscover = () => {
    this.props.navigation.navigate("Discover");
  };

  render() {
    return (
      <WebView
        source={{ uri: "https://www.getcircle.app/terms" }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
