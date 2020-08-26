import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SubscribeScreen from '../screens/SubscribeScreen';
import SubscribeSuccess from '../screens/SubscribeSuccess';

const Stack = createStackNavigator();

export default class SubscribeNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Subscribe">
        <Stack.Screen name="Subscribe" component={SubscribeScreen} options={{headerShown: false}} />
        <Stack.Screen name="SubscribeSuccess" component={SubscribeSuccess} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}