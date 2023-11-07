import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PublishScreen from '../screens/PublishScreen';
import { defaultScreenOptions } from './navigationConfig';

const Stack = createStackNavigator();

const PublishStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Publish'
      screenOptions={{
        ...defaultScreenOptions,
      }}
    >
      <Stack.Screen name='Publish' component={PublishScreen} />
    </Stack.Navigator>
  );
};

export default PublishStack;
