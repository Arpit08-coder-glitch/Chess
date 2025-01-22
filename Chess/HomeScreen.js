import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Provider as PaperProvider } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { darkTheme } from './theme';

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);

  // Initialize chatbot with a welcome message
  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hi! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    // Mock chatbot response
    const userMessage = newMessages[0]?.text || '';
    const botResponse = {
      _id: Math.random().toString(36).substring(7),
      text: `You said: "${userMessage}". How else can I help?`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chatbot',
      },
    };

    setTimeout(() => setMessages((previousMessages) => GiftedChat.append(previousMessages, [botResponse])), 1000);
  }, []);

  return (
    <PaperProvider theme={darkTheme}>
      <View style={styles.container}>
        {/* Chessboard Section */}
        <Chessboard
          darkSquareColor={darkTheme.colors.chessboardDarkSquare}
          lightSquareColor={darkTheme.colors.chessboardLightSquare}
          onMove={(move) => console.log('Move:', move)} // Logs moves
        />

        {/* Chatbot Section */}
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1, // User ID for the sender
            }}
            placeholder="Type your message..."
          />
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: darkTheme.colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

export default HomeScreen;
