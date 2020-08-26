import React from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import moment from 'moment';
import { getOrgEvents } from '../utils/api';
import { View, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import MapView from "react-native-map-clustering";

const {width} = Dimensions.get('window');

export default class EventItem extends React.Component {
  state = {BranchName: '', Coach: '', Description: '', EndDate: '', EventAt: '', EventName: '', EventType: '', FeeAmount: '', NoOfDays: '', NoOfPerson: '', OrganizationName: '', Recurrence: '', Remarks: '', SportName: '', StartDate: '', ThisEventFor: ''};

  handlePress = () => {
    console.log('btn pressed');
  }

  goBack = () => this.props.navigation.goBack();

  goToSubscribe = (feeAmount, orgName, eventName) => {
    const {navigation} = this.props;
    navigation.navigate('Subscribe', {feeAmount: feeAmount, orgName: orgName, eventName: eventName});
  }

  async componentDidMount() {
    const {route} = this.props;
    const {params} = route;
    const {eventID} = params;
    let eventInfo = await getOrgEvents(eventID);
    const {value} = eventInfo;
    let eventData = value[0];
    const {BranchName, Coach, Description, EndDate, EventAt, EventName, EventType, FeeAmount, NoOfDays, NoOfPerson, OrganizationName, Recurrence, Remarks, SportName, StartDate, ThisEventFor} = eventData;
    this.setState({BranchName, Coach, Description, EndDate, EventAt, EventName, EventType, FeeAmount, NoOfDays, NoOfPerson, OrganizationName, Recurrence, Remarks, SportName, StartDate, ThisEventFor});
  }

  render() {
    const {BranchName, Coach, Description, EndDate, EventAt, EventName, EventType, FeeAmount, NoOfDays, NoOfPerson, OrganizationName, Recurrence, Remarks, SportName, StartDate, ThisEventFor} = this.state;
    return (
      <Layout style={styles.container}>
        <View>
          <ImageBackground source={{uri: `https://picsum.photos/200/300/?blur&random=${new Date().getTime()}`}} style={styles.head}>
            <LinearGradient colors={['#0d4ae890', '#0d4ae890']}>
              <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 10}} onPress={this.goBack}>
                <Icon name="chevron-left" height={24} width={24} fill='#fff' />
              </TouchableOpacity>
              <Text style={[styles.white, styles.gradient, {marginTop: 50}]} category="h1">{EventName}</Text>
              <Text style={[styles.white, styles.gradient, {marginBottom: 10}]} category="c2">{Description}</Text>
            </LinearGradient>
          </ImageBackground>
          <View style={{ backgroundColor: '#eee', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={{ paddingVertical: 10, paddingHorizontal: 15, fontWeight: 'bold' }}>{SportName}</Text>
          </View>
        </View>
        <ScrollView style={styles.body}>
          <View style={{ backgroundColor: '#eee', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={{ paddingVertical: 10, paddingHorizontal: 15, fontWeight: 'bold' }}>Organiser</Text>
            <View style={{marginBottom: 10, flexDirection: 'row'}}>
              <Image source={{uri: `https://picsum.photos/100/100/?random=${new Date().getTime()}`}} style={{backgroundColor: '#888', borderRadius: 50, height: 50, width: 50, marginHorizontal: 15, marginRight: 10}} />
              <View style={{justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
                <Text style={{fontWeight: 'bold', color: '#888'}}>{Coach}</Text>
                <TouchableOpacity>
                  <Text style={{color: '#0d4ae8', fontWeight: 'bold', fontSize: 12}}>Voir le profil</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
            <View style={styles.flexRow}>
              <Icon name="calendar-outline" height={24} width={24} fill='#0d4ae8' />
              <Text category='p2' style={styles.info}>{moment(StartDate).format('Do MMMM, YYYY')} to {moment(EndDate).format('Do MMMM, YYYY')}</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon name="clock-outline" height={24} width={24} fill='#0d4ae8' />
              <Text category='p2' style={styles.info}>{NoOfDays} days</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon name="people-outline" height={24} width={24} fill='#0d4ae8' />
              <Text category='p2' style={styles.info}>{NoOfPerson} nos.</Text>
            </View>
            <MapView initialRegion={{
              latitude: 48.8647, longitude: 2.3490, latitudeDelta: 0.0922, longitudeDelta: 0.421,
            }} style={{height: 150, borderRadius: 5, overflow: 'hidden', marginBottom: 10, backgroundColor: '#ccc'}} liteMode={true} provider="google">

            </MapView>
            <View style={styles.flexRow}>
              <Icon name="alert-circle-outline" height={24} width={24} fill='#0d4ae8' />
              <Text category='p2' style={styles.info}>{EventType}</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon name="briefcase-outline" height={24} width={24} fill='#0d4ae8' />
              <Text category='p2' style={styles.info}>${parseFloat(FeeAmount).toFixed(2)}</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon name="activity-outline" height={24} width={24} fill='#0d4ae8' />
              <Text category='p2' style={styles.info}>{ThisEventFor}</Text>
            </View>
            <View style={styles.flexRow}>
              <Icon name="home-outline" height={24} width={24} fill='#0d4ae8' />
              <Text category='p2' style={styles.info}>{OrganizationName}</Text>
            </View>
          </View>
        </ScrollView>
        <Layout style={styles.footer}>
          <TouchableOpacity style={styles.btnContainer} onPress={() => this.goToSubscribe(FeeAmount, OrganizationName, EventName)}>
            <Text style={[styles.white, styles.btnText]}>Subscribe</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent: 'space-between'},
  flexRow: {flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, alignItems: 'center'},
  body: {flex: 1},
  spacing: {paddingHorizontal: 20, paddingVertical: 10, },
  footer: {paddingHorizontal: 20, paddingVertical: 10, paddingBottom: 20},
  head: {backgroundColor: '#0d4ae850', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden'},
  gradient: {paddingHorizontal: 20},
  label: {fontWeight: 'bold', fontSize: 16},
  info: {fontSize: 15, color: '#888', marginLeft: 5},
  white: {color: '#fff'},
  btnContainer: {backgroundColor: '#0d4ae8', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5},
  btnText: {fontWeight: 'bold'},
  img: {height: 150, width: width - 40, borderRadius: 5, marginBottom: 10, backgroundColor: '#eee'}
})