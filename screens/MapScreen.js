import React from 'react';
import { Text, Layout, Icon, Input } from '@ui-kitten/components';
import {CommonActions} from '@react-navigation/native';
import MapView from "react-native-map-clustering";
import {Marker} from 'react-native-maps';
import { StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllOrganizations, getOrgByPurpose } from '../utils/api';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { markers, randomDistance, randomRating, noImgUrl } from '../utils/data';
import { toFloat } from '../utils/functions';

import mapMarker from '../assets/images/maps/map-marker.png';
import CImage from '../components/CImage';
import Purpose from '../database/models/purpose';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 100;
const CARD_WIDTH = width - 100;

export default class MapScreen extends React.Component {
  state = {
    region: {
      latitude: 48.8647, longitude: 2.3490, latitudeDelta: 0.0922, longitudeDelta: 0.0421,
    }, markers : markers, tracksViewChanges: true, search: '', collection: [], data: []
  };

  handleAnimate = index => {
    const {markers} = this.state;
    let region = { latitude: markers[index].latitude, longitude: markers[index].longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
    this.mapView.animateToRegion(region, 500);
  }

  handleScroll = ({nativeEvent}) => {
    const {markers} = this.state;
    const {contentOffset, contentSize} = nativeEvent;
    const {x} = contentOffset;
    const {width} = contentSize;
    const singleCardWidth = width / markers.length;
    const currentIndex = Math.round(x / singleCardWidth);
    this.handleAnimate(currentIndex <= 0 ? 0 : currentIndex);
  }

  renderIcon = name => <Icon name={name} height={24} width={24} fill={'#ccc'} />

  stopTrackingViewChanges = () => this.setState({ tracksViewChanges: false });

  gotoMapItem = item => {
    const {navigation} = this.props;
    navigation.navigate('MapItem', {item});
  }

  handleImgErr = e => {
    console.log(e, 'err');
  }
  
  handleChange = query => {console.log(query);}

  handleSelected = async (selected, name) => {
    this.setState({[name]: selected});
    await getOrgByPurpose(selected.id)
              .then(({data}) => {
                let mapData = [];
                data.map(({lat, lng, name, desc, img, id, address}) => mapData.push({latitude: toFloat(lat), longitude: toFloat(lng), name: name, rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: desc, image: img, id, address}));
                this.setState({markers: mapData});
              })
              .catch(e => Alert.alert('Error', e.message));
  };

  async componentDidMount() {
    const {region} = this.state;
    const {navigation} = this.props;
    const collection = await Purpose.query();
    this.setState({ collection, data: collection });
    await getAllOrganizations()
      .then(({data}) => {
        let mapData = [];
        data.map(({lat, lng, name, desc, img, id, address}) => mapData.push({latitude: toFloat(lat), longitude: toFloat(lng), name: name, rating: randomRating(1, 5), distance: randomDistance(100, 700), metric: 'm', description: desc, image: img, id, address}));
        this.setState({markers: mapData});
        navigation.dispatch(state => {
          // Remove the home route from the stack
          const routes = state.routes.filter(r => r.name !== 'Auth');
          console.log(routes, 'routes');
          return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
          });
          // CommonActions.reset({
          //   index: 0,
          //   routes: [{ name: 'MapScreen' }],
          // })
        });
        this.handleAnimate(0);
      })
      .catch(e => Alert.alert('Error', e.message));
  }

  render() {
    const {region, markers, tracksViewChanges, search, data} = this.state;
    if(markers.length === 0)
      return null;

    return (
      <Layout style={styles.container}>
        <MapView style={styles.mapView} initialRegion={region} provider="google" mapRef={(ref) => this.mapView = ref} tracksViewChanges={tracksViewChanges}>
          {markers.map(({latitude, longitude, name, id}, index) => (
            <Marker key={`map-marker-${index}-${id}`} coordinate={{latitude, longitude}} title={name}>
              <Layout style={styles.trans}>
                <Image onLoad={this.stopTrackingViewChanges} fadeDuration={0} source={mapMarker} style={styles.markerImg} />
                <Layout style={styles.ovalShadow} />
              </Layout>
            </Marker>
          ))}
        </MapView>
        <Layout style={[styles.overlayItem, styles.overlayTop]}>
          {/* <Input placeholder='Rechercher un lieu | un sport' style={styles.searchInput} accessoryLeft={() => this.renderIcon('search')} onFocus={this.handleFocusIn} onBlur={this.handleFocusOut} onChangeText={this.handleChangeText} value={search} /> */}
          <SearchableDropdown
            style={styles.selectOption}
            textInputStyle={{marginHorizontal: 10, borderWidth: 1, borderRadius: 5, paddingHorizontal: 15, fontSize: 15, paddingVertical: 5, borderColor: '#e4e9f2', backgroundColor: '#f7f9fc', color: '#222b45'}}
            containerStyle={{marginVertical: 5}}
            itemStyle={{marginHorizontal: 5, paddingHorizontal: 10, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#e4e9f2'}}
            itemTextStyle={{fontSize: 15, color: '#222b45'}}
            itemsContainerStyle={{marginHorizontal: 10, borderWidth: 1, borderRadius: 5, borderColor: '#e4e9f2', backgroundColor: '#fff'}}
            onItemSelect={item => this.handleSelected(item, 'search')}
            onTextChange={this.handleChange}
            underlineColorAndroid="transparent"
            placeholder="Rechercher un lieu | un sport"
            placeholderTextColor='#222b4573'
            multi={false}
            resetValue={false}
            items={data}
            value={search && search.name}
          />
        </Layout>
        <Layout style={styles.overlayItem}>
          <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.endPadding} snapToInterval={CARD_WIDTH + 20} snapToAlignment={'center'} onScroll={this.handleScroll} >
            {markers.map(({image, name, description, id, distance, metric, rating, address}, index) => (
              <TouchableOpacity key={`card-item-${index}-${id}`} style={styles.card} onPress={() => this.gotoMapItem({image, name, description, id, distance, metric, rating, address})}>
                <CImage source={{uri: `${image}`}} noImgUrl={{uri: noImgUrl}} resizeMode='contain' style={styles.cardImage} />
                <Layout style={[styles.cardItem, styles.transBg]}>
                  <Text style={styles.cardTitle} category='h6' numberOfLines={1}>{name}</Text>
                  <Text style={styles.description} numberOfLines={2} category='p2'>{description}</Text>
                  <Layout style={[styles.flexRow, styles.jBetween, styles.transBg]}>
                    <Layout style={[styles.flexRow, styles.transBg]}>
                      <Icon name='pin' fill='#000' height={16} width={16} />
                      <Text style={styles.distText}>{distance} <Text>{metric}</Text></Text>
                    </Layout>
                    <Layout style={[styles.flexRow, styles.transBg]}>
                      <Icon name='star' fill='#FDA50F' height={16} width={16} />
                      <Text style={styles.distText}>{rating}</Text>
                    </Layout>
                  </Layout>
                </Layout>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Layout>
        <LinearGradient
          colors={['#00000040', '#ffffff00', '#ffffff00', '#ffffff00', '#ffffff00', '#ffffff00', '#ffffff00', '#00000090']}
          style={{ position: 'absolute', width: width, height: height, top: 0, left: 0, zIndex: 5 }} />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, mapView: {
    flex: 1
  }, overlayTop: {
    top: 10, left: 10, right: 10
  }, overlayItem: {
    position: 'absolute', bottom: 30, left: 0, right: 0, zIndex: 10, backgroundColor: 'transparent'
  }, searchInput: {
    backgroundColor: '#ffffffee', borderWidth: 0
  }, endPadding: {
    paddingRight: 0
  }, cardImage: {
    width: 80, height: 80, marginHorizontal: 5, borderRadius: 10, overflow: 'hidden'
  }, cardItem: {
    flex: 1, marginHorizontal: 5
  }, flexRow:{
    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
  }, distText: {
    fontWeight: 'bold'
  }, cardTitle: {
    fontWeight: 'bold', textTransform: 'capitalize'
  }, trans: {
    backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'
  }, markerImg: {
    position: 'relative', zIndex: 10
  }, ovalShadow: {
    height: 50, width: 50, backgroundColor: '#00000040', zIndex: 0, borderRadius: 50, overflow: 'hidden', transform: [{scaleY: 0.35} ], bottom: 25, position: 'relative',
  }, jBetween: {
    justifyContent: 'space-between', alignItems: 'center'
  }, transBg: {
    backgroundColor: 'transparent'
  }, card: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 50,
    shadowOpacity: 0.8,
    shadowOffset: { x: 0, y: 0 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }, selectOption: {
    paddingHorizontal: 30, paddingVertical: 5,
  }
});
