import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

import { useEffect, useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { MessageBubble } from '@/components/message/MessageBubble';
import { MessageInput } from '@/components/message/MessageInput';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '@/api/config';
import { useIsFocused } from '@react-navigation/native';

export default function ChatScreen() {
  // Check is focused
  const focused = useIsFocused();
  // Socket io init
  const socketRef = useRef<Socket | null>(null);

  // Refs
  const chatBoxRef = useRef<FlatList>(null);
  // Router
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight(); // for keyboardVerticalOffset
  // States
  const [messages, setMessages] = useState<Message[]>([]);

  const conversation_id = '11001100';
  const sender_id = '01010101';
  const recipient_id = '10101010';
  const [current_id, setCurrentId] = useState<string>(sender_id);

  // Functions
  function generateRandomId(length = 16) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const postMessage = async (messageInput: string) => {
    if (socketRef.current)
      socketRef.current.emit('sendMessage', {
        message: messageInput,
      });
    setMessages((prevState) => [
      {
        id: generateRandomId(),
        sender_id: sender_id,
        conversation_id: '01',
        data: { text: messageInput },
        created_at: new Date(),
      },
      ...prevState,
    ]);
    // setCurrentId((prevState) =>
    //   prevState === sender_id ? recipient_id : sender_id
    // );
  };
  // Effects
  useEffect(() => {
    if (focused) {
      if (!socketRef.current) {
        socketRef.current = io(API_URL);
      }
      // Join socket.io Room
      socketRef.current.emit('joinRoom', { conversation_id });
      // Subscribe newMessage event
      socketRef.current.on(
        'receiveMessage',
        (response: {
          content: string | null;
          refusal: string | null;
          role: 'assistant';
        }) => {
          console.log('receiveMessage', response);
          // Update messages if message is from away
          setMessages((prev) => [
            {
              id: generateRandomId(),
              sender_id: recipient_id,
              conversation_id: '01',
              data: { text: response.content || '' },
              created_at: new Date(),
            },
            ...prev,
          ]);
          // If message sent by current user, go top (inversed-bottom)
          // if (message.sender_id === sender_id) {
          //   setTimeout(() => {
          //     chatBoxRef.current?.scrollToOffset({
          //       animated: true,
          //       offset: 0,
          //     });
          //   }, 0);
          // }
        }
      );
    }
    return () => {
      if (socketRef.current) {
        // Leave socket.io Room
        socketRef.current.emit('leaveRoom', { conversation_id });
        // Unsubscribe newMessage event
        socketRef.current.off('newMessage');
        // Destroy socket connection
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [focused, conversation_id]);
  // Render
  return (
    <SafeAreaView style={styles.pageView}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          ref={chatBoxRef}
          style={styles.chatBoxContainer}
          data={messages}
          keyExtractor={({ id }: Message) => id}
          contentContainerStyle={{ gap: 4 }}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 0,
          }}
          renderItem={({ item, index }) => (
            <MessageBubble
              message={item}
              isOwnMessage={sender_id === item.sender_id}
              isMessageTop={messages[index + 1]?.sender_id !== item.sender_id}
              isMessageBottom={
                messages[index - 1]?.sender_id !== item.sender_id
              }
            />
          )}
          inverted
          // refreshing
        />
        <MessageInput postMessage={postMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flexGrow: 1,
  },
  chatBoxContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
