//import liraries
import React, { Component } from 'react';
import OtherRegisterScreen from './OtherRegister';
import MapScreen from './Map';

// create a component
class Dashboard extends Component {
    render() {
        const {isProfileUpdated} = this.props;
        return isProfileUpdated ? <MapScreen /> : <OtherRegisterScreen />
    }
}

//make this component available to the app
export default Dashboard;
