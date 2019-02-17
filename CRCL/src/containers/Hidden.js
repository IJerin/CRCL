import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    flex: 1
  },
  rectangle: {
    width: "100%",
    height: 150,
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
    fontFamily: "AvenirNext-Regular",
    fontSize: 25,
    textAlign: "center",
    color: "white",
    paddingTop: 25.5
  },
  text1: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 30,
    textAlign: "center",
    color: "white",
    paddingTop: 29.5
  },
  circle: {
    marginLeft: 340,
    marginTop: 0
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
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 18,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
    marginLeft: 205
  },
  pic: {
    height: 50,
    width: 50,
    borderColor: "rgb(0,173,194)",
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 10
  },
  text2: {
    fontFamily: "Avenir-Book",
    fontSize: 12,
    color: "rgb(186,186,189)"
  },
  text3: {
    fontFamily: "avenir-light",
    fontSize: 9,
    color: "rgb(0,173,194)"
  },
  text4: {
    fontFamily: "AvenirNext-Medium",
    fontSize: 12,
    color: "rgb(186,186,189)",
    textAlign: "center",
    paddingTop: 5,
    marginLeft: 305
  },
  text5: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 30,
    textAlign: "center",
    color: "white",
    paddingTop: 20
  }
});

export default class Hidden extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  tonoNewUser = () => {
    this.props.navigation.navigate("noNewUser");
  };
  tolocation = () => {
    this.props.navigation.navigate("location");
  };
  toDiscover1 = () => {
    this.props.navigation.navigate("Discover1");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
          <Text style={styles.h1}>Discover</Text>
          <Text style={styles.text5}>Your profile is hidden for 7h 23m</Text>
        </View>
        <View style={styles.triangleTopLeft} />
        <TouchableOpacity onPress={this.toDiscover1}>
          <View style={styles.circle}>
            <Image
              source={require("../Images/HIDDEN.png")}
              style={{
                height: 36.3,
                width: 36.7
              }}
            />
          </View>
          <Text style={styles.text4}>Hidden</Text>
        </TouchableOpacity>
        <ScrollView>
          <Grid style={{ marginTop: 20 }}>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/b1.png")}
                    style={styles.pic}
                    blurRadius={10}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Philippe</Text>
                <Text style={styles.text2}>
                  Assistant Manager at Charls tyrwitt
                </Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>Arround now</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(186,186,189)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <TouchableOpacity onPress={this.tonoNewUser}>
                  <View>
                    <Image
                      source={require("../Images/g1.png")}
                      style={styles.pic}
                    />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <TouchableOpacity onPress={this.tolocation}>
                  <View>
                    <Image
                      source={require("../Images/g1.png")}
                      style={styles.pic}
                    />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
            <Row style={{ height: 15 }}>
              <Col style={{ width: "5%" }} />
              <Col
                style={{
                  width: "95%",
                  height: 1.5,
                  borderTopColor: "rgb(201,201,208)",
                  borderTopWidth: 1
                }}
              />
            </Row>
            <Row style={{ height: 60 }}>
              <Col style={{ width: "20%" }}>
                <View>
                  <Image
                    source={require("../Images/g1.png")}
                    style={styles.pic}
                  />
                </View>
              </Col>
              <Col style={{ width: "60%" }}>
                <Text style={styles.text1}>Iliana</Text>
                <Text style={styles.text2}>Neuropsychologist at UOW</Text>
              </Col>
              <Col style={{ width: "20%" }}>
                <Text style={styles.text3}>16 min ago</Text>
              </Col>
            </Row>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}
