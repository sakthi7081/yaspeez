import React from 'react';

import Photo from '../assets/images/account/picture.png';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageManipulator } from 'expo-image-crop';
import { defaultAvatar } from '../utils/data';

const {width, height} = Dimensions.get('window');

export default class ImgPicker extends React.Component {
  state = {type: Camera.Constants.Type.back, isCameraPage: false, photoUri: defaultAvatar, isVisible: false, flashMode: Camera.Constants.FlashMode.off, processing: false};

  renderPattern = () => {
    let heightLoop = Math.ceil(height / 50);
    let widthLoop = Math.ceil(height / 50);
    let heightArr = new Array(heightLoop).fill(5);
    let widthArr = new Array(widthLoop).fill(5);
    return heightArr.map((v, j) => (
      <View key={`imgView-${j}`} style={{flexDirection: 'row', opacity: 0.3}}>
        {widthArr.map((v, i) => (
          <Image key={`img-${j}-${i}`} source={require('../assets/images/account/pattern.png')} style={{height: 50, width: 50}} />
        ))}
      </View>
    ));
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ photoUri: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  }

  getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if(status !== 'granted')
      await this.getCameraPermission();
    else
      this.setState({isCameraPage: true});
  }

  handleCameraClick = () => {
    if (this.camera) {
      this.setState({processing: true});
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  }

  handleFlashClick = () => this.setState({flashMode: this.state.flashMode === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off});

  handleFlipClick = () => this.setState({type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back});

  onPictureSaved = photo => {
    this.setState({isCameraPage: false, photoUri: photo.uri, isVisible: true, processing: false});
  }

  onToggleModal = () => {
    const { isVisible } = this.state
    this.setState({ isVisible: !isVisible })
  }

  render() {
    const {isModalVisible} = this.props;
    const {type, isCameraPage, isVisible, photoUri, flashMode, processing} = this.state;
    if(!isModalVisible)
      return null;

    return (
      <>
        {isCameraPage && !isVisible && (
          <View style={{position: 'absolute', top: 0, left: 0, backgroundColor: '#fff', width, height: height - 60}}>
            {processing && (<View style={{position: 'absolute', top: 0, left: 0, zIndex: 9, backgroundColor: '#00000050', width, height: height-50, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{backgroundColor: '#000', padding: 5, borderRadius: 5}}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Processing...</Text>
              </View>
            </View>)}
            <Camera style={{flex: 1}} {...{type, flashMode}} autoFocus ref={(ref) => { this.camera = ref }} />
            <View style={{backgroundColor: '#000', height: 150, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: 60, width: 60, borderRadius: 30, backgroundColor: 'white'}} onPress={this.handleFlipClick}>
                <Icon name="sync-outline" height={32} width={32} fill="#0d4ae8" />
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: 60, width: 60, borderRadius: 30, backgroundColor: 'white'}} onPress={this.handleCameraClick}>
                <Icon name="camera-outline" height={32} width={32} fill="#0d4ae8" />
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: 60, width: 60, borderRadius: 30, backgroundColor: 'white'}} onPress={this.handleFlashClick}>
                <Icon name="flash-outline" height={32} width={32} fill="#0d4ae8" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isVisible && !isCameraPage && (<ImageManipulator
          saveOptions={{base64: true}}
          photo={{ uri: photoUri }}
          isVisible={isVisible}
          onPictureChoosed={({base64, uri}) => this.setState({photoUri: uri})}
          onToggleModal={this.onToggleModal}
        />)}
        {!isCameraPage && (
        <View style={{position: 'absolute', top: 0, left: 0, backgroundColor: '#fff', width, height: height - 50}}>
          <View style={{backgroundColor: '#0d4ae8', position: 'absolute', zIndex: 5}}>{this.renderPattern()}</View>
          <View style={{position: 'relative', zIndex: 10, flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Image source={Photo} style={{height: 150, width: 150}} />
              <Text style={{fontWeight: 'bold', color: '#fff', marginTop: 10, fontSize: 24}}>Choose an image</Text>
            </View>
            <View style={{backgroundColor: '#fff', height: 100, flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={this.getCameraPermission} style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRightWidth: 0.5, borderColor: '#eee'}}>
                <Icon name="camera-outline" fill="#0d4ae8" height={56} width={56} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this._pickImage} style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderLeftWidth: 0.5, borderColor: '#eee'}}>
                <Icon name="image-outline" fill="#0d4ae8" height={56} width={56} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )}
      </>
    )
  }
}