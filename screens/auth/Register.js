//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SimpleReactValidator from 'simple-react-validator';
import AsyncStorage from '@react-native-community/async-storage';
import * as Google from 'expo-google-app-auth';
import { StatusBar } from 'expo-status-bar';
import Axios from 'axios';
import SocialLogin from '../../components/ScocialLogin';
import AuthForm from '../../components/AuthForm';


import Api from '../../utils/Api';
import {globals} from '../../utils/Constants';

const {width} = Dimensions.get('window');

// create a component
class RegisterScreen extends Component {
    state = {email: '', origin: '', utilize: false, nouveau: false};

    gotoLogin = () => {
        const {navigation} = this.props;
        navigation.navigate('Login');
    }

    googleSignUp = async () => {
      try {
        const config = {
          androidClientId: globals.google.android,
          scopes: ['profile', 'email'],
        };
        const { type, accessToken, user } = await Google.logInAsync(config);
        if (type === 'success') {
          this.setState({email: user.email, utilize: true, nouveau: true, origin: 'google'});
          await this.gotoDash();
        } else {
          console.log('cancelled');
        }
      } catch(e) {
        console.log('error', e);
      }
    }

    gotoDash = async () => {
        const {navigation} = this.props;
        const {email, origin} = this.state;
        if (this.validator.allValid()) {
          await Api.post('custom/userreg', {
              "ID":"0",
              "FIRSTNAME":"",
              "LASTNAME":"",
              "DOB":"",
              "AGE":"",
              "GENDER":"",
              "EMAIL":email,
              "PHONENUMBER":"",
              "PLACEOFBIRTH":"",
              "ADDRESS":"",
              "YCITY_ID":"",
              "PINCODE":"",
              "YROLE_ID":"5",
              "FEEAMOUNT":"",
              "PAIDCONTRIBUTION":"",
              "MEDICALCERT":"",
              "ISMEMBER":"",
              "ORIGIN":origin,
              "DISCIPLINES":"",
              "REFERRALBY":""
            }).then(async res => {
              const {data} = res;
              console.log(data, 'data');
              if(data && data.id){
                const {msg, id} = data;
                await AsyncStorage.setItem('userID', id);
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userOrigin', origin);
                navigation.navigate('App');
              } else {
                Alert.alert('Error', 'Some error occurred!');
              }
            }).catch(e => {
              Alert.alert('Error', e.message);
            });
        } else {
          this.validator.showMessages();
          this.forceUpdate();
        }
    }

    onChangeText = (name, text) => this.setState({[`${name}`]: text});

    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    render() {
        const {email, origin, utilize, nouveau} = this.state;

        return (
            <View style={styles.containerWrap}>
                <View style={styles.container}>
                    <StatusBar style='light' />
                    <SocialLogin googleSignUp={this.googleSignUp} />
                    <Text style={styles.ou}>Ou</Text>
                    <View>
                        <AuthForm onChangeText={this.onChangeText} validator={this.validator} email={email} />
                        <View style={styles.acceptViews}>
                            <CheckBox onValueChange={() => this.onChangeText('utilize', !utilize)} disabled={false} value={utilize} tintColors={{true: '#fff', false: '#fff'}} />
                            <Text style={styles.acceptViewsText}>J'accept les conditions d'utilisation de Yaspeez</Text>
                        </View>
                        <Text style={styles.error}>{this.validator.message('utilize', utilize, 'required|accepted')}</Text>
                        <View style={[styles.acceptViews, {marginTop: 0}]}>
                            <CheckBox onValueChange={() => this.onChangeText('nouveau', !nouveau)} disabled={false} value={nouveau} tintColors={{true: '#fff', false: '#fff'}} />
                            <Text style={styles.acceptViewsText}>Je souhaite recevoir les nouveautes Yazpeez</Text>
                        </View>
                        <Text style={styles.error}>{this.validator.message('nouveau', nouveau, 'required|accepted')}</Text>
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
    },
    error: {
      color: '#ff0000',
      fontWeight: 'bold',
      fontSize: 12
    }
});

//make this component available to the app
export default RegisterScreen;
