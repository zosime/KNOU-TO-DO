import React, { Component } from "react";
import Tabbar from "react-native-tabbar-bottom";

import MyInfoEditPage from "./MyInfoEditPage";
import MyToDoPage from "./MyToDoPage";
import KnouToDoPage from "./KnouToDoPage";
import LoginPage from "./LoginPage";
import { StyleSheet, View, Text, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class ToDoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "KnouToDoPage",
      className: props.profile.cName,
      userName: props.profile.uName,
      userNumber: props.profile.uNum
    };
  }

  //페이지 값에 따른 분기 처리
  render() {
    const { className, userName, userNumber } = this.state;
    return (
      <View style={styles.container}>
        {this.state.page === "MyInFo" && (
          <MyInfoEditPage
            profile={{ cName: className, uName: userName, uNum: userNumber }}
          />
        )}
        {this.state.page === "MyToDoPage" && (
          <MyToDoPage
            profile={{ cName: className, uName: userName, uNum: userNumber }}
          />
        )}
        {this.state.page === "KnouToDoPage" && (
          <KnouToDoPage
            profile={{ cName: className, uName: userName, uNum: userNumber }}
          />
        )}
        <Tabbar
          stateFunc={tab => {
            this.setState({ page: tab.page });
            //this.props.navigation.setParams({tabTitle: tab.title})
          }}
          iconColor="#FFFFFF"
          selectedIconColor="#00cec9"
          activePage={this.state.page}
          tabs={[
            {
              page: "MyInFo",
              icon: "person"
            },
            {
              page: "KnouToDoPage",
              icon: "school"
            },
            {
              page: "MyToDoPage",
              icon: "today"
            }
          ]}
        />
      </View>
    );
  }
  //=============================================================
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  }
});
