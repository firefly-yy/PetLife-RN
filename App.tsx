// App.tsx
import React from 'react';
import PetCard from './src/components/PetCard';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AuthStack from './src/navigation/AuthStack';

const petCardProps = {
  title: '可爱的小狗',
  location: '纽约, NY',
  imagesUrl: [
    'https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?auto=format&fit=crop&q=80&w=1958&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1515463138280-67d1dcbf317f?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  price: '每晚$123',
};
// <SafeAreaView>
//   <PetCard {...petCardProps} onPress={() => Alert.alert('111')} />
// </SafeAreaView>

const App: React.FC = () => {
  const isLoggedIn = true;

  return (
    <NavigationContainer>{isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}</NavigationContainer>
  );
};

export default App;
