//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
class SocialLogin extends Component {
    render() {
        const {googleSignUp, facebookSignUp} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={[styles.btn, styles.fb]} onPress={facebookSignUp}>
                    <Text style={styles.btnText}>CONNEXION AVEC FACEBOOK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.gl]} onPress={googleSignUp}>
                    <Text style={styles.btnText}>CONNEXION AVEC GOOGLE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {

    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50
    },
    fb: {
        backgroundColor: '#3b5998'
    },
    gl: {
        backgroundColor: '#db4437',
        marginTop: 10,
    },
    btnText: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

//make this component available to the app
export default SocialLogin;
