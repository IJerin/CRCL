import React, { Component } from "react";
import PropTypes from "prop-types";
import { BackHandler } from "react-native";
import SplashScreen from "react-native-splash-screen";
import OneSignal from "react-native-onesignal";
import {
  NavigationActions,
  addNavigationHelpers
} from "react-navigation/src/react-navigation";
import { connect } from "react-redux";
import AppNavigator from "../navigator";
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";

class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
  };

  componentWillMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.LOW_ACCURACY,
      stationaryRadius: 100,
      distanceFilter: 100,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 15000,
      fastestInterval: 10000,
      activitiesInterval: 15000,
      pauseLocationUpdates: false,
      stopOnStillActivity: true,
      saveBatteryOnBackground: true
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentDidMount() {
    SplashScreen.hide();
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  // onReceived(notification) {
  //   console.log("Notification received: ", notification);
  // }

  // onOpened(openResult) {
  //   console.log("Message: ", openResult.notification.payload.body);
  //   console.log("Data: ", openResult.notification.payload.additionalData);
  //   console.log("isActive: ", openResult.notification.isAppInFocus);
  //   console.log("openResult: ", openResult);
  // }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: nav })}
      />
    );
  }
}
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  dispatch,
  startup: () => dispatch()
});

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AppWithNavigationState
);
