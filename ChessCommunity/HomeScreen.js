// HomeScreen.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Provider as PaperProvider } from 'react-native-paper';
import { darkTheme } from './theme';

const HomeScreen = () => {
  console.log('Chessboard:', Chessboard);

  return (
    <PaperProvider theme={darkTheme}>
      <View style={styles.container}>
        {/* Chessboard with a defined size */}
        <Chessboard
          darkSquareColor={darkTheme.colors.chessboardDarkSquare}
          lightSquareColor={darkTheme.colors.chessboardLightSquare}
          onMove={(move) => console.log('Move:', move)} // Logs moves
        />
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
    paddingHorizontal: 20, // Add padding for better spacing
  },
});

export default HomeScreen;
