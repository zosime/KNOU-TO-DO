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
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
      favSport5: null
    };

    this.state = {
      numbers: [
        {
          label: "1",
          value: 1,
          color: "orange"
        },
        {
          label: "2",
          value: 2,
          color: "green"
        }
      ],
      favSport0: undefined,
      favSport1: undefined,
      favSport2: undefined,
      favSport3: undefined,
      favSport4: "baseball",
      previousFavSport5: undefined,
      favSport5: undefined,
      favNumber: undefined
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
                favSport5: this.state.previousFavSport5
              },
              () => {
                this.inputRefs.favSport5.togglePicker(true);
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
            this.inputRefs.favSport5.togglePicker(true);
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
    checkedclassName: false,
    checkedUserName: false,
    checkedUserNum: false,
    className: "",
    userName: "",
    userNumber: ""
  };

  render() {
    const { checkedclassName, checkedUserName, checkedUserNum } = this.state;
    const { onLogin } = this.props;
    const placeholder = {
      label: "학과를 선택하세요.",
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
              checked={checkedclassName}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>학과</Text>
            </View>
            <View style={styles.titleView}>
              <RNPickerSelect
                placeholder={placeholder}
                items={listClassName}
                // onValueChange={value => {
                //   this.setState({
                //     className: value
                //   });
                // }}
                onValueChange={val => this.onChangeText("className", val)}
                style={{
                  ...pickerSelectStyles
                }}
                value={this.state.className}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: "yellow" }}
              />
            </View>

            {/* <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              onChangeText={val => this.onChangeText("className", val)}
            /> */}
          </View>
          <View style={styles.selectBoxList}>
            <CheckBox
              containerStyle={styles.checkBoxContainer}
              size={SCREEN_HEIGHT * 0.06}
              uncheckedColor="#007cb6"
              checkedColor="#007cb6"
              checked={checkedUserNum}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>학번</Text>
            </View>
            <Input
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
              checked={checkedUserName}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>이름</Text>
            </View>
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              onChangeText={val => this.onChangeText("userName", val)}
            />
          </View>
        </View>
        <View style={styles.loginBtnView}>
          <Button
            buttonStyle={styles.loginBtn}
            titleStyle={styles.loginBtnTitle}
            title={"LOGIN"}
            onPress={() => this.onLoginClick()}
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
          checkedUserName: Boolean(val)
        });
        break;
      case "userNum":
        this.setState({
          checkedUserNum: Boolean(val)
        });
        break;
      case "className":
        this.setState({
          checkedclassName: Boolean(val)
        });
        break;
    }
  };
  onLoginClick = () => {
    console.log("CLICK");
    this.props.onLogin("AAA");
  };
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: "100%",
    fontSize: SCREEN_WIDTH * 0.06,
    color: "#007cb6",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#007cb6",
    borderWidth: 0.5
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
    width: "90%",
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
    width: "90%",
    flexDirection: "row"
  },
  checkBoxContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  labelContainer: {
    width: "15%",
    justifyContent: "center"
  },
  label: {
    color: "#007cb6",
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: "bold"
  },
  inputContainer: {
    width: "65%",
    justifyContent: "center"
  },
  inputStyle: {
    fontSize: SCREEN_WIDTH * 0.06,
    color: "#007cb6",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#007cb6"
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
