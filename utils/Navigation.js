import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import DashScreen from '../screens/dashboard';
import AdScreen from '../screens/ads';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';

// const defaultHeaderStyle = {elevation: 0, shadowOpacity: 0, height: 110, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}

const AppNavigator = createStackNavigator({
    Maps: DashScreen
}, {
    headerMode: "none"
});

const AdsNavigator = createStackNavigator({
    Ads: AdScreen
}, {
    headerMode: "none"
})

const AuthNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
}, {
    headerMode: "none"
})
  
const RootNavigator = createSwitchNavigator({
    Ads: AdsNavigator,
    Auth: AuthNavigator,
    App: AppNavigator
}, {
    initialRouteName: 'Ads',
    lazy: false
});

export default createAppContainer(RootNavigator);