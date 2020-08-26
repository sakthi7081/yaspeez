import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Icon, Text } from '@ui-kitten/components';

export default class WebScreen extends React.Component {
  render() {
    const {route} = this.props;
    const {params} = route;
    const {name, url} = params;
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>{name}</Text>
          </View>
        </View>
        <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
        />
      </View>
    )
  }
}