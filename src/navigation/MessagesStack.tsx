import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../screens/MessagesScreen';

const Stack = createStackNavigator();

const MessagesStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Messages'
      screenOptions={{
        headerShown: false, // 这会隐藏所有屏幕的顶部导航栏
      }}
    >
      <Stack.Screen name='Messages' component={MessagesScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStack;
