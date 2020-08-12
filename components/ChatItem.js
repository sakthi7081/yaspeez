import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '@ui-kitten/components';

const blue = '#0d4ae8';
const gray = '#ddd';

class ChatItem extends React.Component {
    handlePress = () => {
        const { text, icon, name, nav } = this.props;
        // nav.navigate('ChatItem', {
        //     text: text,
        //     icon: icon,
        //     name: name
        // });
    }

    render() {
        const { text, icon, name } = this.props;
        return (
            <TouchableOpacity style={{ flexDirection: 'row', padding: 10, marginHorizontal: 20, alignItems: 'center', borderColor: gray, borderBottomWidth: 1 }} onPress={this.handlePress}>
                <View style={{ backgroundColor: blue, borderRadius: 50, marginRight: 10, height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={{ uri: icon }} size="large" />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{name}</Text>
                    <Text>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ChatItem;