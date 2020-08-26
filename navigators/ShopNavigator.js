import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopScreen from '../screens/ShopScreen';
import ShopItemScreen from '../screens/ShopItemScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import AddAddress from '../screens/AddAddress';

const Stack = createStackNavigator();

export default class ShopNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Shop">
        <Stack.Screen name="Shop" component={ShopScreen} options={{headerShown: false}} />
        <Stack.Screen name="ShopItem" component={ShopItemScreen} options={{headerShown: false}} />
        <Stack.Screen name="Cart" component={CartScreen} options={{headerShown: false}} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddAddress" component={AddAddress} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}