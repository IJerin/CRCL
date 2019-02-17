/* eslint-disable no-alert, no-console, react/no-array-index-key */
import React, { Component } from "react";
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View,
  AsyncStorage // Container component
} from "react-native";

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1,
    justifyContent: "space-between"
    // Take up all available space
  },
  // Tabs row container
  tabsContainer: {
    flexDirection: "row", // Arrange tabs in a row
    paddingTop: 10 // Top padding
  },
  // Individual tab container
  tabContainer: {
    flex: 1, // Take up equal amount of space for each tab
    paddingVertical: 20,
    marginRight: "15%",
    marginLeft: "15%"

    // Vertical padding
    // Transparent border for inactive tabs
  },
  // Tab text
  tabText: {
    color: "black",
    fontFamily: "Avenir-Book",
    fontSize: 16,
    textAlign: "center"
  },
  // Content container
  contentContainer: {
    flex: 1
    // Take up all available space
  }
});

export default class Tabs extends Component {
  // Initialize State
  state = {
    // First tab is active by default
    activeTab: 0
    //activeTabColor: "rgb(0, 173, 193)"
  };

  // Pull children out of props passed from App component
  render({ children } = this.props) {
    return (
      <View style={styles.container}>
        {/* Tabs row */}
        <View style={styles.tabsContainer}>
          {/* Pull props out of children, and pull title out of props */}
          {children.map(({ props: { title } }, index) => (
            <TouchableOpacity
              style={[
                // Default style for every tab
                styles.tabContainer,
                // Merge default style with styles.tabContainerActive for active tab
                index === this.state.activeTab
                  ? {
                      height: 50,
                      borderBottomColor: this.props.activeColor,
                      borderBottomWidth: 3 // White bottom border for active tabs
                    }
                  : []
              ]}
              // Change active tab
              onPress={() => this.setState({ activeTab: index })}
              // Required key prop for components generated returned by map iterator
              key={index}
            >
              <Text style={styles.tabText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>
          {children[this.state.activeTab]}
        </View>
      </View>
    );
  }
}
