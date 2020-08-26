import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountEdit from '../screens/AccountEdit';
import AccountScreen from '../screens/AccountScreen';
import EventItem from '../screens/EventItem';

const Stack = createStackNavigator();

export default class AccountNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Account">
        <Stack.Screen name="AccountEdit" component={AccountEdit} options={{headerShown: false}} />
        <Stack.Screen name="Account" component={AccountScreen} options={{headerShown: false}} />
        <Stack.Screen name="EventItem" component={EventItem} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}