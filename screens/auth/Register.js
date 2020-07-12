//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SimpleReactValidator from 'simple-react-validator';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import SocialLogin from '../../components/ScocialLogin';
import AuthForm from '../../components/AuthForm';

import {isJson} from '../../utils';

const {width} = Dimensions.get('window');

// create a component
class RegisterScreen extends Component {
    state = {email: '', origin: '', utilize: false, nouveau: false};

    gotoLogin = () => {
        const {navigation} = this.props;
        navigation.navigate('Login');
    }

    gotoDash = async () => {
        const {navigation} = this.props;
        const {email} = this.state;
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
              "ORIGIN":"",
              "DISCIPLINES":"",
              "REFERRALBY":""
            }).then(res => {
              const {data} = res.data;
              if(isJson(data)){
                const {msg, id} = data;
                AsyncStorage.setItem('userID', id);
                AsyncStorage.setItem('userEmail', email);
                navigation.navigate('App');
              }
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
        const {gotoDash} = this.props;
        const {email, origin, utilize, nouveau} = this.state;

        return (
            <View style={styles.containerWrap}>
                <View style={styles.container}>
                    <StatusBar style='light' />
                    <SocialLogin />
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
