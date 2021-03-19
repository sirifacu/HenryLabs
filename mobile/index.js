import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import UserStateContext from "./src/context/user/UserState";
import axios from 'axios';
import { API_URL } from "./config";

axios.defaults.baseURL = API_URL;

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
      <UserStateContext>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <App />
          </NavigationContainer>
        </PaperProvider>
      </UserStateContext>
  );
}

AppRegistry.registerComponent(appName, () => Main);
