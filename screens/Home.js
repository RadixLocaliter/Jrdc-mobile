import React from "react";
import { StyleSheet, Dimensions, ScrollView,Image } from "react-native";
import { Block, theme, Text } from "galio-framework";
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Card, Button, Item } from "../components";
import HomeItem from "../components/HomeItem";
import { Images, nowTheme } from '../constants/';
const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Home extends React.Component {

  componentDidMount() {
    this._retrieveData()
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserId');
      const WaterUserId = await AsyncStorage.getItem('WaterUserId'); 
      if (value !== null) {
        // We have data!!
       // console.warn(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }; 
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block row>
          <Text
            size={16}
            style={styles.title}
            color={nowTheme.COLORS.HEADER}
          >
            Water Sample Request 
          </Text>        
        </Block>
        <Block flex>
          <HomeItem  color={nowTheme.COLORS.WATER_SAMPLEL} image={Images.WaterSample} name="Water Test" horizontal />  
          {/* <HomeItem  color={nowTheme.COLORS.LAB} image={Images.WaterSampleAdv} name="Advance Sample" horizontal /> */}
          </Block>
        <Block row style={{marginTop:theme.SIZES.BASE}}>
          <Text
            size={16}
            style={styles.title}
            color={nowTheme.COLORS.HEADER}
          >
            Reservations
          </Text>
        </Block>
        <Block flex>
        <HomeItem  color={nowTheme.COLORS.ACCOMODATION} image={Images.Accomodation} name="Accommodations" horizontal /> 
          <HomeItem  color={nowTheme.COLORS.LAB} image={Images.Lab} name="Laboratory" horizontal />   
          {/* <HomeItem  color={nowTheme.COLORS.AUDITORIUM} image={Images.Auditorium} name="Auditorium" horizontal />    */}
          <HomeItem  color={nowTheme.COLORS.MEETING_ROOM} image={Images.MeetingRoom} name="Meeting Rooms" horizontal />  
          <HomeItem  color={nowTheme.COLORS.BENCH} image={Images.cafe} name="Benching Area" horizontal />     
          <HomeItem  color={nowTheme.COLORS.PILOT} image={Images.pilot} name="Pilot Area" horizontal /> 
          <Block row style={{marginTop:theme.SIZES.BASE}}>
            <Text
              size={16}
              style={styles.title}
              color={nowTheme.COLORS.HEADER}
            >
              Inventory
          </Text>
          </Block>
          <Block flex >
          {/* <HomeItem  color={nowTheme.COLORS.INTROY_ADVANCE} image={Images.InventoryAdvance} name="Advance" horizontal /> */}
          <HomeItem  color={nowTheme.COLORS.INTROY_ADVANCE} image={Images.InventoryBasice} name="Inventory" horizontal />  
          </Block>     
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor : '#F5F5F5'
  },
  articles: {
    width: width - theme.SIZES.BASE * 1.5,
    paddingVertical: theme.SIZES.BASE,
   // paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  },
  title: {
    fontFamily: 'montserrat-bold',  
    //marginTop: 2,
    color: nowTheme.COLORS.HEADER
  },
 
});

export default Home;
