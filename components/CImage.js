import React, { Component } from 'react';
import {Image, ImageBackground} from 'react-native';

export default class CImage extends Component {
  state = {imgErr: 0};

  sourceError = () => this.setState({imgErr: 1});

  render() {
    const {style, source, noImgUrl, resizeMode} = this.props;
    const {imgErr} = this.state;
    return (
      <ImageBackground
        style={[style, imgErr ? {backgroundColor: '#ccc'} : {}]}
        source={!imgErr && source.uri !== '' ? source : noImgUrl}
        onError={this.sourceError}
        resizeMode={resizeMode} />
    )
  }
}