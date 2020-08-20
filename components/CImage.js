import React, { Component } from 'react';
import {Image} from 'react-native';

export default class CImage extends Component {
  state = {imgErr: 0};

  sourceError = () => this.setState({imgErr: 1});

  render() {
    const {style, source, noImgUrl, resizeMode} = this.props;
    const {imgErr} = this.state;
    return (
      <Image
        style={[style, imgErr ? {backgroundColor: '#ccc'} : {}]}
        source={!imgErr ? source : noImgUrl}
        onError={this.sourceError}
        resizeMode={resizeMode} />
    )
  }
}