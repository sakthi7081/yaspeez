import React from 'react';
import { View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Icon, Text, Avatar } from '@ui-kitten/components';
import { getProfile } from '../utils/api';

export default class ProfileScreen extends React.Component {
  state = {profileInfo: null};

  goBack = () => this.props.navigation.goBack();

  async componentDidMount() {
    const {route} = this.props;
    const {params} = route;
    const {profileId} = params;
    
    await getProfile(profileId)
            .then(({data}) => this.setState({profileInfo: data[0]}))
            .catch(e => console.log(e.message));
  }

  render() {
    const {profileInfo} = this.state;
    if(profileInfo === null)
      return null;

    // console.log(profileInfo, 'profileInfo');

    const {address, city, dob, email, events, gender, img, ismember, lastname, name, phone, pinciode, placeofbirth} = profileInfo;

    return (
      <View style={{ flex:1 }}>
        <ImageBackground source={require('../assets/splash.png')} resizeMode='contain' style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', flexDirection: 'column', paddingBottom: !ismember ? 30 : 0}} imageStyle={{opacity: 0.3}}>
          <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
            <Icon name="chevron-left" height={24} width={24} fill='#fff' />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between', marginTop: 80, paddingHorizontal: 20, paddingVertical: 5}}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24}}>{name}</Text>
            <Avatar source={{uri: img}} style={{height: 50, width: 50, backgroundColor: '#ccc'}} />
          </View>
          {ismember && (
            <Text style={{paddingVertical: 10, paddingHorizontal: 20, color: '#ffffff70', fontSize: 14}}>{ismember ? 'Member' : ''}</Text>
          )}
        </ImageBackground>
        <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
          <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
            {dob && (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 5}}>
              <Icon name="calendar-outline" fill='#0d4ae8' height={24} width={24} />
              <Text style={{marginLeft: 5}}>{dob}</Text>
            </View>)}
            {email && (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 5}}>
              <Icon name="email-outline" fill='#0d4ae8' height={24} width={24} />
              <Text style={{marginLeft: 5}}>{email}</Text>
            </View>)}
            {gender && (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 5}}>
              <Icon name="radio-button-on" fill='#0d4ae8' height={24} width={24} />
              <Text style={{marginLeft: 5}}>{gender}</Text>
            </View>)}
            {phone && (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 5}}>
              <Icon name="smartphone-outline" fill='#0d4ae8' height={24} width={24} />
              <Text style={{marginLeft: 5}}>{phone}</Text>
            </View>)}
            {address && (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 5}}>
              <Icon name="flash-outline" fill='#0d4ae8' height={24} width={24} />
              <Text style={{marginLeft: 5}}>{address}</Text>
            </View>)}
            {placeofbirth && (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 5}}>
              <Icon name="pin-outline" fill='#0d4ae8' height={24} width={24} />
              <Text style={{marginLeft: 5}}>{placeofbirth}</Text>
            </View>)}
            {pinciode && (<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 5}}>
              <Icon name="code-outline" fill='#0d4ae8' height={24} width={24} />
              <Text style={{marginLeft: 5}}>{pinciode}</Text>
            </View>)}
          </View>
        </ScrollView>
      </View>
    )
  }
}

{/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
    <Icon name="chevron-left" height={24} width={24} fill='#fff' />
  </TouchableOpacity>
  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Profile</Text>
</View> */}