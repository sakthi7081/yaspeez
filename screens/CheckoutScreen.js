import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text, Icon, CheckBox, Radio, RadioGroup } from '@ui-kitten/components';
import { apiImg } from '../utils/data';

const addresses = [
  {name: 'Home', phoneNo: '(319) 555-0115', address: '1749 Wheeler Ridge'},
  {name: 'Office', phoneNo: '(207) 555-0119', address: '482 W Dallas St, Newyork'},
]

export default class CheckoutScreen extends React.Component {
  state = {selectedIndex: 0, addressSelectedIndex: 0};

  goBack = () => this.props.navigation.goBack();

  goToAddress = () => this.props.navigation.navigate('AddAddress');

  changeSelectedIndex = selectedIndex => this.setState({selectedIndex});
  
  changeAddressSelectedIndex = addressSelectedIndex => this.setState({addressSelectedIndex});

  render() {
    const {selectedIndex, addressSelectedIndex} = this.state;

    return (
      <View style={{ flex:1 }}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Checkout</Text>
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={{marginHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Shipping To</Text>
            <View>
              {addresses.map((address, i) => (
                <TouchableOpacity onPress={() => this.changeAddressSelectedIndex(i)} key={`address-item-${i}`} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginVertical: 5}}>
                  <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1}}>
                    <Radio style={{marginTop: 6}} checked={addressSelectedIndex === i} />
                    <View style={{marginLeft: 10}}>
                      <Text style={{marginBottom: 5, fontWeight: 'bold', fontSize: 24}}>{address.name}</Text>
                      <Text style={{marginBottom: 5, fontSize: 16, color: '#00000080'}}>{address.phoneNo}</Text>
                      <Text style={{marginBottom: 5, fontSize: 16, color: '#00000080'}}>{address.address}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Icon name="edit" height={24} width={24} fill="#0d4ae8" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={{borderWidth: 2, borderStyle: 'dashed', borderColor: '#0d4ae8', borderRadius: 5, justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 10}} onPress={this.goToAddress}>
                <Icon name="plus-square-outline" fill="#0d4ae8" height={36} width={36} />
                <Text style={{color: '#0d4ae8', fontWeight: 'bold', fontSize: 16, marginTop: 5}}>Add Shipping Address</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginTop: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Payment Method</Text>
            <View>
              <RadioGroup selectedIndex={selectedIndex} onChange={this.changeSelectedIndex}>
                <TouchableOpacity onPress={() => this.changeSelectedIndex(0)} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{paddingVertical: 5, paddingHorizontal: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 10}}>
                      <Image source={require('../assets/images/checkout/mastercard.png')} style={{height: 28, width: 28, backgroundColor: '#eee'}} />
                    </View>
                    <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>Credit Card</Text>
                  </View>
                  <View>
                    <Radio checked={selectedIndex === 0} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeSelectedIndex(1)} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{paddingVertical: 5, paddingHorizontal: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 10}}>
                      <Image source={require('../assets/images/checkout/paypal.png')} style={{height: 28, width: 28, backgroundColor: '#eee'}} />
                    </View>
                    <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>Paypal</Text>
                  </View>
                  <View>
                    <Radio checked={selectedIndex === 1} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeSelectedIndex(2)} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{paddingVertical: 5, paddingHorizontal: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 10}}>
                      <Image source={require('../assets/images/checkout/google.png')} style={{height: 28, width: 28, backgroundColor: '#eee'}} />
                    </View>
                    <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>Google Pay</Text>
                  </View>
                  <View>
                    <Radio checked={selectedIndex === 2} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeSelectedIndex(3)} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{paddingVertical: 5, paddingHorizontal: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 10}}>
                      <Image source={require('../assets/images/checkout/apple.png')} style={{height: 28, width: 28, backgroundColor: '#eee'}} />
                    </View>
                    <Text style={{marginLeft: 10, fontSize: 16, fontWeight: 'bold'}}>Apple Pay</Text>
                  </View>
                  <View>
                    <Radio checked={selectedIndex === 3} />
                  </View>
                </TouchableOpacity>
              </RadioGroup>
            </View>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15, borderTopWidth: 1, borderColor: '#ddd'}}>
          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 16, color: '#00000080', fontWeight: 'bold'}}>Subtotal:</Text>
            <Text style={{fontSize: 16, color: '#00000080', marginLeft: 5, fontWeight: 'bold'}}>$522.00</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 16, color: '#00000080', fontWeight: 'bold'}}>Shipping fee:</Text>
            <Text style={{fontSize: 16, color: '#00000080', marginLeft: 5, fontWeight: 'bold'}}>$30.00</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Total:</Text>
            <Text style={{fontSize: 24, marginLeft: 5, fontWeight: 'bold'}}>$552.00</Text>
          </View>
          <TouchableOpacity style={{backgroundColor: '#0d4ae8', padding: 10, borderRadius: 5}}>
            <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}