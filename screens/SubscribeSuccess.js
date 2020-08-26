import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';

export default class SubscribeSuccess extends React.Component {
  goBack = () => this.props.navigation.goBack();

  render() {
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
        <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Icon name="checkmark-circle" height={100} width={100} fill='#00FF00' />
          <Text style={{color: '#00ff00', fontWeight: 'bold', fontSize: 32, textAlign: 'center'}}>SUCCESS</Text>
        </View>
      </View>
    )
  }
}