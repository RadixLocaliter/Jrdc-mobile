import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback ,Dimensions,View} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Icon, Input } from '../components';

import { nowTheme,Images } from '../constants';
const { width } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class Card extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      name,
      image,
      color
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Articles')}>
          <>
        <View style={{backgroundColor:color,height:"100%",width:8,borderTopLeftRadius:4,borderBottomLeftRadius:4,marginRight:8}}></View>
          <Block style={{padding:5}}>        
            <Image  source={image} style={imageStyles} />
          </Block>
          </>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate(name)}>
          <Block flex middle style={styles.cardDescription}>
            <Block row>
              <Text
                h6
                style={{ fontFamily: 'montserrat-regular'}}
                size={16}
                style={titleStyles}
                color={nowTheme.COLORS.WHITE}
              >
                {name.replace("Type","").replace(/([A-Z])/g, ' $1').trim()}
              </Text>  
              <Block right flex style={{marginRight:theme.SIZES.BASE}} >    
              <Icon 
                size={20}
                color={nowTheme.COLORS.WHITE}
                name="minimal-right2x"
                family="NowExtra"
              //style={styles.inputIcons}
              />
              </Block>
             </Block>                
          </Block>

        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: nowTheme.COLORS.INFO,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
   // minHeight: 114,
    marginBottom: 0
  },
  cardTitle: {
    //width:190,
  //  paddingHorizontal: 9,
   // paddingTop: 7,
   // paddingBottom: 15
    //marginRight:30
  },
  cardDescription: {
   // padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    //borderRadius: 3,
   // elevation: 1,
  //  overflow: 'hidden'
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height:56,
    width: 56,
    marginRight: theme.SIZES.BASE

  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
  //  height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure, 
    padding:4  
  } 
});

export default withNavigation(Card);
