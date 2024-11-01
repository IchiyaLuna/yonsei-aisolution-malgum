import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from 'react-native';

import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigation } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { MessageBubble } from '@/components/message/MessageBubble';
import { MessageInput } from '@/components/message/MessageInput';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '@/api/config';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchData } from '@/api/fetch';
import { HeaderRef, MessageHeader } from '@/components/message/MessageHeader';
import { CameraCapturedPicture } from 'expo-camera';

export default function ChatScreen() {
  // Check is focused
  const focused = useIsFocused();
  // Socket io init
  const socketRef = useRef<Socket | null>(null);
  // Refs
  const headerRef = useRef<HeaderRef>(null);
  const chatBoxRef = useRef<FlatList>(null);
  // Router
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight(); // for keyboardVerticalOffset
  // States
  const [pending, setPending] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateRandomId(),
      sender_id: '10101010',
      conversation_id: '01',
      data: { text: '안녕? 무슨 얘기를 해볼까?' },
      created_at: new Date(),
    },
  ]);

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
    setPending(true);
    const message = await fetchData(
      'POST',
      'message',
      {
        'Content-type': 'application/json',
        Authorization: 'a6a7409b-fee0-41b1-8ce7-750bdaf0a053',
      },
      JSON.stringify({
        conversation_id: undefined,
        content: messageInput,
      })
    ).finally(async () => {
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

      if (headerRef.current) {
        setMessages((prevState) => [
          {
            id: 'temp',
            sender_id: recipient_id,
            conversation_id: '01',
            data: { text: '얼굴을 인식하고 있어요...' },
            created_at: new Date(),
          },
          ...prevState,
        ]);

        const photo = await headerRef.current.getPhoto();
        if (!photo) return;

        setMessages((prevState) => {
          const targetIndex = prevState.findIndex(
            (message) => message.id === 'temp'
          );

          if (targetIndex === -1) return prevState;

          const updatedState = [...prevState];
          updatedState[targetIndex] = {
            ...updatedState[targetIndex],
            data: {
              text: '감정을 분석하고 있어요...',
            },
          };
          return updatedState;
        });

        const formData = new FormData();

        formData.append('image', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'test.jpg',
        } as unknown as Blob);

        const result = await fetchData(
          'POST',
          'ai',
          { 'Content-Type': 'multipart/form-data' },
          formData
        ).finally(() => {
          setMessages((prevState) =>
            prevState.filter((message) => message.id !== 'temp')
          );
        });
        console.log(result);
        if (socketRef.current)
          socketRef.current.emit('sendMessage', {
            message: messageInput,
          });
      }
    });
    setPending(false);
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
        <MessageHeader ref={headerRef} />
        <LinearGradient
          colors={['#789DBC', '#D4F6FF', '#ffffff']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        >
          <FlatList
            ref={chatBoxRef}
            style={styles.chatBoxContainer}
            data={messages}
            keyExtractor={({ id }: Message) => id}
            contentContainerStyle={{ gap: 8 }}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 0,
            }}
            keyboardDismissMode={'on-drag'}
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

          <MessageInput postMessage={postMessage} disabled={pending} />
        </LinearGradient>
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
    padding: 8,
  },
});
