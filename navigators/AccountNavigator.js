import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountEdit from '../screens/AccountEdit';
import AccountScreen from '../screens/AccountScreen';
import SubscribeNavigator from './SubscribeNavigator';
import PhotoScreen from '../screens/PhotoScreen';
import WebScreen from '../screens/WebScreen';
import Notifications from '../screens/Notifications';
import OrderScreen from '../screens/OrderScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import EventNavigator from './EventNavigator';

const Stack = createStackNavigator();

export default class AccountNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen name="AccountEdit" component={AccountEdit} options={{headerShown: false}} />
        <Stack.Screen name="Account" component={AccountScreen} options={{headerShown: false}} />
        <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false}} />
        <Stack.Screen name="EventsList" component={EventNavigator} initialParams={{initRoute: 'EventsList'}}  options={{headerShown: false}} />
        <Stack.Screen name="WebScreen" component={WebScreen} options={{headerShown: false}} />
        <Stack.Screen name="Subscribe" component={SubscribeNavigator} options={{headerShown: false}} />
        <Stack.Screen name="Photos" component={PhotoScreen} options={{headerShown: false}} />
        <Stack.Screen name="Orders" component={OrderScreen} options={{headerShown: false}} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}