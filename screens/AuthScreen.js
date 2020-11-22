import React from 'react';
import { Layout, Button, Icon, Input, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Dimensions, Image, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import api from '../utils/api';
import User from '../database/models/user';
import { emailRegex } from '../utils/data';

const {width} = Dimensions.get('window');

export default class AuthScreen extends React.Component {
  state = {email: '', utilize: false, nouveau: false, origin: '', isLoading: false};

  renderIcon = (color, name) => <Icon name={name} fill={color} height={24} width={24} />

  facebookSignUp = async () => {
    this.setState({isLoading: true});
    try{
      await Facebook.initializeAsync('1055710538156863');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
        const userdata = await response.json();
        const {email} = userdata;
        this.setState({email: email, utilize: true, nouveau: true, origin: 'facebook'});
        await this.gotoOtpScreen();
      } else {
        this.setState({isLoading: false});
        console.log('cancelled');
      }
    } catch(e) {
      this.setState({isLoading: false});
      console.log('error', e);
    }
  }

  googleSignUp = async () => {
    this.setState({isLoading: true});
    try {
      const config = {
        androidClientId: '570181999955-doqrtf6mvtlq89areq6852eq8t28o9bf.apps.googleusercontent.com',
        androidStandaloneAppClientId: '570181999955-3fm4ct4lagiff9ij651mcs4jc484qkrf.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      };
      const { type, accessToken, user } = await Google.logInAsync(config);
      if (type === 'success') {
        this.setState({email: user.email, utilize: true, nouveau: true, origin: 'google'});
        await this.gotoOtpScreen();
      } else {
        this.setState({isLoading: false});
        console.log('cancelled');
      }
    } catch(e) {
      this.setState({isLoading: false});
      console.log('error', e);
    }
  }

  gotoOtpScreen = async () => {
    let userdata = {email: '', origin: '', id: '0', firstname: '', lastname: '', dob: '', age: '', gender: '', phonenumber: '', placeofbirth: '', address: '', ycity_id: '', pincode: '', yrole_id: '5', feeamount: '', paidcontribution: '', medicalcert: '', ismember: '', disciplines: '1', referralby: ''};
    const {navigation} = this.props;
    const {email, origin} = this.state;
    if(emailRegex.test(email.toString().toLowerCase())) {
    this.setState({isLoading: true});
      await api.post('custom/userreg', {...userdata, email, origin})
            .then(({data}) => {
              const {value} = data;
              const {otp, userid} = value;
              console.log(otp, '__DAT');
              navigation.reset({
                index: 0,
                routes: [{ 
                  name: 'Otp',
                  params: {
                    user: {email, origin, id: userid},
                    otp 
                  }
                }]
              });
            })
            .catch(e => {
              console.log(e, 'err');
              this.setState({isLoading: false}, () => Alert.alert('Error', e.message));
            });
    } else {
      Alert.alert('Error', 'Email is required!');
    }
  }

  handleChange = txt => this.setState({email: txt});

  async componentDidMount() {
    const {navigation} = this.props;
    let users = await User.query();
    if(users && users.length > 0)
      navigation.navigate('App');
  }

  render() {
    const {email, utilize, nouveau, origin, isLoading} = this.state;
    return (
      <>
        <Layout style={styles.container}>
          <Layout style={[styles.topLayout, {justifyContent: isLoading ? 'center' : 'flex-end'}]}>
            <Image source={require('../assets/splash.png')} resizeMode={'contain'} style={styles.logo} />
            {isLoading && (<Spinner status='basic' />)}
          </Layout>
          {!isLoading && (<Layout style={styles.bottomLayout}>
            <Input accessoryLeft={() => this.renderIcon('#aaa', 'at')} style={styles.input} value={email} type={'email'} placeholder={'E-mail'} onChangeText={this.handleChange} />
            <Button style={[styles.socialBtn]} status={'warning'} accessoryRight={() => this.renderIcon('#fff', 'arrow-circle-right')} onPress={() => this.gotoOtpScreen()}>S'INSCRIRE</Button>
            <Text style={styles.ouText}>Ou</Text>
            <Button style={styles.socialBtn} status={'danger'} accessoryLeft={() => this.renderIcon('#fff', 'google')} onPress={this.googleSignUp}>
              CONNEXION AVEC GOOGLE
            </Button>
            <Button style={styles.socialBtn} status={'info'} accessoryLeft={() => this.renderIcon('#fff', 'facebook')} onPress={this.facebookSignUp}>
              CONNEXION AVEC FACEBOOK
            </Button>
          </Layout>)}
        </Layout>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#0d4ae8'
  }, socialBtn: {
    borderRadius: 50, marginVertical: 5, width: width - 50, height: 40
  }, topLayout: {
    alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#0d4ae8', flex: 1
  }, ouText: {
    textAlign: 'center', fontWeight: 'bold', marginVertical: 25, fontSize: 18
  }, bottomLayout: {
    backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 40, flex: 1, borderTopRightRadius: 25, borderTopLeftRadius: 25, overflow: 'hidden'
  }, input: {
    borderRadius: 50, marginVertical: 5, width: width - 50, height: 40
  }, center: {
    justifyContent: 'center', alignItems: 'center'
  }, trans: {
    backgroundColor: 'transparent'
  }, logo: {
    width: width - 40, height: 150
  }
})
