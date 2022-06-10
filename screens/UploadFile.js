import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, ScrollView, Dimensions, Picker, Platform, TouchableOpacity } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../constants/';
const regex = /(<([^>]+)>)/ig;
import moment, { duration } from "moment";
import { UIActivityIndicator } from 'react-native-indicators';
import * as ImagePicker from 'expo-image-picker';
const axios = require('axios');
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePrve: null,
            token: null,
            isLoding: true,
            imageFile: ""
        };
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isLoding: true })
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
            //  console.warn(token)
            if (token !== null) {
                this.setState({ token: token })
            }
        } catch (error) {
        }
    };
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
                   this.urlToObject(result.uri)
            })
        }

    };   

    urlToObject = async (fileUrl) => {
        if (fileUrl != "") {
            const response = await fetch(fileUrl);// here image is url/location of image
            const blob = await response.blob();
            const file = new File([blob], 'image.png', { type: blob.type });
            //console.log(file)
            this.setState({ imageFile: file })

        }
    }
     arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    uploadSlip = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${this.state.token}`,
                'content-Disposition': 'attachment;filename=image.png',
                'Content-Type': 'image/png'
            }
        };
        var data = {
            data: this.state.imagePrve 
        }        
        axios.post(
            'https://jrdc.lk/wp-json/wp/v2/media',
            data,
            config
        ).then((res) => {
            console.warn(res)
        }).catch((error) => {
            console.warn(error.response.data)
        });

    }
    renderCards = () => {
        const { navigation, route } = this.props;
        return (
            <Block style={styles.container}>
                <Block middle style={styles.page}>
                    <TouchableOpacity style={{ textAlign: "center", alignItems: "center" }} onPress={() => this.pickImage()} >
                        <Image source={Images.upload} />
                        <Text
                            style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase' }}
                            color={theme.COLORS.Block}
                        >
                            Cilck and open Image
                        </Text>
                    </TouchableOpacity>
                    <Block row middle>
                        <Image source={{ uri: this.state.imagePrve }} style={{ width: 300, height: 300 }} />
                    </Block>
                    <Block row>
                        <Block flex>
                            <Button
                                style={styles.button}
                                color={nowTheme.COLORS.APP_BULE}
                                onPress={() => this.uploadSlip()}                           >
                                <Text
                                    style={{ fontFamily: 'montserrat-bold', fontSize: 14, textTransform: 'uppercase' }}
                                    color={theme.COLORS.WHITE}
                                >
                                    Upload Slip
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
                {this.state.isLoding == true ?
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
    }
});
