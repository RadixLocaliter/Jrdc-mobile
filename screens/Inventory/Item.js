import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, ScrollView, Dimensions, Platform, ActivityIndicator, Alert } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme, articles } from '../../constants/';
import { HeaderHeight, axiosInstanceInventory } from '../../constants/utils';
import { DataTable } from 'react-native-paper';
import { UIActivityIndicator } from 'react-native-indicators';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isdata: false,
            isLoding: true,
        };     
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {   
            this.setState({ isLoding: true })
            this.getItem()        
        });      
    }
    componentWillUnmount(){   
        this._unsubscribe();
    }

    getItem = () => {
        var id = this.props.route.params.id
        axiosInstanceInventory.get('api/warehouses/' + id)
            .then((response) => {
              //  console.warn(response.data)
                this.state.items = response.data
                this.setState({ isLoding: false })
            }).catch((error) => {
                console.log(error);
            });
    }

    renderCards = () => {
        const { navigation } = this.props;
        return (
            <Block style={styles.container}>
                {/* <Block row>
                    <Text
                        size={14}
                        style={styles.title}
                        color={nowTheme.COLORS.HEADER}
                    >
                        Your order
                    </Text>
                </Block> */}
                <Block card style={styles.item}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title >
                                <Text
                                    size={16}
                                    style={styles.title}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Name
                                </Text>
                            </DataTable.Title>
                            <DataTable.Title >
                                <Text
                                    size={16}
                                    style={styles.title}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Code
                                </Text>

                            </DataTable.Title>
                            <DataTable.Title >
                                <Text
                                    size={16}
                                    style={styles.title}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Unit of Measure
                                </Text>

                            </DataTable.Title>
                            <DataTable.Title numeric>
                                <Text
                                    size={16}
                                    style={styles.title}
                                    color={nowTheme.COLORS.HEADER}
                                >
                                    Quantity
                                </Text>

                            </DataTable.Title>
                        </DataTable.Header>
                        {this.state.items.map((res, index) => {
                            return (
                                <Block key={index}>
                                    <DataTable.Row>
                                        <DataTable.Cell>
                                            <Text
                                                size={14}
                                                style={styles.titleTable}
                                                color={nowTheme.COLORS.HEADER}
                                            >
                                                {res.name}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text
                                                size={14}
                                                style={styles.titleTable}
                                                color={nowTheme.COLORS.HEADER}
                                            >
                                                {res.code}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            <Text
                                                size={14}
                                                style={styles.titleTable}
                                                color={nowTheme.COLORS.HEADER}
                                            >
                                                {res.uom}
                                            </Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            <Text
                                                size={14}
                                                style={styles.titleTable}
                                                color={nowTheme.COLORS.HEADER}
                                            >
                                              {res.qty}
                                            </Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>                                 
                                </Block>
                            )
                        })
                        }

                    </DataTable>
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
        marginTop: theme.SIZES.BASE * 4,
        padding: theme.SIZES.BASE / 4,
    },
      title: {
        fontFamily: 'montserrat-bold',
        // marginTop: theme.SIZES.BASE,
        color: nowTheme.COLORS.HEADER,
        // marginBottom:theme.SIZES.BASE ,
        padding: theme.SIZES.BASE / 2,
    },
    titleTable: {
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
});
