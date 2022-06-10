import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, ScrollView, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstance } from '../../constants/utils';
import { Icon, Input, Card } from '../../components';
import { SliderBox } from "react-native-image-slider-box";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const regex = /(<([^>]+)>)/ig;
import moment from "moment";
import { UIActivityIndicator } from 'react-native-indicators';
import SimpleReactValidator from 'simple-react-validator';
import HTMLView from 'react-native-htmlview';

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoding: true,
            price_html: "",
            price: "",
            description: "",
            noOfDays: "",
            noOfRooms: "",
            images: [],
            dayPrice: "",
            roomPrice: "",
            markedDates: "",
            selected: '',
            roomName: ''
        };
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // console.warn(this.props.route.params.id)
            this.setState({ isLoding: true })
            this.getRoom()
            this.markCurrentDate()
        });
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    markCurrentDate = () => {
        let markedDates = {};
        this.setState({ selected: moment().format("YYYY-MM-DD") }, () => {
            markedDates = { [this.state.selected]: { selected: true, selectedColor: 'black' } }
            this.setState({
                markedDates: markedDates
            });
        })
    };
    getRoom = () => {
        var roomId = this.props.route.params.id
        axiosInstance.get('wp-json/wc/v3/products/' + roomId)
            .then((response) => {
                // console.warn(response.data)
                var data = response.data
                this.getImages(data.images)
                this.setState({ isLoding: false, price_html: data.price_html, price: data.price, description: data.description, dayPrice: data.price, roomName: data.name })
            }).catch((error) => {
                console.log(error);
            });
    }
    getImages = (images) => {
        var imgs = []
        images.map((res) => {
            imgs.push(res.src)
        });
        this.state.images = imgs
        this.setState({imageview:true})
    }

    checkPriceDays = (text) => {
        var noRoom = this.state.noOfRooms == "" ? 1 : this.state.noOfRooms
        if (text != "") {
            this.setState({ noOfDays: text }, () => {
                var price = this.state.dayPrice * this.state.noOfDays * noRoom
                this.setState({ price: price, roomPrice: price })
            })
        } else {
            this.setState({ noOfDays: text, roomPrice: this.state.dayPrice })
        }

    }
    checkPriceRoom = (text) => {
        if (text != "") {
            this.setState({ noOfRooms: text }, () => {
                var price = this.state.roomPrice * this.state.noOfRooms
                this.setState({ price: price })
            })
        } else {
            this.setState({ noOfRooms: text, roomPrice: this.state.dayPrice })
        }
    }
    getSelectedDayEvents = (date) => {
        let markedDates = {};
        this.setState({ selected: date.dateString }, () => {
            markedDates = { [this.state.selected]: { selected: true, selectedColor: 'black' } }
            this.setState({
                markedDates: markedDates
            });
        })
    };
    checkAvailability = () => {
        if (this.validator.allValid()) {

            this.props.navigation.navigate('ConfirmRequest', {
                screen: 'ConfirmRequest',
                params: {
                    selectDate: this.state.selected,
                    roomName: this.state.roomName,
                    noOfDays: this.state.noOfDays,
                    noOfRooms: this.state.noOfRooms,
                    price: this.state.price,
                    productId: this.props.route.params.id
                }
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const a = node.attribs;
            return (<Image style={{ width: 30, height: 30 }} source={{ uri: a.src }} />);
        }
    }
    renderCards = () => {
        const { navigation, route } = this.props;
        return (
            <Block style={styles.container}>
                <Block>
                    <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={200}
                    // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    //  currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                    />
                </Block>
                <Block style={styles.page}>
                    <Calendar
                        onDayPress={(day) => this.getSelectedDayEvents(day)}
                        markedDates={this.state.markedDates}
                        theme={{ todayTextColor: nowTheme.COLORS.ROOM_TYPE_NAME }}
                        minDate={moment().format("YYYY-MM-DD")}
                    />
                    <Text
                        size={16}
                        style={styles.title}
                        color={nowTheme.COLORS.ROOM_TYPE_DAY}
                    >
                        {this.state.price_html.replace(regex, '')}
                    </Text>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Per Day (+රු {this.state.dayPrice}) +1 day
                    </Text>
                    <Input
                        right
                        placeholder="No of Days"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        keyboardType="numeric"
                        value={this.state.noOfDays}
                        onChangeText={text => this.checkPriceDays(text)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Days', this.state.noOfDays, 'required')}
                    </Text>
                    <Block row>
                        <Text
                            h6
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Cost
                        </Text>
                        <Block right flex >
                            <Text
                                h6
                                style={{ fontFamily: 'montserrat-regular' }}
                                size={14}
                                style={styles.title}
                                color={nowTheme.COLORS.HEADER}
                            >
                                රු {this.state.price}.00
                            </Text>
                        </Block>
                    </Block>
                    <Block row>
                        <Input
                            right
                            placeholder="No of Rooms"
                            style={styles.input}
                            placeholderTextColor={nowTheme.COLORS.APP_BULE}
                            iconContent={<Block />}
                            keyboardType="numeric"
                            value={this.state.noOfRooms}
                            onChangeText={text => this.checkPriceRoom(text)}
                        />

                        <Block flex>
                            <Button
                                style={styles.button}
                                color={nowTheme.COLORS.APP_BULE}
                                onPress={() => this.checkAvailability()}
                            >
                                <Text
                                    style={{ fontFamily: 'montserrat-bold', fontSize: 12, padding: 4, textTransform: 'uppercase' }}
                                    color={theme.COLORS.WHITE}
                                >
                                    Check Availability
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                    <Block>
                        <Text
                            size={8}
                            style={styles.errorMessage}
                        >
                            {this.validator.message('Room', this.state.noOfRooms, 'required')}
                        </Text>
                        <Text
                            h6
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={16}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Description

                        </Text>
                        <Block >
                            {/* <Text                                
                               // style={{ }}
                                size={12}
                                style={styles.description}
                                color={nowTheme.COLORS.HEADER}
                            >
                            {this.state.description}                             

                            </Text> */}
                            <HTMLView
                                value={this.state.description}
                                stylesheet={styles.description}
                                renderNode={this.renderNode} />
                        </Block>
                    </Block>
                </Block>

            </Block>
        );
    };
    render() {
        const { navigation, route } = this.props;
        return (
            <Block flex>
                {this.state.isLoding == false ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.renderCards()}
                    </ScrollView> :
                    <Block flex style={styles.loading}>
                        <UIActivityIndicator color={nowTheme.COLORS.APP_BACKGROUND} />
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
        // padding: theme.SIZES.BASE / 2,    


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
        // width: "75%",
        // height: theme.SIZES.BASE * 3,
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
        // color: nowTheme.COLORS.HEADER,
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
    page: {
        padding: theme.SIZES.BASE / 2,
    },
    description: {
        fontFamily: 'montserrat-regular',
        textAlign: 'justify',
        lineHeight: 20,
        fontSize: 12,
        padding: theme.SIZES.BASE,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        color: nowTheme.COLORS.ERROR,
        marginLeft: 4
    },
});
