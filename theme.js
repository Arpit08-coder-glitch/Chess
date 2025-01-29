// theme.js
import { MD3DarkTheme as DefaultTheme } from 'react-native-paper';

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#bb86fc',
    background: '#121212',
    surface: '#121212',
    text: '#ffffff',
    chessboardDarkSquare: '#2e2e2e', // Dark squares
    chessboardLightSquare: '#d4d4d4', // Light squares
    textPrimary: '#E0E0E0', // Primary text color (light gray)
  },
};
