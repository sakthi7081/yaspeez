import React from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
const notifications = [];

const NotificationItem = ({notification}) => (
  <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#00000010', padding: 10, borderRadius: 10, marginVertical: 5}}>
    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
      <Icon name='bell-outline' height={36} width={36} fill="#0d4ae8" />
      <View style={{marginLeft: 8}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 24}}>{notification.name}</Text>
        <Text numberOfLines={1} style={{fontSize: 16, color: '#00000080'}}>{notification.desc}</Text>
      </View>
    </View>
    {/* <Icon name="chevron-right" height={32} width={32} fill="#0d4ae8" /> */}
  </TouchableOpacity>
);

export default class Notifications extends React.Component {
  goBack = () => this.props.navigation.goBack();
  
  render() {
    return (
      <View style={{ flex:1 }}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Notifications</Text>
          </View>
        </View>
        {notifications.length === 0 && (
          <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/images/account/empty0.png')} style={{width: width - 40, height: 250}} />
            <Text style={{fontSize: 20, color: '#00000080', marginTop: 10}}>No notifications avaialable!</Text>
          </View>
        )}
        {notifications.length > 0 && (
          <ScrollView style={{flex: 1, marginBottom: 20, marginTop: 10, paddingHorizontal: 15}}>
            {notifications.map((notification, i) => <NotificationItem key={`notification-item-${i}`} {...{notification}} />)}
          </ScrollView>
        )}
      </View>
    )
  }
}