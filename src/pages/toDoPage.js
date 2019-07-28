import React, { Component } from "react";
import { Input, CheckBox } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import uuidv1 from "uuid/v1";
import ToDoList from "../components/ToDoList";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class ToDoPage extends Component {
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
    console.log("profile", props.profile);
    //this.state = { isEditing: false, toDoValue: props.text };
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
    console.log("toDos", toDos);
    if (!loadedToDos) {
      return (
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>KNOU TO-DO LIST</Text>
          </View>
        </View>
      );
    }
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
        <View style={styles.selectBoxView}>
          <View style={styles.selectBoxList}>
            <CheckBox
              containerStyle={styles.checkBoxContainer}
              la
              size={SCREEN_HEIGHT * 0.04}
              uncheckedColor="#007cb6"
              checkedColor="#007cb6"
              checked={Boolean(newToDo)}
            />
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              value={newToDo}
              returnKeyType={"done"}
              onChangeText={val => this.onChangeText("newToDo", val)}
              autoCorrect={false}
              onSubmitEditing={this._addToDo}
            />
          </View>
        </View>
        <View style={styles.scrollView}>
          <ScrollView>
            {Object.values(toDos)
              .reverse()
              .map(toDo => (
                <ToDoList
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
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      console.log("_loadToDos A", toDos);
      this.setState({
        loadedToDos: true,
        toDos: parsedToDos || {}
      });
      console.log("_loadToDos B", toDos);
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
      const toDos = prevState.todos;
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
          ...prevState.toDos[i],
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
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
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
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFDD00"
  },
  profileView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEE00",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#007cb6"
  },
  selectBoxView: {
    flex: 1,
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SCREEN_WIDTH * 0.02,
    backgroundColor: "#FFEEFF"
  },
  scrollView: {
    flex: 6,
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFF00"
  },
  selectBoxList: {
    width: "94%",
    flexDirection: "row"
  },
  checkBoxContainer: {
    width: "4%",
    alignItems: "center",
    justifyContent: "center"
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
  },
  profileNameView: {
    width: "40%",
    backgroundColor: "#FF0000"
  },
  profileNumView: {
    width: "54%",
    backgroundColor: "#FF0000",
    alignItems: "flex-end"
  },
  nameText: {
    color: "#007cb6",
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: "400"
  },
  userNumText: {
    color: "#007cb6",
    fontSize: SCREEN_WIDTH * 0.065,
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
