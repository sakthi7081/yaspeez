import React from 'react';
import { View, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Icon, Select, SelectItem } from '@ui-kitten/components';
import { noImgUrl } from '../utils/data';
import { addOrUpdateCart } from '../utils/api';
import Cart from '../database/models/cart';
import User from '../database/models/user';
import { types } from 'expo-sqlite-orm';

const gold = '#F9A602';
const gray = '#eee';
const white = '#fff';

class ShopItem extends React.Component {
    state = {showDefault: false};

    onError = () => this.setState({showDefault: true});

    render() {
        const {image, bgColor} = this.props;
        const {showDefault} = this.state;
        const imgSource = {uri: showDefault ? noImgUrl : image};
        const resizeMode = showDefault ? 'contain' : 'cover';
        
        return (
            <ImageBackground source={imgSource} style={{ width: '100%', height: 240, position: 'relative', backgroundColor: bgColor }} onError={() => this.onError()} resizeMode={resizeMode}>
                <Icon style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 99 }} name='eye' height={24} width={24} fill={white} />
            </ImageBackground>
        );
    }
}

class ShopItemScreen extends React.Component {
    state = {
        tailleSelected: null,
        quantiteSelected: null,
        cartItemsCount: 0
    }

    goBack = () => this.props.navigation.goBack();

    goToCartScreen = () => {
        const {cartItemsCount} = this.state;
        if(cartItemsCount)
            this.props.navigation.navigate('Cart');
        else
            Alert.alert('Cart', 'No cart items available!');
    }

    onSelect = (selected, selectedOption) => { this.setState({ [selected]: selectedOption }); };

    addToCart = async (data, isBuyNow) => {
        const {navigation} = this.props;
        const queryOptions = {
            limit: 1,
            order: 'id DESC'
        };
        let users = await User.query(queryOptions);
        const {user_id} = users[0];
        const {tailleSelected, quantiteSelected} = this.state;
        if(!quantiteSelected || !tailleSelected){
            Alert.alert('Required', 'Please select size & quantity!');
            return false;
        }
        const {id, bgColor, image, name, points, price, quantite, size, type, variant_id, vat} = data;
        const sizeSelected = size[tailleSelected.row].text;
        const quantitySelected = quantite[quantiteSelected.row].text;
        
        const dataItems = {
            "ID":"0",
            "YUSER_ID": user_id.toString(),
            "SPRODUCT_ID": id.toString(),
            "SPRODUCTVARIENT_ID": variant_id.toString(),
            "QTY": quantitySelected.toString()
        };
        await addOrUpdateCart(dataItems)
                        .then(res => {
                            if(res && res.code === "200") {
                                let cartItem = {
                                    bgColor, image, points, price, vat, variant_id, 
                                    product_id: id,
                                    cart_id: 0,
                                    product_name: name,
                                    brand: type,
                                    quantity: quantitySelected,
                                    size: sizeSelected
                                };
                                let cart = new Cart(cartItem);
                                cart.save();
                                if(isBuyNow)
                                    navigation.navigate('Cart');
                            }
                        })
                        .catch(e => Alert.alert('Error', 'Some error occurred!'));
        
    }

    async componentDidMount() {
        const cart = await Cart.query();
        this.setState({cartItemsCount: cart.length});
    }

    async componentDidUpdate() {
        const cart = await Cart.query();
        this.setState({cartItemsCount: cart.length});
    }

    render() {
        const { tailleSelected, quantiteSelected, cartItemsCount } = this.state;
        const { route } = this.props;
        const { params } = route;
        const { image, name, type, points, bgColor, size, quantite, description, details } = params;

        return (
            <View style={{ flex:1 }}>
                <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
                        <Icon name="chevron-left" height={24} width={24} fill={white} />
                    </TouchableOpacity>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Shop</Text>
                  </View>
                  <TouchableOpacity style={{paddingVertical: 20, paddingHorizontal: 20}} onPress={this.goToCartScreen}>
                    <Icon name="shopping-cart" height={24} width={24} fill={white} />
                    <View style={{backgroundColor: 'red', width: 16, height: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, top: 15}}>
                        <Text style={{fontWeight: 'bold', color: white, fontSize: 10}}>{cartItemsCount}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: gray, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                    <Text style={{ paddingVertical: 10, fontWeight: 'bold' }}>{type}</Text>
                    <Text style={{ paddingVertical: 10, marginLeft: 4, fontWeight: 'bold' }}>{`|`}</Text>
                    <Text style={{ paddingVertical: 10, marginLeft: 4, paddingRight: 10 }}>{name}</Text>
                </View>
                <ScrollView style={{ backgroundColor: white, paddingHorizontal: 10 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row', margin: 5 }}>
                        <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: gray, margin: 5 }}>
                            <ShopItem {...{image, bgColor}} />
                        </View>
                        <View style={{ flex: 1, margin: 5 }}>
                            <Text>{type}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 4 }}>
                                <Icon name="bulb" height={15} width={15} fill={gold} />
                                <Text style={{ marginLeft: 3, fontWeight: 'bold' }}>{points}</Text>
                                <Text style={{ marginLeft: 3 }}>{`Points`}</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Taille</Text>
                            <Select size='small' style={{ flex: 1 }} data={size} placeholder='Taille' value={tailleSelected ? size[tailleSelected.row].text : ''} onSelect={selectedOption => this.onSelect('tailleSelected', selectedOption)}>
                                {size.map((sze, i) => (
                                    <SelectItem key={`select-size-${i}`} title={sze.text} />
                                ))}
                            </Select>
                            <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Qunatite</Text>
                            <Select size='small' style={{ flex: 1 }} data={quantite} placeholder='Quantite' value={quantiteSelected ? quantite[quantiteSelected.row].text : ''} onSelect={selectedOption => this.onSelect('quantiteSelected', selectedOption)}>
                                {quantite.map((quantit, i) => (
                                    <SelectItem key={`select-size-${i}`} title={quantit.text} />
                                ))}
                            </Select>
                            <TouchableOpacity style={{backgroundColor: '#0d4ae8', borderRadius: 5, marginTop: 10}} onPress={() => this.addToCart(params, 1)}>
                                <Text style={{color: '#fff', paddingVertical: 5, paddingHorizontal: 10, fontWeight: 'bold', textAlign: 'center'}}>Buy Now!</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: gold, borderRadius: 5, marginTop: 10}} onPress={() => this.addToCart(params, 0)}>
                                <Text style={{paddingVertical: 5, paddingHorizontal: 10, fontWeight: 'bold', textAlign: 'center'}}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>Description :</Text>
                        <Text>{description}</Text>
                        {details.length > 0 && (<Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>Details :</Text>)}
                        {details.length > 0 && details.map((v, i) => (
                            <Text key={`detail_text_${i}`}>{`- ${v}`}</Text>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ShopItemScreen;