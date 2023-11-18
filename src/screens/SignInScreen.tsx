import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SignInScreen: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/pet.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <Icon name='envelope' size={15} color='white' />
        </View>
        <TextInput
          placeholder={'邮箱'}
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <Icon name='lock' size={15} color='white' />
        </View>
        <TextInput
          placeholder={'密码'}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          maxLength={12}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>登录</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.new}>
        <Text style={styles.text} onPress={() => navigation.navigate('SignUp' as never)}>
          忘记密码?
        </Text>
        <Text style={styles.text} onPress={() => navigation.navigate('SignUp' as never)}>
          创建新账户
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50, // Increased height for better touch area
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Subtle border color
    borderRadius: 30, // Rounded corners
    marginBottom: 15,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  input: {
    fontSize: 20, // Slightly larger font size
    color: '#333', // Darker text for better readability
    marginLeft: 10,
    width: '90%',
  },
  button: {
    width: '60%',
    height: 45,
    backgroundColor: '#00CFFF', // 示例背景颜色
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // 仅用于 Android
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  new: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    width: '80%',
    justifyContent: 'space-between',
  },
  text: {
    color: '#00CFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
