import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TestDetailScreen from '../screens/TestDetailScreen';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: '1' }} />
      <Stack.Screen name='TestDetail' component={TestDetailScreen} options={{ title: '详情' }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
