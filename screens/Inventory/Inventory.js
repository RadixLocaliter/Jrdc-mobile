import React from 'react';
import {  StyleSheet, StatusBar, ScrollView, Dimensions, Platform,TouchableWithoutFeedback, View} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstanceInventory } from '../../constants/utils';
import { Icon, Input, Card } from '../../components';
import { UIActivityIndicator } from 'react-native-indicators';

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            isdata: false,
            isLoding: true
        };
    }
    componentDidMount() {
        this.getInventory()
    }
    getInventory = () => {
        axiosInstanceInventory.get('api/warehouses')
            .then((response) => {
               // console.warn(response.data)
                this.state.inventory = response.data[0]
                this.setState({ isLoding: false })
            }).catch((error) => {
                console.log(error);
            });
    }
    renderCards = () => {
        const { navigation } = this.props;
        return (
            <Block style={styles.container}>
               <Block flex style={styles.item}>
                {this.state.inventory.map((res, index) => {
                    return (
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate("InventoryItem",{ screen: 'InventoryItem', params: { id: res.id } })}>
                        <Block  row middle card >
                              <View style={{ backgroundColor: nowTheme.COLORS.APP_BULE, height: "100%", width:8, marginRight: 2}}></View>
                                                       
                                <Text
                                    color="black"
                                    size={14}
                                    style={styles.title}
                                >
                                    {res.code}
                                </Text>

                                <Text
                                    color="black"
                                    size={14}
                                    style={styles.title}
                                >
                                    {res.name}
                                </Text>

                                {/* <Block style={{ marginLeft: theme.SIZES.BASE }} >
                                <Chip>Panding</Chip>
                            </Block> */}
                                <Block right flex style={{ marginRight: theme.SIZES.BASE }}>
                                    <Icon
                                        size={16}
                                        color={nowTheme.COLORS.DEFAULT}
                                        name="minimal-right2x"
                                        family="NowExtra"
                                    //style={styles.inputIcons}
                                    />
                                </Block>
                         
                        </Block>
                        </TouchableWithoutFeedback>
                    )
                })
                }
            </Block>
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
        marginTop: theme.SIZES.BASE * 5,
       // padding: theme.SIZES.BASE / 4,
    },
    item: {
        marginBottom: theme.SIZES.BASE / 2,
        // padding: theme.SIZES.BASE / 2
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        zIndex: 3,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
    },
    title: {
        fontFamily: 'montserrat-bold',
        paddingBottom: theme.SIZES.BASE,
        color: nowTheme.COLORS.HEADER,
        paddingTop: theme.SIZES.BASE,
        marginLeft: 6,
        width: 100
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
