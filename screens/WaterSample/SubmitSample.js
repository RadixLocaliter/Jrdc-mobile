import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, ScrollView, Dimensions, Picker, Platform, View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstance } from '../../constants/utils';
import { Icon, Input, Select, Card,Switch } from '../../components';
import { SliderBox } from "react-native-image-slider-box";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const regex = /(<([^>]+)>)/ig;
import moment, { duration } from "moment";
import { UIActivityIndicator } from 'react-native-indicators';
import SimpleReactValidator from 'simple-react-validator';

export default class SubmitTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoding: false,
            price: "",  
            markedDates: "",
            selected: '',     
            orderId:"",
            name:"",
            sourceType:"",
            collected:"",
            designation:"",
            trackingNumber:"",
            acknowledge:"",
            markedDatePost:"",
            selectedValue:"",
            selectedPost:""
            
        };
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoding: false })
            //  this.getMeetingRoom()
           //  this.markCurrentDate()
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
    getMeetingRoom = () => {
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

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    getSelectedDayEvents = (date) => {
        let markedDates = {};
        this.setState({ selected: date.dateString }, () => {
            markedDates = { [this.state.selected]: { selected: true,selectedColor: 'black' } }
            this.setState({
                markedDates: markedDates
            });
        })
    };


    getSelectedDayPosted = (date) => {
        let markedDates = {};
        this.setState({ selectedPost: date.dateString }, () => {
            markedDates = { [this.state.selectedPost]: { selected: true,selectedColor: 'black' } }
            this.setState({
                markedDatePost: markedDates
            });
        })
    };

    setSelectedValue = (itemValue) => {
        this.setState({ selectedValue: itemValue }, () => {
        })
    }

    toggleSwitch = () => {
        this.setState({ acknowledge: !this.state.acknowledge }, () => {
            if (this.state.acknowledge == false) {
                this.setState({ acknowledge: "" });
            }
        });
    }
    checkAvailability = () => {
        if (this.validator.allValid()) {
            this.props.navigation.navigate('WaterSampleConfirmRequest', {
                screen: 'WaterSampleConfirmRequest',
                params: {
                    selectDate: this.state.selected,
                    orderId: this.state.orderId,
                    name: this.state.name,
                    sourceType: this.state.sourceType,
                    price: this.state.price,
                    collected:this.state.collected,
                    designation:this.state.designation,
                    trackingNumber:this.state.trackingNumber,
                    type :this.state.selectedValue,
                    selectedPost:this.state.selectedPost,
                    productId: 540
                }
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    renderCards = () => {
        const { navigation, route } = this.props;
        return (
            <Block style={styles.container}>
                <Block style={styles.page}>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Request Order Id *
                    </Text>
                    <Input
                        placeholder="Request Order Id Ex:#1234"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.orderId}               
                        onChangeText={val => this.onChangeText('orderId', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Order Id', this.state.orderId, 'required')}
                    </Text>

                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Sample Name/Id *
                    </Text>
                    <Input
                        placeholder="Sample Name/Id"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.name}
                        onChangeText={val => this.onChangeText('name', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Name', this.state.name, 'required')}
                    </Text>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Sample Collected Date *
                    </Text>
                    <Calendar
                        onDayPress={(day) => this.getSelectedDayEvents(day)}
                        markedDates={this.state.markedDates}
                        theme={{ todayTextColor: nowTheme.COLORS.ROOM_TYPE_NAME }}
                        minDate={moment().format("YYYY-MM-DD")}
                      //  current={moment().format("YYYY-MM-DD")}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Collected Date', this.state.markedDates, 'required')}
                    </Text>

                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Water Source Type *
                    </Text>
                    <Input
                        placeholder="Water Source Type"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.sourceType}
                        onChangeText={val => this.onChangeText('sourceType', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Source Type', this.state.sourceType, 'required')}
                    </Text>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Test Type
                    </Text>
                    <View style={styles.duration}>
                        <Picker
                            selectedValue={this.state.selectedValue}
                            style={{ height: 40 }}
                            onValueChange={(itemValue) => this.setSelectedValue(itemValue)}                        >
                            <Picker.Item label="Option 1" value="1" />
                            <Picker.Item label="Option 2" value="2" />
                            <Picker.Item label="Option 3" value="3" />
                        </Picker>
                    </View>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Collected By *
                    </Text>
                    <Input
                        placeholder="Collected By"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.collected}             
                        onChangeText={val => this.onChangeText('collected', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Collected By', this.state.collected, 'required')}
                    </Text>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Designation *
                    </Text>
                    <Input
                        placeholder="Designation"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.designation}
                        onChangeText={val => this.onChangeText('designation', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Designation', this.state.designation, 'required')}
                    </Text>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Tracking Number *
                    </Text>
                    <Input
                        placeholder="Tracking Number"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.trackingNumber}
                        onChangeText={val => this.onChangeText('trackingNumber', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Tracking Number', this.state.trackingNumber, 'required')}
                    </Text>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Sample Posted Date *
                    </Text>
                    <Calendar
                        onDayPress={(day) => this.getSelectedDayPosted(day)}
                        markedDates={this.state.markedDatePost}
                        theme={{ todayTextColor: nowTheme.COLORS.ROOM_TYPE_NAME }}
                        minDate={moment().format("YYYY-MM-DD")}
                      //  current={moment().format("YYYY-MM-DD")}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Post date', this.state.markedDatePost, 'required')}
                    </Text>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Acknowledge *
                    </Text>
                    <Block row>
                    <Switch
                        value={this.state.acknowledge}
                        onValueChange={this.toggleSwitch}                                              
                    />
                      <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                       Acknowledge given data correct
                    </Text>
                    </Block>                 
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Acknowledge', this.state.acknowledge, 'required')}
                    </Text>
                    {/* <Block row>
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
                                රු 2000.00
                            </Text>
                        </Block>
                    </Block> */}
                    <Block row>

                        <Block flex>
                            <Button
                                style={styles.button}
                                color={nowTheme.COLORS.APP_BULE}
                                onPress={() => this.checkAvailability()}  >
                                <Text
                                    style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase' }}
                                    color={theme.COLORS.WHITE}
                                >
                                    Submit Test
                                </Text>
                            </Button>

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
        //   marginTop: theme.SIZES.BASE * 4,
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
        width: "auto",
        // height: theme.SIZES.BASE * 3,
        //shadowRadius: 0,
        //  shadowOpacity: 0
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: theme.SIZES.BASE / 2,
        marginRight: theme.SIZES.BASE / 2,
        //  marginBottom: theme.SIZES.BASE / 2,
        borderColor: nowTheme.COLORS.BLACK
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
        padding: theme.SIZES.BASE / 2,
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
    duration: {
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: theme.SIZES.BASE / 2,
        marginRight: theme.SIZES.BASE / 2,
        marginBottom: theme.SIZES.BASE / 2,
    },
    timeSelect: {
        backgroundColor: nowTheme.COLORS.HEADER,
        color: nowTheme.COLORS.WHITE,
    },
    errorMessage: {
        color: nowTheme.COLORS.ERROR,
        marginLeft: theme.SIZES.BASE / 2
    },
});
