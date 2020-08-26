import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from '@ui-kitten/components';

export const blue = '#0d4ae8';
export const gray = '#eee';
export const white = '#fff';
export const black = '#000';

class MessageItem extends React.Component {

    render() {
        const { messages } = this.props;
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 3, marginHorizontal: 10, alignItems: 'center', justifyContent: `${messages.myself ? 'flex-start' : 'flex-end'}` }}>
                {messages.myself && (<View style={{ backgroundColor: blue, borderRadius: 50, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={{ uri: messages.icon }} size="small" />
                </View>)}
                <View style={{ flexDirection: 'column', backgroundColor: `${messages.myself ? gray : blue}`, paddingVertical: 7, paddingHorizontal: 5, borderRadius: 5 }}>
                    <Text style={{ color: `${messages.myself ? black : white}` }}>{messages.text}</Text>
                </View>
                {!messages.myself && (<View style={{ backgroundColor: blue, borderRadius: 50, marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar source={{ uri: messages.icon }} size="small" />
                </View>)}
            </View>
        )
    }
}

export default MessageItem;