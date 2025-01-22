import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chessboard from 'react-native-chessboard';
import { Provider as PaperProvider } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { darkTheme } from './theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const ChessScreen = ({ route }) => {
  const { moves, addMove } = route.params;

  const handleMove = (move) => {
    console.log('Move received in ChessScreen:', move);
    addMove(move); // Add the move to the list
  };

  return (
    <View style={styles.chessContainer}>
      <Chessboard
        darkSquareColor={darkTheme.colors.chessboardDarkSquare}
        lightSquareColor={darkTheme.colors.chessboardLightSquare}
        onMove={handleMove} // Logs and stores moves
      />
    </View>
  );
};

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
  );
};

const MovesScreen = ({ route }) => {
  const { moves } = route.params;

  // Log the moves array to ensure it's being received correctly
  useEffect(() => {
    console.log('Moves received in MovesScreen:', moves);
  }, [moves]);

  return (
    <View style={styles.movesContainer}>
      <Text style={styles.movesHeader}>Moves Played:</Text>
      <FlatList
        data={moves}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.moveItem}>
            {index + 1}. {item.to} {/* Only show the destination square */}
          </Text>
        )}
      />
    </View>
  );
};
const HomeScreen = () => {
  const [moves, setMoves] = useState([]);

  const addMove = (move) => {
    console.log('Adding move to state:', move);
    setMoves((prevMoves) => [...prevMoves, move]); // Add move to the state
  };
  return (
    <PaperProvider theme={darkTheme}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: darkTheme.colors.surface,
            },
            tabBarActiveTintColor: darkTheme.colors.primary,
            tabBarInactiveTintColor: darkTheme.colors.textSecondary,
          }}
        >
          <Tab.Screen
            name="Chess"
            component={ChessScreen}
            initialParams={{ moves, addMove }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="sports-esports" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="chat" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Moves"
            component={MovesScreen}
            initialParams={{ moves }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="list" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  chessContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: darkTheme.colors.background,
  },
  chatContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: darkTheme.colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  movesContainer: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
    padding: 20,
  },
  movesHeader: {
    fontSize: 20,
    color: darkTheme.colors.primary,
    marginBottom: 10,
  },
  moveItem: {
    fontSize: 16,
    color: darkTheme.colors.textPrimary,
    marginBottom: 5,
  },
});

export default HomeScreen;
