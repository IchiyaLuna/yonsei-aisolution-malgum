import { StyleSheet, View, Text } from 'react-native';

type Props = {
  message: Message;
  isOwnMessage: boolean;
  isMessageTop: boolean;
  isMessageBottom: boolean;
};

export function MessageBubble({
  message,
  isOwnMessage,
  isMessageTop,
  isMessageBottom,
}: Props) {
  return (
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
  );
}

const styles = StyleSheet.create({
  chatBubbleContainer: {
    maxWidth: '90%',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sentBubbleContainer: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#ff99a8',
  },
  receivedBubbleContainer: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#e6e6e6',
  },
  topBubbleContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomBubbleContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  chatBubbleText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentBubbleText: {
    color: 'white',
  },
  receivedBubbleText: {
    color: 'black',
  },
});
