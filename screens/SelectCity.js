import React from 'react';
import { Layout, Button, Icon, Text, Divider } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions, Platform, Keyboard, View } from 'react-native';
import State from '../database/models/state';
import SearchableDropdown from 'react-native-searchable-dropdown';
import User from '../database/models/user';

const {width, height} = Dimensions.get('window');

const showEvent = Platform.select({
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});

const hideEvent = Platform.select({
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

export default class SelectCity extends React.Component {
  state = {infoSelected: null, query: null, collection: [], data: [], placement: 'top'};

  renderIcon = (name, color) => <Icon name={name} height={24} width={24} fill={color} />

  handleSelected = (selected, name) => this.setState({[name]: selected});

  handleChange = query => {console.log(query);}

  gotoApp = async () => {
    const {navigation, route} = this.props;
    const {infoSelected} = this.state;
    const {params} = route;
    const {purpose, sport, user} = params;
    let userValues = {
      user_id: user.id,
      first_name: '',
      last_name: '',
      email: user.email,
      phone_no: '',
      born_at: '',
      birth_place: '',
      address: '',
      pincode: '',
      referral: '',
      country_id: 66,
      state_id: infoSelected.id,
      purpose_id: purpose.id,
      sport_id: sport.id,
      created_at: new Date().getTime(),
    };
    const usr = new User(userValues);
    usr.save();
    // navigation.navigate('App');
    navigation.reset({
      index: 0,
      routes: [{ name: 'App' }],
    });
  }

  async componentDidMount() {
    const collection = await State.query();
    this.setState({ collection, data: collection });
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
    const {infoSelected, data, placement} = this.state;

    return (
      <Layout style={styles.container}>
        <Layout style={styles.topLayout}>
          <View style={styles.bgView}>{this.renderPattern()}</View>
          <Image source={require('../assets/splash.png')} resizeMode={'contain'} style={styles.logo} />
        </Layout>
        <Layout style={styles.bottomLayout}>
          <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Choisissez une ville</Text>
          <Divider  />
          <Layout style={styles.selects}>
            <SearchableDropdown
              style={styles.selectOption}
              textInputStyle={{marginHorizontal: 30, borderWidth: 1, borderRadius: 5, paddingHorizontal: 15, fontSize: 15, paddingVertical: 5, borderColor: '#e4e9f2', backgroundColor: '#f7f9fc', color: '#222b45'}}
              containerStyle={{marginVertical: 5, maxHeight: 115}}
              itemStyle={{marginHorizontal: 5, paddingHorizontal: 10, paddingVertical: 8, borderBottomWidth: 1, borderColor: '#e4e9f2'}}
              itemTextStyle={{fontSize: 15, color: '#222b45'}}
              itemsContainerStyle={{marginHorizontal: 30, borderWidth: 1, borderRadius: 5, borderColor: '#e4e9f2'}}
              onItemSelect={item => this.handleSelected(item, 'infoSelected')}
              onTextChange={this.handleChange}
              underlineColorAndroid="transparent"
              placeholder="Sélectionnez une ville"
              placeholderTextColor='#222b4573'
              multi={false}
              resetValue={false}
              items={data}
              value={infoSelected && infoSelected.name}
            />
            <Layout style={styles.selectOption}>
              <Button disabled={infoSelected === null} style={styles.btn} status={'warning'} accessoryRight={() => this.renderIcon('arrow-circle-right', '#fff')} onPress={() => this.gotoApp()}>Soumettre</Button>
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
    backgroundColor: '#fff', height: 190, borderTopLeftRadius: 25, borderTopRightRadius: 25, overflow: 'hidden'
  }, logo: {
    width: width - 40, height: 150
  }, bgImage: {
    width: 20, height: 20
  }, selectOption: {
    paddingHorizontal: 30, paddingVertical: 5,
  }, selects: {
    paddingTop: 20,
  }, btn: {
    flex: 1
  }, bgView: {
    position: 'absolute', top: 0, left: 0, width: width, height: height
  }
});
