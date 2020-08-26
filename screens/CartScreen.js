import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text, Icon, CheckBox } from '@ui-kitten/components';
import { apiImg } from '../utils/data';

const CartItem = ({item}) => {
  const [count, setCount] = useState(item.count);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10, borderRadius: 5, borderColor: '#ddd', borderWidth: 1, padding: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1}}>
        {/* <CheckBox style={{marginTop: 5}} /> */}
        <Image source={{uri: `${apiImg}?random=${new Date().getTime()}`}} style={{height: 55, width: 55, backgroundColor: '#eee', borderRadius: 5, borderColor: '#eee', borderWidth: 1}} />
        <View style={{marginLeft: 10, flexDirection: 'column'}}>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>{item.name}</Text>
          <Text style={{fontWeight: 'bold', color: '#999', fontSize: 14}}>{item.price}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={{padding: 5, backgroundColor: '#0d4ae8', borderRadius: 25}} onPress={() => setCount(count - 1)}>
          <Icon name="minus-outline" fill="#fff" height={16} width={16} />
        </TouchableOpacity>
        <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>{count.toString().length === 1 ? `0${count}` : count}</Text>
        <TouchableOpacity style={{padding: 5, backgroundColor: '#0d4ae8', borderRadius: 25}} onPress={() => setCount(count + 1)}>
          <Icon name="plus-outline" fill="#fff" height={16} width={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const cartItems = [
  {name: 'T-Shirt', price: '$24.00', count: 1},
  {name: 'Torso', price: '$69.00', count: 4},
  {name: 'Bat', price: '$78.00', count: 1},
  {name: 'Gloves', price: '$48.00', count: 3},
]

export default class CartScreen extends React.Component {
  goBack = () => this.props.navigation.goBack();

  goToCheckout = () => this.props.navigation.navigate('Checkout');

  render() {
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
          {cartItems.map((cartItem, i) => (<CartItem key={`cart-item-${i}`} item={cartItem} />))}
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderColor: '#ddd'}}>
          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 18}}>Total:</Text>
            <Text style={{fontSize: 20, marginLeft: 5, fontWeight: 'bold'}}>$522.00</Text>
          </View>
          <TouchableOpacity style={{backgroundColor: '#0d4ae8', padding: 10, borderRadius: 5}} onPress={this.goToCheckout}>
            <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}