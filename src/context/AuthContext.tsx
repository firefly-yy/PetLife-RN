/***
 * AuthContext.tsx
 * 1. 创建 AuthContext,AuthProvider，用于存储用户登录状态
 * 3. 创建 useAuth，用于获取用户登录状态
 * 4. 在 App.tsx 中使用 AuthProvider 包裹整个应用,使用AuthConsumer来决定渲染哪个页面
 */
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AV from 'leancloud-storage/core';
import { Alert } from 'react-native';

type AuthContextType = {
  isLoggedIn: boolean;
  signInWithUsername: (username: string, password: string) => Promise<any>; // 用户登录
  signOut: () => void; // 用户登出
  signUpWithUsername: (username: string, password: string) => Promise<any>;
  signUpWithCode: (phoneNumber: string, smsCode: string, password: string) => void; // 用户注册
  sendCode: (phoneNumber: string) => void; // 发送验证码
  getCurrentUser: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// 自定义 hook,用于获取用户相关信息
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 发送验证码
  const sendCode = (phoneNumber: string) => {
    AV.Cloud.requestSmsCode(phoneNumber)
      .then(() => {
        Alert.alert('验证码已发送');
      })
      .catch((error) => {
        Alert.alert('发送验证码失败', error.message);
      });
  };

  // 使用验证码注册
  const signUpWithCode = (phoneNumber: string, smsCode: string, password: string) => {
    AV.User.signUpOrlogInWithMobilePhone('+86' + phoneNumber, smsCode)
      .then((user) => {
        user.setPassword(password);
        return user.save();
      })
      .catch((error) => {
        let message: string;
        switch (error.code) {
          case 202: // 假设202是用户名已经存在
            message = '用户名已经被占用';
            break;
          // 其他错误码处理
          default:
            message = error.message; // 默认错误消息
        }
        Alert.alert('注册失败', message);
      });
  };

  const signUpWithUsername = async (username: string, password: string) => {
    try {
      return await AV.User.signUp(username, password);
    } catch (error: any) {
      let message: string;
      switch (error.code) {
        case 202: // 假设202是用户名已经存在
          message = '用户名已经被占用';
          break;
        // 其他错误码处理
        default:
          message = error.message; // 默认错误消息
      }
      Alert.alert('注册失败', message);
      throw error;
    }
  };
  const signInWithUsername = async (username: string, password: string) => {
    try {
      const user = await AV.User.logIn(username, password);
      await AsyncStorage.setItem('userSessionToken', user.getSessionToken());
      setIsLoggedIn(true);
      return user;
    } catch (error: any) {
      let message: string;
      switch (error.code) {
        case 210:
          message = '密码错误，请重试';
          break;
        case 211:
          message = '用户不存在';
          break;
        default:
          message = '登录失败';
      }
      Alert.alert('登录失败', message);
      throw error;
    }
  };
  const signOut = () => {
    AV.User.logOut()
      .then(async () => {
        setIsLoggedIn(false);
        await AsyncStorage.removeItem('userSessionToken'); // 清除本地存储的会话信息
      })
      .catch((error) => {
        Alert.alert('退出登录失败', error.message);
      });
  };

  const getCurrentUser = async () => {
    return await AV.User.currentAsync();
  };

  const restoreUserSession = async () => {
    const sessionToken = await AsyncStorage.getItem('userSessionToken');
    if (sessionToken) {
      // 使用 sessionToken 来恢复用户会话
      try {
        await AV.User.become(sessionToken);
        setIsLoggedIn(true);
      } catch (error) {
        // ... 处理错误，比如 sessionToken 过期
      }
    }
  };
  useEffect(() => {
    restoreUserSession();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        signInWithUsername,
        signOut,
        signUpWithCode,
        sendCode,
        signUpWithUsername,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
