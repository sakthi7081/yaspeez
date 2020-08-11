import React from 'react';
import { Layout } from '@ui-kitten/components';
import { Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import OTPInputView from '@aevaldas/react-native-otp-input';

const {width} = Dimensions.get('window');

export default class OtpScreen extends React.Component {
  handleCode = code => {
    const {navigation, route} = this.props;
    const {params} = route;
    const {user, otp} = params;
    if(code === otp)
      navigation.navigate('OtherRegister', {user});
    else
      Alert.alert('Error', 'Pl enter the correct OTP!');
  }

  render() {
    return (
      <>
        <Layout style={styles.flex}>
          <Layout style={styles.topLayout}>
            <Image source={require('../assets/splash.png')} resizeMode={'contain'} style={styles.logo} />
          </Layout>
          <Layout style={styles.container}>
            <Text style={styles.otptext}>Enter OTP to verify your email</Text>
            <OTPInputView
              style={{width: '100%', height: 60}}
              pinCount={6}
              // code={this.state.code}
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => this.handleCode(code)}
          />
          </Layout>
        </Layout>
      </>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1, backgroundColor: '#0d4ae8'
  }, container: {
    paddingHorizontal: 30, backgroundColor:'#fff', paddingVertical: 30, borderTopLeftRadius: 25, borderTopRightRadius: 25
  }, otptext: {
    fontSize: 18, fontWeight: 'bold', marginVertical: 5, color: '#000'
  }, topLayout: {
    alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#0d4ae8', flex: 1
  }, logo: {
    width: width - 40, height: 150
  }, underlineStyleBase: {
    width: 40, backgroundColor: '#fff', height: 45, borderWidth: 1, borderRadius: 5, fontWeight: 'bold', color: '#000'
  }, underlineStyleHighLighted: {
    borderColor: "#000",
  }
})
