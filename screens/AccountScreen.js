import React from 'react';
import { Text, Layout, Button, Icon } from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import YasLogo from '../assets/splash.png';
import { defaultAvatar, apiImg } from '../utils/data';
import { listToMatrix } from '../utils/functions';

const {width} = Dimensions.get('window');
const singleImgWidth = (width - 60) / 3;

export default class AccountScreen extends React.Component {
  renderIcon = name => <Icon name={name} fill={'#fff'} height={24} width={24} />

  renderHeader = () => (
    <ImageBackground source={YasLogo} imageStyle={{opacity: 0.2}} resizeMode={'contain'} style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>
        <View style={styles.headerTopBar}>
          <Button appearance={'ghost'} accessoryLeft={() => this.renderIcon('edit')} />
        </View>
        <View style={styles.headerInfoBar}>
          <View>
            <Text style={styles.headerName}>BEN-4-BOXING</Text>
            <Text style={styles.headerDesc}>28 ANS | ABONNE LE  04/1995</Text>
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

  renderEvents = () => {}
  
  renderInspirations = () => {}

  render() {
    return (
      <>
        <Layout>
          {this.renderHeader()}
          {this.renderPhotos()}
          {this.renderEvents()}
          {this.renderInspirations()}
        </Layout>
      </>
    )
  }
}

const styles = StyleSheet.create({
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
  usrImg: {height: singleImgWidth, width: singleImgWidth, margin: 5, borderRadius: 10, borderWidth: 1},
  usrImgContainer: {padding: 15},
  innerHeading: {marginBottom: 5, marginLeft: 5, fontWeight: 'bold', fontSize: 18},
});
