import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { Input, CheckBox, Button, Icon } from "react-native-elements";
import PropTypes from "prop-types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

//const { width, height } = Dimensions.get("window");

export default class MyToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    uncompleteToDo: PropTypes.func.isRequired,
    completeToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired
  };
  state = {
    isEditing: false,
    toDoValue: ""
  };
  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props;
    console.log("text", text);
    console.log("id", id);
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <CheckBox
            containerStyle={styles.checkBoxContainer}
            size={SCREEN_HEIGHT * 0.04}
            uncheckedColor="#eb3b5a"
            checkedColor="#eb3b5a"
            checked={Boolean(isCompleted)}
            onPress={this._toggleComplete}
          />
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={styles.inputContainer}
            inputStyle={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}
            value={toDoValue}
            returnKeyType={"done"}
            onChangeText={this._controllInput}
            autoCorrect={false}
            onSubmitEditing={this._finishEditing}
            multiline={true}
            blurOnSubmit={true}
          />
        </View>
        <View style={styles.actionContainer}>
          <Icon
            name="x-square"
            type="feather"
            color="#f50"
            size={SCREEN_WIDTH * 0.08}
            onPress={event => {
              this.color = "#000000";
              event.stopPropagation;
              setTimeout(() => {
                deleteToDo(id);
              }, 200);
            }}
            underlayColor="#FFDDDD"
          />
        </View>
      </View>
    );
  }
  _toggleComplete = event => {
    event.stopPropagation;
    const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };
  _startEditing = event => {
    event.stopPropagation;
    this.setState({
      isEditing: true
    });
  };
  _finishEditing = event => {
    event.stopPropagation;
    const { toDoValue } = this.state;
    const { id, updateToDo } = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false
    });
  };
  _controllInput = text => {
    this.setState({
      toDoValue: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.96,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  checkBoxContainer: {
    width: "4%",
    height: "4%",
    alignItems: "center",
    justifyContent: "center"
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.76
  },
  actionContainer: {
    margin: SCREEN_WIDTH * 0.04,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {},
  completedText: {
    fontWeight: "500",
    fontSize: SCREEN_WIDTH * 0.05,
    marginVertical: SCREEN_WIDTH * 0.02,
    color: "#CCDDEE",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    fontWeight: "500",
    fontSize: SCREEN_WIDTH * 0.05,
    marginVertical: SCREEN_WIDTH * 0.02,
    color: "#eb3b5a"
  },
  input: {
    width: SCREEN_WIDTH * 0.5,
    marginVertical: SCREEN_WIDTH * 0.02
  },
  deleteBtnContainer: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1
  },
  deleteBtn: {
    width: SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH * 0.1
  },
  deleteBtnTitle: {
    color: "#FFFFFF",
    fontSize: SCREEN_WIDTH * 0.02,
    fontWeight: "bold"
  }
});
