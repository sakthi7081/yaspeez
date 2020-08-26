import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from '../screens/ChatScreen';
import ChatItem from '../screens/ChatItem';

const Stack = createStackNavigator();

export default class ChatNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false}} />
        <Stack.Screen name="ChatItem" component={ChatItem} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}