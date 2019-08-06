import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking
} from "react-native";
import { Input, CheckBox, Button, Icon } from "react-native-elements";
import PropTypes from "prop-types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

//const { width, height } = Dimensions.get("window");

export default class KnouToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      toDoValue: props.text,
      linkURL: props.link
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
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
    const { id, link, deleteToDo, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <CheckBox
            containerStyle={styles.checkBoxContainer}
            size={SCREEN_HEIGHT * 0.04}
            uncheckedColor="#007cb6"
            checkedColor="#007cb6"
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
            name="external-link"
            type="feather"
            color={Boolean(!link) ? "#DDDDDD" : "#2980b9"}
            size={SCREEN_WIDTH * 0.08}
            disabled={Boolean(!link)}
            disabledStyle={{ backgroundColor: "#FFFFFF" }}
            onPress={event => {
              console.log("linkURL A", link);
              this.color = "#000000";
              event.stopPropagation;
              setTimeout(() => {
                console.log("linkURL B", link);
                this._onLink(link);
                //deleteToDo(id);
              }, 200);
            }}
            underlayColor="#FFDDDD"
          />
        </View>
      </View>
    );
  }
  _onLink = url => {
    console.log("url", url);
    Linking.openURL(url);
    return false;
  };
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
    color: "#007cb6"
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
