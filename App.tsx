import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStack from './src/navigation/AuthStack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AV from 'leancloud-storage/core';
import * as adapters from '@leancloud/platform-adapters-react-native';
import { NativeBaseProvider } from 'native-base';

AV.setAdapters(adapters as any);
AV.init({
  appId: 'uMGQlQLcevmIIIdhEdK2PUuN-gzGzoHsz',
  appKey: '9llPMhubdhaVpkcP8h69b5WW',
  serverURL: 'https://umgqlqlc.lc-cn-n1-shared.com',
});

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <AuthConsumer />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};
export default App;

const AuthConsumer: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}</>;
};
