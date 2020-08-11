import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectSports from '../screens/SelectSports';
import SelectPurpose from '../screens/SelectPurpose';
import SelectCity from '../screens/SelectCity';

const Stack = createStackNavigator();

export default class OtherRegisterNavigator extends React.Component {
  componentDidMount() {
    const {route} = this.props;
    console.log(route.params, 'roParams');
  }

  render() {
    const {route} = this.props;
    const {params} = route;
    const {user} = params;
    return (
      <Stack.Navigator initialRouteName="SelectSports">
        <Stack.Screen name="SelectSports" component={SelectSports} initialParams={{user}} options={{headerShown: false}} />
        <Stack.Screen name="SelectPurpose" component={SelectPurpose} initialParams={{user}} options={{headerShown: false}} />
        <Stack.Screen name="SelectCity" component={SelectCity} initialParams={{user}} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
}