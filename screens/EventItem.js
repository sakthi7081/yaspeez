import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import moment from 'moment';
import { getOrgEvents } from '../utils/api';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

export default class EventItem extends React.Component {
  state = {BranchName: '', Coach: '', Description: '', EndDate: '', EventAt: '', EventName: '', EventType: '', FeeAmount: '', NoOfDays: '', NoOfPerson: '', OrganizationName: '', Recurrence: '', Remarks: '', SportName: '', StartDate: '', ThisEventFor: ''};

  handlePress = () => {
    console.log('btn pressed');
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
        <Layout style={styles.head}>
          <Text style={styles.white} category="h1">{EventName}</Text>
          <Text style={styles.white} category="c2">{Description}</Text>
        </Layout>
        <ScrollView style={styles.body}>
          <Image source={{uri: `https://picsum.photos/200/300/?blur&random=${new Date().getTime()}`}} style={styles.img} resizeMode={'cover'} />
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>Coach</Text>
            <Text category='p2' style={styles.info}>{Coach}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>Starts on</Text>
            <Text category='p2' style={styles.info}>{moment(StartDate).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>Ends on</Text>
            <Text category='p2' style={styles.info}>{moment(EndDate).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>Type</Text>
            <Text category='p2' style={styles.info}>{EventType}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>Fees</Text>
            <Text category='p2' style={styles.info}>{FeeAmount}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>No. of days</Text>
            <Text category='p2' style={styles.info}>{NoOfDays}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>No. of participants</Text>
            <Text category='p2' style={styles.info}>{NoOfPerson}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>Organized by</Text>
            <Text category='p2' style={styles.info}>{OrganizationName}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>Sport</Text>
            <Text category='p2' style={styles.info}>{SportName}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text category="p1" style={styles.label}>For</Text>
            <Text category='p2' style={styles.info}>{ThisEventFor}</Text>
          </View>
        </ScrollView>
        <Layout style={styles.footer}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={[styles.white, styles.btnText]}>Subscribe</Text>
          </TouchableOpacity>
        </Layout>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent: 'space-between'},
  flexRow: {flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5, alignItems: 'center'},
  body: {paddingHorizontal: 20, paddingVertical: 10, flex: 1},
  footer: {paddingHorizontal: 20, paddingVertical: 10, paddingBottom: 20},
  head: {paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25},
  label: {fontWeight: 'bold', fontSize: 16},
  info: {fontSize: 15, color: '#888', marginLeft: 5},
  white: {color: '#fff'},
  btnContainer: {backgroundColor: '#0d4ae8', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5},
  btnText: {fontWeight: 'bold'},
  img: {height: 150, width: width - 40, borderRadius: 5, marginBottom: 10, backgroundColor: '#eee'}
})