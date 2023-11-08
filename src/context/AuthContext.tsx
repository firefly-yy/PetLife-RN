/***
 * AuthContext.tsx
 * 1. 创建 AuthContext,AuthProvider，用于存储用户登录状态
 * 3. 创建 useAuth，用于获取用户登录状态
 * 4. 在 App.tsx 中使用 AuthProvider 包裹整个应用,使用AuthConsumer来决定渲染哪个页面
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  signIn: () => void; // 用户登录
  signOut: () => void; // 用户登出
  signUp: () => void; // 用户注册
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signIn = () => {
    setIsLoggedIn(true);
  };
  const signUp = () => setIsLoggedIn(true);
  const signOut = () => {
    // 这里添加登出逻辑，如清除token等
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
