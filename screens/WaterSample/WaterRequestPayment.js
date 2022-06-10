import React from 'react';
import { StyleSheet, StatusBar, ScrollView, Dimensions, Picker, Platform, View, Alert,Image } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstanceWaterModule } from '../../constants/utils';


import { UIActivityIndicator } from 'react-native-indicators';
import { RadioButton, Checkbox } from 'react-native-paper';
const stringify = require('qs-stringify')
import { Input } from '../../components';
import * as ImagePicker from 'expo-image-picker';
import { DataTable } from 'react-native-paper';
import SimpleReactValidator from 'simple-react-validator';
import { DotIndicator } from 'react-native-indicators';


export default class WaterRequestPayment extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoding: false,    
            selectedValue: "1",    
            checked: "matrix",  
            subMatrixId: 0,     
            matrixId: 0,
            subMatrxIds: [],
            setParameters: [],
            parametersIds: [],
            paymentData:"",
            requestId:"",
            comment:"",
            imagePrve:"",
            isbtnLoding:false,
            WaterUserId:0
        }
        this.validator = new SimpleReactValidator();
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoding: false })
             this.getWaterRequestPayment()    
             this._retrieveData()     
        });
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

                })
            }
        } catch (error) {

        }
    };
    getWaterRequestPayment = () => {
        axiosInstanceWaterModule.get('api/v1/get-payable-info/'+this.props.route.params.id)
            .then((response) => {          
               // var data = response.data.data
                this.setState({paymentData:response.data.data})     
            }).catch((error) => {
                console.log(error);
            });
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result.uri);
        if (!result.cancelled) {
            this.setState({ imagePrve: result.uri }, () => {            
            })
        }
    };   
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    sendPayment = () => {
        if (this.validator.allValid()) {
            this.setState({isbtnLoding:true})
            let formData = new FormData();    //formdata object     
            formData.append('user_id', this.state.WaterUserId);
            formData.append('request_id', this.props.route.params.id);
            formData.append('comment', this.state.comment);      
            formData.append('file_name', {
                uri: this.state.imagePrve,
                type: 'image/jpeg',
                name: 'image.jpg',
            });
            const config = {
                headers: {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            };
            axiosInstanceWaterModule.post('api/v1/payment', formData, config)
                .then((response) => {
                    this.setState({isbtnLoding:false})
                    Alert.alert(
                        "Thank you.Your request Payment complete",
                        "Your request payment confirmed",
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
                    console.log(error, "");
                });

        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    ok = () => {
        if (this.state.customerId != 0) {
            this.props.navigation.navigate('Water Test')
        } else {
            this.props.navigation.navigate('RequestWaterTest')
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
                    Request Order Id : {this.state.paymentData.request_id}
                   </Text>                
                    <Block style={styles.line}>                     
                        <Block>
                            {this.state.paymentData != "" ?
                                this.state.paymentData.data.map((res, index) => {
                                    return (
                                        <Block key={index} >
                                            <Block row >
                                                <Checkbox
                                                    value={res.sub_matrix_id}
                                                    status='checked'
                                                />
                                                <Text
                                                    size={14}
                                                    style={styles.title}
                                                    color={nowTheme.COLORS.HEADER}
                                                >
                                                    {res.matrix_text}</Text>
                                            </Block>
                                            <View style={{ backgroundColor: nowTheme.COLORS.SECONDARY,borderBottomWidth:1 }}></View>
 
                                            {res.matrix_next.map((res1, index1) => {
                                                return (
                                                    <Block key={index1}>
                                                         <Block row>
                                                        <Checkbox
                                                            value={res.sub_matrix_id}
                                                            status='checked'
                                                        />
                                                        <Text
                                                            size={14}
                                                            style={styles.title}
                                                            color={nowTheme.COLORS.HEADER}
                                                        >
                                                            {res1.sub_matrix_text}</Text>
                                                        </Block>
                                                        <View style={{ backgroundColor: nowTheme.COLORS.SECONDARY,borderBottomWidth:1 }}></View>
                                                        {res1.sub_matrix_next.map((res2, index2) => {
                                                            return (
                                                                <Block key={index2} row>
                                                                    <Checkbox
                                                                        value={res.sub_matrix_id}
                                                                        status='checked'
                                                                    />
                                                                    <Text
                                                                        size={14}
                                                                        style={styles.title}
                                                                        color={nowTheme.COLORS.HEADER}
                                                                    >
                                                                        {res2.parameter_text}</Text>
                                                                </Block>
                                                            )
                                                        })}
                                                    </Block>
                                                )
                                            })}
                                         </Block>
                                )
                            })
                            :null
                        }
                        </Block>
                    </Block>               
                    <Block>
                    <DataTable>
                     <DataTable.Row>
                            <DataTable.Cell>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Payable
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                  රු {this.state.paymentData.payable}
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
                                    Discount Value
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                  රු {this.state.paymentData.discount_value}
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
                                    Discount Rate
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                 රු {this.state.paymentData.discount_rate}
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
                                    Grand Total
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text
                                    size={16}
                                    style={styles.titleTable}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                 රු {this.state.paymentData.grand_total}
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>                      
                     </Block>          
                     <Block>
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Comment
                        </Text>
                        <Input
                        right
                        placeholder=" Comment *"
                        style={styles.input}
                        placeholderTextColor={nowTheme.COLORS.APP_BULE}
                        iconContent={<Block />}
                        value={this.state.comment}
                        onChangeText={val => this.onChangeText('comment', val)}
                        multiline = {true}
                        numberOfLines = {4}
                       />
                     </Block> 
                     <Block>
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                         File
                        </Text>
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase',textAlign:"center",marginBottom:theme.SIZES.BASE/2 }}
                            color={theme.COLORS.Block}
                            onPress={() => this.pickImage()}
                        >
                            Cilck and open File
                        </Text>
                        <Text
                        size={8}
                        style={styles.errorMessage}
                    >
                        {this.validator.message('File', this.state.imagePrve, 'required')}
                    </Text>
                        <Block row middle>
                            <Image source={{ uri: this.state.imagePrve }} style={{ width: 300, height: 300 }} />
                        </Block>
                     </Block> 
                     <Block row>
                        <Block flex>                      
                            <Button
                                style={styles.button}
                                color={nowTheme.COLORS.APP_BULE}
                                onPress={() => this.sendPayment()}
                            >
                                <Text
                                    style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase' }}
                                    color={theme.COLORS.WHITE}
                                >
                              
                                    {this.state.isbtnLoding ?
                                        <DotIndicator size={8} color='white' />
                                        : "Submit"
                                    }
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
        // width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
        //height: 150
        //justifyContent: "flex-start"
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
    line: {
        borderColor: "black",
        borderWidth: 1,
        marginBottom: theme.SIZES.BASE / 2,
    },
    titleParaHead: {
        fontFamily: 'montserrat-bold',
        padding: theme.SIZES.BASE / 2,
        textDecorationLine: 'underline'

    },
    titleTable: {     
        fontWeight: 'bold'
    },
    errorMessage: {
        color: nowTheme.COLORS.ERROR,
        marginLeft: 4
    },
});
