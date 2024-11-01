import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

type Props = {
  postMessage: (messageInput: string) => void;
  disabled: boolean;
};

export function MessageInput({ postMessage, disabled }: Props) {
  const [messageInput, setMessageInput] = useState<string>('');
  const onMessageSend = () => {
    if (messageInput === '') return;
    postMessage(messageInput);
    setMessageInput('');
  };

  return (
    <View style={styles.messageInputOuterView}>
      <View style={styles.messageInputInnerView}>
        <TextInput
          style={styles.messageTextInput}
          placeholder="메시지 보내기..."
          value={messageInput}
          onChangeText={setMessageInput}
          multiline={true}
        />
        <TouchableOpacity
          style={[
            styles.messageSendButton,
            disabled ? styles.messageSendButtonDisabled : undefined,
          ]}
          disabled={disabled}
          onPress={onMessageSend}
        >
          <FontAwesome name="send" size={18} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageInputOuterView: {
    padding: 8,
    backgroundColor: 'white',
    borderColor: '#d8d8d8',
    borderTopWidth: 1,
  },
  messageInputInnerView: {
    paddingVertical: 6,
    paddingLeft: 16,
    paddingRight: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  messageTextInput: {
    maxWidth: '80%',
    flexGrow: 1,
    fontSize: 16,
    textAlignVertical: 'center',
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
  },
  messageSendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#789DBC',
    alignSelf: 'flex-end',
  },
  messageSendButtonDisabled: {
    backgroundColor: '#bcbcbc',
  },
});
