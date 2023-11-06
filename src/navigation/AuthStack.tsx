import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={SignInScreen} options={{ title: '登录' }} />
      <Stack.Screen name='Register' component={SignUpScreen} options={{ title: '注册' }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
