import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Button, TouchableOpacity, Text } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Provider as PaperProvider } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { darkTheme } from './theme';

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false); // State to control chat visibility

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

        {/* Chatbot Toggle Button */}
        {!isChatVisible && (
          <TouchableOpacity
            style={styles.chatToggleButton}
            onPress={() => setIsChatVisible(true)}
          >
            <Text style={styles.chatToggleText}>Open Chat</Text>
          </TouchableOpacity>
        )}

        {/* Chatbot Section */}
        {isChatVisible && (
          <View style={styles.chatContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsChatVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <GiftedChat
              messages={messages}
              onSend={(messages) => onSend(messages)}
              user={{
                _id: 1, // User ID for the sender
              }}
              placeholder="Type your message..."
            />
          </View>
        )}
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
  chatToggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: darkTheme.colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  chatToggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height * 0.5, // Take half the screen height
    backgroundColor: darkTheme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.colors.text,
  },
});

export default HomeScreen;
