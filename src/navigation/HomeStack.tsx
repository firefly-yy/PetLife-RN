import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PetDetailScreen from '../screens/PetDetailScreen';
import { defaultScreenOptions } from './navigationConfig';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ ...defaultScreenOptions }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='PetDetail' component={PetDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
