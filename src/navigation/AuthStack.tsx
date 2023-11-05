import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} options={{ title: '登录' }} />
      <Stack.Screen name='Register' component={RegisterScreen} options={{ title: '注册' }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
