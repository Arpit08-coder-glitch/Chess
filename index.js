import 'react-native-gesture-handler';  // Must be the first import
import 'react-native-reanimated';       // Fix crashes related to reanimated
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
