import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SubscribeScreen from '../screens/SubscribeScreen';
import SubscribeSuccess from '../screens/SubscribeSuccess';

const Stack = createStackNavigator();

export default class SubscribeNavigator extends React.Component {
  render() {
    const {route} = this.props;
    const {params} = route;
    return (
      <Stack.Navigator initialRouteName="Subscribe">
        <Stack.Screen name="Subscribe" component={SubscribeScreen} initialParams={{...params}} options={{headerShown: false}} />
        <Stack.Screen name="SubscribeSuccess" component={SubscribeSuccess} initialParams={{...params}} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}