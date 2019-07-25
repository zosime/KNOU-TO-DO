import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { AppLoading } from "expo";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class ToDoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: props.profile.cName,
      userName: props.profile.uName,
      userNumber: props.profile.uNum
    };
    console.log("profile", props.profile);
    //this.state = { isEditing: false, toDoValue: props.text };
  }
  render() {
    const { className, userName, userNumber } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>KNOU TO-DO LIST</Text>
        </View>
        <View style={styles.profileView}>
          <View>
            <Text style={styles.profileText}>{className}</Text>
            <Text style={styles.profileText}>{userName}</Text>
          </View>
          <View>
            <Text style={styles.profileText}>{userNumber}</Text>
          </View>
        </View>
        <View style={styles.scrollView}>
          <ScrollView />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  titleView: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFDD00"
  },
  profileView: {
    flex: 1,
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEE00",
    flexDirection: "row"
  },
  scrollView: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFF00"
  },
  titleText: {
    color: "#007cb6",
    fontSize: SCREEN_WIDTH * 0.1,
    fontWeight: "bold",
    marginTop: SCREEN_HEIGHT * 0.025
  },
  profileText: {
    color: "#007cb6",
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: "400"
  }
});
