import { StackNavigator } from "react-navigation";

import Home from "./containers/Home";
import Counter from "./containers/Counter";
import Signup from "./containers/Signup";
import Discover from "./containers/Discover";
import Welcome from "./containers/Welcome";
import Discover1 from "./containers/Discover1";
import Hidden from "./containers/Hidden";
import noNewUser from "./containers/noNewUser";
import location from "./containers/location";
import Deck from "./containers/Deck";
import edit from "./containers/edit";
import About from "./containers/About";
import profile from "./containers/profile";
import Message from "./containers/Message";
import SeeMessages from "./containers/SeeMessages";
import Notification from "./containers/Notification";
import seeProPic from "./containers/seeProPic";
import Post from "./containers/post";
import ToC from "./containers/ToC";
import Privacy from "./containers/Privacy";
import Help from "./containers/Help";
import seeChatImg from "./containers/seeChatImg";

const AppNavigator = new StackNavigator(
  {
    Home: { screen: Home },
    Counter: { screen: Counter },
    Signup: { screen: Signup },
    Discover: { screen: Discover },
    Welcome: { screen: Welcome },
    Discover1: { screen: Discover1 },
    Hidden: { screen: Hidden },
    noNewUser: { screen: noNewUser },
    location: { screen: location },
    Deck: { screen: Deck },
    edit: { screen: edit },
    About: { screen: About },
    profile: { screen: profile },
    Message: { screen: Message },
    SeeMessages: { screen: SeeMessages },
    Notification: { screen: Notification },
    seeProPic: { screen: seeProPic },
    seeChatImg: { screen: seeChatImg },
    Post: { screen: Post },
    ToC: { screen: ToC },
    Privacy: { screen: Privacy },
    Help: { screen: Help }
  },
  {
    headerMode: "screen",
    navigationOptions: {
      header: null
    }
  },
  {
    Discover: "screen",
    navigationOptions: {
      header: null
    }
  }
);

export default AppNavigator;
