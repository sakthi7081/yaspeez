import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Text, Icon, CheckBox } from '@ui-kitten/components';
// import User from '../database/models/user';
import Cart from '../database/models/cart';
import { noImgUrl } from '../utils/data';

class CartImage extends React.Component {
  state = {showDefault: false};

  onError = () => this.setState({showDefault: true}); 
  
  render() {
    const {showDefault} = this.state;
    const {image, bgColor} = this.props;
    const imgSource = {uri: showDefault ? noImgUrl : image};
    const resizeMode = showDefault ? 'contain' : 'cover';
    return (
      <ImageBackground source={imgSource} resizeMode={resizeMode} onError={this.onError} style={{height: 55, width: 55, backgroundColor: bgColor, borderRadius: 15, borderColor: bgColor, borderWidth: 1, overflow: 'hidden'}} />
    )
  }
};

class CartItem extends React.Component{
  setQuantity = quantity => {
    const {item, updateCartItem} = this.props;
    updateCartItem({...item, quantity})
    this.setState({quantity});
  }

  constructor(props) {
    super(props);
    const {item} = this.props;
    this.state = {quantity: item.quantity};
  }

  render() {
    const {quantity} = this.state;
    const {item} = this.props;
    if(!quantity)
      return null;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10, borderRadius: 5, borderColor: '#ddd', borderWidth: 1, padding: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1}}>
          {/* <CheckBox style={{marginTop: 5}} /> */}
          <CartImage {...{image: item.image, bgColor: item.bgColor}} />
          <View style={{marginLeft: 10, flexDirection: 'column'}}>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>{item.product_name}</Text>
            <Text style={{fontWeight: 'bold', color: '#999', fontSize: 14}}>{item.price}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{padding: 5, backgroundColor: '#0d4ae8', borderRadius: 25}} onPress={() => this.setQuantity(quantity - 1)}>
            <Icon name="minus-outline" fill="#fff" height={16} width={16} />
          </TouchableOpacity>
          <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>{quantity.toString().length === 1 ? `0${quantity}` : quantity}</Text>
          <TouchableOpacity style={{padding: 5, backgroundColor: '#0d4ae8', borderRadius: 25}} onPress={() => this.setQuantity(quantity + 1)}>
            <Icon name="plus-outline" fill="#fff" height={16} width={16} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// const cartItems = [
//   {name: 'T-Shirt', price: '$24.00', count: 1},
//   {name: 'Torso', price: '$69.00', count: 4},
//   {name: 'Bat', price: '$78.00', count: 1},
//   {name: 'Gloves', price: '$48.00', count: 3},
// ];

export default class CartScreen extends React.Component {
  state = {cartItem: [], cartPrice: 0};

  goBack = () => this.props.navigation.goBack();

  goToCheckout = () => this.props.navigation.navigate('Checkout');

  updateCartItem = async (cartItem) => {
    const {id, quantity} = cartItem;
    let cart = await Cart.find(id);
    cart.quantity = quantity;
    cart.save();
    if(quantity === 0) {
      Cart.destroy(id);
    }
    await this.updateCart();
  }
  
  updateCart = async () => {
    const cart = await Cart.query();
    if(cart && cart.length > 0) {
      let price = 0;
      cart.map(cartItem => {
        price += (parseFloat(cartItem.points) * parseInt(cartItem.quantity));
      });
      this.setState({cartItems: cart, cartPrice: price});
    } else {
      this.goBack();
    }
  }

  async componentDidMount() {
    await this.updateCart();
  }

  render() {
    const {cartItems, cartPrice} = this.state;

    return (
      <View style={{ flex:1 }}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Cart</Text>
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          {cartItems && cartItems.map((cartItem, i) => (<CartItem key={`cart-item-${i}`} item={cartItem} updateCartItem={this.updateCartItem} />))}
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderColor: '#ddd'}}>
          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 18}}>Total:</Text>
            <Text style={{fontSize: 20, marginLeft: 5, fontWeight: 'bold'}}>${parseFloat(cartPrice).toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={{backgroundColor: '#0d4ae8', padding: 10, borderRadius: 5}} onPress={this.goToCheckout}>
            <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}