import React from 'react';
import { ScrollView, StyleSheet, View,Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { FAB, Chip } from 'react-native-paper';
import { HeaderHeight, axiosInstance } from '../../constants/utils';

import { Images, nowTheme } from '../../constants/';
import { Card, Icon } from '../../components/';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UIActivityIndicator } from 'react-native-indicators';
import moment from "moment";
import * as ImagePicker from 'expo-image-picker';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labRequest: [],
            isLoding: true
        }
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {   
      //  this.setState({ isLoding: true })  
        this._retrieveData()
       })
    }
    componentWillUnmount(){   
        this._unsubscribe();
    }
    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const userId = await AsyncStorage.getItem('UserId');
            if (token !== null) {
                this.getLabRequest(userId)
            }
        } catch (error) {

        }
    };

    getLabRequest = (userId) => {
        axiosInstance.get('wp-json/wc/v3/orders?customer=' + userId)
            .then((response) => {
                //console.warn(response.data, "a")
                this.state.labRequest = response.data
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
        const ids = [2181]
        return (

            <Block style={styles.container}>
                {this.state.labRequest.map((res, index) => {
                    return (
                        ids.find(el=>el === res.line_items[0].product_id) ?
                        <Block key={index} row middle card >
                            <View style={{ backgroundColor: nowTheme.COLORS.SECONDARY, height: "100%", width: 8, marginRight: 2 }}></View>
                            <Text
                                color="black"
                                size={14}
                                style={styles.title}
                            >
                                {res.line_items[0].name}
                            </Text>
                            <Text
                                color="black"
                                size={14}
                                style={styles.title}
                            >
                             {res.currency} {res.total}
                            </Text>
                            <Text
                                color="black"
                                size={14}
                                style={styles.title}
                            >
                            { moment(res.date_created).format("DD-MM-YYYY")}
                            </Text>
                            <Block style={{ marginLeft: theme.SIZES.BASE/2 }} >
                                <Chip>{res.status}</Chip>
                            </Block>
                            <Block right style={{ marginLeft: theme.SIZES.BASE/2,marginRight: theme.SIZES.BASE/2 }}>
                                    {/* <Icon
                                    size={28}
                                    color={nowTheme.COLORS.DEFAULT}
                                    name="money-coins2x"
                                    family="NowExtra"
                                //style={styles.inputIcons}
                                /> */}
                                   <Image  source={Images.upload} style={styles.upload} />
                                </Block>
                        </Block>
                        :null
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
                        {/* <ActivityIndicator size="large" color={nowTheme.COLORS.APP_BACKGROUND}/> */}
                        <UIActivityIndicator color={nowTheme.COLORS.APP_BACKGROUND} />
                    </Block>
                }
                <FAB
                    style={styles.fab}
                    icon="plus"
                    color={nowTheme.COLORS.WHITE}
                    onPress={() => this.props.navigation.navigate('BenchType')}
                />                
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginTop: theme.SIZES.BASE * 5
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
    upload:{
        width:theme.SIZES.BASE*2,
        height:theme.SIZES.BASE*2
    }
});

export default Home;
