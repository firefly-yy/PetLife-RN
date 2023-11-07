import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import HomeStack from './HomeStack';
import ExploreStack from './ExploreStack';
import ProfileStack from './ProfileStack';
import MessagesStack from './MessagesStack';
import PublishStack from './PublishStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';
          let type = 'ionicon';

          switch (route.name) {
            case '首页':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case '探索':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case '发布':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case '消息':
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
              break;
            case '个人主页':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Icon name={iconName} type={type} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // 这样就不用在每个Tab.Screen里单独设置了
      })}
    >
      <Tab.Screen name='首页' component={HomeStack} />
      <Tab.Screen name='探索' component={ExploreStack} />
      <Tab.Screen name='发布' component={PublishStack} />
      <Tab.Screen name='消息' component={MessagesStack} />
      <Tab.Screen name='个人主页' component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
