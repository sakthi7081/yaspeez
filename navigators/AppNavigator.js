import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import ChatScreen from '../screens/ChatScreen';
import PhotoScreen from '../screens/PhotoScreen';

import MapNavigator from './MapNavigator';
import ScheduleScreen from '../screens/ScheduleScreen';
import AccountNavigator from './AccountNavigator';
import ShopNavigator from './ShopNavigator';

const Tab = createBottomTabNavigator();

export default class AppNavigator extends React.Component {
  renderIcon = ({focused, color, size}, name) => {
      return (
        <Layout style={name === 'map' ? styles.specialTab : styles.normalTab}>
          <Icon name={`${name}${focused ? '' : '-outline'}`} fill={color} height={name === 'map' ? 32 : size} width={name === 'map' ? 32 : size} />
        </Layout>
      );
  }

  render() {
    return (
      <Tab.Navigator initialRouteName="Map" tabBarOptions={{showLabel: false}}>
        <Tab.Screen name="Chats" component={ChatScreen} options={{tabBarIcon: props => this.renderIcon(props, 'message-square')}} />
        <Tab.Screen name="Photos" component={ScheduleScreen} options={{tabBarIcon: props => this.renderIcon(props, 'calendar')}} />
        <Tab.Screen name="Map" component={MapNavigator} options={{tabBarIcon: props => this.renderIcon(props, 'map')}} />
        <Tab.Screen name="Shop" component={ShopNavigator} options={{tabBarIcon: props => this.renderIcon(props, 'shopping-bag')}} />
        <Tab.Screen name="Account" component={AccountNavigator} options={{tabBarIcon: props => this.renderIcon(props, 'person')}} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  normalTab: {height: 50, width: 50, justifyContent: 'center', alignItems: 'center'},
  specialTab: {position: 'absolute', bottom: -10, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderColor: '#eee', height: 80, width: 80, borderWidth: 5, padding: 11, flex: 1}
});
