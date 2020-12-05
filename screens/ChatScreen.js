import React from 'react';
import { View, Text } from 'react-native';
import ChatItem from '../components/ChatItem';
import { ScrollView } from 'react-native-gesture-handler';
import { baseURL } from '../utils/api';
import User from '../database/models/user';
import * as signalR from "@aspnet/signalr";
import * as Notifications from 'expo-notifications';

class ChatScreen extends React.Component {
    async componentDidMount() {
        const queryOptions = {
            limit: 1,
            order: 'id DESC'
        };
        let users = await User.query(queryOptions);
        const {user_id} = users[0];
        console.log(user_id, 'user_id');
        const hubUrl = `${baseURL}chatHub`;
        // const hubUrl = `http://51.210.150.124:8088/chatHub`;
        const connectionHub = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .configureLogging(signalR.LogLevel.Debug)
            .build();

        connectionHub.on("GetMessage", (messages) => {
            console.log(messages, "messages");
        });

        connectionHub.on("GetChatList", (chats) => {
            console.log(chats, "chats");
        });

        connectionHub.on("GetContactList", (contacts) => {
            console.log(contacts, "contacts");
        });

        await connectionHub.start().catch((err) => console.log(err));
        let groupId = 1;
        let uid = 45;
        // await connectionHub.invoke("GetMessage", groupId);
        // await connectionHub.invoke("GetChatList", uid);
        await connectionHub.invoke("GetContactList", uid);
        this.setState({connection: connectionHub});
        
        // Notifications.presentNotificationAsync({
        //     title: 'Look at that notification',
        //     body: "I'm so proud of myself!",
        // });
    }

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