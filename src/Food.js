import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';


var { height, width } = Dimensions.get("window");
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataBanner: [],
            dataCategories: [],
            dataFood: [],
            selectCatg: 0
        }
    }

    componentDidMount() {
        const url = "http://tutofox.com/foodapp/api.json"
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataBanner: responseJson.banner,
                    dataCategories: responseJson.categories,
                    dataFood: responseJson.food
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.banner}>
                        <Image style={styles.imageLogo} resizeMode="contain" source={{ uri: 'http://tutofox.com/foodapp/foodapp.png' }} />
                        <Swiper style={styles.swiper} showsButtons={false} autoplay={true} autoplayTimeout={2}>
                            {
                                this.state.dataBanner.map((itemmap) => {
                                    return (
                                        <Image style={styles.imageBanner} resizeMode="contain" source={{ uri: itemmap }} />
                                    )
                                })
                            }
                        </Swiper>
                        <View style={{ height: 20 }} />
                    </View>

                    <View style={styles.categoryContainer}>
                        {/* <Text style={styles.titleCatg}>Categories {this.state.selectCatg}</Text> */}
                        <View style={{ height: 10 }} />
                        <FlatList
                            horizontal={true}
                            data={this.state.dataCategories}
                            renderItem={({ item }) => this.renderItems(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <FlatList
                            //horizontal={true}
                            data={this.state.dataFood}
                            numColumns={2}
                            renderItem={({ item }) => this.renderItemFood(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={{ height: 20 }} />
                    </View>

                </View>
            </ScrollView>
        );
    }

    renderItems(item) {
        return (
            <TouchableOpacity style={[styles.divCategory, { backgroundColor: item.color }]}
                onPress={() => this.setState({ selectCatg: item.id })}>
                <Image
                    style={styles.categoryImage}
                    resizeMode="contain"
                    source={{ uri: item.image }} />
                <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    renderItemFood(item) {
        let catg = this.state.selectCatg
        if (catg == 0 || catg == item.categorie) {
            return (
                <TouchableOpacity style={styles.divFood}>
                    <Image
                        style={styles.imageFood}
                        resizeMode="contain"
                        source={{ uri: item.image }} />
                    <View style={styles.foodContainer} />
                    <Text style={styles.foodTitle}>
                        {item.name}
                    </Text>
                    <Text>Descp Food and Details</Text>
                    <Text style={styles.foodDetails}>${item.price}</Text>

                    <TouchableOpacity style={styles.cartLink} onPress={()=>this.onClickAddCart(item)}>
                        <Text style={styles.cartText}>Add to cart</Text>
                        <View style={{width:10}} />
                        <Icon name="ios-add-circle" size={30} color={"white"} />
                    </TouchableOpacity>

                </TouchableOpacity>
            )
        }
        
    }
    onClickAddCart(data) {

        const itemcart = {
          food: data,
          quantity:  1,
          price: data.price
        }
     
        AsyncStorage.getItem('cart').then((datacart)=>{
            if (datacart !== null) {
              // We have data!!
              const cart = JSON.parse(datacart)
              cart.push(itemcart)
              AsyncStorage.setItem('cart',JSON.stringify(cart));
            }
            else{
              const cart  = []
              cart.push(itemcart)
              AsyncStorage.setItem('cart',JSON.stringify(cart));
            }
            alert("Add Cart")
          })
          .catch((error)=>{
            alert(error)
          })
      }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    banner: {
        width: width,
        alignItems: 'center'
    },
    imageLogo: {
        height: 60,
        width: width / 2,
        margin: 10
    },
    swiper: {
        height: width / 2
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    },
    categoryContainer: {
        width: width,
        borderRadius: 20,
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    divCategory: {
        backgroundColor: 'red',
        margin: 5,
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },
    titleCatg: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    imageFood: {
        width: ((width / 2) - 20) - 10,
        height: ((width / 2) - 20) - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    divFood: {
        width: (width / 2) - 20,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        shadowOpacity: 0.3,
        shadowRadius: 50,
        backgroundColor: 'white',
    },
    categoryImage: {
        width: 100,
        height: 80,
    },
    categoryText: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    foodContainer: {
        height: ((width / 2) - 20) - 90,
        backgroundColor: 'transparent',
        width: ((width / 2) - 20) - 10
    },
    foodTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    foodDetails: {
        fontSize: 20,
        color: "green"
    },
    cartLink: {
        width: (width / 2) - 40,
        backgroundColor: '#33c37d',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
        padding: 4
    },
    cartText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold"
    },
})