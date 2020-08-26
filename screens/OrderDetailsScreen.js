import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

const {width} = Dimensions.get('window');

export default class OrderDetailsScreen extends React.Component {
  goBack = () => this.props.navigation.goBack();

  getOrderStatus = status => {
    let retStatus = 'Delivered';
    switch(status) {
      case 1: 
        retStatus = 'Delivered';
        break;
      case 2: 
        retStatus = 'Yet to be delivered';
        break;
      default: 
        retStatus = 'Cancelled';
    }

    return retStatus;
  }

  getOrderStatusColor = status => {
    let retStatus = '#32CD3270';
    switch(status) {
      case 1: 
        retStatus = '#32CD3270';
        break;
      case 2: 
        retStatus = '#FF7F5080';
        break;
      default: 
        retStatus = '#B2222270';
    }

    return retStatus;
  }

  render() {
    const {route} = this.props;
    const {params} = route;
    const {order} = params;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Order #{order.id}</Text>
          </View>
        </View>
        <ScrollView style={{flex: 1, marginBottom: 20, marginTop: 10, paddingHorizontal: 15}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 15, borderBottomWidth: 1, borderColor: '#eee'}}>
            <View>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>{order.name}</Text>
              <Text style={{color: '#00000080'}}>{order.desc}</Text>
              <Text style={{color: '#ccc'}}>Ordered On: {order.date}</Text>
              <Text style={{color: '#ccc'}}>Seller: {order.seller}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 32}}>${order.price * order.quantity}</Text>
            </View>
            <Image source={{uri: order.image}} style={{width: 100, height: 100, backgroundColor: '#00000080', borderRadius: 5, borderWidth: 1, borderColor: '#eee'}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee'}}>
            <Text style={{fontWeight: 'bold'}}>Order Status</Text>
            <View style={{backgroundColor: this.getOrderStatusColor(order.status), borderRadius: 5, paddingVertical: 3, paddingHorizontal: 10}}>
              <Text>{this.getOrderStatus(order.status)}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Shipping Address</Text>
            <View style={{marginTop: 5}}>
              <Text style={{marginBottom: 2, fontWeight: 'bold', fontSize: 18}}>{order.address.name}</Text>
              <Text style={{marginBottom: 2, fontSize: 14, color: '#00000080'}}>{order.address.address}</Text>
              <Text style={{marginBottom: 2, fontSize: 14, color: '#00000080'}}>{order.address.phoneNo}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Price Details</Text>
            <View style={{marginTop: 5}}>
              <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'flex-end', width: width - 30}}>
                <Text style={{fontSize: 16, color: '#00000080', fontWeight: 'bold'}}>Subtotal</Text>
                <Text style={{fontSize: 16, color: '#00000080', marginLeft: 5, fontWeight: 'bold'}}>${(order.price - 30) * order.quantity}</Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'flex-end', width: width - 30}}>
                <Text style={{fontSize: 16, color: '#00000080', fontWeight: 'bold'}}>Shipping Fee</Text>
                <Text style={{fontSize: 16, color: '#00000080', marginLeft: 5, fontWeight: 'bold'}}>${parseFloat(30).toFixed(2)}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: width - 30}}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>Subtotal</Text>
                <Text style={{fontSize: 24, marginLeft: 5, fontWeight: 'bold'}}>${order.price + 30}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderColor: '#ddd'}}>
          <TouchableOpacity style={{backgroundColor: '#0d4ae8', padding: 10, borderRadius: 5}}>
            <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Share Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}