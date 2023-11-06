// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStack from './src/navigation/AuthStack';

const App: React.FC = () => {
  const isLoggedIn = true;

  return (
    <NavigationContainer>{isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}</NavigationContainer>
  );
};

export default App;
