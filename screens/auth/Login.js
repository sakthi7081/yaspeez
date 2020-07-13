//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SimpleReactValidator from 'simple-react-validator';
import SocialLogin from '../../components/ScocialLogin';
import AuthForm from '../../components/AuthForm';

const {width} = Dimensions.get('window');

// create a component
class LoginScreen extends Component {
    state = {email: '', origin: ''};

    googleSignUp = () => {

    }

    gotoRegister = () => {
        const {navigation} = this.props;
        navigation.navigate('Register');
    }

    gotoDash = () => {
        const {navigation} = this.props;
        if (this.validator.allValid()) {
          navigation.navigate('App');
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
        const {email, origin} = this.state;

        return (
            <View style={styles.containerWrap}>
                <View style={styles.container}>
                    <StatusBar style='light' />
                    <SocialLogin googleSignUp={this.googleSignUp} />
                    <Text style={styles.ou}>Ou</Text>
                    <View>
                        <AuthForm onChangeText={this.onChangeText} validator={this.validator} email={email} />
                        <Text style={styles.faq}>Mot de passe oublie?</Text>
                    </View>
                    <TouchableOpacity style={styles.submitBtn} onPress={this.gotoDash}>
                        <Text style={styles.submitBtnTxt}>Me connecter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>Pas encore de compte ? </Text>
                    <TouchableOpacity onPress={this.gotoRegister}>
                        <Text style={[styles.bottomText, styles.bottomTextBold]}>Inscrivez-vous.</Text>
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
export default LoginScreen;
