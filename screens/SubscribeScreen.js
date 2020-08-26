import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';

export default class SubscribeScreen extends React.Component {
  goBack = () => this.props.navigation.goBack();

  goToSubscribeSuccess = () => {
    const {navigation} = this.props;
    navigation.navigate('SubscribeSuccess');
  }

  render() {
    const {route} = this.props;
    const {params} = route;
    const {feeAmount, orgName, eventName} = params;
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Subscribe</Text>
          </View>
        </View>
        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <Text>{`You are subsctibing ${eventName} conducted by ${orgName}`}</Text>
          <TouchableOpacity style={{backgroundColor: '#0d4ae8', borderRadius: 5, marginTop: 10}} onPress={this.goToSubscribeSuccess}>
            <Text style={{color: '#fff', fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 10, textAlign: 'center'}}>{`Pay Rs.${feeAmount}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}