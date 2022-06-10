import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, ScrollView, Dimensions, Platform, ActivityIndicator, Alert } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstance } from '../../constants/utils';
import { Icon, Input, Card } from '../../components';
const axios = require('axios');
const regex = /(<([^>]+)>)/ig;
import { DataTable } from 'react-native-paper';
import moment from "moment";
import SimpleReactValidator from 'simple-react-validator';
import { DotIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class ConfirmRequestTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accommodations: [],
            isdata: false,
            isLoding: false,
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            postCode: "",
            country: "",
            email: "",
            modile: "",
            companyName: "",
            customerId: 0

        };
        this.validator = new SimpleReactValidator();
    }
    componentDidMount() {
        this._retrieveData()
    }
    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const userId = await AsyncStorage.getItem('UserId');
            const email = await AsyncStorage.getItem('Email');
            if (token !== null) {
                this.setState({ customerId: userId, email: email })
            }
        } catch (error) {

        }
    };
    sendRequest = () => {
        if (this.validator.allValid()) {
            this.request()
            this.setState({ isLoding: true })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    ok = () => {
        if (this.state.customerId != 0) {
            this.props.navigation.navigate('Water Test')
        } else {
            this.props.navigation.navigate('RequestWaterTest')
        }
    }
    request = () => {
        var data = {
            payment_method: "bacs",
            payment_method_title: "Direct Bank Transfer",
            set_paid: false,
            customer_id: this.state.customerId,
            billing: {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                address_1: this.state.address,
                address_2: "",
                city: this.state.city,
                state: "CA",
                postcode: this.state.postCode,
                country: "LK",
                email: this.state.email,
                phone: this.state.modile
            },
            // appointment: {
            //     _product_id: this.props.route.params.productId,
            //     _cost: this.props.route.params.price,
            //     _start_date: moment(this.props.route.params.selectDate, 'YYYY-MM-DD H:mm').unix(),
            //     _end_date: moment(this.props.route.params.selectDate, "YYYY-MM-DD").add(this.props.route.params.r, 'days').unix(),
            //     _all_day: true,
            //     _qty: this.props.route.params.noOfHours == "" ? 1 : this.props.route.params.noOfHours,
            //     _timezone: ""
            // },
            // shipping: {
            //     first_name: "John",
            //     last_name: "Doe",
            //     address_1: "969 Market",
            //     address_2: "",
            //     city: "San Francisco",
            //     state: "CA",
            //     postcode: "94103",
            //     country: "LK"
            // },
            line_items: [
                {
                    name: "Submit Water Test data",
                    product_id: this.props.route.params.productId,
                    variation_id: 0,
                    quantity: 1,
                    tax_class: "",
                    subtotal: "0.00",
                    subtotal_tax: "0.00",
                    total: "0.00",
                    total_tax: "0.00",
                    taxes: [],
                    meta_data: [
                        {
                            id: 2994,
                            key: "Request Order Id",
                            value: this.props.route.params.orderId,
                            display_key: "Request Order Id",
                            display_value: this.props.route.params.orderId
                        },
                        {
                            id: 2995,
                            key: "Sample Name\/Id",
                            value: this.props.route.params.name,
                            display_key: "Sample Name\/Id",
                            display_value: this.props.route.params.name
                        },
                        {
                            id: 2996,
                            key: "Sample Collected Date",
                            value: this.props.route.params.selected,
                            display_key: "Sample Collected Date",
                            display_value: this.props.route.params.selected
                        }, 
                        {
                            id: 2997,
                            key: "Water Source Type",
                            value: this.props.route.params.sourceType,
                            display_key: "Water Source Type",
                            display_value: this.props.route.params.sourceType
                        },
                        {
                            id: 2998,
                            key: "Test Type",
                            value: this.props.route.params.type,
                            display_key: "Test Type",
                            display_value: this.props.route.params.type
                        },
                        {
                            id: 2999,
                            key: "Collected By",
                            value: this.props.route.params.collected,
                            display_key: "Collected By",
                            display_value: this.props.route.params.collected
                        },
                        {
                            id: 3000,
                            key: "Designation",
                            value: this.props.route.params.designation,
                            display_key: "Designation",
                            display_value: this.props.route.params.designation
                        },
                        {
                            id: 3001,
                            key: "Tracking Number",
                            value: this.props.route.params.trackingNumber,
                            display_key: "Tracking Number",
                            display_value: this.props.route.params.trackingNumber
                        },
                        {
                            id: 3002,
                            key: "Sample Posted Date",
                            value: this.props.route.params.selectedPost,
                            display_key: "Sample Posted Date",
                            display_value: this.props.route.params.selectedPost
                        },
                        {
                            id: 3003,
                            key: "Acknowledge",
                            value: "Acknowledge given data correct.",
                            display_key: "Acknowledge",
                            display_value: "Acknowledge given data correct."
                        }
                    ],
                    sku: "540-1",
                    price: 0,
                    parent_name: ""
                }
            ],
        }
        axiosInstance.post('wp-json/wc/v3/orders', data)
            .then((response) => {
                this.setState({ isLoding: false })
                this.clear()
                this.validator.hideMessages();
                Alert.alert(
                    "Thank you.Your appointment has been received",
                    "Your appointment is awaiting confirmation. You will be notified by email as soon as we've confirmed availability",
                    [
                        {
                            text: "Cancel",
                            onPress: () => this.ok,
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => this.ok() }
                    ]
                );
            }).catch((error) => {
                console.log(error.response);
            });
    }
    clear = () => {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            modile: "",
            postCode: "",
            city: "",
            country: "",
            address: "",
        })
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
                        Your order
                    </Text>
                </Block>
                <Block card style={styles.item}>
                    <DataTable>
                        {/* <DataTable.Header>
                            <DataTable.Title>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Product
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title numeric>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Subtotal
                                </Text>

                            </DataTable.Title>
                        </DataTable.Header> */}
                        <DataTable.Row>
                            <Block>
                                <Text
                                    size={14}
                                    style={styles.orderText}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Submit Water Test data  × 1
                                </Text>
                            </Block>
                            <DataTable.Cell numeric>  Free</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Subtotal
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Free
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Total
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Free
                                </Text>

                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </Block>
                <Block row >
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Billing details
                    </Text>
                </Block>
                <Block style={{ padding: 4 }} >
                    <Block row >
                        <Block flex style={{ marginRight: 2 }}>
                            <Input
                                right
                                placeholder="First name *"
                                style={styles.input}
                                placeholderTextColor={nowTheme.COLORS.APP_BULE}
                                iconContent={<Block />}
                                value={this.state.firstName}
                                onChangeText={val => this.onChangeText('firstName', val)}
                            />
                            <Text
                                size={8}
                                style={styles.errorMessage}
                            >
                                {this.validator.message('name', this.state.firstName, 'required')}
                            </Text>
                        </Block>
                        <Block flex>
                            <Input
                                right
                                placeholder="Last name *"
                                style={styles.input}
                                placeholderTextColor={nowTheme.COLORS.APP_BULE}
                                iconContent={<Block />}
                                value={this.state.lastName}
                                onChangeText={val => this.onChangeText('lastName', val)}
                            />
                            <Text
                                size={8}
                                style={styles.errorMessage}
                            >
                                {this.validator.message('name', this.state.lastName, 'required')}
                            </Text>
                        </Block>
                    </Block>
                    <Input
                        right
                        placeholder="Company name (optional)"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.companyName}
                        onChangeText={val => this.onChangeText('companyName', val)}
                    />

                    <Input
                        right
                        placeholder="Country / Region *"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.country}
                        onChangeText={val => this.onChangeText('country', val)}

                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Country', this.state.country, 'required')}
                    </Text>
                    <Input
                        right
                        placeholder="Street address *"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.address}
                        onChangeText={val => this.onChangeText('address', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Address', this.state.address, 'required')}
                    </Text>
                    <Input
                        right
                        placeholder="Town / City *"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.city}
                        onChangeText={val => this.onChangeText('city', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('City', this.state.city, 'required')}
                    </Text>
                    <Input
                        right
                        placeholder="Postcode / ZIP *"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.postCode}
                        onChangeText={val => this.onChangeText('postCode', val)}


                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Post code', this.state.postCode, 'required')}
                    </Text>
                    <Input
                        right
                        placeholder="Phone *"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.modile}
                        onChangeText={val => this.onChangeText('modile', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Phone', this.state.modile, 'required|numeric|max:10')}
                    </Text>
                    <Input
                        right
                        placeholder="Email address *"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.email}
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                    <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('Email', this.state.email, 'required|email')}
                    </Text>
                    <Button
                        style={styles.button}
                        color={nowTheme.COLORS.APP_BULE}
                        onPress={() => this.sendRequest()}
                    >
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase' }}
                            color={theme.COLORS.WHITE}
                        >
                            {/* Request Confirmation */}
                            {this.state.isLoding ?
                                <DotIndicator size={8} color='white' />
                                : "Request Confirmation"
                            }
                        </Text>
                    </Button>
                </Block>


            </Block>
        );
    };
    render() {
        return (
            <Block flex>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.renderCards()}
                </ScrollView>
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
        //  marginTop: theme.SIZES.BASE * 4,
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
        shadowOpacity: 0,

    },

    input: {
        // width: width - theme.SIZES.BASE * 4,
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
    titleTable: {
        // fontFamily: 'montserrat-bold',
        // marginTop: theme.SIZES.BASE,
        //  color: nowTheme.COLORS.HEADER,
        //   padding: theme.SIZES.BASE / 3,
        fontWeight: 'bold'

    },
    horizontalImage: {
        height: 160,
        width: 'auto',
        padding: theme.SIZES.BASE / 2,
    },
    item: {
        marginBottom: theme.SIZES.BASE / 2,
        // padding: theme.SIZES.BASE / 2
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
    orderText: {
        // fontFamily: 'montserrat-regularr',
        // marginTop: theme.SIZES.BASE,
        color: nowTheme.COLORS.HEADER,
        // marginBottom:theme.SIZES.BASE ,
        padding: theme.SIZES.BASE / 4,

    },
    errorMessage: {
        color: nowTheme.COLORS.ERROR,
        marginLeft: 4
    },
});
