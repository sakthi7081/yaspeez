import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import AdScreen from '../screens/ads';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import OtherRegisterScreen from '../screens/dashboard/OtherRegister';
import MapScreen from '../screens/dashboard/Map';

// const defaultHeaderStyle = {elevation: 0, shadowOpacity: 0, height: 110, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}

const AppNavigator = createSwitchNavigator({
    Other: OtherRegisterScreen,
    Dash: MapScreen
}, {
    headerMode: "none",
    lazy: false
});

const AdsNavigator = createStackNavigator({
    Ads: AdScreen
}, {
    headerMode: "none",
    lazy: false
})

const AuthNavigator = createStackNavigator({
    Register: RegisterScreen,
    Login: LoginScreen,
    App: AppNavigator
}, {
    initialRouteName: 'Register',
    headerMode: "none",
    lazy: false
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
