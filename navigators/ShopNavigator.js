import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopScreen from '../screens/ShopScreen';
import ShopItemScreen from '../screens/ShopItemScreen';

const Stack = createStackNavigator();

export default class ShopNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Shop">
        <Stack.Screen name="Shop" component={ShopScreen} options={{headerShown: false}} />
        <Stack.Screen name="ShopItem" component={ShopItemScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}