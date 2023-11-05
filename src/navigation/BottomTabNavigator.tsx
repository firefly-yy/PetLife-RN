import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='首页'
        component={HomeStack}
        options={{
          tabBarLabel: '首页', // 只设置底部标签的标题
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
