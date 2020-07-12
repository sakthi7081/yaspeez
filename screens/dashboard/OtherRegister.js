//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import SimpleReactValidator from 'simple-react-validator';
import { StatusBar } from 'expo-status-bar';

import Api from '../../utils/api';
import {changeKey} from '../../utils';

const {width} = Dimensions.get('window');

// create a component
class OtherRegisterScreen extends Component {
    state = {selectedCountry: null, selectedCity: null, selectedRole: null, selectedSport: null, options: [], visible: false, cSelect: 'selectedCity', roles: [], countries: [], cities: [], sports: [], fname: '', lname: '', dob: '', pob: '', phone: '', address: '', email: '', pincode: '', referral: ''};

    gotoDash = () => {
        const {navigation} = this.props;
        if (this.validator.allValid()) {
          navigation.navigate('Dash');
        } else {
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
            cities = await Api.get(`cities?id=${_item.key}`).then(res => changeKey(res.data));
        this.setState({[`${_name}`]: _item, visible: false, cities});
    }

    onCancel = () => {
        this.setState({visible: false});
    }

    init = async () => {
        let roles = await Api.get('yusers/organization').then(res => changeKey(res.data));
        let countries = await Api.get('yusers/countries').then(res => changeKey(res.data));
        let sports = await Api.get('yusers/sports').then(res => changeKey(res.data));
        this.setState({roles, countries});
    }

    onChangeText = (name, text) => this.setState({[name]: text});

    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({autoForceUpdate: this, locale: 'fr'});
    }

    async componentDidMount() {
        await this.init();
    }

    render() {
        const {selectedCountry, selectedCity, selectedRole, selectedSport, options, visible, cSelect, countries, roles, cities, sports, fname, lname, dob, pob, pincode, address, phone, referral} = this.state;
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
                      <TextInput style={[styles.inputStyle, styles.left]} value={dob} onChangeText={txt => this.onChangeText('dob', txt)} placeholder="Date of Birth" />
                      <TextInput style={[styles.inputStyle, styles.right]} value={dob} onChangeText={txt => this.onChangeText('dob', txt)} placeholder="Place of Birth" />
                  </View>
                  {(this.validator.message('dob', dob, 'required|date') || this.validator.message('place of birth', pob, 'required|alpha_space')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('dob', dob, 'required|date')}</Text>
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
                  {(this.validator.message('country', selectedCountry, 'required|numeric') || this.validator.message('city', selectedCity, 'required|numeric')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('country', selectedCountry, 'required|numeric')}</Text>
                    <Text style={styles.error}>{this.validator.message('city', selectedCity, 'required|numeric')}</Text>
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
                  {(this.validator.message('role', selectedRole, 'required|numeric') || this.validator.message('sports', selectedSport, 'numeric')) && (<View style={styles.row}>
                    <Text style={styles.error}>{this.validator.message('role', selectedRole, 'required|numeric')}</Text>
                    <Text style={styles.error}>{this.validator.message('sports', selectedSport, 'numeric')}</Text>
                  </View>)}
                </ScrollView>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.submitBtn} onPress={this.gotoDash}>
                        <Text style={styles.submitBtnTxt}>Update</Text>
                    </TouchableOpacity>
                </View>
                <ModalFilterPicker
                    visible={visible}
                    onSelect={async (_item) => await this.onSelect(_item, cSelect)}
                    onCancel={this.onCancel}
                    options={options}
                />
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
    submitBtn: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#888',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 50
    },
    submitBtnTxt: {
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
