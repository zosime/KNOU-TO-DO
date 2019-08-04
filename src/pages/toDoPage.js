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
  },
  titleView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.08,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007cb6"
  },
  profileView: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.08,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#007cb6"
    // borderBottomWidth: 2,
    // borderBottomColor: "#007cb6"
  },
  selectBoxView: {
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SCREEN_WIDTH * 0.02
  },
  scrollView: {
    flex: 8,
    width: "94%",
    alignItems: "center",
    justifyContent: "center"
  },

  selectBoxList: {
    width: "94%",
    flexDirection: "row"
  },
  checkBoxContainer: {
    width: "6%",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: "bold",
    marginTop: SCREEN_HEIGHT * 0.025,
    height: SCREEN_HEIGHT * 0.08
  },
  profileText: {
    color: "#FFFFFF",
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: "400"
  },
  profileNameView: {
    width: "40%"
  },
  profileNumView: {
    width: "54%",
    alignItems: "flex-end"
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: "500"
  },
  userNumText: {
    color: "#FFFFFF",
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: "500"
  },
  inputContainer: {
    width: "85%",
    marginVertical: SCREEN_WIDTH * 0.03,
    marginLeft: SCREEN_WIDTH * 0.02,
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#007cb6"
  },
  inputStyle: {
    fontSize: SCREEN_WIDTH * 0.06,
    color: "#007cb6",
    fontWeight: "bold"
  }
});
