import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, ScrollView, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstance,BenchCategoryId } from '../../constants/utils';
import { Icon, Input, Card } from '../../components';
const regex = /(<([^>]+)>)/ig;
import {UIActivityIndicator } from 'react-native-indicators';

export default class MeetingRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meetingRomms: [],
            isdata: false,
            isLoding: true
        };
    }
    componentDidMount() {
        this.getMeetingRooms()
    }
    getMeetingRooms = () => {
        axiosInstance.get('wp-json/wc/v3/products?order=asc&category='+BenchCategoryId)
            .then((response) => {
              //  console.warn(response.data)
                this.state.meetingRomms = response.data
                this.setState({ isLoding: false })
            }).catch((error) => {
                console.log(error);
            });
    }
    renderCards = () => {
        const { navigation } = this.props;
        return (
            <Block style={styles.container}>
                <Block row>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Showing the single result
                    </Text>
                </Block>
                {this.state.meetingRomms.map((res, index) => { 
                    let Image_Http_URL = { uri: res.images[0].src };
                    return (                      
                        <Block key={index} card style={styles.item}>
                            <Image resizeMode="cover" source={Image_Http_URL} style={styles.horizontalImage} />
                            <Text
                                size={18}
                                style={styles.titleRoomType}
                                color={nowTheme.COLORS.ROOM_TYPE_NAME}
                            >
                               {res.name}
                            </Text>
                            <Text
                                size={14}
                                style={styles.titleRoomType}
                                color={nowTheme.COLORS.ROOM_TYPE_DAY}
                            >
                                  {res.price_html.replace(regex, '')}
                            </Text>
                            <Button
                                style={styles.button}
                                color={nowTheme.COLORS.APP_BULE}
                                onPress={() => navigation.navigate('Bench', { screen: 'Bench', params: { id: res.id }})}
                            >
                                <Text
                                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 , textTransform: 'uppercase'}}
                                    color={theme.COLORS.WHITE}
                                >
                                    Book
                                </Text>
                            </Button>
                        </Block>
                 )
                })
                } 
            </Block>
        );
    };
    render() {
        return (
            <Block flex>
                {this.state.isLoding == false ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.renderCards()}
                    </ScrollView> :
                    <Block flex style={styles.loading}>                   
                        <UIActivityIndicator  color={nowTheme.COLORS.APP_BACKGROUND} />
                    </Block>
                }
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //  alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginTop: theme.SIZES.BASE * 4,
        padding: theme.SIZES.BASE / 2,
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        zIndex: 3,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
    },
    button: {
        width: "auto",
        // height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
    },

    input: {
        width: width - theme.SIZES.BASE * 4,
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
    title: {
        fontFamily: 'montserrat-bold',
        // marginTop: theme.SIZES.BASE,
        color: nowTheme.COLORS.HEADER,
        // marginBottom:theme.SIZES.BASE ,
        padding: theme.SIZES.BASE / 2,
    },
    titleRoomType: {
        fontFamily: 'montserrat-bold',
        // marginTop: theme.SIZES.BASE,
        //  color: nowTheme.COLORS.HEADER,
        padding: theme.SIZES.BASE / 3,
        //   marginLeft: 5

    },
    horizontalImage: {
        height: 160,
        width: 'auto',
        padding: theme.SIZES.BASE / 2,
    },
    item: {
        marginBottom: theme.SIZES.BASE / 2,
        padding: theme.SIZES.BASE / 2
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
