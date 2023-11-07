import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { defaultScreenOptions } from './navigationConfig';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{ ...defaultScreenOptions }}>
      <Stack.Screen name='SignIn' component={SignInScreen} options={{ title: '登录' }} />
      <Stack.Screen name='SignUp' component={SignUpScreen} options={{ title: '注册' }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
