//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { StatusBar } from 'expo-status-bar';
import SocialLogin from '../../components/ScocialLogin';
import AuthForm from '../../components/AuthForm';

const {width} = Dimensions.get('window');

// create a component
class RegisterScreen extends Component {
    gotoLogin = () => {
        const {navigation} = this.props;
        navigation.navigate('Login');
    }

    gotoDash = () => {
        const {navigation} = this.props;
        navigation.navigate('App');
    }

    render() {
        const {gotoDash} = this.props;

        return (
            <View style={styles.containerWrap}>
                <View style={styles.container}>
                    <StatusBar style='light' />
                    <SocialLogin />
                    <Text style={styles.ou}>Ou</Text>
                    <View>
                        <AuthForm />
                        <View style={styles.acceptViews}>
                            <CheckBox disabled={false} value={false} tintColors={{true: '#fff', false: '#fff'}} />
                            <Text style={styles.acceptViewsText}>J'accept les conditions d'utilisation de Yaspeez</Text>
                        </View>
                        <View style={[styles.acceptViews, {marginTop: 0}]}>
                            <CheckBox disabled={false} value={false} tintColors={{true: '#fff', false: '#fff'}} />
                            <Text style={styles.acceptViewsText}>Je souhaite recevoir les nouveautes Yazpeez</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.submitBtn} onPress={this.gotoDash}>
                        <Text style={styles.submitBtnTxt}>Creer un compte</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>Vous avez deja un compte ? </Text>
                    <TouchableOpacity onPress={this.gotoLogin}>
                        <Text style={[styles.bottomText, styles.bottomTextBold]}>Connectez-vous.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    containerWrap: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#0d4ae8'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width
    },
    ou: {
        fontSize: 16,
        marginVertical: 40,
        color: '#fff',
        fontWeight: 'bold'
    },
    faq: {
        marginVertical: 5,
        color: '#fff'
    },
    acceptViews: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15
    },
    acceptViewsText: {
        color: '#fff',
    },
    submitBtn: {
        marginVertical: 40,
        backgroundColor: '#888',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 50
    },
    submitBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    bottomText: {
        color: '#fff',
        fontSize: 16
    },
    bottomTextBold: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 30,
    }
});

//make this component available to the app
export default RegisterScreen;
