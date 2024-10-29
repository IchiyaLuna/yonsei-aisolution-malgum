import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';

type Props = {
    postMessage: (messageInput: string) => void;
};

export function MessageInput({ postMessage }: Props) {
    const [messageInput, setMessageInput] = useState<string>('');
    const onMessageSend = () => {
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
                />
                <TouchableOpacity
                    style={styles.messageSendButton}
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
    },
    messageInputInnerView: {
        paddingVertical: 6,
        paddingLeft: 16,
        paddingRight: 6,
        borderRadius: '50%',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
    },
    messageTextInput: {
        flexGrow: 1,
        fontSize: 16,
    },
    messageSendButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: '50%',
        backgroundColor: '#ff99a8',
    },
});
