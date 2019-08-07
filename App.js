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
    isLoaded: false,
    knou_toDos: {}
  };
  //기본 정보 불러오기
  componentDidMount = () => {
    //회원정보 불러오기
    this._onLoadProfile();
    //학교 체크리스트 로컬정보 불러오기
    this._onLoadKnouToDos();
    //학교 체크리시트 웹정보 불러오기
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
    console.log("isLoaded", isLoaded);
    if (!isLoaded) return <AppLoading />;
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
  //로그인처리
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

  //프로필정보 저장
  _onSaveProfile = profile => {
    const saveProfile = AsyncStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );
  };

  //프로필정보 불러오기
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
  //학교체크리스트 불러오기
  _onLoadKnouToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("knou_toDos");
      const parsedToDos = JSON.parse(toDos);
      // console.log("============APP PAGE=========");
      // console.log(parsedToDos);
      // console.log("====================================");
      this.setState({
        knou_toDos: parsedToDos || {}
      });
    } catch (err) {}
  };
  //검수용 초기화 코드
  // _onClearKnouToDos = async () => {
  //   const toDos = await AsyncStorage.clear();
  // };
  ////////////////////////////////////////////////////////////////////////////
  //웹경로 데이터 불러오기 > 로컬데이터와 비교하여 로컬저장소 저장
  _onLoadJsonfile = async () => {
    return fetch("http://zosime.synology.me/knou/noti.json")
      .then(response => response.json())
      .then(responseJson => {
        responseJson.map(toDo => {
          const ID = toDo.id;
          const { knou_toDos, isLoaded } = this.state;
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
              const newState = {
                ...prevState,
                knou_toDos: {
                  ...prevState.knou_toDos,
                  ...newToDoObj
                }
              };
              console.log(newState.knou_toDos);
              this._saveToDo(newState.knou_toDos);
              return { ...newState };
            });
          }
        });
        this.setState({
          isLoaded: true
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  //학교 체크리스트 저장
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
