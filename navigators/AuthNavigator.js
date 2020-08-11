import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../screens/AuthScreen';
import OtpScreen from '../screens/OtpScreen';
import OtherRegisterNavigator from './OtherRegisterNavigator';

const Stack = createStackNavigator();

export default class AuthNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="OtherRegister" component={OtherRegisterNavigator} options={{headerShown: false}} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}