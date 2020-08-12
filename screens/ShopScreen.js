import React from 'react';
import { View, ImageBackground ,Dimensions } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';

// import SportFilter from '../components/SportFilter';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { listToMatrix } from '../utils/functions';

const gold = '#F9A602';
const blackTrans = '#00000050';
const gray = '#eee';
const white = '#fff';
const black = '#000';
 
const { width } = Dimensions.get('window');
const itemWidth = Math.round((width / 2));

class ShopScreen extends React.Component {
    gotoShopItem = () => {
        const { navigation } = this.props;
        // navigation.navigate('ShopItem');
    }

    renderShopItems = (items) => {
        let shopItems = listToMatrix(items, 2);
        return shopItems.map((value, index) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} key={`shopItem_${index}`}>
                {value.map((v, i) => (
                    <TouchableOpacity style={{ flex: 1, width: itemWidth }} onPress={this.gotoShopItem} key={`shopItem_sub_${index}${i}`}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 5, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: gray }}>
                            <ImageBackground source={{uri: `${v.image}?random=${index}${i}`}} style={{ width: '100%', height: 200, position: 'relative' }}>
                                <View style={{ flexDirection: 'row', position: 'absolute', zIndex: 3, bottom: 55, left: 15 }}>
                                    <Text style={{ color: gray }}>{v.type}</Text>
                                </View>
                                <Text style={{ position: 'absolute', zIndex: 3, bottom: 35, left: 15, color: white, fontSize: 21, fontWeight: 'bold' }}>{v.name}</Text>
                                <View style={{ position: 'absolute', zIndex: 3, bottom: 0, left: 0, height: 30, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: white, flex: 1, width: '100%', alignItems: 'center' }}>
                                    <View style={{ flex: 1, position: 'relative', left: 15, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <Icon name="bulb" height={15} width={15} fill={gold}/>
                                        <Text style={{ color: black, marginLeft: 3, fontWeight: 'bold' }}>{v.points}</Text>
                                        <Text style={{ color: black, marginLeft: 3 }}>{`Points`}</Text>
                                    </View>
                                    <Icon name="eye" style={{ position: 'relative', right: 15 }} height={15} width={15} fill={black} />
                                </View>
                                <LinearGradient colors={['transparent', blackTrans]} style={{ flex: 1, width: '100%', height: 200, padding: 15, justifyContent: 'center', borderRadius: 5, position: 'relative', zIndex: 1 }} />
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        ));
    }
    
    render() {
        let items = new Array(31).fill(
            {image: 'https://picsum.photos/200/300', type: 'T-Shirt', name: 'Venom 18', 'points': '150'}
        );

        return (
            <View style={{ flex:1 }}>
                {/* <SportFilter hasCategories={true} /> */}
                <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden'}}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20, paddingHorizontal: 20}}>Shop</Text>
                </View>
                <ScrollView style={{ backgroundColor: white }} contentContainerStyle={{ flexGrow: 1 }}>
                    {this.renderShopItems(items)}
                </ScrollView>
            </View>
        )
    }
}

export default ShopScreen;