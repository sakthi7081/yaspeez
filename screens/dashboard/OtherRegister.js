//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import SimpleReactValidator from 'simple-react-validator';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';

import Api from '../../utils/Api';
import {changeKey} from '../../utils';

const {width, height} = Dimensions.get('window');

// create a component
class OtherRegisterScreen extends Component {
    state = {selectedCountry: null, selectedCity: null, selectedRole: null, selectedSport: null, options: [], visible: false, cSelect: 'selectedCity', roles: [], countries: [], cities: [], sports: [], fname: '', lname: '', dob: '', pob: '', phone: '', address: '', email: '', pincode: '', referral: '', showPicker: false, isLoading: false};

    gotoDash = async () => {
        this.setState({isLoading: true});
        const {navigation} = this.props;
        const {selectedCity, selectedRole, fname, lname, dob, pob, pincode, address, phone, referral} = this.state;
        const userId = await AsyncStorage.getItem('userID');
        const userOrigin = await AsyncStorage.getItem('userOrigin');
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (this.validator.allValid()) {
          await Api.post('custom/userreg', {
              "ID":userId,
              "FIRSTNAME":fname,
              "LASTNAME":lname,
              "DOB":dob,
              "AGE":"",
              "GENDER":"",
              "EMAIL":userEmail,
              "PHONENUMBER":phone,
              "PLACEOFBIRTH":pob,
              "ADDRESS":address,
              "YCITY_ID":selectedCity.key,
              "PINCODE":pincode,
              "YROLE_ID":selectedRole.key,
              "FEEAMOUNT":"",
              "PAIDCONTRIBUTION":"",
              "MEDICALCERT":"",
              "ISMEMBER":"",
              "ORIGIN":userOrigin,
              "DISCIPLINES":true,
              "REFERRALBY":referral
            }).then(res => {
              const {data} = res;
              console.log(data, 'data');
              if(data && data.id){
                const {msg, id} = data;
                AsyncStorage.setItem('isProfileUpdated', '1');
                navigation.navigate('Dash');
              } else {
                this.setState({isLoading: false});
                Alert.alert('Error', 'Some error occurred!');
              }
            }).catch(e => {
              console.log(e, 'error');
              this.setState({isLoading: false});
              Alert.alert('Error', e.message);
            });
        } else {
          this.setState({isLoading: false});
          this.validator.showMessages();
          this.forceUpdate();
        }
    }

    handlePress = async (options, cSelect) => {
        this.setState({options, cSelect, visible: true});
    }

    onSelect = async (_item, _name) => {
        let {cities} = this.state;
        if(_name === 'selectedCountry')
            cities = await Api.get(`yusers/cities?id=${_item.key}`).then(res => changeKey(res.data));
        this.setState({[`${_name}`]: _item, visible: false, cities});
    }

    onCancel = () => {
        this.setState({visible: false});
    }

    init = async () => {
        const userId = await AsyncStorage.getItem('userID');
        const isProfileUpdated = await AsyncStorage.getItem('isProfileUpdated');
        const {navigation} = this.props;
        if(isProfileUpdated === '1')
          navigation.navigate('Dash');
        else if(userId === null || userId === undefined || userId === '')
          navigation.navigate('Register');
        else{
          let roles = await Api.get('yusers/organization').then(res => changeKey(res.data)).catch(e => Alert.alert('Error', e.message));
          let countries = await Api.get('yusers/countries').then(res => changeKey(res.data)).catch(e => Alert.alert('Error', e.message));
          let sports = await Api.get('yusers/sports').then(res => changeKey(res.data)).catch(e => Alert.alert('Error', e.message));
          console.log(roles, countries, sports);
          this.setState({roles, countries, sports});
        }
    }

    onChangeText = (name, text) => this.setState({[name]: text});

    onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || new Date();
      this.setState({showPicker: false, dob: moment(currentDate).format('DD/MM/YYYY')});
    }

    showPicker = () => this.setState({'showPicker': true});

    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
        messages: {
          accepted: 'The :attribute must be in the format DD/MM/YYYY'
        }
      });
    }

    async componentDidMount() {
        await this.init();
    }

    render() {
        const {selectedCountry, selectedCity, selectedRole, selectedSport, options, visible, cSelect, countries, roles, cities, sports, fname, lname, dob, pob, pincode, address, phone, referral, showPicker, isLoading} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar style='light' />
                <View style={[styles.row, styles.top]}>
                    <Text style={styles.hText}>Fill the following details</Text>
                </View>
                <ScrollView style={styles.scrollview}>
                  <View style={styles.row}>
                      <TextInput style={[styles.inputStyle, styles.left]} value={fname} onChangeText={txt => this.onChangeText('fname', txt)} placeholder="First Name" />
                      <TextInput style={[styles.inputStyle, styles.right]} value={lname} onChangeText={txt => this.onChangeText('lname', txt)} placeholder="Last Name" />
                  </View>
                  {(this.validator.message('fname', fname, 'required|alpha_space') || this.validator.message('lname', lname, 'required|alpha_space')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('fname', fname, 'required|alpha_space')}</Text>
                    <Text style={styles.error}>{this.validator.message('lname', lname, 'required|alpha_space')}</Text>
                  </View>)}
                  <View style={styles.row}>
                      <TouchableOpacity style={[styles.left, styles.inputStyle]} onPress={this.showPicker}>
                        <TextInput style={[styles.inputStyle, styles.dateField]} editable={false} value={dob} onChangeText={txt => this.onChangeText('dob', txt)} placeholder="Date of Birth" />
                      </TouchableOpacity>
                      <TextInput style={[styles.inputStyle, styles.right]} value={pob} onChangeText={txt => this.onChangeText('pob', txt)} placeholder="Place of Birth" />
                  </View>
                  {(this.validator.message('dob', moment(dob, 'DD/MM/YYYY', true).isValid(), 'required|accepted') || this.validator.message('place of birth', pob, 'required|alpha_space')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('dob', moment(dob, 'DD/MM/YYYY', true).isValid(), 'required|accepted')}</Text>
                    <Text style={styles.error}>{this.validator.message('place of birth', pob, 'required|alpha_space')}</Text>
                  </View>)}
                  <View style={[styles.row, styles.flexCol]}>
                      <TextInput style={styles.inputStyle} value={phone} onChangeText={txt => this.onChangeText('phone', txt)} placeholder="Phone Number" />
                      {this.validator.message('phone', phone, 'required|phone') && (<Text style={styles.error}>{this.validator.message('phone', phone, 'required|phone')}</Text>)}
                  </View>
                  <View style={[styles.row, styles.flexCol]}>
                      <TextInput style={styles.inputStyle} value={address} onChangeText={txt => this.onChangeText('address', txt)} placeholder="Address" />
                      {this.validator.message('address', address, 'required|alpha_space') && (<Text style={styles.error}>{this.validator.message('address', address, 'required|alpha_space')}</Text>)}
                  </View>
                  <View style={styles.row}>
                      <TouchableOpacity style={[styles.inputStyle, styles.left]} onPress={() => this.handlePress(countries, 'selectedCountry')}>
                          <TextInput style={{color: '#000', fontSize: 18}} placeholder="Countries" editable={false} value={selectedCountry && selectedCountry.label} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.inputStyle, styles.right]} onPress={() => cities && cities.length > 0 ? this.handlePress(cities, 'selectedCity') : console.log('do nothing')}>
                          <TextInput style={{color: '#000', fontSize: 18}} placeholder="Cities" editable={false} value={selectedCity && selectedCity.label} />
                      </TouchableOpacity>
                  </View>
                  {(this.validator.message('country', selectedCountry && selectedCountry.key, 'required|numeric') || this.validator.message('city', selectedCity && selectedCity.key, 'required|numeric')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('country', selectedCountry && selectedCountry.key, 'required|numeric')}</Text>
                    <Text style={styles.error}>{this.validator.message('city', selectedCity && selectedCity.key, 'required|numeric')}</Text>
                  </View>)}
                  <View style={styles.row}>
                      <TextInput style={[styles.inputStyle, styles.left]} value={pincode} onChangeText={txt => this.onChangeText('pincode', txt)} placeholder="Pincode" />
                      <TextInput style={[styles.inputStyle, styles.right]} value={referral} onChangeText={txt => this.onChangeText('referral', txt)} placeholder="Referral Code" />
                  </View>
                  {(this.validator.message('pincode ', pincode  , 'required|numeric|min:5|max:6') || this.validator.message('referral', referral, 'numeric')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('pincode ', pincode  , 'required|numeric|min:5|max:6')}</Text>
                    <Text style={styles.error}>{this.validator.message('referral', referral, 'numeric')}</Text>
                  </View>)}
                  <View style={styles.row}>
                      <TouchableOpacity style={[styles.inputStyle, styles.left]} onPress={() => this.handlePress(roles, 'selectedRole')}>
                          <TextInput style={{color: '#000', fontSize: 18}} placeholder="Roles" editable={false} value={selectedRole && selectedRole.label} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.inputStyle, styles.right]} onPress={() => this.handlePress(sports, 'selectedSport')}>
                          <TextInput style={{color: '#000', fontSize: 18}} placeholder="Sports" editable={false} value={selectedSport && selectedSport.label} />
                      </TouchableOpacity>
                  </View>
                  {(this.validator.message('role', selectedRole && selectedRole.key, 'required|numeric') || this.validator.message('sports', selectedSport && selectedSport.key, 'numeric')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('role', selectedRole && selectedRole.key, 'required|numeric')}</Text>
                    <Text style={styles.error}>{this.validator.message('sports', selectedSport && selectedSport.key, 'numeric')}</Text>
                  </View>)}
                </ScrollView>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.submitBtn} onPress={isLoading ? console.log('do nothing') : this.gotoDash}>
                        {isLoading ? (<ActivityIndicator size={'small'} color="#fff"  />) : (<Text style={styles.submitBtnTxt}>Update</Text>)}
                    </TouchableOpacity>
                </View>
                <ModalFilterPicker
                    listContainerStyle={{backgroundColor: '#fff', width: width - 50, height: height - 200, marginBottom: height - (height - 125), top: height - (height - 100), borderRadius: 10}}
                    visible={visible}
                    onSelect={async (_item) => await this.onSelect(_item, cSelect)}
                    onCancel={this.onCancel}
                    options={options}
                />
                {showPicker && (
                    <DateTimePicker value={new Date()} mode="date" display="default" onChange={this.onDateChange} />
                )}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#0d4ae8'
    },
    hText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff',
        marginBottom: 25,
    },
    left: {
        marginRight: 2.5
    },
    right: {
        marginLeft: 2.5
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginVertical: 2.5,
        overflow: 'hidden',
        width: width
    },
    inputStyle: {
        flex: 1, borderColor: '#fff', borderWidth: 1, borderRadius: 5, padding: 10, color: '#000', fontSize: 18, backgroundColor: '#eee'
    },
    dateField: {
      padding: 0, borderWidth: 0, backgroundColor: 'transparent'
    },
    submitBtn: {
        width: 200,
        height: 44,
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#888',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 50
    },
    submitBtnTxt: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    scrollview: {
      flex: 1
    },
    top: {
      marginTop: 50,
      marginBottom: 10
    },
    flexCol: {
      flexDirection: 'column'
    },
    error: {
      color: '#ff0000',
      fontWeight: 'bold',
      fontSize: 12,
      flex: 1
    }
});

//make this component available to the app
export default OtherRegisterScreen;
