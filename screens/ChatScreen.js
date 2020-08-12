import React from 'react';
import { View, Text } from 'react-native';
import ChatItem from '../components/ChatItem';
import { ScrollView } from 'react-native-gesture-handler';

class ChatScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        const users = [
            { name: `Yogesh Raghupathy`, text: 'Hai, How are you?' },
            { name: `Yann Lamothe`, text: 'Happy Birthday' },
            { name: `Simon Adde`, text: 'How much is this?' },
            { name: `Yahie Coach`, text: 'Mathu has the item' },
            { name: `Guhan`, text: 'WTF' },
            { name: `Manish Paul`, text: 'Holy Jesus' },
            { name: `Teddy Tiger`, text: 'Made my day' },
            { name: `Roger`, text: 'Thanks' },
            { name: `Keerthana Raguraman`, text: 'Papapa.....pa' },
            { name: `Tiger Man`, text: 'Rogue' },
            { name: `Vishal`, text: 'How is Vishnu?' },
            { name: `Magic Magesh`, text: 'Where is Gopi?' },
            { name: `Rasy Little Prince`, text: 'Is you dad good?' },
            { name: `Mr. Bean`, text: 'Hey !!!' },
            { name: `JK TVS`, text: 'Love this' },
            { name: `Karishma`, text: 'Magic happens' },
            { name: `Nagaraj`, text: 'How is your life ??' },
            { name: `Mathumitha`, text: 'Rapapa....pa' },
        ];
        return (
            <View style={{ flex: 1 }}>
                <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden'}}>
                  <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20, paddingHorizontal: 20}}>Chats</Text>
                </View>
                <ScrollView>
                    {users.map((value, index) => (
                        <ChatItem key={`chatItem_${index}`} text={value.text} name={value.name} icon={`https://api.adorable.io/avatars/285/chat-user-${index}@adorable.png`} nav={navigation} />
                    ))}
                </ScrollView>
            </View>
        )
    }
}

export default ChatScreen;