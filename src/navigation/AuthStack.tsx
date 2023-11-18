import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { defaultScreenOptions } from './navigationConfig';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{ ...defaultScreenOptions }}>
      <Stack.Screen name='SignIn' component={LoginScreen} options={{ title: '登录' }} />
      <Stack.Screen name='SignUp' component={RegisterScreen} options={{ title: '注册' }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
