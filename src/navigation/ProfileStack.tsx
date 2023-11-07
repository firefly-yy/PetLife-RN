import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import { defaultScreenOptions } from './navigationConfig';

const Stack = createStackNavigator();

const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        ...defaultScreenOptions,
      }}
    >
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
