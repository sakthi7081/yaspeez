import 'react-native-gesture-handler';
import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const {Navigator, Screen} = Stack;

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import AdScreen from '../screens/AdScreen';
import { getAllSports, getAllStates, getAllPurposes } from '../utils/api';
import { init } from '../database';
import { Alert } from 'react-native';
import Sport from '../database/models/sport';
import State from '../database/models/state';
import Purpose from '../database/models/purpose';
import User from '../database/models/user';
// import { AppLoading } from 'expo';

// const prevGetStateForAction = Navigator.router.getStateForAction;

// Navigator.router.getStateForAction = (action, state) => {
//   // Do not allow to go back from Home
//   if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Home') {
//     return null;
//   }

//   // Do not allow to go back to Login
//   if (action.type === 'Navigation/BACK' && state) {
//     const newRoutes = state.routes.filter(r => r.routeName !== 'Login');
//     const newIndex = newRoutes.length - 1;
//     return prevGetStateForAction(action, { index: newIndex, routes: newRoutes });
//   }
//   return prevGetStateForAction(action, state);
// };

export default class Navigation extends React.Component {
  state = {appIsReady: false, initScreen: 'Ad'};

  async componentDidMount() {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.log(e);
    }
    await this.prepareResources();
  }

  async componentDidUpdate(prevState) {
    if(prevState && prevState.appIsReady && prevState.appIsReady !== this.state.appIsReady) {
      await this.performAPICalls();
      let users = await User.query();
      this.setState({ appIsReady: true, initScreen: users && users.length > 0 ? 'App' : 'Ad' });
    }
  }

  prepareResources = async () => {
    await this.performAPICalls();
    let users = await User.query();
    this.setState({ appIsReady: true, initScreen: users && users.length > 0 ? 'App' : 'Ad' }, async () => {
      await SplashScreen.hideAsync();
    });
  };

  performAPICalls = async () => {
    const tablesCreated = await AsyncStorage.getItem('@tablesCreated');
    let sports = tablesCreated === null ? [] : await Sport.query();
    let states = tablesCreated === null ? [] : await State.query();
    let purposes = tablesCreated === null ? [] : await Purpose.query();
    if(sports && sports.length > 0 && states && states.length > 0 && purposes && purposes.length > 0){
      console.log('app already initialised!');
    } else {
      sports = await getAllSports().then(d => this.success(d)).catch(e => this.failure(e));
      states = await getAllStates().then(d => this.success(d)).catch(e => this.failure(e));
      purposes = await getAllPurposes().then(d => this.success(d)).catch(e => this.failure(e));
      await init(sports, states, purposes);
      await AsyncStorage.setItem('@tablesCreated', '1');
    }
  }

  success = d => {
    if(d && d.value)
      return d.value;
    else
      Alert.alert('Error', 'Some error occurred!');
  }

  failure = e => {
    Alert.alert('Error', e.message);
  }

  render() {
    const {initScreen, appIsReady} = this.state;
    if (!appIsReady)
      return null;

    return (
      <NavigationContainer>
        <Navigator initialRouteName={initScreen}>
          <Screen name="Ad" component={AdScreen} options={{headerShown: false}} />
          <Screen name="Auth" component={AuthNavigator} options={{headerShown: false}} />
          <Screen name="App" component={AppNavigator} options={{headerShown: false}} />
        </Navigator>
      </NavigationContainer>
    )
  }
}