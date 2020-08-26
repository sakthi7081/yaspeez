import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

const {width} = Dimensions.get('window');

const shipping = [
  {name: 'Home', phoneNo: '(319) 555-0115', address: '1749 Wheeler Ridge'},
  {name: 'Office', phoneNo: '(207) 555-0119', address: '482 W Dallas St, Newyork'},
];

const orders = [
  {id: '2485', name: 'Running Shoes', address: shipping[0], image: 'https://rukminim1.flixcart.com/image/880/1056/jr83gy80/shoe/8/z/f/uberschall-f4-8-adidas-black-original-imafd2mbnrkawhgd.jpeg?q=50', status: 1, date: '22-08-2020', desc: '9 | Orange', quantity: 1, price: 300.49, seller: 'Yaspeez'},
  {id: '2799', name: 'Nivia Football', address: shipping[1], image: 'https://rukminim1.flixcart.com/image/416/416/jjolt3k0/ball/j/b/6/400-22-5-country-colour-1-1360br-football-nivia-original-imaf746mud9cxqgh.jpeg?q=70', status: 2, date: '17-07-2020', desc: 'Normal | Yellow', quantity: 2, price: 45.00, seller: 'SS Pondy Club'},
  {id: '2864', name: 'Bean Bag', address: shipping[1], image: 'https://rukminim1.flixcart.com/image/416/416/jv2p6kw0/bean-bag-cover/x/5/s/small-diagio-comfybean-original-imaf6fgugdzvghys.jpeg?q=70', status: 3, date: '13-06-2020', desc: 'XXXL | Brown', quantity: 2, price: 1899.00, seller: 'SDLC Center'},
];

const OrderListItem = ({order, gotoOrderDetails}) => (
  <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#00000010', padding: 10, borderRadius: 10, marginVertical: 5}} onPress={() => gotoOrderDetails(order)}>
    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
      {/* <Icon name='layers-outline' height={36} width={36} fill="#0d4ae8" /> */}
      <Image source={{uri: order.image}} style={{height: 56, width: 56, backgroundColor: '#00000080', borderRadius: 5, borderWidth: 1}} />
      <View style={{marginLeft: 8}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 24}}>#{order.id}</Text>
        <Text numberOfLines={1} style={{fontSize: 16, color: '#00000080'}}>{order.name}</Text>
      </View>
    </View>
    <Icon name="chevron-right" height={32} width={32} fill="#0d4ae8" />
  </TouchableOpacity>
);

export default class OrderScreen extends React.Component {
  goBack = () => this.props.navigation.goBack();

  gotoOrderDetails = order => this.props.navigation.navigate('OrderDetails', {order});

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Orders</Text>
          </View>
        </View>
        {orders.length > 0 && (
          <ScrollView style={{flex: 1, marginBottom: 20, marginTop: 10, paddingHorizontal: 15}}>
            {orders.map((order, i) => <OrderListItem gotoOrderDetails={this.gotoOrderDetails} key={`order-list-item-${i}`} {...{order}} />)}
          </ScrollView>
        )}
        {orders.length === 0 && (
          <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/images/account/empty1.png')} style={{width: width - 40, height: 250}} />
            <Text style={{fontSize: 20, color: '#00000080', marginTop: 10}}>No orders avaialable!</Text>
          </View>
        )}
      </View>
    )
  }
}