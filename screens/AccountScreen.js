import React from 'react';
import { Text, Layout, Button, Icon } from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity, ImageBackground, Image, Dimensions, ScrollView} from 'react-native';
import moment from 'moment';
import YasLogo from '../assets/splash.png';
import { defaultAvatar, apiImg } from '../utils/data';
import { listToMatrix } from '../utils/functions';
import User from '../database/models/user';
import { getProfile } from '../utils/api';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width - 100;
const singleImgWidth = (width - 60) / 3;

export default class AccountScreen extends React.Component {
  state = {fname: '', lname: '', email: '', phone: '', bornat: '', address: '', pincode: '', referral: '', user_id: '', eventslist: []};

  getDesc = date => `${moment().diff(moment(date, 'dd-mm-yyyy'), 'years')} | ABONNE LE ${moment(date, 'dd-mm-yyyy').format('mm/yyyy')}`;
  
  renderIcon = name => <Icon name={name} fill={'#fff'} height={24} width={24} />

  renderHeader = (fname, lname, bornat) => (
    <ImageBackground source={YasLogo} imageStyle={{opacity: 0.2}} resizeMode={'contain'} style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View style={styles.headerTopBar}>
          <Button appearance={'ghost'} accessoryLeft={() => this.renderIcon('edit')} onPress={this.goToAccountEdit} />
        </View>
        <View style={styles.headerInfoBar}>
          <View>
            <Text style={styles.headerName}>{fname ? fname : 'BEN-4-BOXING'}{lname ? ` ${lname}` : ''}</Text>
            <Text style={styles.headerDesc}>{bornat ? this.getDesc(bornat) : '28 ANS | ABONNE LE  04/1995'}</Text>
            <TouchableOpacity style={styles.headerAjouter}>
              {this.renderIcon('plus')}
              <Text style={styles.headerAjouterText}>Ajouter un sport favori</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image source={{uri: defaultAvatar}} style={[styles.headerUserImg, styles.headerUserImgWrapper]} />
          </View>
        </View>
      </View>
    </ImageBackground>);

  renderPhotos = () => (
    <View style={styles.usrImgContainer}>
      <Text style={styles.innerHeading}>My Photos</Text>
      {listToMatrix(new Array(9).fill(apiImg), 3).map((arr, i) => (
        <View key={`user-upld-row-${i}`} style={styles.usrImgRow}>
          {arr.map((img, j) => (
            <Image source={{uri: `${img}?random=${i}${j}${new Date().getTime()}`}} key={`user-upld-${i}${j}`} style={styles.usrImg} />
          ))}
        </View>
      ))}
    </View>
  )

  renderEvents = eventslist => (
    <Layout style={[styles.trans]}>
      <Text style={[styles.innerHeading, styles.wrapper, {marginBottom: 10}]} category={'h6'}>Events</Text>
      <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.endPadding} snapToInterval={CARD_WIDTH + 20} snapToAlignment={'center'}>
        {eventslist.length === 0 && (
          <Layout style={{marginHorizontal: 20, marginBottom: 20}}>
            <Text>No events available!</Text>
          </Layout>
        )}
        {eventslist.map((event, i) => (
          <TouchableOpacity key={`event-item-${i}`} onPress={() => this.gotoEventItem(event.id)} style={[styles.trans, styles.card, {flexDirection: 'column'}]}>
            <Layout style={[styles.trans, styles.flexRow, {alignItems: 'center', width: CARD_WIDTH - 20, marginHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#cccccc50', paddingBottom: 5}]}>
              <Text category={'h6'}>{event.name}</Text>
            </Layout>
            <Layout style={{marginHorizontal: 5, marginTop: 5}}>
              <Text numberOfLines={1} category={'p1'}>Type: {event.thiseventfor}</Text>
              <Text numberOfLines={1} category={'p1'}>Fees: {event.feesamount}</Text>
            </Layout>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Layout>
  );
  
  renderInspirations = () => {}

  goToAccountEdit = () => {
    const {navigation} = this.props;
    navigation.navigate('AccountEdit');
  }

  gotoEventItem = (eventID) => {
    const {navigation} = this.props;
    navigation.navigate('EventItem', {eventID});
  }

  reloop = async () => {
    const queryOptions = {
      limit: 1,
      order: 'id DESC'
    };

    let user = await User.query(queryOptions);
    const {address, birth_place, born_at, country_id, email, first_name, last_name, phone_no, pincode, pupose_id, referral, sport_id, state_id, user_id} = user[0];
    const profile = await getProfile(user_id);
    console.log(profile, 'evrnt');
    const {data, status} = profile;
    const {events} = data[0];
    this.setState({
      fname: first_name, lname: last_name, email, phone: phone_no, bornat: born_at, address, pincode, referral, user_id, eventslist: status === 200 ? events : []
    });
  }

  async componentDidMount() {
    await this.reloop();
  }

  // async componentDidUpdate() {
  //   await this.reloop();
  // }

  render() {
    const {fname, lname, email, phone, bornat, address, pincode, referral, user_id, eventslist} = this.state;
    return (
      <Layout style={styles.container}>
        {this.renderHeader(fname, lname, bornat)}
        {this.renderPhotos()}
        {this.renderEvents(eventslist)}
        {this.renderInspirations()}
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, height: height, width: width, backgroundColor: '#fff'},
  headerContainer: {backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden'},
  headerInnerContainer: {paddingHorizontal: 20},
  headerTopBar: {justifyContent: 'space-between', alignItems: 'flex-end'},
  headerName: {color: '#fff', fontWeight: 'bold', fontSize: 20, marginTop: 30},
  headerDesc: {color: '#fff', fontSize: 12, marginBottom: 10},
  headerAjouter: {backgroundColor: '#ffffff70', padding: 0, width: 180, marginBottom: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 2, paddingVertical: 3},
  headerAjouterText: {color: '#fff', fontSize: 15, marginRight: 5},
  headerUserImgWrapper: {borderWidth: 2, borderColor: '#ffffff', overflow: 'hidden'},
  headerUserImg: {width: 70, height: 70, backgroundColor: '#fff', borderRadius: 50, marginBottom: 25},
  headerInfoBar: {flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'},
  usrImgRow: {flexDirection: 'row'},
  usrImg: {height: singleImgWidth, width: singleImgWidth, margin: 5, borderRadius: 10, borderWidth: 1, backgroundColor: '#eee'},
  usrImgContainer: {padding: 15},
  innerHeading: {marginBottom: 5, marginLeft: 5, fontWeight: 'bold', fontSize: 18},
  trans: {backgroundColor: 'transparent'},
  innerHeading: {fontWeight: 'bold'},
  wrapper: {marginHorizontal: 20, marginTop: 10},
  flexRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'},
  card: {paddingVertical: 10, paddingHorizontal: 5, elevation: 2, backgroundColor: "#FFF", marginHorizontal: 10, shadowColor: "#000", shadowRadius: 50, shadowOpacity: 0.8, shadowOffset: { x: 0, y: 0 }, width: CARD_WIDTH, overflow: "hidden", flexDirection: 'row', borderRadius: 10, justifyContent: 'space-between', alignItems: 'flex-start'},
});
