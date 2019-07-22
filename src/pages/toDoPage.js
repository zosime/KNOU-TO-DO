import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

export default class ToDoPage extends Component {
  // static navigationOptions = {
  //   title: "Welcome"
  // };
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>toDoPage</Text>
        <Button title="TO DO PAGE" onPress={() => navigate("LoginPage")} />
      </View>
    );
  }
}
