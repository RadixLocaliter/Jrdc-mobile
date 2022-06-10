import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage'
import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

// function CustomDrawerContent({
//   drawerPosition,
//   navigation,
//   profile,
//   focused,
//   state,
//   token,
//   ...rest
// }) {
//   const insets = useSafeArea();
const screens = [
  "Home",
    // "Components",
  //   "Articles",
  //  "Profile",
  //  "Account",
  "News",
 // "Settings"
];
class CustomDrawerContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }
  componentDidMount() {
    this._retrieveData()
  }
  _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const name = await AsyncStorage.getItem('Name');
      const email = await AsyncStorage.getItem('Email');
      if (token !== null) {
        this.setState({ name: name,email:email })
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    const {
      drawerPosition,
      navigation,
      profile,
      focused,
      state,
      token,
    } = this.props;
    return (
      <Block
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <Block middle row style={styles.header}>
          {/* <Image style={styles.logo} source={Images.Logo} /> */}
          <Block>
            <Image source={Images.AppLogo} style={styles.logo} />
          </Block>
          <Block>
            <Text
              color="white"
              size={14}
              style={{ fontFamily: 'montserrat-bold', marginLeft: 12 }}
            >
              {this.state.name}
            </Text>
            <Text
              color="white"
              size={12}
              style={{ fontFamily: 'montserrat-bold', marginLeft: 12, marginTop: theme.SIZES.BASE / 2 }}
            >
              {this.state.email}
            </Text>
          </Block>
          {/* <Block right  style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={20}
            color={"white"}
          />
        </Block> */}
        </Block>
        <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block
                style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10 }}
              />
              {/* <Text
            color={nowTheme.COLORS.WHITE}
            style={{ marginTop: 30, marginLeft: 20, marginBottom: 10, fontFamily: 'montserrat-regular', fontWeight: '300', fontSize: 12}}
          >
            DOCUMENTATION
          </Text> */}
            </Block>
            {/* <DrawerCustomItem title="GETTING STARTED" navigation={navigation}/> */}
            <DrawerCustomItem title="LOGOUT" navigation={navigation} />
          </ScrollView>
          <Text   color={nowTheme.COLORS.WHITE}  style={{ marginBottom: 5,fontSize: 16}}>v:1.0.0</Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE,
    justifyContent: "center",
    marginTop: theme.SIZES.BASE * 2,
    // backgroundColor:nowTheme.COLORS.WHITE
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 110,
    width: 105,
  },

  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    // borderRadius: 50,
    // borderWidth: 1
  },
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: "white"
  },
});

export default CustomDrawerContent;
