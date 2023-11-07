import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';
import { defaultScreenOptions } from './navigationConfig';

const Stack = createStackNavigator();

const ExploreStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Explore'
      screenOptions={{
        ...defaultScreenOptions,
      }}
    >
      <Stack.Screen name='Explore' component={ExploreScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
