//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';

const {width} = Dimensions.get('window');

// create a component
// <TextInput style={[styles.inputStyle, {marginTop: 10}]} placeholder="Mot de passe" />
class AuthForm extends Component {
    render() {
        const {onChangeText, email, validator} = this.props;
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputStyle} value={email} onChangeText={(text) => onChangeText('email', text)} autoCapitalize={'none'} autoCorrect={false} autoFocus={false} autoCompleteType={'email'} placeholder="E-mail" />
                <Text style={styles.error}>{validator.message('email', email, 'required|email')}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    inputStyle: {
        width: width - 50, borderColor: '#fff', borderWidth: 1, borderRadius: 5, padding: 10, color: '#000', fontSize: 18, backgroundColor: '#eee'
    }, error: {
      color: '#ff0000',
      fontWeight: 'bold',
      fontSize: 12
    }
});

//make this component available to the app
export default AuthForm;
