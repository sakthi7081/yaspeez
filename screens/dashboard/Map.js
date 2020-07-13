//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';


const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = ((height / 4) - 50);
const CARD_WIDTH = width - 100;

const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
];

// create a component
class DashScreen extends Component {
    state = {
        markers: [{
                coordinate: { latitude: 48.7615923, longitude: 1.9107395, },
                title: "SDLC Center",
                description: "Salle Multisports",
                image: Images[0],
                rating: 4.5,
                distance: 254,
                metric: 'm',
                itemEmail: 'contact@sdlccenter.com',
                itemPhone: '9876543210',
                itemMessageText: 'Nous contacter',
                itemPrice: 'Nos tarifs',
                itemFullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
                itemAdherentCount: '693',
            },{
                coordinate: { latitude: 48.7615887, longitude: 1.913411, },
                title: "Just Play",
                description: "Salle Multisports",
                image: Images[2],
                rating: 4.5,
                distance: 254,
                metric: 'm',
                itemEmail: 'contact@sdlccenter.com',
                itemPhone: '9876543210',
                itemMessageText: 'Nous contacter',
                itemPrice: 'Nos tarifs',
                itemFullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
                itemAdherentCount: '693',
            },{
                coordinate: { latitude: 48.7619742, longitude: 1.9136739, },
                title: "Restaurant flunch",
                description: "Salle Multisports",
                image: Images[1],
                rating: 4.5,
                distance: 254,
                metric: 'm',
                itemEmail: 'contact@sdlccenter.com',
                itemPhone: '9876543210',
                itemMessageText: 'Nous contacter',
                itemPrice: 'Nos tarifs',
                itemFullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
                itemAdherentCount: '693',
            },{
                coordinate: { latitude: 48.7624551, longitude: 1.9119143, },
                title: "HEVEA",
                description: "Salle Multisports",
                image: Images[3],
                rating: 4.5,
                distance: 254,
                metric: 'm',
                itemEmail: 'contact@sdlccenter.com',
                itemPhone: '9876543210',
                itemMessageText: 'Nous contacter',
                itemPrice: 'Nos tarifs',
                itemFullDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
                itemAdherentCount: '693',
            }
        ],
        region: {
            latitude: 48.7616,
            longitude: 1.9129,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        },
        currentItem: 0
    };

    constructor(props) {
        super(props);
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.state.markers[index];
                    this.map.animateToRegion({
                        ...coordinate,
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta,
                    }, 350);
                }
            }, 10);
            this.setState({ currentItem: index });
        });
    }

    render() {
        const {markers, region} = this.state;
        const interpolations = markers.map((m, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });

        return (
            <View style={styles.container}>
                <StatusBar style='dark' />
                <View style={styles.searchWrapper}>
                    <View style={styles.search}>
                        <Icon name="search" color="#000" size={24} style={styles.searchIcon} />
                        <Text style={{ color: '#000', fontSize: 16 }}>Rechercher un lieu | un sport</Text>
                    </View>
                </View>
                <MapView ref={map => this.map = map} initialRegion={region} style={styles.container} provider={ PROVIDER_GOOGLE }>
                    {markers.map((marker, index) => {
                        const scaleStyle = { transform: [{ scale: interpolations[index].scale }], };
                        const opacityStyle = { opacity: interpolations[index].opacity, };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView horizontal scrollEventThrottle={1} showsHorizontalScrollIndicator={false} snapToInterval={CARD_WIDTH} onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.animation, }, }, }], { useNativeDriver: true })} style={styles.scrollView} contentContainerStyle={styles.endPadding} >
                    {this.state.markers.map((marker, index) => (
                        <TouchableOpacity key={`slider-${index}`}>
                            <View style={styles.card} onMagicTap={this.gotoMapItemScreen}>
                                <Image source={marker.image} style={styles.cardImage} resizeMode="cover" />
                                <View style={styles.textContent}>
                                    <View style={styles.cardInView}>
                                        <Text style={styles.cardRating}>{marker.rating}</Text>
                                        <Icon name="star" size={12} color={`#e8b923`} />
                                    </View>
                                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                    <Text numberOfLines={1} style={styles.cardDescription}> {marker.description} </Text>
                                    <View style={styles.cardInView}>
                                        <Icon name="navigation-2" color={`#000`} size={16} />
                                        <View style={styles.cardInnerView}>
                                            <Text style={styles.cardDistance}>{marker.distance}</Text>
                                            <Text style={styles.cardDistanceMetric}>{marker.metric}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchWrapper: { position: 'absolute', top: 50, left: '5%', zIndex: 99, backgroundColor: '#ffffff70', height: 50, width: '90%' },
    search:{ flexDirection: 'row', alignItems: 'center', position: 'relative', top: 10, left: 15 },
    searchIcon: {
        marginRight: 10
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: 0, //width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 50,
        shadowOpacity: 0.8,
        shadowOffset: { x: 0, y: 0 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
        flexDirection: 'row',
        borderRadius: 10
    },
    cardImage: {
        flex: 2,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius: 10
    },
    textContent: {
        flex: 3,
        marginLeft: 10
    },
    cardtitle: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    cardDescription: {
        fontSize: 10,
        color: "#666",
        textTransform: 'uppercase'
    },
    markerWrap: {
        height: 100,
        width: 100,
        flex: 1,
        position: 'relative',
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: "rgba(130,4,150, 0.3)",
        borderWidth: 1,
        zIndex: 10,
        position: 'absolute',
        borderColor: "rgba(130,4,150, 0.5)",
    },
    cardRating: {
        fontSize: 10,
        marginRight: 3
    },
    cardDistance: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardDistanceMetric: {
        fontSize: 12,
        marginLeft: 5
    },
    cardInView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardInnerView: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
});

//make this component available to the app
export default DashScreen;
