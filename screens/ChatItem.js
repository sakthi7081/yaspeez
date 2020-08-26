import React from 'react';
import { View, KeyboardAvoidingView, Platform, Animated, Dimensions, Keyboard, UIManager, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input, Icon, Text, Avatar } from '@ui-kitten/components';
import MessageItem from '../components/MessageItem';

export const blue = '#0d4ae8';

const {height} = Dimensions.get('window');

const { State: TextInputState } = TextInput;

export default class ChatItem extends React.Component {
  state = { shift: new Animated.Value(0) };

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight) - 100;
      if (gap >= 0) {
        return;
      }
      Animated.timing(this.state.shift, {
        toValue: gap,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing( this.state.shift, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
  MIcon = (style, iconName) => ( <Icon { ...style } name={iconName} /> );

    renderIcon = (iconName) => (
      <Button appearance="ghost" status="primary" accessoryLeft={style => this.MIcon({ ...style, height: 16, width: 16, fill: blue }, iconName)} />
    );

    goBack = () => this.props.navigation.goBack();

    componentWillMount() {
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }

    componentWillUnmount() {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    }

    render() {
      const { shift, keyboardVerticalOffset } = this.state
      const { keyboardAvoidingViewProps, route } = this.props;
      const { params } = route;
      const { text, icon, name } = params;
      
      const messages = [
        { text: 'Hai', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'How are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Fine', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'China da.', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you now?', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Hai', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'How are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Fine', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'China da.', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you now?', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Hai', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'How are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Fine', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'China da.', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you now?', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Hai', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'How are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Fine', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you?', myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'China da.', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
        { text: 'Where are you now?', myself: false, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' },
      ];

      messages.push({ text: text, myself: true, icon: 'https://api.adorable.io/avatars/285/chat-user-56@adorable.png' });
      return (
        <View style={{flex: 1}}>
          <View style={{backgroundColor: '#0d4ae8', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', position: 'relative', zIndex: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={this.goBack} style={{paddingVertical: 20, paddingHorizontal: 10}}>
                <Icon name="chevron-left" height={24} width={24} fill='#fff' />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Avatar source={{ uri: icon }} size="medium" />
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 24, paddingVertical: 20, marginLeft: 8}}>{name}</Text>
              </View>
            </View>
          </View>
          <Animated.View style={{ flex: 1, height: height - 80 - 60, justifyContent: 'space-around', left: 0, position: 'absolute', top: 80, width: '100%', zIndex: 5, transform: [{translateY: shift}] }}>
            <KeyboardAvoidingView style={{ flexGrow: 1, flexShrink: 1 }} behavior={ Platform.OS === 'ios' ? 'padding' : undefined } {...keyboardAvoidingViewProps} keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={{ marginVertical: 5 }}>
                {messages.map((val, ind) => (
                  <MessageItem key={`message_${ind}`} messages={{ ...val, icon: val.myself ? val.icon : icon } } />
                ))}
              </ScrollView>
              <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                <Input style={{ flex: 2 }} type="text" placeholder="Type Something..." />
                {this.renderIcon('arrow-forward')}
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      )
    }
}