import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, CheckBox } from "react-native-elements";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const listClassName = [
  {
    label: "국어국문학과",
    value: "국어국문학과"
  },
  {
    label: "영어영문학과",
    value: "영어영문학과"
  },
  {
    label: "중어중문학과",
    value: "중어중문학과"
  },
  {
    label: "불어불문학과",
    value: "불어불문학과"
  },
  {
    label: "일본학과",
    value: "일본학과"
  },
  {
    label: "법학과",
    value: "법학과"
  },
  {
    label: "행정학과",
    value: "행정학과"
  },
  {
    label: "경제학과",
    value: "경제학과"
  },
  {
    label: "경영학과",
    value: "경영학과"
  },
  {
    label: "무역학과",
    value: "무역학과"
  },
  {
    label: "미디어영상학과",
    value: "미디어영상학과"
  },
  {
    label: "관광학과",
    value: "관광학과"
  },
  {
    label: "사회복지학과",
    value: "사회복지학과"
  },
  {
    label: "농학과",
    value: "농학과"
  },
  {
    label: "생활과학과",
    value: "생활과학과"
  },
  {
    label: "컴퓨터과학과",
    value: "컴퓨터과학과"
  },
  {
    label: "정보통계학과",
    value: "정보통계학과"
  },
  {
    label: "환경보건학과",
    value: "환경보건학과"
  },
  {
    label: "간호학과",
    value: "간호학과"
  },
  {
    label: "교육학과",
    value: "교육학과"
  },
  {
    label: "청소년교육과",
    value: "청소년교육과"
  },
  {
    label: "유아교육과",
    value: "유아교육과"
  },
  {
    label: "문화교육과",
    value: "문화교육과"
  }
];

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      inputName: null
    };

    this.state = {
      prevInputName: null,
      inputName: null
    };

    this.InputAccessoryView = this.InputAccessoryView.bind(this);
  }

  InputAccessoryView() {
    return (
      <View style={defaultStyles.modalViewMiddle}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState(
              {
                inputName: this.state.prevInputName
              },
              () => {
                this.inputRefs.inputName.togglePicker(true);
              }
            );
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text
              style={[
                defaultStyles.done,
                { fontWeight: "normal", color: "red" }
              ]}
            >
              Cancel
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text>Name | Prefer</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            this.inputRefs.className.togglePicker(true);
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <View testID="needed_for_touchable">
            <Text style={defaultStyles.done}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  state = {
    className: "",
    userName: "",
    userNumber: "",
    isLogBtnDisabled: true
  };

  render() {
    const { className, userNumber, userName, isLogBtnDisabled } = this.state;
    const { onLogin } = this.props;
    const placeholder = {
      label: "학과 선택",
      value: null,
      color: "#9EA0A4"
    };
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>KNOU TO-DO LIST</Text>
        </View>
        <View style={styles.selectBoxView}>
          <View style={styles.selectBoxList}>
            <CheckBox
              containerStyle={styles.checkBoxContainer}
              size={SCREEN_HEIGHT * 0.06}
              uncheckedColor="#007cb6"
              checkedColor="#007cb6"
              checked={Boolean(className)}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>학과</Text>
            </View>
            <View style={styles.inputContainer}>
              <RNPickerSelect
                placeholder={placeholder}
                items={listClassName}
                onValueChange={val => this.onChangeText("className", val)}
                style={{
                  ...pickerSelectStyles
                }}
                value={this.state.className}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: "yellow" }}
              />
            </View>
          </View>
          <View style={styles.selectBoxList}>
            <CheckBox
              containerStyle={styles.checkBoxContainer}
              size={SCREEN_HEIGHT * 0.06}
              uncheckedColor="#007cb6"
              checkedColor="#007cb6"
              checked={Boolean(userNumber)}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>학번</Text>
            </View>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              onChangeText={val => this.onChangeText("userNum", val)}
            />
          </View>
          <View style={styles.selectBoxList}>
            <CheckBox
              containerStyle={styles.checkBoxContainer}
              size={SCREEN_HEIGHT * 0.06}
              uncheckedColor="#007cb6"
              checkedColor="#007cb6"
              checked={Boolean(userName)}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>이름</Text>
            </View>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              onChangeText={val => this.onChangeText("userName", val)}
            />
          </View>
        </View>
        <View style={styles.loginBtnView}>
          <Button
            onPress={() => this.onLoginClick()}
            buttonStyle={styles.loginBtn}
            titleStyle={styles.loginBtnTitle}
            title={"LOGIN"}
            disabled={!Boolean(className && userName && userNumber)}
          />
        </View>
      </View>
    );
  }
  onChangeText = (key, val) => {
    console.log(key, val, Boolean(val));
    switch (key) {
      case "userName":
        this.setState({
          userName: val
        });
        break;
      case "userNum":
        this.setState({
          userNumber: val
        });
        break;
      case "className":
        this.setState({
          className: val
        });
        break;
    }
    // if (this.state.userName && this.state.userNumber && this.state.className) {
    //   this.setState({
    //     isLogBtnDisabled: true
    //   });
    // }
  };
  onLoginClick = () => {
    this.props.onLogin(
      this.state.className,
      this.state.userNumber,
      this.state.userName
    );
  };
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: SCREEN_WIDTH * 0.02,
    fontSize: SCREEN_WIDTH * 0.06,
    color: "#007cb6",
    fontWeight: "bold"
    // fontSize: 16,
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: "gray",
    // borderRadius: 4,
    // color: "black",
    // paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginLeft: SCREEN_WIDTH * 0.02,
    fontSize: SCREEN_WIDTH * 0.06,
    color: "#007cb6",
    fontWeight: "bold"
    // fontSize: SCREEN_WIDTH * 0.06,
    // color: "#007cb6",
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: "#4f5057",
    // borderRadius: 8,
    // paddingRight: 30 // to ensure the text is never behind the icon

    // fontSize: 16,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: "#4f5057",
    // borderRadius: 8,
    // color: "black",
    // paddingRight: 30 // to ensure the text is never behind the icon
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    //backgroundColor: "#007cb6",
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  titleView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  selectBoxView: {
    flex: 2,
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "15%",
    borderRadius: SCREEN_WIDTH * 0.02
  },
  loginBtnView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  titleText: {
    color: "#007cb6",
    fontSize: SCREEN_WIDTH * 0.1,
    fontWeight: "bold"
  },
  selectBoxList: {
    flex: 1,
    width: "94%",
    flexDirection: "row"
  },
  checkBoxContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  labelContainer: {
    width: "14%",
    justifyContent: "center"
  },
  label: {
    color: "#007cb6",
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: "bold"
  },
  inputContainer: {
    width: "66%",
    marginVertical: SCREEN_WIDTH * 0.03,
    marginLeft: SCREEN_WIDTH * 0.02,
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#007cb6"
  },
  inputStyle: {
    fontSize: SCREEN_WIDTH * 0.06,
    color: "#007cb6",
    fontWeight: "bold"
  },
  inputComponentStyle: {
    borderBottomWidth: 0
  },
  loginBtn: {
    backgroundColor: "#007cb6"
  },
  loginBtnTitle: {
    width: "50%",
    color: "#FFFFFF",
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: "bold"
  }
});
