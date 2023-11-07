import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../screens/MessagesScreen';
import { defaultScreenOptions } from './navigationConfig';

const Stack = createStackNavigator();

const MessagesStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Messages'
      screenOptions={{
        ...defaultScreenOptions,
      }}
    >
      <Stack.Screen name='Messages' component={MessagesScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStack;
