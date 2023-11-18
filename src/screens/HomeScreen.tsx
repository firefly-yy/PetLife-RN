import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import IdeaPop from '../components/IdeaPop';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>LuckyLife</Text>
        <IdeaPop
          title={'sda'}
          location={'dsa'}
          price={'ds'}
          onPress={() => {
            Alert.alert('发送验证码失败');
          }}
        />
        <Button
          title={'跳转到PetDetail'}
          onPress={() => navigation.navigate('PetDetail' as never)}
        />
        <Button title={'登出'} onPress={signOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
});

export default HomeScreen;
