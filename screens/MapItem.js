import React from 'react';
import { Text, Layout, Button, Icon, Divider, List, ListItem } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Dimensions, ScrollView, View, Animated } from 'react-native';
import { getOrg, getOrgEvents } from '../utils/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width - 100;

const data = [
  'Cricket', 'Basket Ball', 'Tennis', 'Volly Ball', 'MMA', 'Boxing', 'Karate'
];

export default class MapItemScreen extends React.Component {
  state = {size: 100, scrollY: new Animated.Value(0), coaches: [], sports: [], email: '', number: '', eventslist: [], website: ''};

  handleBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  }

  renderIcon = (name, size, color) => <Icon name={name} fill={color} height={size} width={size} />

  renderHeader = (id, image, name, size, left, opacity) => (
    <Layout style={[styles.bgBlue, styles.flexRow]}>
      <Button onPress={() => this.handleBack()} accessoryLeft={() => this.renderIcon('chevron-left', 24, '#fff')} appearance={'ghost'} style={styles.headerButton} />
      <Animated.View style={[styles.flexRow, styles.headerImage, {margin: 0}]}>
        <Animated.Image source={{uri: `${image}?random=${id}`}} resizeMode='contain' resizeMethod={'scale'} style={[styles.headerImage, {position: 'relative', left: left, height: size}]} />
        <Animated.Text numberOfLines={1} style={{color: '#fff', position: 'relative', left: -200, top: 14, fontWeight: 'bold', opacity: opacity}}>{name}</Animated.Text>
      </Animated.View>
      <Button accessoryLeft={() => this.renderIcon('share-outline', 24, '#fff')} appearance={'ghost'} style={styles.headerButton} />
    </Layout>
  );

  renderSubHeader = (rating, name, address, distance, metric) => (
    <Layout style={[styles.bgBlue, styles.flexRow]}>
      <Layout style={[styles.flexRow, styles.subCorner, styles.bgBlue, styles.aCenter]}>
        {this.renderIcon('star', 16, '#FDA50F')}
        <Text style={[styles.subText, styles.subTextBold, styles.subTextMargin]} category={'p2'}>{rating}</Text>
      </Layout>
      <Layout style={[styles.bgBlue, styles.subCenter, styles.aCenter]}>
        <Text style={[styles.subText, styles.subTextBold]} numberOfLines={1} category={'h5'}>{name}</Text>
        <Text style={[styles.subText, styles.tCenter]} numberOfLines={2} category={'p2'}>{address}</Text>
      </Layout>
      <Layout style={[styles.flexRow, styles.subCorner, styles.bgBlue, styles.aCenter]}>
        {this.renderIcon('pin-outline', 16, '#fff')}
        <Text style={[styles.subText, styles.subTextBold, styles.subTextMargin]} category={'p2'}>{distance} <Text category={'c2'} style={[styles.subText]}>{metric}</Text></Text>
      </Layout>
    </Layout>
  );

  renderContent = (description, email, number, website) => (
    <Layout style={[styles.bgBlue, {marginHorizontal: 25}]}>
      <Divider style={styles.dividerStyle} />
      <Layout style={[styles.flexRow, styles.bgBlue, styles.aCenter, {justifyContent: 'flex-start'}]}>
        {this.renderIcon('email-outline', 16, '#fff')}
        <Text style={[styles.subText, styles.subTextMargin]}>{email}</Text>
      </Layout>
      <Layout style={[styles.flexRow, styles.bgBlue, styles.aCenter, {justifyContent: 'flex-start'}]}>
        {this.renderIcon('smartphone-outline', 16, '#fff')}
        <Text style={[styles.subText, styles.subTextMargin]}>{number}</Text>
      </Layout>
      <Layout style={[styles.flexRow, styles.bgBlue, styles.aCenter, {justifyContent: 'flex-start'}]}>
        {this.renderIcon('globe-outline', 16, '#fff')}
        <Text style={[styles.subText, styles.subTextMargin]}>{website}</Text>
      </Layout>
      <Divider style={styles.dividerStyle} />
      <Text style={[styles.subText, styles.desc]} numberOfLines={3}>{description}</Text>
    </Layout>
  );

  renderReviewStars = count => (
    new Array(5).fill(5).map((arr, i) => (
      <Icon name={count - 1 < i ? 'star-outline' : 'star'} fill={'#FDA50F'} height={16} width={16} key={`review-star-${i}`} />
    ))
  );

  renderReview = () => (
    <Layout style={[styles.trans, styles.card, {flexDirection: 'column'}]}>
      <Layout style={[styles.trans, styles.flexRow, {alignItems: 'center', width: CARD_WIDTH - 20, marginHorizontal: 5, borderBottomWidth: 1, borderBottomColor: '#cccccc50', paddingBottom: 5}]}>
        <Text category={'h6'}>Benjamin B.</Text>
        <Layout style={[styles.trans, styles.flexRow]}>
          {this.renderReviewStars(4)}
        </Layout>
      </Layout>
      <Layout style={{marginHorizontal: 5, marginTop: 5}}>
        <Text numberOfLines={3} category={'p1'}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
      </Layout>
    </Layout>
  );

  renderReviews = () => (
    <Layout style={[styles.trans]}>
      <Text style={[styles.innerHeading, styles.wrapper, {marginBottom: 10}]} category={'h6'}>Reviews</Text>
      <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.endPadding} snapToInterval={CARD_WIDTH + 20} snapToAlignment={'center'}>
        {this.renderReview()}
        {this.renderReview()}
        {this.renderReview()}
        {this.renderReview()}
      </ScrollView>
    </Layout>
  );

  renderItem = ({item}) => (
    <ListItem
      style={[{backgroundColor: '#fff', borderBottomColor: '#cccccc50', borderBottomWidth: 1, fontWeight: 'bold'}]}
      title={<Text>{item.name}</Text>}
      accessoryLeft={props => <Icon name='radio-button-off-outline' {...props} />}
    />
  );

  renderActivities = (sports) => (
    <Layout style={[styles.trans, styles.wrapper, styles.bottomWrapper]}>
      <Text style={styles.innerHeading} category={'h6'}>Activities</Text>
      {sports.length === 0 && (<Text style={{padding: 8}}>No activities available!</Text>)}
      <List style={[styles.trans, {marginTop: 10}]} data={sports} renderItem={this.renderItem} />
    </Layout>
  );

  renderCoaches = (coaches) => (
    <Layout style={[styles.trans, styles.wrapper, styles.bottomWrapper, {marginTop: 0}]}>
      <Text style={styles.innerHeading} category={'h6'}>Coaches</Text>
      <Layout style={[styles.trans]}>
        <Layout style={[styles.trans, styles.flexRow, styles.wrapper]}>
          {coaches.length === 0 && (<Text>No coaches available!</Text>)}
          {coaches.forEach((coach, i) => (
            <Layout style={[styles.trans, styles.aCenter]}>
              <Image source={{uri: `${coach && coach.img}`}} resizeMode='cover' style={{height: 80, width: 80, borderRadius: 50}} />
              <Text numberOfLines={1} category={'p2'} style={{marginTop: 5, fontWeight: 'bold'}}>{coach && coach.img}</Text>
              <Text numberOfLines={1} category={'c2'}>{coach && coach.special}</Text>
            </Layout>
          ))}
        </Layout>
      </Layout>
    </Layout>
  );

  renderEvents = eventslist => (
    <Layout style={[styles.trans]}>
      <Text style={[styles.innerHeading, styles.wrapper, {marginBottom: 10}]} category={'h6'}>Events</Text>
      <ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.endPadding} snapToInterval={CARD_WIDTH + 20} snapToAlignment={'center'}>
        {eventslist.length === 0 && (
          <Layout style={{marginHorizontal: 20}}>
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

  handleScroll = Animated.event(
    [{
      nativeEvent: {contentOffset: {y: this.state.scrollY}},
      useNativeDriver: true
    }]
  );

  gotoEventItem = (eventID) => {
    const {navigation} = this.props;
    navigation.navigate('EventItem', {eventID});
  }

  async componentDidMount() {
    const {route} = this.props;
    const {params} = route;
    const {item} = params;
    const {id} = item;
    let orgDetails = await getOrg(id);
    // let eventDetails = await getOrgEvents(id);
    // const {value} = eventDetails;
    const {data} = orgDetails;
    const {sports, coaches, email, number, eventslist, website} = data;
    this.setState({sports, coaches, email, number, eventslist, website});
  }

  render() {
    const {route} = this.props;
    const {params} = route;
    const {item} = params;
    const {image, name, description, id, distance, metric, rating, address} = item;

    const imgHeight = () => {
      const {scrollY} = this.state;
      return scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [100, 40],
        extrapolate: 'clamp',
        useNativeDriver: true
      });
    };

    const imgLeft = () => {
      const {scrollY} = this.state;
      return scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [-10, -100],
        extrapolate: 'clamp',
        useNativeDriver: true
      });
    };
    
    const textOpacity = () => {
      const {scrollY} = this.state;
      return scrollY.interpolate({
        inputRange: [50, 50],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        useNativeDriver: true
      });
    };

    const {sports, email, number, coaches, eventslist, website} = this.state;


    return (
      <Layout style={[styles.container]}>
        <Layout style={[styles.bgBlue, {position: 'relative', zIndex: 10}]}>
          {this.renderHeader(id, image, name, imgHeight(), imgLeft(), textOpacity())}
        </Layout>
        <Animated.ScrollView style={{position: 'relative', zIndex: 10}} onScroll={this.handleScroll} scrollEventThrottle={16} overScrollMode={'never'}>
          <Layout style={[styles.bgBlue, styles.top]}>
            {this.renderSubHeader(rating, name, address, distance, metric)}
            {this.renderContent(description, email, number, website)}
          </Layout>
          <Layout style={[styles.trans, {marginVertical: 15}]}>
            {this.renderCoaches(coaches)}
            {this.renderActivities(sports)}
            {this.renderEvents(eventslist)}
            {this.renderReviews()}
          </Layout>
        </Animated.ScrollView>
        <LinearGradient
          colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#00000090']}
          style={{ position: 'absolute', width: width, height: height, top: 0, left: 0, zIndex: 0 }} />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, bgBlue: {
    backgroundColor: '#0d4ae8'
  }, headerImage: {
    width: width - 120, margin: 5, borderRadius: 5, overflow: 'hidden'
  }, headerButton: {
    height: 50, width: 50
  }, subCorner: {
    width: 70
  }, subCenter: {
    width: width - 160, marginHorizontal: 10
  }, flexRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'
  }, aCenter: {
    alignItems: 'center', justifyContent: 'center'
  }, subText: {
    color: '#fff'
  }, subTextBold: {
    fontWeight: 'bold'
  }, subTextMargin: {
    marginLeft: 3
  }, dividerStyle: {
    marginVertical: 15, backgroundColor: '#ffffff30'
  }, desc: {
    paddingBottom: 25
  }, top: {
    borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden'
  }, tCenter: {
    textAlign: 'center'
  }, trans: {
    backgroundColor: 'transparent'
  }, wrapper: {
    marginHorizontal: 10, marginTop: 10
  }, bottomWrapper: {
    marginBottom: 10
  }, innerHeading: {
    fontWeight: 'bold'
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
    width: CARD_WIDTH,
    overflow: "hidden",
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
});
