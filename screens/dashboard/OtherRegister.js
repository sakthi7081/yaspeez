//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { StatusBar } from 'expo-status-bar';

import Api from '../../utils/Api';
import { changeKey } from '../../utils';

const sports = [
    {key: 1, label: 'Basket Ball'},
    {key: 2, label: 'Bowling'},
    {key: 3, label: 'Cricket'},
    {key: 4, label: 'Boxing'},
    {key: 5, label: 'MMA'},
    {key: 6, label: 'Tennis'},
    {key: 7, label: 'Table Tennis'},
];

// create a component
class OtherRegisterScreen extends Component {
    state = {selectedCountry: null, selectedCity: null, selectedRole: null, selectedSport: null, options: [], visible: false, cSelect: 'selectedCity', roles: [], countries: [], cities: []};

    gotoDash = () => {
        const {navigation} = this.props;
        navigation.navigate('Dash');
    }

    handlePress = (options, cSelect) => {
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
        let roles = await Api.get('organization').then(res => changeKey(res.data));
        let countries = await Api.get('countries').then(res => changeKey(res.data));
        this.setState({roles, countries});
    }

    async componentDidMount() {
        await this.init();
    }
    
    render() {
        const {selectedCountry, selectedCity, selectedRole, selectedSport, options, visible, cSelect, countries, roles, cities} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar style='light' />
                <View style={[styles.row]}>
                    <Text style={styles.hText}>Fill the following details</Text>
                </View>
                <View style={styles.row}>
                    <TextInput style={[styles.inputStyle, styles.left]} placeholder="First Name" />
                    <TextInput style={[styles.inputStyle, styles.right]} placeholder="Last Name" />
                </View>
                <View style={styles.row}>
                    <TextInput style={[styles.inputStyle, styles.left]} placeholder="Date of Birth" />
                    <TextInput style={[styles.inputStyle, styles.right]} placeholder="Place of Birth" />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.inputStyle} placeholder="Phone Number" />
                </View>
                <View style={styles.row}>
                    <TextInput style={styles.inputStyle} placeholder="Address" />
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.inputStyle, styles.left]} onPress={() => this.handlePress(countries, 'selectedCountry')}>
                        <TextInput style={{color: '#000', fontSize: 18}} placeholder="Countries" editable={false} value={selectedCountry && selectedCountry.label} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.inputStyle, styles.right]} onPress={() => cities && cities.length > 0 ? this.handlePress(cities, 'selectedCity') : console.log('do nothing')}>
                        <TextInput style={{color: '#000', fontSize: 18}} placeholder="Cities" editable={false} value={selectedCity && selectedCity.label} />
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TextInput style={[styles.inputStyle, styles.left]} placeholder="Pincode" />
                    <TextInput style={[styles.inputStyle, styles.right]} placeholder="Referral Code" />
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.inputStyle, styles.left]} onPress={() => this.handlePress(roles, 'selectedRole')}>
                        <TextInput style={{color: '#000', fontSize: 18}} placeholder="Roles" editable={false} value={selectedRole && selectedRole.label} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.inputStyle, styles.right]} onPress={() => this.handlePress(sports, 'selectedSport')}>
                        <TextInput style={{color: '#000', fontSize: 18}} placeholder="Sports" editable={false} value={selectedSport && selectedSport.label} />
                    </TouchableOpacity>
                </View>
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
        marginVertical: 2.5
    },
    inputStyle: {
        flex: 1, borderColor: '#fff', borderWidth: 1, borderRadius: 5, padding: 10, color: '#000', fontSize: 18, backgroundColor: '#eee'
    },
    submitBtn: {
        flex: 1,
        marginVertical: 40,
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
    }
});

//make this component available to the app
export default OtherRegisterScreen;
