// App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStack from './src/navigation/AuthStack';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    // <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NavigationContainer>
        <AuthConsumer />
      </NavigationContainer>
    </AuthProvider>
    // </QueryClientProvider>
  );
};
export default App;

const AuthConsumer: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}</>;
};
