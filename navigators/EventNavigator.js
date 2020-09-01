import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventItem from '../screens/EventItem';
import EventsList from '../screens/EventsList';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default class EventNavigator extends React.Component {
  render() {
    const {route} = this.props;
    const {params} = route;
    const {initRoute} = params;
    return (
      <Stack.Navigator initialRouteName={initRoute}>
        <Stack.Screen name="EventsList" component={EventsList} initialParams={{...params}} options={{headerShown: false}} />
        <Stack.Screen name="EventItem" component={EventItem} initialParams={{...params}} options={{headerShown: false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}