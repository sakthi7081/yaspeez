//import liraries
import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from './Login';
import DashScreen from '../dashboard';

// create a component
class Auth extends React.Component{
    gotoDash = () => {
        const {navigation} = this.props;
        navigation.navigation('App');
    }

    render () {
        return <LoginScreen gotoDash={this.gotoDash} />;
    }
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Auth;
