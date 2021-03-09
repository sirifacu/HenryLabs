import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FFFF01',
      accent: 'yellow',
      background: '#000000',
      surface: '#000000',
      backdrop : '#000000',
    },
  };

export default function Main() {
  return (
    <PaperProvider theme={theme}>
		<NavigationContainer theme={theme}> 
			<App />
		</NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
