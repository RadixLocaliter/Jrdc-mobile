import React from 'react';

import { ImageBackground, Image, StyleSheet, ScrollView, StatusBar, Dimensions, Platform, Alert } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight, axiosLoginInstance, axiosInstanceWaterModule } from '../constants/utils';
import SimpleReactValidator from 'simple-react-validator';
import SelectDropdown from 'react-native-select-dropdown';
const stringify = require('qs-stringify')

import { Icon, Input } from '../components';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const countries = ["Customer", "Student"]

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      reTypePassword: "",
      errorMessage: "",
      userType: ""
    };
    this.validator = new SimpleReactValidator();
  }
  userRegister = () => {
    if (this.validator.allValid()) {
      this.register()
      this.setState({ isLoding: true })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  goLogin = () => {
    this.props.navigation.navigate('Onboarding')
  }
  register = () => {
    var data = {
      username: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      roles: [this.state.userType]
    }
    axiosLoginInstance.post('wp-json/wp/v2/users/register', data)
      .then((response) => {
        //rrconsole.warn(response.data)
        // Alert.alert(
        //   "Success", "Your account has been successfully created.",
        //   [

        //     { text: "Go to Login", onPress: () => this.goLogin() }
        //   ]
        // );
        this.registerWater()
      }).catch((error) => {
        Alert.alert(
          "Error", error.response.data.message,
          [
            { text: "OK" }
          ]
        );
      });
  }

  registerWater = () => {
    var data = stringify({
      email: this.state.email,
      display_name: this.state.userName
    })
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    };
    axiosInstanceWaterModule.post('api/v1/create-user', data, config)
      .then((response) => {
        Alert.alert(
          "Success", "Your account has been successfully created.",
          [

            { text: "Go to Login", onPress: () => this.goLogin() }
          ]
        );
      }).catch((error) => {
        Alert.alert(
          "Error", error.response.data.message,
          [
            { text: "OK" }
          ]
        );
      });
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  selectType = (item, index) => {
    this.setState({ userType: item.toLowerCase() })
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block flex >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={styles.container}>
            {/* <StatusBar barStyle="light-content" /> */}
            <Block flex middle>
              <ImageBackground
                source={Images.Loging}
                style={{ height: height, width, zIndex: 1 }}
              />
              <Block space="between" style={styles.padded}>
                <Block middle>
                  <Block middle>
                    <Image source={Images.AppLogo}
                      style={{
                        width: 160,
                        height: 170, bottom: theme.SIZES.BASE / 2, position: 'absolute'
                      }} />
                  </Block>

                  <Block style={{ marginTop: theme.SIZES.BASE }}>
                    <SelectDropdown
                      buttonStyle={styles.inputRole}
                      buttonTextStyle={styles.roleText}
                      data={countries}
                      onSelect={(selectedItem, index) => this.selectType(selectedItem, index)}
                      defaultButtonText="Select User"
                    />
                    <Block right>
                      <Text
                        size={8}
                        style={styles.errorMessage}
                      >
                        {this.validator.message('user Type', this.state.userType, 'required')}
                      </Text>
                    </Block>

                  </Block>
                  <Block style={{ marginTop: theme.SIZES.BASE }}>
                    <Input
                      right
                      placeholder="User Name"
                      style={styles.input}
                      placeholderTextColor={nowTheme.COLORS.APP_BULE}
                      onChangeText={val => this.onChangeText('userName', val)}
                      iconContent={
                        <Icon
                          size={20}
                          color={nowTheme.COLORS.APP_BULE}
                          name="single"
                          family="NowExtra"
                        // style={styles.inputIcons}
                        />
                      }
                    />
                    <Block right>
                      <Text
                        size={8}
                        style={styles.errorMessage}
                      >
                        {this.validator.message('User name', this.state.userName, 'required')}
                      </Text>
                    </Block>
                  </Block>
                  <Block style={{ marginTop: theme.SIZES.BASE / 2 }}>
                    <Input
                      right
                      placeholder="Email"
                      style={styles.input}
                      placeholderTextColor={nowTheme.COLORS.APP_BULE}
                      onChangeText={val => this.onChangeText('email', val)}
                      iconContent={
                        <Icon
                          size={20}
                          color={nowTheme.COLORS.APP_BULE}
                          name="email-852x"
                          family="NowExtra"
                        // style={styles.inputIcons}
                        />
                      }
                    />
                    <Block right>
                      <Text
                        size={8}
                        style={styles.errorMessage}
                      >
                        {this.validator.message('Email', this.state.email, 'required|email')}
                      </Text>
                    </Block>
                  </Block>
                  <Block style={{ marginTop: theme.SIZES.BASE / 2 }}>
                    <Input
                      right
                      placeholder="Password"
                      style={styles.input}
                      placeholderTextColor={nowTheme.COLORS.APP_BULE}
                      secureTextEntry={true}
                      onChangeText={val => this.onChangeText('password', val)}
                      iconContent={
                        <Icon
                          size={20}
                          color={nowTheme.COLORS.APP_BULE}
                          name="lock-circle-open2x"
                          family="NowExtra"
                        //style={styles.inputIcons}
                        />
                      }
                    />
                    <Block right>
                      <Text
                        size={8}
                        style={styles.errorMessage}
                      >
                        {this.validator.message('Password', this.state.password, 'required')}
                      </Text>
                    </Block>
                  </Block>
                  <Block style={{ marginTop: theme.SIZES.BASE / 2, }}>
                    <Input
                      right
                      placeholder="Re-Type Password"
                      style={styles.input}
                      placeholderTextColor={nowTheme.COLORS.APP_BULE}
                      secureTextEntry={true}
                      onChangeText={val => this.onChangeText('reTypePassword', val)}
                      iconContent={
                        <Icon
                          size={20}
                          color={nowTheme.COLORS.APP_BULE}
                          name="lock-circle-open2x"
                          family="NowExtra"
                        //style={styles.inputIcons}
                        />
                      }
                    />
                    <Block right>
                      <Text
                        size={8}
                        style={styles.errorMessage}
                      >
                        {this.validator.message('Re-Type', this.state.reTypePassword, `required|in:${this.state.password}`, { messages: { in: 'Passwords not match!' } })}
                      </Text>
                    </Block>
                  </Block>
                  <Block
                    middle
                    row
                    style={{
                      marginTop: theme.SIZES.BASE,
                      marginBottom: theme.SIZES.BASE
                    }}
                  >
                    <Button
                      style={styles.button}
                      color={nowTheme.COLORS.APP_BULE}
                      //onPress={() => navigation.navigate('App')}
                      onPress={() => this.userRegister()}
                    >
                      <Text
                        style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                        color={theme.COLORS.WHITE}
                      >
                        Sign Up
                      </Text>
                    </Button>
                  </Block>
                  <Block middle row>
                    <Text
                      onPress={() => navigation.navigate('Onboarding')}
                      color="white"
                      size={14}
                      style={{ fontFamily: 'montserrat-regular' }}
                    >
                      I'am already a member?
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.APP_BACKGROUND,
    marginTop: theme.SIZES.BASE * 4,
    //marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    // paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 3,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  input: {
    width: width - theme.SIZES.BASE * 3,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  inputRole: {
    width: width - theme.SIZES.BASE * 3,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: nowTheme.SIZES.BASE / 2,
    backgroundColor: nowTheme.COLORS.WHITE,

  },
  roleText: {
    //fontFamily: 'montserrat-regular',
    fontSize: 16,
    color: nowTheme.COLORS.APP_BULE,
    // fontWeight: 'bold'
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  },
  errorMessage: {
    color: nowTheme.COLORS.ERROR,
    marginLeft: 4,
    fontFamily: 'montserrat-bold'
  },
});

export default Register;
