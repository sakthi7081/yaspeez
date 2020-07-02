//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';


// create a component
class OtherRegisterScreen extends Component {
    gotoDash = () => {
        const {navigation} = this.props;
        navigation.navigate('Dash');
    }
    
    render() {
        return (
            <View style={styles.container}>
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
                    <TextInput style={[styles.inputStyle, styles.left]} placeholder="Pincode" />
                    <TextInput style={[styles.inputStyle, styles.right]} placeholder="Referral Code" />
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.submitBtn} onPress={this.gotoDash}>
                        <Text style={styles.submitBtnTxt}>Update</Text>
                    </TouchableOpacity>
                </View>
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
