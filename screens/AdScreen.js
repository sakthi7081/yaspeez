import React from 'react';
import { Text, Layout, Button } from '@ui-kitten/components';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height - 90);

const scrollItems = [
    {adId: 1, img: require('../assets/images/ads/SCROLL1.png'), bgColor: '#0d4ae8'},
    {adId: 2, img: require('../assets/images/ads/SCROLL2.png'), bgColor: '#08db24'},
    {adId: 3, img: require('../assets/images/ads/SCROLL3.png'), bgColor: '#ff0000'},
    {adId: 4, img: require('../assets/images/ads/SCROLL4.png'), bgColor: '#0d4ae8'},
];

export default class AdScreen extends React.Component {
  state = {stage: 0, bgColor: '#0d4ae8', isFirstTime: false};

  handlePress = async () => {
    const {navigation} = this.props;
    navigation.reset({index: 0, routes: [{name: 'Auth'}]});
  }

  onScroll = (stage, bgColor) => this.setState({stage, bgColor});

  render() {
    const {stage} = this.state;

    return (
      <Layout style={styles.container}>
        <Layout style={styles.floatingPanel}>
          <Button onPress={this.handlePress} appearance={'outline'} size={'tiny'} status={'primary'}>
              {stage < 3 ? 'Passer' : 'Allons-y'}
          </Button>
        </Layout>
        <Swiper onIndexChanged={(index) => this.onScroll(index, '#0d4ae8')} showsButtons={false} loop={false}>
          {scrollItems.map(scrollItem => (
            <Layout key={`scroll-item-${scrollItem.adId}`} style={[styles.swiperItem, {backgroundColor: scrollItem.bgColor}]}>
                <Image resizeMode="contain" source={scrollItem.img} style={styles.sliderImage} />
            </Layout>
          ))}
        </Swiper>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, sliderImage: {
    width: screenWidth, position: 'absolute', top: -100
  }, swiperItem: {
    height: screenHeight, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', position: 'relative'
  }, floatingPanel: {
    position: 'absolute', bottom: 15, justifyContent: 'flex-end', right: 15, flexWrap: 'wrap', zIndex: 100
  }
});
