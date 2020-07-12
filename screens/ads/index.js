//import liraries
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';

import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height - 90);

const scrollItems = [
    {adId: 1, img: require('../../assets/images/ads/SCROLL1.png'), bgColor: '#0d4ae8'},
    {adId: 2, img: require('../../assets/images/ads/SCROLL2.png'), bgColor: '#08db24'},
    {adId: 3, img: require('../../assets/images/ads/SCROLL3.png'), bgColor: '#ff0000'},
    {adId: 4, img: require('../../assets/images/ads/SCROLL4.png'), bgColor: '#0d4ae8'},
]

// create a component
class AdScreen extends Component {
    state = {stage: 0, bgColor: '#0d4ae8', isFirstTime: false}

    onScroll = (stage, bgColor) => this.setState({stage, bgColor})

    handlePress = () => {
        const {navigation} = this.props;
        navigation.navigate('Auth');
    }

    async componentDidMount() {
        const {navigation} = this.props;
        try {
            let isFistTime = await AsyncStorage.getItem('isFirstTime');
            this.setState({isFirstTime: isFistTime === '1'});
            if(isFistTime === '1')
              navigation.navigate('Auth');
        } catch {
            console.log('do nothing');
        }
        AsyncStorage.setItem('isFirstTime', '1');
    }

    render() {
        const {stage, bgColor} = this.state;

        return (
            <View style={styles.container}>
                <StatusBar style='light' />
                <View style={{ position: 'absolute', bottom: 15, justifyContent: 'flex-end', right: 15, flexWrap: 'wrap', zIndex: 100 }}>
                    <TouchableOpacity style={[styles.skipBtn, {backgroundColor: `${bgColor}30`}]}>
                        <Text style={[{color: `${bgColor}90`}, styles.skipTxt]} onPress={this.handlePress}>{stage < 3 ? 'Passer' : 'Finish'}</Text>
                    </TouchableOpacity>
                </View>
                <Swiper onIndexChanged={(index) => this.onScroll(index, '#0d4ae8')} showsButtons={false} loop={false} style={styles.swiper}>
                    {scrollItems.map(scrollItem => (
                        <View style={[styles.swiperitem, {backgroundColor: scrollItem.bgColor}]} key={`scroll-item-${scrollItem.adId}`}>
                            <Image style={styles.swiperimages} resizeMode="contain" source={scrollItem.img} />
                        </View>
                    ))}
                </Swiper>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    swiper:{
        position: 'relative', zIndex: 10
    },
    swiperitem: {
        height: screenHeight, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', alignItems: 'center'
    },
    swiperimages: {
        width: screenWidth, position: 'absolute', top: -100
    },
    skipBtn: {
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    skipTxt: {
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default AdScreen;
