import React from 'react';
import { View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Icon, Select } from '@ui-kitten/components';

const gold = '#F9A602';
const gray = '#eee';
const white = '#fff';

class ShopItemScreen extends React.Component {
    state = {
        tailleSelected: null,
        quantiteSelected: null
    }

    onSelect = (selected, selectedOption) => { this.setState({ [selected]: selectedOption }); };

    render() {
        const { tailleSelected, quantiteSelected } = this.state;
        const { route } = this.props;
        const { params } = route;
        const { image, name, type, points, bgColor, size, quantite, description, details } = params;

        return (
            <View style={{ flex:1 }}>
                <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20, paddingHorizontal: 20}}>Shop</Text>
                  <TouchableOpacity style={{paddingVertical: 20, paddingHorizontal: 20}}>
                    <Icon name="shopping-cart" height={24} width={24} fill={white} />
                    <View style={{backgroundColor: 'red', width: 16, height: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, top: 15}}>
                        <Text style={{fontWeight: 'bold', color: white, fontSize: 10}}>4</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: gray, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
                    <Text style={{ paddingVertical: 10, fontWeight: 'bold' }}>{type}</Text>
                    <Text style={{ paddingVertical: 10, marginLeft: 4, fontWeight: 'bold' }}>{`|`}</Text>
                    <Text style={{ paddingVertical: 10, marginLeft: 4, paddingRight: 10 }}>{name}</Text>
                </View>
                <ScrollView style={{ backgroundColor: white, paddingHorizontal: 10 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row', margin: 5 }}>
                        <View style={{ flex: 1, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: gray, margin: 5 }}>
                            <ImageBackground source={image} style={{ width: '100%', height: 240, position: 'relative', backgroundColor: bgColor }}>
                                <Icon style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 99 }} name='eye' height={24} width={24} fill={white} />
                            </ImageBackground>
                        </View>
                        <View style={{ flex: 1, margin: 5 }}>
                            <Text>{type}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 4 }}>
                                <Icon name="bulb" height={15} width={15} fill={gold} />
                                <Text style={{ marginLeft: 3, fontWeight: 'bold' }}>{points}</Text>
                                <Text style={{ marginLeft: 3 }}>{`Points`}</Text>
                            </View>
                            <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Taille</Text>
                            <Select size='small' style={{ flex: 1 }} data={size} placeholder='Taille' selectedOption={tailleSelected} onSelect={selectedOption => this.onSelect('tailleSelected', selectedOption)} />
                            <Text style={{ fontWeight: 'bold', marginTop: 4 }}>Qunatite</Text>
                            <Select size='small' style={{ flex: 1 }} data={quantite} placeholder='Quantite' selectedOption={quantiteSelected} onSelect={selectedOption => this.onSelect('quantiteSelected', selectedOption)} />
                            <TouchableOpacity style={{backgroundColor: '#0d4ae8', borderRadius: 5, marginTop: 10}}>
                                <Text style={{color: '#fff', paddingVertical: 5, paddingHorizontal: 10, fontWeight: 'bold', textAlign: 'center'}}>Buy Now!</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: gold, borderRadius: 5, marginTop: 10}}>
                                <Text style={{paddingVertical: 5, paddingHorizontal: 10, fontWeight: 'bold', textAlign: 'center'}}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ margin: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>Description :</Text>
                        <Text>{description}</Text>
                        {details.length > 0 && (<Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 4 }}>Details :</Text>)}
                        {details.length > 0 && details.map((v, i) => (
                            <Text key={`detail_text_${i}`}>{`- ${v}`}</Text>
                        ))}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ShopItemScreen;