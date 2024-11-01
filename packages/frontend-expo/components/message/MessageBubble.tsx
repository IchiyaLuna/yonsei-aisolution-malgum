import { StyleSheet, View, Text, Image } from 'react-native';

type Props = {
  message: Message;
  isOwnMessage: boolean;
  isMessageTop: boolean;
  isMessageBottom: boolean;
};

const bubbleRadius = 20;

export function MessageBubble({
  message,
  isOwnMessage,
  isMessageTop,
  isMessageBottom,
}: Props) {
  return (
    <View
      style={[
        styles.chatContainer,
        isOwnMessage ? styles.sentChatContainer : styles.receivedChatContainer,
      ]}
    >
      {isOwnMessage ? null : (
        <>
          <Image
            source={require('@/assets/images/profile.png')} // 이미지 경로
            style={styles.image}
          />
        </>
      )}
      <View style={styles.bodyContainer}>
        {isOwnMessage ? null : <Text style={styles.nameText}>맑음이</Text>}
        <View
          style={[
            styles.chatBubbleContainer,
            isOwnMessage
              ? styles.sentBubbleContainer
              : styles.receivedBubbleContainer,
            isMessageTop && styles.topBubbleContainer,
            isMessageBottom && styles.bottomBubbleContainer,
          ]}
        >
          <Text
            style={[
              styles.chatBubbleText,
              isOwnMessage ? styles.sentBubbleText : styles.receivedBubbleText,
            ]}
          >
            {message.data.text}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    width: '90%',
  },
  sentChatContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  receivedChatContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  image: {
    aspectRatio: 1,
    width: 50,
    borderRadius: 50, // 원형으로 만들기
  },
  bodyContainer: {
    flexShrink: 1,
    marginHorizontal: 8,
  },
  nameText: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  chatBubbleContainer: {
    padding: 10,
    borderRadius: bubbleRadius,
    justifyContent: 'center',
  },
  sentBubbleContainer: {
    borderTopLeftRadius: bubbleRadius,
    borderBottomLeftRadius: bubbleRadius,
    alignSelf: 'flex-end',
    backgroundColor: '#789DBC',
  },
  receivedBubbleContainer: {
    borderTopRightRadius: bubbleRadius,
    borderBottomRightRadius: bubbleRadius,
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  topBubbleContainer: {
    borderTopLeftRadius: bubbleRadius,
    borderTopRightRadius: bubbleRadius,
  },
  bottomBubbleContainer: {
    borderBottomLeftRadius: bubbleRadius,
    borderBottomRightRadius: bubbleRadius,
  },
  chatBubbleText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentBubbleText: {
    color: 'white',
  },
  receivedBubbleText: {
    color: 'black',
  },
});
