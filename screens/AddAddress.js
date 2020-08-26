import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Icon, Text, Input } from '@ui-kitten/components';

const {width} = Dimensions.get('window');

export default class AddAddress extends React.Component {
  state = {name: '', cmpname: '', phone: '', address: ''};

  goBack = () => this.props.navigation.goBack();

  renderItem = (pHolder, name, value, label, style) => (
    <Input placeholder={pHolder} style={style} disabled={name === 'email'} onChangeText={v => this.handlechange(v, name)} name={name} value={value} label={label} />
  );

  handlechange = (value, name) => this.setState({[name]: value});

  render() {
    const {name, cmpname, phone, address} = this.state;

    return (
      <View style={{ flex:1 }}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Add Shipping Address</Text>
          </View>
        </View>
        <View style={{padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
          <Image source={require('../assets/images/addshipping/shipping.png')} style={{height: 200, width: 200}} />
        </View>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            {this.renderItem('Home', 'cmpname', cmpname, 'Company Name', {marginBottom: 5})}
            {this.renderItem('John Doe', 'name', name, 'Name', {marginBottom: 5})}
            {this.renderItem('(457) 345-8551', 'phone', phone, 'Phone Number', {marginBottom: 5})}
            {this.renderItem('134, 1st Aveneue, California', 'address', address, 'Address', {marginBottom: 5})}
          </View>
        </ScrollView>
        <View style={{paddingVertical: 15, paddingHorizontal: 20, backgroundColor: '#fff'}}>
          <TouchableOpacity style={{backgroundColor: '#0d4ae8', padding: 10, borderRadius: 5}}>
            <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}