import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false, // 这会隐藏所有屏幕的顶部导航栏
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='ItemDetail' component={ItemDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
