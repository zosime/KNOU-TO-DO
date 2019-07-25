import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  DrawerNavigator,
  DrawerItems
} from "react-navigation";
import LoginPage from "./src/pages/LoginPage";
import ToDoPage from "./src/pages/ToDoPage";

export default class App extends React.Component {
  state = {
    pageName: "",
    className: "",
    userName: "",
    userNumber: ""
  };
  componentDidMount = () => {
    this._onLoadProfile();
  };
  render() {
    const { className, userName, userNumber } = this.state;
    console.log("userName", userName);
    if (userName) {
      return (
        <View style={styles.container}>
          <ToDoPage
            profile={{ cName: className, uName: userName, uNum: userNumber }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LoginPage onLogin={this._onLogin} />
      </View>
    );
  }

  _onLogin = (cName, uNum, uName) => {
    console.log(cName, uNum, uName);
    const profile = {
      className: cName,
      userNumber: uNum,
      userName: uName
    };
    this._onSaveProfile(profile);

    this.setState({
      className: cName,
      userNumber: uNum,
      userName: uName
    });
  };

  _onSaveProfile = profile => {
    const saveProfile = AsyncStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );
  };

  _onLoadProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem("profile");
      const parsedProfile = JSON.parse(profile);
      console.log(profile);
      this.setState({
        className: parsedProfile.className,
        userNumber: parsedProfile.userNumber,
        userName: parsedProfile.userName
      });
    } catch (err) {
      console.log(err);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

// const MainNavigator = createStackNavigator({
//   LoginPage: { screen: LoginPage },
//   ToDoPage: { screen: ToDoPage }
// });

// const App = createAppContainer(MainNavigator);
// export default App;
