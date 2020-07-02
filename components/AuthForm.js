//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');

// create a component
class AuthForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputStyle} placeholder="E-mail" />
                <TextInput style={[styles.inputStyle, {marginTop: 10}]} placeholder="Mot de passe" />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    inputStyle: {
        width: width - 50, borderColor: '#fff', borderWidth: 1, borderRadius: 5, padding: 10, color: '#000', fontSize: 18, backgroundColor: '#eee'
    }
});

//make this component available to the app
export default AuthForm;
