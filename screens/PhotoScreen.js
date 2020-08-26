import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Lightbox from 'react-native-lightbox';

import { apiImg } from '../utils/data';
import { listToMatrix } from '../utils/functions';
import { Video } from 'expo-av';

const {width, height} = Dimensions.get('window');
const singleImgWidth = (width - 60) / 3;

let posts = new Array(20).fill({ src: apiImg, type: 'image' });

posts = [{
  src: require('../assets/images/account/sample-video.mp4'), type: 'video'
}, ...posts];

// posts = [];

export default class PhotoScreen extends React.Component {
  goBack = () => this.props.navigation.goBack();

  renderContent = modalContent => modalContent

  renderPhotos = () => (
    <ScrollView style={styles.usrImgContainer} showsVerticalScrollIndicator={false}>
      {listToMatrix(posts, 3).map((arr, i) => (
        <View key={`user-upld-row-${i}`} style={styles.usrImgRow}>
          {arr.map(({src, type}, j) => {
            let imge = type === 'image' ? `${src}?random=${i}${j}${new Date().getTime()}` : src;
            let content = type === 'image' ? (<Image source={{uri: imge}} style={[styles.usrImg, {borderColor: '#eee', borderWidth: 1}]} />) : (<Video source={src} style={[styles.usrImg, {borderColor: '#eee', borderWidth: 1}]} />);
            let modalContent = type === 'image' ? (<Image source={{uri: imge}} style={{height: 300, width: width, backgroundColor: '#ccc'}} />) : (<Video source={src} style={{height: 300, width: width, backgroundColor: '#ccc'}} rate={1.0} volume={1.0} isMuted={false} resizeMode="cover" shouldPlay isLooping />);
            return (
              <TouchableOpacity key={`user-upld-${i}${j}`}>
                <Lightbox style={[styles.usrImgBox, styles.usrImg, {borderColor: '#eee', borderWidth: 1}]} swipeToDismiss={true} renderContent={() => this.renderContent(modalContent)}>
                  {content}
                </Lightbox>
              </TouchableOpacity>
            )
          })}
        </View>
      ))}
    </ScrollView>
  )

  render() {
    return (
      <View style={{ flex:1 }}>
        <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
              <Icon name="chevron-left" height={24} width={24} fill='#fff' />
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20}}>Photos</Text>
          </View>
        </View>
        {posts.length !== 0 && (
          <View style={{flex: 1, marginVertical: 20, paddingHorizontal: 15}}>{this.renderPhotos()}</View>
        )}
        {posts.length === 0 && (
          <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/images/account/empty0.png')} style={{width: width - 40, height: 250}} />
            <Text style={{fontSize: 20, color: '#00000080', marginTop: 10}}>No photos avaialable!</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  usrImgContainer: {flex: 1},
  innerHeading: {marginBottom: 5, marginLeft: 5, fontWeight: 'bold', fontSize: 18},
  usrImgRow: {flexDirection: 'row'},
  usrImgBox: {margin: 5, borderRadius: 10, borderWidth: 1, backgroundColor: '#eee', overflow: 'hidden'},
  usrImg: {height: singleImgWidth, width: singleImgWidth}
});