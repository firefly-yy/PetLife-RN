import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import theme from '../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('请输入手机号码')
    .matches(/^[1][3-9][0-9]{9}$/, '请输入有效的手机号码'), // 这里是一个简单的中国手机号码正则表达式
  smsCode: Yup.string().required('请输入验证码'),
  password: Yup.string().required('请输入密码').min(6, '密码长度至少6位'),
});

const RegisterScreen: React.FC = () => {
  const { signUpWithCode, sendCode } = useAuth();
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleSendCode = () => {
    // 发送验证码逻辑
    // ...
    setCountdown(60);
  };

  return (
    <Formik
      initialValues={{ phoneNumber: '', smsCode: '', password: '' }}
      onSubmit={(values, { validateForm }) => {
        validateForm().then((errors) => {
          const errorKeys = Object.keys(errors) as Array<keyof typeof values>; // 类型断言
          if (errorKeys.length) {
            const firstErrorKey = errorKeys[0];
            const firstError = errors[firstErrorKey];
            Alert.alert('错误', firstError);
          } else {
            // 如果没有错误，执行注册函数
            signUpWithCode(values.phoneNumber, values.smsCode, values.password);
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
                <Icon name='phone' size={15} color='white' />
              </View>
              <TextInput
                placeholder={'手机号'}
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
                <Icon name='code' size={15} color='white' />
              </View>
              <TextInput
                placeholder={'验证码'}
                onChangeText={handleChange('smsCode')}
                value={values.smsCode}
                style={styles.input}
              />
              <TouchableOpacity
                style={{
                  ...styles.sendCodeButton,
                  backgroundColor: countdown > 0 ? '#ccc' : '#F5B849',
                }}
                onPress={handleSendCode}
                disabled={countdown > 0}
              >
                <Text style={styles.sendCodeButtonText}>
                  {' '}
                  {countdown > 0 ? `${countdown}秒` : '发送验证码'}
                </Text>
              </TouchableOpacity>
            </View>
            {touched.smsCode && errors.smsCode && (
              <Text style={styles.errorText}>{errors.smsCode}</Text>
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
                inlineImageLeft={'search_icon'}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>注册</Text>
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
    flex: 1,
    marginRight: 5,
    height: 50,
  },
  button: {
    width: '60%',
    height: 45,
    backgroundColor: '#F5B849', // 示例背景颜色
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
  sendCodeButton: {
    borderRadius: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  sendCodeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegisterScreen;
