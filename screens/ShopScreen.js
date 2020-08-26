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

import One from '../assets/images/shop/1.png';
import Two from '../assets/images/shop/2.png';
import Three from '../assets/images/shop/3.png';
import Four from '../assets/images/shop/4.png';
import Five from '../assets/images/shop/5.png';
 
const { width } = Dimensions.get('window');
const itemWidth = Math.round((width / 2));

class ShopScreen extends React.Component {
    gotoShopItem = item => {
        const { navigation } = this.props;
        const { image, type, name, points, bgColor } = item
        navigation.navigate('ShopItem', {
            image, type, name, points, bgColor,
            size: [{ text: 'S' }, { text: 'M' }, { text: 'L' }, { text: 'XL' }, { text: 'XXL' }],
            quantite: [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }],
            description: 'Occaecat laboris dolore irure ad. Ullamco et mollit id eu sint reprehenderit quis laboris velit duis magna mollit. Fugiat do adipisicing laboris elit commodo qui quis. Laboris consectetur proident esse magna amet ad. Cillum elit proident sunt ullamco sint duis sunt ea sunt sit laborum velit. Officia sint cupidatat culpa excepteur dolor. Quis excepteur esse do Lorem.',
            details: [
                'Design du collant classique',
                'Forme etroite',
                'Boxd delaille elastique',
                'Logo orbitant en impresson coulchotee sur la lambre inferieue',
                'Logo No.1 en impresson ',
            ]
        });
    }

    renderShopItems = (items) => {
        let shopItems = listToMatrix(items, 2);
        return shopItems.map((value, index) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} key={`shopItem_${index}`}>
                {value.map((v, i) => (
                    <TouchableOpacity style={{ flex: 1, width: itemWidth }} onPress={() => this.gotoShopItem(v)} key={`shopItem_sub_${index}${i}`}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 5, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: gray }}>
                            <ImageBackground source={v.image} style={{ width: '100%', height: 200, position: 'relative', backgroundColor: v.bgColor }} resizeMode='cover'>
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
        let items = [
            {image: One, type: 'T-Shirt', name: 'Venom 18', points: '150', bgColor: `${gold}50`},
            {image: Two, type: 'T-Shirt', name: 'Venom 18', points: '150', bgColor: `#FF69B450`},
            {image: Three, type: 'T-Shirt', name: 'Venom 18', points: '150', bgColor: `#7FFFD450`},
            {image: Four, type: 'T-Shirt', name: 'Venom 18', points: '150', bgColor: `#4169E150`},
            {image: Five, type: 'T-Shirt', name: 'Venom 18', points: '150', bgColor: `#FF634750`},
        ];

        return (
            <View style={{ flex:1 }}>
                {/* <SportFilter hasCategories={true} /> */}
                <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20, paddingHorizontal: 20}}>Shop</Text>
                  <TouchableOpacity style={{paddingVertical: 20, paddingHorizontal: 20}}>
                    <Icon name="shopping-cart" height={24} width={24} fill={white} />
                    <View style={{backgroundColor: 'red', width: 16, height: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, top: 15}}>
                        <Text style={{fontWeight: 'bold', color: white, fontSize: 10}}>4</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: white }} contentContainerStyle={{ flexGrow: 1 }}>
                    {this.renderShopItems(items)}
                </ScrollView>
            </View>
        )
    }
}

export default ShopScreen;