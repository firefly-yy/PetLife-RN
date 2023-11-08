import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title={'跳转到PetDetail'} onPress={() => navigation.navigate('PetDetail' as never)} />
      <Button title={'登出'} onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
