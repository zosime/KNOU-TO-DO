import React from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import LoginPage from "./src/pages/LoginPage";
import ToDoPage from "./src/pages/ToDoPage";
import MyToDoPage from "./src/pages/MyToDoPage";
import KnouToDoPage from "./src/pages/KnouToDoPage";
import { Constants, AppLoading } from "expo";

export default class App extends React.Component {
  state = {
    pageName: "",
    className: "",
    userName: "",
    userNumber: "",
    knou_toDos: {},
    isLoaded: ""
  };
  componentDidMount = () => {
    //this._onClearKnouToDos();
    this._onLoadProfile();
    this._onLoadKnouToDos();
    this._onLoadJsonfile();
  };
  render() {
    const {
      className,
      userName,
      userNumber,
      knou_toDos,
      isLoaded
    } = this.state;

    if (isLoaded == "COMPLETE") return <AppLoading />;
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
      this.setState({
        className: parsedProfile.className,
        userNumber: parsedProfile.userNumber,
        userName: parsedProfile.userName
      });
    } catch (err) {
      console.log(err);
    }
  };
  ////////////////////////////////////////////////////////////////////////////
  _onLoadKnouToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("knou_toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        knou_toDos: parsedToDos || {}
      });
    } catch (err) {}
  };
  _onClearKnouToDos = async () => {
    const toDos = await AsyncStorage.clear();
  };
  ////////////////////////////////////////////////////////////////////////////
  _onLoadJsonfile = async () => {
    return fetch("http://zosime.synology.me/knou/noti.json")
      .then(response => response.json())
      .then(responseJson => {
        responseJson.map(toDo => {
          const ID = toDo.id;
          const { knou_toDos } = this.state;
          if (knou_toDos && knou_toDos[toDo.id]) {
            // console.log("동일데이터있음", knou_toDos[toDo.id].text);
          } else {
            // console.log("신규데이터 저장", toDo.text);
            const newToDoObj = {
              [ID]: {
                id: ID,
                isCompleted: false,
                text: toDo.text,
                link: toDo.link,
                createdAt: Date.now()
              }
            };
            this.setState(prevState => {
              isLoaded: "complete";
              const newState = {
                ...prevState,
                toDos: {
                  ...prevState.toDos,
                  ...newToDoObj
                }
              };
              this._saveToDo(newState.toDos);
              return { ...newState };
            });
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  _saveToDo = newToDos => {
    const saveToDos = AsyncStorage.setItem(
      "knou_toDos",
      JSON.stringify(newToDos)
    );
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
