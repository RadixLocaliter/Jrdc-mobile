import React from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { FAB, Chip } from 'react-native-paper';
import { HeaderHeight, axiosInstanceWaterModule } from '../../constants/utils';

import { Images, nowTheme } from '../../constants/';
import { Card, Icon } from '../../components/';
import { UIActivityIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isLoding: true,
            labRequest: [],
            WaterUserId:0
        };
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this._retrieveData()
        })
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    
    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const userId = await AsyncStorage.getItem('UserId');
            const WaterUserId = await AsyncStorage.getItem('WaterUserId'); 
            if (token !== null) {               
                this.setState({WaterUserId:WaterUserId},()=>{
                    this.getWaterRequest(this.state.WaterUserId)
                })
            }
        } catch (error) {
        }
    };

    getWaterRequest = (userId) => {
        axiosInstanceWaterModule.get('api/v1/request-all/'+userId)
            .then((response) => {
                console.log(response.data)
                this.state.labRequest = response.data.data
                this.setState({ isLoding: false })
            }).catch((error) => {
                console.log(error);
            });
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    renderCards = () => {
        return (
            <Block style={styles.container}>
                {this.state.labRequest.map((res, index) => {
                    var status=""
                    if (res.status === "0") {
                      status = "Pending"
                    } else if (res.status === "1") {
                        status = "Pending Payment"
                    }
                    else if (res.status === "2") {
                        status = "Reject"
                    }
                    else if (res.status === "3") {
                        status = "Payment Complete"
                    }
                    else if (res.status === "4") {
                        status = "Payment Approved"
                    }
                    else if (res.status === "5") {
                        status = "Payment Reject"
                    }
                    else if (res.status === "6") {
                        status= "Submit Order"
                    }
                    else if (res.status === "7") {
                        status = "Order Processing"
                    }
                    else if (res.status === "8") {
                        status = "Order Complete"
                    }
                    return (
                        <Block key={index} row middle card>
                            <View style={{ backgroundColor: nowTheme.COLORS.SECONDARY, height: "100%", width: 8, marginRight: 2 }}></View>
                            <Text
                                color="black"
                                size={14}
                                style={styles.title}
                            >
                            {res.request_id}
                            </Text>                         
                            <Text
                                color="black"
                                size={14}
                                style={styles.title}
                            >
                                {moment(res.created_at).format("DD-MM-YYYY")}
                            </Text>
                            <Block style={{ marginLeft: theme.SIZES.BASE / 2, marginRight: theme.SIZES.BASE / 2,width:"35%" }} >
                                <Chip>
                                    {status}
                                </Chip>
                            </Block>
                            <Block right style={{ marginLeft: theme.SIZES.BASE / 2, marginRight: theme.SIZES.BASE / 2 }}>
                                {res.status == 1 ?
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WaterRequestPayment', { screen: 'WaterRequestPayment', params: { id: res.request_id } })}>
                                        <Image source={Images.upload} style={styles.upload} />
                                    </TouchableOpacity>
                                :  <Image  style={styles.upload} />}
                            </Block>
                        </Block>
                    )
                })
                }
            </Block>
        );
    };

    onStateChange = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
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
                <FAB
                    style={styles.fab}
                    icon="plus"
                    color={nowTheme.COLORS.WHITE}
                    onPress={() => this.props.navigation.navigate('RequestWaterTest')}
                />
                {/* <FAB.Group
                    fabStyle={styles.fab}
                    color={nowTheme.COLORS.WHITE}
                   // onPress={() => this.props.navigation.navigate('RequestWaterTest')}
                    
                    open={this.state.open}
                    icon={this.state.open ? 'beaker-check' : 'plus'}
                    actions={[
                        {
                            icon: 'beaker-plus',
                            label: 'Request Water Test',
                            onPress: () => this.props.navigation.navigate('RequestWaterTest'),
                        },
                        {
                            icon: 'beaker-plus',
                            label: 'Request Water Sample',  
                            onPress: () => this.props.navigation.navigate('RequestWaterSample'),
                        },
                    ]}
                    onStateChange={this.onStateChange}
                    onPress={() => {
                        // if (open) {
                        //     // do something if the speed dial is open
                        // }
                    }}
                /> */}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    title: {
        fontFamily: 'montserrat-bold',
        paddingBottom: theme.SIZES.BASE,
        color: nowTheme.COLORS.HEADER,
        paddingTop: theme.SIZES.BASE,
        marginLeft: 4,
        width: 80
    },
    cardDescription: {

    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: nowTheme.COLORS.APP_BACKGROUND
    },
    upload: {
        width: theme.SIZES.BASE * 2,
        height: theme.SIZES.BASE * 2
    }
});

export default Home;
