import React, { Component } from "react";
import { Input, CheckBox, Button } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";
import uuidv1 from "uuid/v1";
import KnouToDoList from "../components/KnouToDoList";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class KnouToDoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: props.profile.cName,
      userName: props.profile.uName,
      userNumber: props.profile.uNum,
      newToDo: "",
      loadedToDos: false,
      toDos: {}
    };
  }
  componentDidMount = () => {
    this._loadToDos();
  };
  render() {
    const {
      className,
      userName,
      userNumber,
      newToDo,
      loadedToDos,
      toDos
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>KNOU TO-DO LIST</Text>
        </View>
        <View style={styles.profileView}>
          <View style={styles.profileNameView}>
            <Text style={styles.nameText}>{className}</Text>
            <Text style={styles.nameText}>{userName}</Text>
          </View>
          <View style={styles.profileNumView}>
            <Text style={styles.userNumText}>{userNumber}</Text>
          </View>
        </View>

        <View style={styles.scrollView}>
          <ScrollView>
            {Object.values(toDos)
              .sort((a, b) => {
                return b.id - a.id;
              })
              .reverse()
              .map(toDo => (
                <KnouToDoList
                  key={toDo.id}
                  deleteToDo={this._deleteToDo}
                  completeToDo={this._completeToDo}
                  uncompleteToDo={this._uncompleteToDo}
                  updateToDo={this._updateToDo}
                  {...toDo}
                />
              ))}
          </ScrollView>
        </View>
        <View style={styles.buttomView} />
      </View>
    );
  }
  //=============================================================
  //내용입력
  onChangeText = (key, val) => {
    switch (key) {
      case "newToDo":
        this.setState({
          newToDo: val
        });
        break;
    }
  };
  _controllNewToDo = text => {
    this.setState({});
  };

  //로컬스토리지 저장된 toDos 불러오기//
  _loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("knou_toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        toDos: parsedToDos || {},
        loadedToDos: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObj = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        };

        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObj
          }
        };

        this._saveToDo(newState.toDos);
        return { ...newState };
      });
    }
  };
  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveToDo(newState.toDos);
      return { ...newState };
    });
  };
  _uncompleteToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      };
      this._saveToDo(newState.toDos);
      return { ...newState };
    });
  };
  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      };
      this._saveToDo(newState.toDos);
      return { ...newState };
    });
  };
  _updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      };
      this._saveToDo(newState.toDos);
      return { ...newState };
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
    width: "100%",
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  titleView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.07,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007cb6"
  },
  profileView: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.09,
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
  buttomView: {
    flex: 1,
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
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: "500",
    height: SCREEN_HEIGHT * 0.04
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
