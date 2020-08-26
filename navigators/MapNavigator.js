import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import MapItemScreen from '../screens/MapItem';
import EventItem from '../screens/EventItem';
import SubscribeNavigator from './SubscribeNavigator';

const Stack = createStackNavigator();

export default class MapNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}} />
        <Stack.Screen name="MapItem" component={MapItemScreen} options={{headerShown: false}} />
        <Stack.Screen name="EventItem" component={EventItem} options={{headerShown: false}} />
        <Stack.Screen name="Subscribe" component={SubscribeNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}