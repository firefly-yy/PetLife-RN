// App.tsx
import React from 'react';
import PetCard from './src/components/PetCard';
import {SafeAreaView, Alert, Text} from 'react-native';
import BottomNavigation from './src/features/BottomNavigation';

const imagesUrl = [
  'https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?auto=format&fit=crop&q=80&w=1958&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1515463138280-67d1dcbf317f?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const App: React.FC = () => {
  // 定义每个 Tab 的行为
  const tabs = [
    {
      iconProps: {
        name: 'paw',
        size: 30,
        type: 'font-awesome', // Ensure you have the correct type from the library you're using
        color: 'tomato', // Choose a color that stands out for the active tab or is part of the theme
      },
      onPress: () => Alert.alert('Home Pressed'),
    },
    {
      iconProps: {
        name: 'heart',
        size: 30,
        type: 'font-awesome',
        color: 'gray', // Use a neutral color for inactive tabs
      },
      onPress: () => Alert.alert('Favorites Pressed'),
    },
    {
      iconProps: {
        name: 'user',
        size: 30,
        type: 'font-awesome',
        color: 'gray',
      },
      onPress: () => Alert.alert('Profile Pressed'),
    },
    // You can add more tabs as per your requirement
  ];

  return (
      <SafeAreaView>
        <PetCard
            title="Cozy Apartment"
            location="Paris, France"
            imagesUrl={imagesUrl}
            price="$111120night/"
        />
        <BottomNavigation tabs={tabs} />
      </SafeAreaView>
  );
};

export default App;
