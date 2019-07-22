import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  DrawerNavigator,
  DrawerItems
} from "react-navigation";
import LoginPage from "./src/pages/loginPage";
import ToDoPage from "./src/pages/toDoPage";

export default class App extends React.Component {
  state = {
    pageName: "",
    className: "",
    userName: "",
    useNumber: "",
    listClassName: [
      "국어국문학과",
      "영어영문학과",
      "중어중문학과",
      "불어불문학과",
      "일본학과",
      "법학과",
      "행정학과",
      "경제학과",
      "경영학과",
      "무역학과",
      "미디어영상학과",
      "관광학과",
      "사회복지학과",
      "농학과",
      "생활과학과",
      "컴퓨터과학과",
      "정보통계학과",
      "환경보건학과",
      "간호학과",
      "교육학과",
      "청소년교육과",
      "유아교육과",
      "문화교육과"
    ]
  };

  render() {
    const { userName } = this.state;
    if (userName) {
      return (
        <View style={styles.container}>
          <ToDoPage />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LoginPage onLogin={this._onLogin} />
      </View>
    );
  }

  _onLogin = text => {
    console.log(text);
    this.setState({
      userName: text
    });
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
