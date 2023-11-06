import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false, // 这会隐藏所有屏幕的顶部导航栏
      }}
    >
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
