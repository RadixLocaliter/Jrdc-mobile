import React from 'react';
import { StyleSheet, StatusBar, ScrollView, Dimensions, Picker, Platform, View, Alert } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstance, axiosInstanceWaterModule } from '../../constants/utils';
import AsyncStorage from '@react-native-async-storage/async-storage'

import moment, { duration } from "moment";
import { UIActivityIndicator } from 'react-native-indicators';
import { RadioButton, Checkbox } from 'react-native-paper';
const stringify = require('qs-stringify')

export default class SubmitTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoding: false,
            images: [],            
            selectedValue: "1",       
            checked: "matrix",
            matrixData: [],
            subMartixData: [],
            subMartixChecked: "",
            subMatrixId: 0,
            parameter: [],
            matrixId: 0,
            subMatrxIds: [],
            setParameters: [],
            parametersIds:[],
            WaterUserId:0,
            customerId:0
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoding: false })  
            this.getWaterMatrix()
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
    getWaterTest = () => {
        //  var roomId = this.props.route.params.id
        axiosInstance.get('wp-json/wc/v3/products/' + 1125)
            .then((response) => {
                var data = response.data
                this.setState({ isLoding: false, price_html: data.price_html, price: data.price, description: data.description, dayPrice: data.price, roomName: data.name })
            }).catch((error) => {
                console.log(error);
            });
    }
    getWaterMatrix = () => {
        axiosInstanceWaterModule.get('api/v1/get-matrix')
            .then((response) => {
                var data = response.data.data
                this.setState({ matrixData: data })
            }).catch((error) => {
                console.log(error);
            });
    }
    setSelectedValue = (itemValue) => {
        this.setState({ selectedValue: itemValue }, () => {
            var price = this.state.dayPrice
            this.setState({ price: price })
        })
    }
    setChecked = (value) => {
        this.setState({ checked: value })
        if (value == "matrix") {
            this.getWaterMatrix()
        } else if (value == "subMatrix") {
            this.getSubMatrix()
        }
    }
    setCheckedSubMartix = (value) => {
        this.setState(
            (state) => ({
                subMatrxIds: [...state.subMatrxIds, value],
            }),
            () => {             
                this.getParameters(value)
            },
        )
    }
    // onLevelChange = (e, position) => {
    //     var isChecked = e.target.checked
    //     if (isChecked == true) {
    //       this.setState(
    //         (state) => ({
    //           levelVal: [...state.levelVal, e.target.value],
    //         }),
    //         () => {

    //         },
    //       )
    //     } else {
    //       var removeArry = this.state.levelVal
    //       var index = removeArry.indexOf(e.target.value)
    //       removeArry.splice(index, 1)
    //       this.setState({ levelVal: removeArry }, () => {

    //       })
    //     }
    //   }

    setCheckedMatrix = (value) => {
        this.setState({ matrixId: value,subMatrxIds:[],parameter:[] }, () => {
            this.getSubMatrixWithId(value)
        })
    }
    setCheckedParameters=(value)=>{

    }
    getSubMatrixWithId = (id) => {
        axiosInstanceWaterModule.get('api/v1/get-sub-matrix/matrix/' + id)
            .then((response) => {
                var data = response.data.data
                this.setState({ subMartixData: data })
            }).catch((error) => {
                console.log(error);
            });
    }
    getParameters = (id) => {
        axiosInstanceWaterModule.get('api/v1/get-parameter/sub-matrix/' + id)
            .then((response) => {
                var data = response.data
                this.state.parameter.push(data)  

                data.data.map((res, index) => {
                     this.state.parametersIds.push(res.parameter_id)
                })               
                
                this.state.setParameters.push({ sub_matrix: id, parameters: this.state.parametersIds })
                this.setState({ data: true })
            }).catch((error) => {
                console.log(error);
            });
    }
    getSubMatrix = () => {
        axiosInstanceWaterModule.get('api/v1/get-sub-matrix')
            .then((response) => {
                var data = response.data.data
                this.setState({ subMartixData: data })
            }).catch((error) => {
                console.log(error);
            });
    }
    saveMatrix = () => {
        var type = 3
        if (this.state.checked == "matrix") {
            type = 1
        } else if (this.state.checked == "subMatrix") {
            type = 2
        }
        let formData = new FormData();    //formdata object
        formData.append('selection_type', type);
        formData.append('user_id', this.state.WaterUserId);
        formData.append('matrix', this.state.matrixId);
        formData.append('sub_matrix', JSON.stringify(this.state.subMatrixId));
        formData.append('parameters', JSON.stringify(this.state.setParameters));   

        const config = {
            headers: {
                headers: { 'content-type': 'multipart/form-data' }
            }
        };
        axiosInstanceWaterModule.post('api/v1/save-selection', formData, config)
            .then((response) => {   
                this.saveRequest()       
            }).catch((error) => {
                console.log(error, "");
            });
    }
    saveRequest = () => {     
        let formData = new FormData();      
        formData.append('user_id', this.state.WaterUserId);  
        const config = {
            headers: {
                headers: { 'content-type': 'multipart/form-data' }
            }
        };
        axiosInstanceWaterModule.post('api/v1/save-request', formData, config)
            .then((response) => {
                Alert.alert(
                    "Thank you.Your request has been received",
                    "Your request is awaiting confirmation. You will be notified by email as soon as we've confirmed availability",
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
                        Select options
                    </Text>
                    <Block row>
                        <RadioButton
                            value="matrix"
                            status={this.state.checked === 'matrix' ? 'checked' : 'unchecked'}
                            onPress={() => this.setChecked('matrix')}
                        />
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Matrix</Text>
                        <RadioButton
                            value=" subMatrix"
                            status={this.state.checked === 'subMatrix' ? 'checked' : 'unchecked'}
                            onPress={() => this.setChecked('subMatrix')}
                        />
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Sub Matrix</Text>
                        <RadioButton
                            value="parameters"
                            status={this.state.checked === 'Parameters' ? 'checked' : 'unchecked'}
                            onPress={() => this.setChecked('parameters')}
                        />
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Parameters</Text>
                    </Block>
                    <Block style={styles.line}>
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Matrix
                        </Text>
                        <Block>
                            {this.state.matrixData.map((res, index) => {
                                return (
                                    <Block key={index} row>
                                        <RadioButton
                                            value={res.matrix_id}
                                            status={this.state.matrixId === res.matrix_id ? 'checked' : 'unchecked'}
                                            onPress={() => this.setCheckedMatrix(res.matrix_id)}
                                        />
                                        <Text
                                            size={14}
                                            style={styles.title}
                                            color={nowTheme.COLORS.HEADER}
                                        >
                                            {res.name}</Text>
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block style={styles.line}>
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Sub Matrix
                        </Text>
                        <Block>
                            {this.state.subMartixData.map((res, index) => {
                                return (
                                    <Block key={index} row>
                                        <Checkbox
                                            value={res.sub_matrix_id}
                                            status={this.state.subMatrxIds.find(obj=>obj == res.sub_matrix_id) == res.sub_matrix_id ? 'checked' : 'unchecked'}
                                            onPress={() => { this.setCheckedSubMartix(res.sub_matrix_id) }}
                                        />
                                        <Text
                                            size={14}
                                            style={styles.title}
                                            color={nowTheme.COLORS.HEADER}
                                        >
                                            {res.name}</Text>
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block style={styles.line}>
                        <Text
                            size={14}
                            style={styles.title}
                            color={nowTheme.COLORS.HEADER}
                        >
                            Parameters
                        </Text>
                        <Block>
                            {this.state.parameter.map((res, index) => {
                                return (
                                    <>
                                        <Text                                       
                                            size={14}
                                            style={styles.titleParaHead}
                                            color={nowTheme.COLORS.HEADER}
                                            key={index}
                                        >
                                            {res.data[0].name}
                                        </Text>
                                        {res.data.map((resm, indexm) => {
                                            return (
                                                <Block key={indexm} row>
                                                    <Checkbox
                                                        value={res.parameter_id}
                                                        status={this.state.parametersIds.find(obj=>obj == res.parameter_id) == res.parameter_id ? 'checked' : 'unchecked'}
                                                        onPress={() => { this.setCheckedParameters(res.parameter_id) }}
                                                    />
                                                    <Text
                                                        size={14}
                                                        style={styles.title}
                                                        color={nowTheme.COLORS.HEADER}
                                                    >
                                                        {resm.parameter}</Text>
                                                </Block>
                                            )

                                        })
                                        }
                                    </>
                                )
                            })}
                        </Block>
                    </Block>

                    {/* <View style={styles.duration}>
                        <Picker
                            selectedValue={this.state.selectedValue}
                            style={{ height: 40 }}
                            onValueChange={(itemValue) =>this.setSelectedValue(itemValue)}                        >
                            <Picker.Item label="Fertilizer - Diammonium Phosphate" value="1" />
                            <Picker.Item label="Fertilizer - Triple Super Phosphate" value="2" /> 
                            <Picker.Item label="Fertilizer - Ground Rock Phosphates" value="3" />  
                            <Picker.Item label="Agriculture Chemicals - Ammonium Sulphate" value="4" />  
                            <Picker.Item label="Agriculture Chemicals - Zinc Sulphate (Agricultural Grade)" value="6" />                            
                        </Picker>
                    </View>  */}
                    {/* 
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
                                රු {this.state.price + ".00"}
                            </Text>
                        </Block>
                    </Block> */}

                    <Block row>
                        <Block flex>
                            {/* <Button
                                style={styles.button}
                                color={nowTheme.COLORS.APP_BULE}
                                onPress={() => navigation.navigate('WaterTestRequest', {
                                    screen: 'WaterTestRequest',
                                    params: {
                                        selectDate: this.state.selected,
                                        roomName: this.state.roomName,
                                        noOfDays: this.state.noOfDays,
                                        noOfRooms: this.state.noOfRooms,
                                        price: this.state.price,
                                        productId: 1125,
                                        selectTime: this.state.time,
                                        noOfHours: this.state.selectedValue
                                    }
                                })}
                            >
                                <Text
                                    style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase' }}
                                    color={theme.COLORS.WHITE}
                                >
                                    Request Test
                                </Text>
                            </Button> */}
                            <Button
                                style={styles.button}
                                color={nowTheme.COLORS.APP_BULE}
                                onPress={() => this.saveMatrix()

                                }
                            >
                                <Text
                                    style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase' }}
                                    color={theme.COLORS.WHITE}
                                >
                                    Send
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
});
