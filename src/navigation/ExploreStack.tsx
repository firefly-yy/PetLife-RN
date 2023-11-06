import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../screens/ExploreScreen';

const Stack = createStackNavigator();

const ExploreStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Explore'
      screenOptions={{
        headerShown: false, // 这会隐藏所有屏幕的顶部导航栏
      }}
    >
      <Stack.Screen name='Explore' component={ExploreScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
