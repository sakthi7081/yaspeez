import React from 'react';
import { Layout, Button, Icon, TabBar, Tab, Text, Divider } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions, Platform, Keyboard, View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

import Sport from '../database/models/sport';
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

export default class SelectSports extends React.Component {
  state = {infoSelected: null, query: null, collection: [], data: [], classicSports: [], indeditSports: [], placement: 'top', selectedIndex: 0, isReset: false};

  renderIcon = (name, color) => <Icon name={name} height={24} width={24} fill={color} />

  handleSelected = (selected, name) => this.setState({[name]: selected});

  handleChange = query => {console.log(query);}

  gotoApp = () => {
    const {navigation, route} = this.props;
    const {infoSelected} = this.state;
    const {params} = route;
    const {user} = params;
    console.log(user, 'user');
    navigation.navigate('SelectPurpose', {sport: infoSelected});
  }

  handleTab = index => {
    const {classicSports, indeditSports} = this.state;
    const data = index === 0 ? classicSports : indeditSports;
    this.setState({selectedIndex: index, collection: data, data, infoSelected: null, isReset: false});
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

  async componentDidMount() {
    const collection = await Sport.query();
    let classicSports = [];
    let indeditSports = [];
    collection.map(data => {
      if(data.cat_name.toLowerCase() === "classic")
        classicSports.push(data);
      else
        indeditSports.push(data);
    });

    this.setState({ collection: classicSports, data: classicSports, classicSports, indeditSports });
    Keyboard.addListener(showEvent, () => {
      this.setState({placement: 'top'});
    });
    Keyboard.addListener(hideEvent, () => {
      this.setState({placement: 'bottom'});
    });
  }

  componentWillUnmount() {
    Keyboard.removeListener(showEvent);
    Keyboard.removeListener(hideEvent);
  }

  render() {
    const {infoSelected, data, isReset, placement, selectedIndex} = this.state;

    return (
      <Layout style={styles.container}>
        <Layout style={styles.topLayout}>
          <View style={styles.bgView}>{this.renderPattern()}</View>
          <Image source={require('../assets/splash.png')} resizeMode={'contain'} style={styles.logo} />
        </Layout>
        <Layout style={styles.bottomLayout}>
          <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Choisissez un sport</Text>
          <Divider />
          <TabBar selectedIndex={selectedIndex} onSelect={index => this.handleTab(index)}>
            <Tab title='Classic' />
            <Tab title='Indedit' />
          </TabBar>
          <Divider />
          <Layout style={styles.selects}>
            <SearchableDropdown
              style={styles.selectOption}
              textInputStyle={{marginHorizontal: 30, borderWidth: 1, borderRadius: 5, paddingHorizontal: 15, fontSize: 15, paddingVertical: 5, borderColor: '#e4e9f2', backgroundColor: '#f7f9fc', color: '#222b45'}}
              containerStyle={{marginVertical: 5}}
              itemStyle={{marginHorizontal: 5, paddingHorizontal: 10, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#e4e9f2'}}
              itemTextStyle={{fontSize: 15, color: '#222b45'}}
              itemsContainerStyle={{marginHorizontal: 30, borderWidth: 1, borderRadius: 5, borderColor: '#e4e9f2'}}
              onItemSelect={item => this.handleSelected(item, 'infoSelected')}
              onTextChange={txt => this.handleChange(txt)}
              underlineColorAndroid="transparent"
              placeholder="Select Sports"
              placeholderTextColor='#222b4573'
              multi={false}
              resetValue={isReset}
              items={data}
              value={infoSelected && infoSelected.name}
            />
            <Layout style={styles.selectOption}>
              <Button disabled={infoSelected === null} style={styles.btn} status={'warning'} accessoryRight={() => this.renderIcon('arrow-circle-right', '#fff')} onPress={() => this.gotoApp()}>Next</Button>
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
    backgroundColor: '#fff', height: 230, borderTopLeftRadius: 25, borderTopRightRadius: 25, overflow: 'hidden'
  }, logo: {
    width: width - 40, height: 150
  }, bgImage: {
    width: 20, height: 20
  }, selectOption: {
    paddingHorizontal: 30, paddingVertical: 5,
  }, selects: {
    paddingTop: 20,
  }, acItem: {
    marginHorizontal: 30, backgroundColor: 'transparent'
  }, btn: {
    flex: 1
  }, bgView: {
    position: 'absolute', top: 0, left: 0, width: width, height: height
  }
});
