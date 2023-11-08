import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const SignInScreen: React.FC = () => {
  const { signIn } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button title={'Sign In'} onPress={signIn} />
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

export default SignInScreen;
