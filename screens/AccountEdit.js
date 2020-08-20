import React from 'react';
import {Layout, Text, Icon, Input } from '@ui-kitten/components';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import User from '../database/models/user';

const {width} = Dimensions.get('window');

export default class AccountEdit extends React.Component {
  state = {fname: '', lname: '', email: '', phone: '', bornat: '', address: '', pincode: '', referral: '', user_id: ''};

  handlechange = (value, name) => this.setState({[name]: value});

  renderHeader = () => (
    <View style={[styles.container, styles.flexBetween]}>
      <TouchableOpacity style={styles.headerBtn}>
        <Icon name="chevron-left" fill={'#fff'} height={24} width={24} />
      </TouchableOpacity>
      <Text style={[styles.headerText, styles.textWhite]}>Update Profile</Text>
      <TouchableOpacity style={styles.headerBtn}/>
    </View>
  );

  renderForm = (fname, lname, email, phone, bornat, address, pincode, referral) => (
    <ScrollView style={[styles.formContainer]}>
      {this.renderItem('John', 'fname', fname, 'First Name')}
      {this.renderItem('Doe', 'lname', lname, 'Last Name')}
      {this.renderItem('abc@email.com', 'email', email, 'Email')}
      {this.renderItem('9876543012', 'phone', phone, 'Phone Number')}
      {this.renderItem('27-08-1992', 'bornat', bornat, 'Date of Birth')}
      {this.renderItem('No: 9, Street, Avenue', 'address', address, 'Address')}
      {this.renderItem('54215', 'pincode', pincode, 'Pincode')}
      {this.renderItem('JA4561', 'referral', referral, 'Referral')}
    </ScrollView>
  );

  renderItem = (pHolder, name, value, label) => (
    <Input placeholder={pHolder} disabled={name === 'email'} onChangeText={v => this.handlechange(v, name)} name={name} value={value} label={label} />
  );

  renderFooter = () => (
    <View style={[styles.formContainer, {paddingBottom: 15, paddingTop: 5}]}>
      <TouchableOpacity style={styles.submitBtn} onPress={this.submitForm}>
        <Text style={styles.submitTxt}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  submitForm = async () => {
    const {fname, lname, email, phone, bornat, address, pincode, referral, user_id} = this.state;
    console.log(user_id);
    const queryOptions = { user_id_eq: user_id };

    let user = await User.findBy(queryOptions);
    user.first_name = fname;
    user.last_name = lname;
    user.phone_no = phone;
    user.born_at = bornat;
    user.address = address;
    user.pincode = pincode;
    user.referral = referral;
    user.save();

    Alert.alert('Success', 'Profile Updated!');
  }

  async componentDidMount() {
    const queryOptions = {
      limit: 1,
      order: 'id DESC'
    };

    let user = await User.query(queryOptions);
    const {address, birth_place, born_at, country_id, email, first_name, last_name, phone_no, pincode, pupose_id, referral, sport_id, state_id, user_id} = user[0];
    this.setState({
      fname: first_name, lname: last_name, email, phone: phone_no, bornat: born_at, address, pincode, referral, user_id
    });
  }
  
  render() {
    const {fname, lname, email, phone, bornat, address, pincode, referral} = this.state;

    return (
      <Layout style={styles.rootContainer}>
        {this.renderHeader()}
        {this.renderForm(fname, lname, email, phone, bornat, address, pincode, referral)}
        {this.renderFooter()}
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  rootContainer: {flex: 1, justifyContent: 'space-between', width: width},
  container: {backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden'},
  flexBetween: {justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'},
  textWhite: {color: '#fff'},
  headerText: {fontWeight: 'bold', fontSize: 24, padding: 20},
  headerBtn: {paddingHorizontal: 10, paddingVertical: 5},
  formContainer: {paddingHorizontal: 20, paddingVertical: 20},
  submitBtn: {padding: 10, backgroundColor: '#0d4ae8', borderRadius: 5},
  submitTxt: {color: '#fff', fontWeight: 'bold', textAlign: 'center'}
});
