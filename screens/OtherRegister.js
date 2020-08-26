import React from 'react';
import { Layout, Button, Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions, Platform, Keyboard, View } from 'react-native';
import State from '../database/models/state';
{/*  accessoryLeft={() => this.renderIcon('globe-3', '#aaa')} */}

const {width, height} = Dimensions.get('window');

const showEvent = Platform.select({
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});

const hideEvent = Platform.select({
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

export default class OtherRegisterScreen extends React.Component {
  state = {stateSelected: null, query: null, states: [], data: [], placement: 'top'};

  renderIcon = (name, color) => <Icon name={name} height={24} width={24} fill={color} />

  handleSelected = (selected, name) => {
    const {data} = this.state;
    this.setState({[name]: data[selected]});
  }

  filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());

  handleChange = query => {
    const {states, data} = this.state;
    this.setState({query, data: states.filter(item => this.filter(item, query))})
  }

  gotoApp = () => {
    const {navigation} = this.props;
    navigation.navigate('App');
  }

  renderOptions = (item, index) => (
    <AutocompleteItem key={index} title={item.name} />
  );

  async componentDidMount() {
    const states = await State.query();
    this.setState({ states, data: states });
    Keyboard.addListener(showEvent, () => {
      this.setState({placement: 'top'});
    });
    Keyboard.addListener(hideEvent, () => {
      this.setState({placement: 'bottom'});
    });
  }

  renderPattern = () => {
    let heightLoop = Math.ceil(height / 30);
    let widthLoop = Math.ceil(height / 30);
    let heightArr = new Array(heightLoop).fill(5);
    let widthArr = new Array(widthLoop).fill(5);
    return heightArr.map((v, j) => (
      <View key={`imgView-${j}`} style={{flexDirection: 'row', opacity: 0.3}}>
        {widthArr.map((v, i) => (
          <Image key={`img-${j}-${i}`} source={require('../assets/icon.png')} style={{height: 30, width: 30}} />
        ))}
      </View>
    ));
  }

  render() {
    const {stateSelected, data, placement} = this.state;

    return (
      <Layout style={styles.container}>
        <Layout style={styles.topLayout}>
          <View style={styles.bgView}>{this.renderPattern()}</View>
          <Image source={require('../assets/splash.png')} resizeMode={'contain'} style={styles.logo} />
        </Layout>
        <Layout style={styles.bottomLayout}>
          <Layout style={styles.selects}>
            <Autocomplete style={styles.selectOption} placement={placement} onChangeText={this.handleChange} value={stateSelected && stateSelected.name} onSelect={index => this.handleSelected(index, 'stateSelected')} placeholder="Select City">
              {data.map(this.renderOptions)}
            </Autocomplete>
            <Layout style={styles.selectOption}>
              <Button style={styles.btn} status={'warning'} accessoryRight={() => this.renderIcon('arrow-circle-right', '#fff')} onPress={() => this.gotoApp()}>Update</Button>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#0d4ae8'
  }, topLayout: {
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d4ae8', flex: 1
  }, bottomLayout: {
    backgroundColor: '#fff', height: 180, borderTopLeftRadius: 25, borderTopRightRadius: 25, overflow: 'hidden'
  }, logo: {
    width: width - 40, height: 150
  }, bgImage: {
    width: 20, height: 20
  }, selectOption: {
    paddingHorizontal: 30, paddingVertical: 5,
  }, selects: {
    paddingTop: 40,
  }, btn: {
    flex: 1
  }, bgView: {
    position: 'absolute', top: 0, left: 0, width: width, height: height
  }
});
