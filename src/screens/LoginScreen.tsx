import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('请输入手机号码')
    .matches(/^[1][3-9][0-9]{9}$/, '请输入有效的手机号码'), // 这里是一个简单的中国手机号码正则表达式
  password: Yup.string().required('请输入密码').min(6, '密码长度至少6位'),
});

const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{ phoneNumber: '', password: '' }}
      onSubmit={(values, { validateForm }) => {
        validateForm().then((errors) => {
          const errorKeys = Object.keys(errors) as Array<keyof typeof values>; // 类型断言
          if (errorKeys.length) {
            const firstErrorKey = errorKeys[0];
            const firstError = errors[firstErrorKey];
            Alert.alert('错误', firstError);
          } else {
            // 如果没有错误，执行注册函数
            signIn(values.phoneNumber, values.password);
          }
        });
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image source={require('../assets/pet.png')} style={styles.logo} />
          <View>
            <View style={styles.inputContainer}>
              <View style={styles.icon}>
                <Icon name='user' size={15} color='white' />
              </View>
              <TextInput
                placeholder={'用户名'}
                onChangeText={handleChange('phoneNumber')}
                value={values.phoneNumber}
                style={styles.input}
              />
            </View>
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          </View>
          <View>
            <View style={styles.inputContainer}>
              <View style={styles.icon}>
                <Icon name='lock' size={15} color='white' />
              </View>
              <TextInput
                placeholder={'密码'}
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry
                maxLength={12}
                style={styles.input}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
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
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
    height: 50, // Increased height for better touch area
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0', // Subtle border color
    borderRadius: 10, // Rounded corners
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
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default LoginScreen;
