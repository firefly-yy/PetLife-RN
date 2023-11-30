/***
 * AuthContext.tsx
 * 1. 创建 AuthContext,AuthProvider，用于存储用户登录状态
 * 3. 创建 useAuth，用于获取用户登录状态
 * 4. 在 App.tsx 中使用 AuthProvider 包裹整个应用,使用AuthConsumer来决定渲染哪个页面
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AV from 'leancloud-storage/core';
import { Alert } from 'react-native';

interface AuthContextType {
  isLoggedIn: boolean;
  signIn: (phoneNumber: string, password: string) => void; // 用户登录
  signOut: () => void; // 用户登出
  signUpWithCode: (phoneNumber: string, smsCode: string, password: string) => void; // 用户注册
  sendCode: (phoneNumber: string) => void; // 发送验证码
}

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
        Alert.alert('注册失败', error.message);
      });
  };
  const signIn = (phoneNumber: string, password: string) => {
    AV.User.signUp(phoneNumber, password)
      .then((user) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        Alert.alert('登录失败', error.message);
      });
  };
  const signOut = () => {
    AV.User.logOut()
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        Alert.alert('退出登录失败', error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut, signUpWithCode, sendCode }}>
      {children}
    </AuthContext.Provider>
  );
};
