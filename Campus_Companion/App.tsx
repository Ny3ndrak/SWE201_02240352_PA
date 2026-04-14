import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

export default function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
