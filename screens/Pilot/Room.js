import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, ScrollView, Dimensions,Picker, Platform,View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight,axiosInstance } from '../../constants/utils';
import { Icon, Input,Select, Card } from '../../components';
import { SliderBox } from "react-native-image-slider-box";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
const regex = /(<([^>]+)>)/ig;
import moment, { duration } from "moment";
import {UIActivityIndicator } from 'react-native-indicators';
import { DataTable } from 'react-native-paper';
import { color } from 'react-native-reanimated';

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {      
            isLoding: true,
            price_html:"Meeting Room 1 - 60 minutes",
            price:"",
            description:"Ideally set in the centre of Kandy, Vendol Sky Resort features air-conditioned rooms with free WiFi, free private parking and room service. Boasting family rooms, this property also provides guests with a terrace. Extra facilities include a 24-hour front desk, meeting rooms, a tour desk and ironing service",
            noOfDays:"",
            noOfRooms: "",
            images: [],
            dayPrice:"",
            roomPrice:"",
            markedDates:"",
            selected:'',
            roomName:'',
            time:"9:00 am",
            selectedValue:"1"
        };
      }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {     
            // console.warn(this.props.route.params.id)
            this.setState({ isLoding: true })
            this.getMeetingRoom()
            this.markCurrentDate()
        });       
    }
    componentWillUnmount(){   
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
    getImages = (images) => {
        var imgs = []
        images.map((res) => {
            imgs.push(res.src)
        });
        this.state.images = imgs
        this.setState({imageview:true})
    }
    checkPriceDays=(text)=>{
        var noRoom= this.state.noOfRooms==""? 1 :this.state.noOfRooms
        if (text != "") {
            this.setState({ noOfDays: text }, () => {
                var price = this.state.dayPrice * this.state.noOfDays* noRoom
                this.setState({ price: price,roomPrice:price })
            })
    }else{
        this.setState({ noOfDays: text,roomPrice:this.state.dayPrice })
    }

    }
    checkPriceRoom=(text)=>{
        if (text != "") {
            this.setState({ noOfRooms: text }, () => {
                var price = this.state.roomPrice * this.state.noOfRooms
                this.setState({ price: price })
            })
        }else{
            this.setState({ noOfRooms: text,roomPrice:this.state.dayPrice })
        }
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
    timePress=(value)=>{
      this.setState({time:value})
    }
    setSelectedValue=(itemValue)=>{

     this.setState({selectedValue:itemValue},()=>{
         var price = this.state.dayPrice * itemValue
         this.setState({price:price})
     })
    }
    renderCards = () => {
        const { navigation ,route } = this.props;      
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
                 theme={{  todayTextColor: nowTheme.COLORS.ROOM_TYPE_NAME}}
                 minDate={moment().format("YYYY-MM-DD")}
                />
                <Text
                    size={16}
                    style={styles.title}
                    color={nowTheme.COLORS.ROOM_TYPE_DAY}
                >
                   {this.state.price_html.replace(regex, '')}
                </Text>
                <Block>
                <DataTable>
                        <DataTable.Header>
                            <DataTable.Title >
                                <Text
                                    size={14}
                                    style={styles.title}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Morning
                                </Text>
                            </DataTable.Title>
                     
                        
                            <DataTable.Title>
                                <Text
                                    size={14}
                                    style={styles.title}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Afternoon
                                </Text>

                            </DataTable.Title>
                        </DataTable.Header>
                            <DataTable.Row >
                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="9:00 am" ? styles.timeSelect:""}
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('9:00 am')}
                                    >
                                        9:00 am
                                    </Text>
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="12:00 pm" ? styles.timeSelect:""}
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('12:00 pm')}
                                    >
                                        12:00 pm
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row >
                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="10:00 am" ? styles.timeSelect:""}
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('10:00 am')}
                                    >
                                        10:00 am
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="1:00 pm" ? styles.timeSelect:""}                                   
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('1:00 pm')}
                                    >
                                        1:00 pm
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row >
                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="11:00 am" ? styles.timeSelect:""}  
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('11:00 am')}
                                    >
                                        11:00 am
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="2:00 pm" ? styles.timeSelect:""} 
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('2:00 pm')}
                                    >
                                        2:00 pm
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row >
                                <DataTable.Cell>                                
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="3:00 pm" ? styles.timeSelect:""} 
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('3:00 pm')}
                                    >
                                        3:00 pm
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row >
                                <DataTable.Cell>                                
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <Text
                                        size={14}
                                        style={this.state.time=="4:00 pm" ? styles.timeSelect:""}                                   
                                        color={nowTheme.COLORS.HEADER}
                                        onPress={()=>this.timePress('4:00 pm')}
                                    >
                                        4:00 pm
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                 
                                    </DataTable>
                </Block>
                <Text
                    size={14}
                    style={styles.title}
                    color={nowTheme.COLORS.HEADER}
                >
                    Duration 
                </Text>         
                    <View style={styles.duration}>
                        <Picker
                            selectedValue={this.state.selectedValue}
                            style={{ height: 40 }}
                            onValueChange={(itemValue) =>this.setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="1 Hour" value="1" />
                            <Picker.Item label="2 Hour" value="2" />
                            <Picker.Item label="3 Hour" value="3" />
                            <Picker.Item label="4 Hour" value="4" />
                            <Picker.Item label="5 Hour" value="5" />
                            <Picker.Item label="6 Hour" value="6" />
                            <Picker.Item label="7 Hour" value="7" />
                            <Picker.Item label="8 Hour" value="8" />
                        </Picker>
                    </View>           
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
            
                    <Block  flex>
                    <Button
                        style={styles.button}
                        color={nowTheme.COLORS.APP_BULE}
                                onPress={() => navigation.navigate('PilotConfirmRequest',                                    {
                                        screen: 'PilotConfirmRequest',
                                        params: {
                                            selectDate: this.state.selected,
                                            roomName: this.state.roomName,
                                            noOfDays: this.state.noOfDays,
                                            noOfRooms:this.state.noOfRooms,
                                            price:this.state.price,
                                            productId:this.props.route.params.id,
                                            selectTime:this.state.time,
                                            noOfHours:this.state.selectedValue
                                        }
                                    })}
                            >
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14 , textTransform: 'uppercase'}}
                            color={theme.COLORS.WHITE}
                        >
                            Check Availability
                        </Text>
                    </Button>
                
                    </Block>
                </Block>
                <Block >
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
                            <Text                                
                               // style={{ }}
                                size={12}
                                style={styles.description}
                                color={nowTheme.COLORS.HEADER}
                            >
                            {this.state.description.replace(regex, '')}
                            </Text>
                        </Block>
                </Block>
                </Block>
             
            </Block>
        );
    };
    render() {
        const { navigation ,route } = this.props;  
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
    item:{
        marginBottom: theme.SIZES.BASE / 2,
        padding: theme.SIZES.BASE / 2
    },
    page:{
        padding: theme.SIZES.BASE / 2, 
    },
    description:{
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
    duration:{
        borderRadius: 4,
         borderWidth: 1,
         marginLeft: theme.SIZES.BASE / 2,
         marginRight: theme.SIZES.BASE / 2,
         marginBottom: theme.SIZES.BASE / 2,
    },
    timeSelect:{
     backgroundColor:nowTheme.COLORS.HEADER,
     color:nowTheme.COLORS.WHITE,
    }
});
