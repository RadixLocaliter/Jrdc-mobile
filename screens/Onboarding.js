import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, View, ScrollView, Alert } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import { HeaderHeight, axiosLoginInstance, axiosInstanceWaterModule } from '../constants/utils';
import { Icon, Input } from '../components';
import SimpleReactValidator from 'simple-react-validator';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Onboarding extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errorMessage: ""
    };
    this.validator = new SimpleReactValidator();
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  Login = () => {
    // this.props.navigation.navigate('App')
    //this.props.navigation.navigate('Onboarding')
    if (this.validator.allValid()) {
      this.LoginValidUser()
      this.setState({ isLoding: true })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  LoginValidUser = () => {
    var data = {
      username: this.state.userName,
      password: this.state.password
    }
    axiosLoginInstance.post('wp-json/api/v1/token', data)
      .then((response) => {
        //  this.props.navigation.navigate('Onboarding')
        var userData = response.data
        this._storeData(userData.jwt_token,
          userData.user_email,
          userData.display_name,
          userData.user_id)
        this.loginWaterSystem()
      }).catch((error) => {
        Alert.alert(
          "Error", error.response.data.error_description,
          [
            { text: "OK" }
          ]
        );
      });
  }

  loginWaterSystem = () => { 
    var data = {
      name: this.state.userName,
    }
    axiosInstanceWaterModule.post('api/v1/get-user', data)
      .then((response) => {
        var userId = response.data.data.id     
        this._storeDataWater(userId)
      }).catch((error) => {

      });
  }
  _storeDataWater = async (userId) => {
    try {
      await AsyncStorage.setItem('WaterUserId', userId.toString());
    } catch (error) {

    }
  };
  _storeData = async (token, email, name, userId) => {
    try {
      await AsyncStorage.setItem('Token', token);
      await AsyncStorage.setItem('Email', email);
      await AsyncStorage.setItem('Name', name);
      await AsyncStorage.setItem('UserId', userId.toString());
      this.props.navigation.navigate('App')
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    const { navigation, route } = this.props;
    return (
      <Block flex style={styles.container}>
        {/* <StatusBar barStyle="light-content" /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex middle>
            <ImageBackground
              source={Images.Loging}
              style={{ flex: 1, height: height, width, zIndex: 1 }}
            />
            <Block space="between" style={styles.padded}>
              <Block middle>
                <Block middle >
                  <Image source={Images.AppLogo}
                    style={{
                      width: 160,
                      height: 170, bottom: 20, position: 'absolute'
                    }} />

                </Block>
                <Block style={{ marginTop: theme.SIZES.BASE }}>
                  <Input
                    right
                    placeholder="User name"
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
                <Block style={{ marginTop: theme.SIZES.BASE }}>
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
                <Block style={{ marginLeft: theme.SIZES.BASE * 14 }} >
                  <Text
                    color="white"
                    size={14}
                    style={{ fontFamily: 'montserrat-regular', marginRight: theme.SIZES.BASE / 2 }}
                  >
                    Forgot Password
                  </Text>
                </Block>
                <Block
                  middle
                  style={{
                    marginTop: theme.SIZES.BASE / 2,
                    marginBottom: theme.SIZES.BASE
                  }}
                >
                  <Button
                    style={styles.button}
                    color={nowTheme.COLORS.APP_BULE}
                    onPress={() => this.Login()}
                  >
                    <Text
                      style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                      color={theme.COLORS.WHITE}
                    >
                      Login
                    </Text>
                  </Button>
                  <Block row middle style={{ marginTop: theme.SIZES.BASE / 3, marginBottom: theme.SIZES.BASE / 3 }}>
                    <View style={{ backgroundColor: nowTheme.COLORS.WHITE, height: 1, width: "40%", marginRight: theme.SIZES.BASE }}></View>
                    <Text
                      style={{ fontFamily: 'montserrat-regular', fontSize: 14 }}
                      color={theme.COLORS.WHITE}
                    >
                      or
                    </Text>
                    <View style={{ backgroundColor: nowTheme.COLORS.WHITE, height: 1, width: "40%", marginLeft: theme.SIZES.BASE }}></View>
                  </Block>
                  <Button
                    style={styles.button}
                    color="#2F5597"
                    onPress={() => navigation.navigate('GuestHome')}
                  >
                    <Text
                      style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                      color={theme.COLORS.WHITE}
                    >
                      Continue as guest
                    </Text>
                  </Button>
                </Block>
                <Block middle row onPress={() => navigation.navigate('Account')}>
                  <Text
                    color="white"
                    size={14}
                    style={{ fontFamily: 'montserrat-regular' }}
                    onPress={() => navigation.navigate('Account')}
                  >
                    Don't have an account?
                  </Text>
                  <Text
                    color={nowTheme.COLORS.APP_BULE}
                    size={14}
                    style={{ fontFamily: 'montserrat-regular', marginLeft: 4 }}
                  >
                    Sign Up
                  </Text>
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
    //  marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
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
